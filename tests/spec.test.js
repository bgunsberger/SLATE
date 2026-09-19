import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import test from 'node:test';
import {createValidators, semanticErrors, replayManualDecision} from '../reference/validation.js';
import {aggregateOutcome, matchSet, matchRetention, matchRule, buildSourceRows, deriveProductionRelationships, executionReadiness} from '../reference/semantics.js';

const readJson = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const validators = await createValidators();
const bundle = await readJson('../examples/cross-show-lipsync.bundle.json');
const copy = () => structuredClone(bundle);
const rule = await readJson('../examples/rule-client-cross-production-approval.json');
const reusableRule = await readJson('../examples/rule-client-reusable-capability-approval.json');
const at = bundle.decision.evaluatedAt;
const schemaValid = (kind, value) => {
  const validate = validators[kind];
  assert.equal(validate(value), true, JSON.stringify(validate.errors));
};

test('all schemas compile strictly and all JSON examples match a declared schema', async () => {
  for (const name of await readdir(new URL('../examples/', import.meta.url))) {
    if (!name.endsWith('.json')) continue;
    const kind = name.endsWith('.bundle.json') ? 'assessment-bundle' : name.endsWith('.proposed-use.json') ? 'proposed-use' : name.endsWith('.decision.json') ? 'decision' : name.startsWith('rule-') ? 'policy-rule' : null;
    assert.ok(kind, `Unclassified example ${name}`);
    schemaValid(kind, await readJson(`../examples/${name}`));
  }
});

test('standalone proposal, rule and decision match their frozen bundle versions', async () => {
  assert.deepEqual(bundle.proposedUse, await readJson('../examples/cross-show-lipsync.proposed-use.json'));
  assert.deepEqual(bundle.decision, await readJson('../examples/cross-show-lipsync.decision.json'));
  assert.deepEqual(bundle.records.find(r => r.id === rule.id), rule);
});

test('complete manual evidence bundle validates and replays its recorded decision core', () => {
  assert.deepEqual(semanticErrors(bundle), []);
  const replay = replayManualDecision(bundle);
  assert.equal(replay.outcome, 'hold_approval_required');
  assert.deepEqual(replay.gateResults, bundle.decision.gateResults);
  assert.deepEqual(replay.applicableRuleIds, [...bundle.decision.applicableRuleIds].sort());
});

test('structural validation requires each core gate exactly once', () => {
  const d = structuredClone(bundle.decision);
  d.gateResults = Array.from({length: 8}, () => d.gateResults[0]);
  assert.equal(validators.decision(d), false);
});

test('semantic validation rejects permission that contradicts unresolved gates', () => {
  const b = copy(); b.decision.outcome = 'permitted';
  assert.ok(semanticErrors(b).includes('Outcome contradicts gate results'));
});

test('approval and information rules require actionable requirements and authority', () => {
  const r = structuredClone(rule); delete r.approvalAuthorityIds;
  assert.equal(validators['policy-rule'](r), false);
  r.approvalAuthorityIds = []; assert.equal(validators['policy-rule'](r), false);
  r.approvalAuthorityIds = ['ROLE-LEGAL']; delete r.requirements;
  assert.equal(validators['policy-rule'](r), false);
  r.effect = 'require_information'; r.requirements = [{type: 'approval', description: 'Review', ownerRole: 'Legal', due: 'before_processing', evidenceRequired: true}];
  assert.equal(validators['policy-rule'](r), false);
});

test('registry envelope is supported and active rules require test references', () => {
  schemaValid('policy-rule', rule);
  const r = structuredClone(rule); r.testCaseIds = [];
  assert.equal(validators['policy-rule'](r), false);
});

test('evidence closure includes collective terms, technical approvals and every rule version', () => {
  for (const id of ['COLLECTIVE-AVPC-24', 'APPROVAL-MOTIONMAP-SECURITY', rule.id]) {
    const b = copy(); b.decision.evidenceSnapshot = b.decision.evidenceSnapshot.filter(e => e.recordId !== id);
    assert.ok(semanticErrors(b).includes(`Missing frozen record/version ${id}`));
  }
  const b = copy(); b.records.find(r => r.id === rule.id).version = 'changed';
  assert.ok(semanticErrors(b).some(e => e.includes('Snapshot mismatch')));
});

test('replay detects changed human findings and incomplete archived content', () => {
  const b = copy(); b.records.find(r => r.recordType === 'gate_finding').facts.gateResult.result = 'prohibited';
  assert.throws(() => replayManualDecision(b), /Gate finding differs/);
  const c = copy(); c.records = c.records.filter(r => r.id !== 'AGREEMENT-AVA-12');
  assert.throws(() => replayManualDecision(c), /Missing frozen record/);
});

test('a stale positive basis cannot satisfy a gate even with a consistent snapshot', () => {
  const b = copy(); const record = b.records.find(r => r.id === 'APPROVAL-MOTIONMAP-SECURITY');
  record.status = 'withdrawn'; b.decision.evidenceSnapshot.find(e => e.recordId === record.id).status = 'withdrawn';
  assert.ok(semanticErrors(b).includes(`Stale positive basis ${record.id}`));
});

test('non-applicability needs evidence, verifier and the appropriate basis kind', () => {
  const b = copy(); const gate = b.decision.gateResults[0];
  gate.result = 'not_applicable'; gate.basis = [];
  assert.equal(validators.decision(b.decision), false);
  gate.basis = structuredClone(bundle.decision.gateResults[0].basis);
  assert.ok(semanticErrors(b).includes('Wrong basis kind inventory'));
});

test('approved human decisions require recorded time and evidence', () => {
  const d = structuredClone(bundle.decision);
  d.approvals = [{approverId: 'ROLE-LEGAL', authorityExercised: 'client permission', status: 'approved'}];
  assert.equal(validators.decision(d), false);
});

test('three-valued set operators preserve partial unknowns and complete scope', () => {
  assert.equal(matchSet(['AU', 'US'], {operator: 'all_in', values: ['AU']}), false);
  assert.equal(matchSet(['AU', null], {operator: 'all_in', values: ['AU']}), null);
  assert.equal(matchSet(['US', null], {operator: 'any_of', values: ['US']}), true);
  assert.equal(matchSet(['AU', null], {operator: 'any_of', values: ['US']}), null);
  assert.equal(matchSet(['AU', null], {operator: 'contains_all', values: ['AU']}), true);
  assert.equal(matchSet(['AU', 'US'], {operator: 'equals_set', values: ['US', 'AU']}), true);
  assert.equal(matchSet([], {operator: 'all_in', values: ['AU']}), false);
  assert.throws(() => matchSet(['AU'], {operator: 'any_of', values: []}), /Invalid/);
});

test('source/person selectors cannot match facts borrowed from unrelated assets', () => {
  const rows = buildSourceRows([
    {id: 'MATERIAL-AAA', productionId: 'PRODUCTION-AAA', people: [{id: 'PERSON-AAA'}]},
    {id: 'MATERIAL-BBB', productionId: 'PRODUCTION-BBB', people: [{id: 'PERSON-BBB'}]}
  ], {});
  const r = {...rule, selectors: {sourceProductionIds: {operator: 'any_of', values: ['PRODUCTION-AAA']}, personIds: {operator: 'any_of', values: ['PERSON-BBB']}}};
  assert.deepEqual(rows.map(row => matchRule(r, row, at).result), [false, false]);
  assert.throws(() => buildSourceRows([], {personIds: ['PERSON-BBB']}), /bound material/);
});

test('retention limits treat unknowns, indefinite duration and retained derivatives explicitly', () => {
  assert.equal(matchRetention(30, 30), true);
  assert.equal(matchRetention(31, 30), false);
  assert.equal(matchRetention('indefinite', 30), false);
  assert.equal(matchRetention('unknown', 30), null);
  assert.equal(matchRetention('not_applicable', 30), null);
  assert.equal(matchRetention('session_only', 0), true);
  assert.equal(matchRetention([14, 'unknown'], 30), null);
  assert.equal(matchRetention([14, 90], 30), false);
  const r = {...rule, constraints: [{field: 'retention.source', operator: 'lte_days', days: 30}]};
  schemaValid('policy-rule', r);
  const row = {sourceProductionIds: ['PRODUCTION-HARBOR-HEROES'], productionRelationships: ['different_production'], retention: {source: 31}};
  assert.equal(matchRule(r, row, at).result, false);
});

test('research and public distribution preserve production relationships', () => {
  const b = copy(); b.proposedUse.purpose.businessPurposes = ['research_or_evaluation']; b.proposedUse.purpose.distribution = ['public_release'];
  schemaValid('proposed-use', b.proposedUse);
  assert.equal(matchRule(rule, {sourceProductionIds: b.proposedUse.source.sourceProductionIds, productionRelationships: deriveProductionRelationships(b.proposedUse.source.sourceProductionIds, b.proposedUse.purpose.destinationProductionIds)}, at).result, true);
  assert.deepEqual(deriveProductionRelationships(['PRODUCTION-AAA'], ['PRODUCTION-AAA', 'PRODUCTION-BBB']), ['different_production', 'same_production']);
  b.proposedUse.purpose.productionRelationships = ['same_production'];
  assert.ok(semanticErrors(b).includes('Production relationships contradict source/destination IDs'));
});

test('collection-only intake requires a versioned manifest reference', () => {
  const u = structuredClone(bundle.proposedUse); delete u.source.materials;
  schemaValid('proposed-use', u);
  delete u.source.collectionVersion;
  assert.equal(validators['proposed-use'](u), false);
});

test('proposed uses inventory models once and bind them to the environment', () => {
  const missing = structuredClone(bundle.proposedUse); delete missing.source.models;
  assert.equal(validators['proposed-use'](missing), false);
  const empty = structuredClone(bundle.proposedUse); empty.source.models = [];
  assert.equal(validators['proposed-use'](empty), false);
  const unboundEnvironment = structuredClone(bundle.proposedUse); unboundEnvironment.environment.modelIds = [];
  assert.equal(validators['proposed-use'](unboundEnvironment), false);
  const preliminary = structuredClone(bundle.proposedUse);
  Object.assign(preliminary.source, {inventoryStatus: 'unknown', models: []});
  Object.assign(preliminary.environment, {status: 'provisional', modelIds: []});
  schemaValid('proposed-use', preliminary);
  const unbound = copy(); unbound.proposedUse.environment.modelIds = ['MODEL-NOT-IN-SOURCE'];
  assert.ok(semanticErrors(unbound).includes('Environment model is absent from source model inventory MODEL-NOT-IN-SOURCE'));
});

test('model detail lives in controlled records with frozen authority evidence', () => {
  const proposal = structuredClone(bundle.proposedUse); proposal.source.models[0].authorityStatus = 'verified';
  assert.equal(validators['proposed-use'](proposal), false);
  const withoutAuthority = copy(); withoutAuthority.records.find(record => record.id === 'MODEL-MOUTHSHAPE-RESEARCH-2').facts.authorityEvidenceIds = [];
  assert.ok(semanticErrors(withoutAuthority).includes('Verified model authority has no evidence MODEL-MOUTHSHAPE-RESEARCH-2'));
  for (const id of ['MODEL-MOUTHSHAPE-RESEARCH-2', 'AGREEMENT-MOTIONMAP-MODEL-LICENCE']) {
    const b = copy(); b.records = b.records.filter(record => record.id !== id);
    assert.ok(semanticErrors(b).includes(`Missing frozen record/version ${id}`));
  }
});

test('permitted outcomes require verified model provenance and authority', () => {
  const b = copy(); b.decision.outcome = 'permitted';
  b.proposedUse.source.inventoryStatus = 'unknown';
  Object.assign(b.records.find(record => record.id === 'MODEL-MOUTHSHAPE-RESEARCH-2').facts, {provenanceStatus: 'unknown', authorityStatus: 'unknown'});
  const errors = semanticErrors(b);
  assert.ok(errors.includes('Permission requires verified inventories and environment'));
  assert.ok(errors.includes('Permission requires verified model provenance MODEL-MOUTHSHAPE-RESEARCH-2'));
  assert.ok(errors.includes('Permission requires verified model authority MODEL-MOUTHSHAPE-RESEARCH-2'));
});

test('whole-scope permissions reject permissive any-member matching', () => {
  const r = {...rule, effect: 'permit', selectors: {processingRegions: {operator: 'any_of', values: ['AU']}}};
  assert.throws(() => matchRule(r, {processingRegions: ['AU', 'US']}, at), /whole-scope/);
  const modelRule = {...rule, effect: 'permit', selectors: {modelIds: {operator: 'any_of', values: ['MODEL-MOUTHSHAPE-RESEARCH-2']}}};
  schemaValid('policy-rule', modelRule);
  assert.throws(() => matchRule(modelRule, {modelIds: ['MODEL-MOUTHSHAPE-RESEARCH-2', 'MODEL-OTHER']}, at), /whole-scope/);
});

test('expired, withdrawn and review-due rules cannot establish current coverage', () => {
  const row = {sourceProductionIds: ['PRODUCTION-HARBOR-HEROES'], productionRelationships: ['different_production']};
  for (const change of [{status: 'withdrawn'}, {effectiveUntil: at}, {reviewAt: at}, {effectiveFrom: '2027-01-01T00:00:00Z'}]) {
    assert.equal(matchRule({...rule, ...change}, row, at).result, null);
  }
});

test('aggregation preserves prohibition and all lower-level findings', () => {
  const gates = [{result: 'missing_information'}, {result: 'approval_required'}, {result: 'prohibited'}];
  assert.equal(aggregateOutcome(gates), 'prohibited_under_current_rules');
  assert.equal(gates.length, 3);
  assert.equal(aggregateOutcome([{result: 'conditional'}]), 'permitted_with_conditions');
  assert.throws(() => aggregateOutcome([]), /Complete/);
});

const permittedDecision = () => ({id: 'DECISION-PREFLIGHT', version: '1.0', outcome: 'permitted_with_conditions', validity: {validFrom: '2026-09-01T00:00:00Z', validUntil: '2026-10-01T00:00:00Z'}, conditions: [{id: 'CONDITION-FEE', timing: 'before_processing'}, {id: 'CONDITION-DELETE', timing: 'at_expiry', dueAt: '2026-09-30T00:00:00Z'}]});
const preflight = () => ({at, decisionId: 'DECISION-PREFLIGHT', decisionVersion: '1.0', scopeMatches: true, evidenceCurrent: true, triggersClear: true, conditions: [{id: 'CONDITION-FEE', status: 'open'}, {id: 'CONDITION-DELETE', status: 'open'}]});

test('conditional permission requires evidenced prerequisites before execution', () => {
  const d = permittedDecision(); const check = preflight();
  assert.equal(executionReadiness(d, check), 'awaiting_prerequisites');
  check.conditions[0].status = 'satisfied';
  assert.equal(executionReadiness(d, check), 'suspended');
  Object.assign(check.conditions[0], {evidenceIds: ['PAYMENT-RECEIPT'], evidenceVerified: true});
  assert.equal(executionReadiness(d, check), 'ready');
  assert.equal(d.conditions[0].status, undefined);
});

test('changed scope, stale evidence, triggers and expiry suspend execution', () => {
  const d = permittedDecision(); const check = preflight();
  Object.assign(check.conditions[0], {status: 'satisfied', evidenceIds: ['PAYMENT-RECEIPT'], evidenceVerified: true});
  for (const change of [{scopeMatches: false}, {evidenceCurrent: false}, {triggersClear: false}, {decisionVersion: '2.0'}, {at: '2026-10-01T00:00:00Z'}]) assert.equal(executionReadiness(d, {...check, ...change}), 'suspended');
  check.at = '2026-09-30T00:00:00Z';
  assert.equal(executionReadiness(d, check), 'suspended');
});

const cases = await readJson('./fixtures/rule-cases.json');
const rules = new Map([...bundle.records.filter(r => r.recordType === 'policy_rule'), reusableRule].map(r => [r.id, r]));
for (const fixture of cases) {
  test(`rule case ${fixture.id}: ${fixture.description}`, () => {
    const r = rules.get(fixture.ruleId);
    assert.equal(r.version, fixture.ruleVersion);
    assert.equal(matchRule(r, fixture.row, fixture.at).result, fixture.expected);
  });
}
test('every active example rule has executable positive and boundary fixtures', () => {
  for (const r of rules.values()) {
    const linked = r.testCaseIds.map(id => cases.find(c => c.id === id));
    assert.ok(linked.every(Boolean), r.id);
    assert.ok(linked.some(c => c.expected === true), r.id);
    assert.ok(linked.some(c => c.expected === false), r.id);
  }
});

test('snapshot digests detect content drift under an unchanged record ID and version', () => {
  const b = copy(); b.records.find(r => r.id === 'AGREEMENT-HH-PRODUCTION').facts.interpretation = 'Changed interpretation';
  assert.ok(semanticErrors(b).includes('Snapshot integrity mismatch AGREEMENT-HH-PRODUCTION'));
});

test('frozen findings must cover every gate, including when record IDs are distinct', () => {
  const b = copy(); const ids = b.decision.evaluationMethod.findingRecordIds;
  b.records.find(r => r.id === ids[1]).facts.gateResult = structuredClone(b.records.find(r => r.id === ids[0]).facts.gateResult);
  assert.ok(semanticErrors(b).includes('Frozen findings do not cover every decision gate'));
});

test('a changed proposal manifest cannot inherit the frozen collection assessment', () => {
  const b = copy(); b.proposedUse.source.materials.pop();
  assert.ok(semanticErrors(b).includes('Proposed material set differs from collection manifest'));
});

test('waiving a prerequisite requires a verified exercise of the relevant authority', () => {
  const d = permittedDecision(); const check = preflight();
  Object.assign(check.conditions[0], {status: 'waived_by_authority', evidenceIds: ['WAIVER-RECORD'], evidenceVerified: true});
  assert.equal(executionReadiness(d, check), 'suspended');
  check.conditions[0].waiverAuthorised = true;
  assert.equal(executionReadiness(d, check), 'ready');
});
