import {readFile, readdir} from 'node:fs/promises';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import {createHash} from 'node:crypto';
import {aggregateOutcome, CORE_GATES, deriveProductionRelationships, isCurrent, WHOLE_SCOPE_SELECTORS} from './semantics.js';

export async function createValidators() {
  const ajv = new Ajv2020({allErrors: true, strict: true});
  addFormats(ajv);
  const directory = new URL('../schemas/', import.meta.url);
  for (const file of (await readdir(directory)).filter(name => name.endsWith('.json'))) {
    ajv.addSchema(JSON.parse(await readFile(new URL(file, directory), 'utf8')));
  }
  return Object.fromEntries(['proposed-use', 'policy-rule', 'decision', 'evidence-record', 'assessment-bundle'].map(type => [type, ajv.getSchema(`urn:scope:schema:${type}:0.2.0`)]));
}

const canonical = value => JSON.stringify(value, function (key, item) {
  return item && typeof item === 'object' && !Array.isArray(item) ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)) : item;
});
const sameSet = (a, b) => canonical([...new Set(a)].sort()) === canonical([...new Set(b)].sort());
export const recordDigest = record => `sha256:${createHash('sha256').update(canonical(record), 'utf8').digest('hex')}`;

/** Structural validation must run first. This checks record closure and decision consistency, not legal correctness. */
export function semanticErrors(bundle) {
  const errors = [];
  const {proposedUse: use, decision, records} = bundle;
  const byId = new Map();
  for (const record of records) {
    if (byId.has(record.id)) errors.push(`Duplicate record ${record.id}`);
    byId.set(record.id, record);
    if (Date.parse(record.verifiedAt) > Date.parse(decision.evaluatedAt)) errors.push(`Future verification ${record.id}`);
    if (record.effectiveUntil && Date.parse(record.effectiveUntil) <= Date.parse(record.effectiveFrom)) errors.push(`Invalid effective interval ${record.id}`);
    if (record.recordType === 'policy_rule' && record.effect === 'permit') {
      for (const [key, predicate] of Object.entries(record.selectors)) {
        if (WHOLE_SCOPE_SELECTORS.includes(key) && !['all_in', 'equals_set'].includes(predicate.operator)) errors.push(`Partial-scope permission selector ${record.id}.${key}`);
      }
    }
  }
  const snapshot = new Map();
  for (const item of decision.evidenceSnapshot) {
    if (snapshot.has(item.recordId)) errors.push(`Duplicate snapshot ${item.recordId}`);
    snapshot.set(item.recordId, item);
    const record = byId.get(item.recordId);
    if (!record || ['version', 'status', 'verifiedAt'].some(key => record[key] !== item[key])) errors.push(`Snapshot mismatch ${item.recordId}`);
    if (record && item.integrityValue !== recordDigest(record)) errors.push(`Snapshot integrity mismatch ${item.recordId}`);
  }
  const requireRecord = (id, version) => {
    const record = byId.get(id);
    if (!record || !snapshot.has(id) || (version !== undefined && record.version !== version)) errors.push(`Missing frozen record/version ${id}`);
    return record;
  };
  for (const record of records) {
    requireRecord(record.id, record.version);
    for (const link of record.dependsOn ?? []) requireRecord(link.recordId, link.version);
    for (const id of record.authority?.recordIds ?? []) requireRecord(id);
    for (const id of [...(record.supersedesRuleIds ?? []), ...(record.exceptionToRuleIds ?? [])]) requireRecord(id);
  }
  if (decision.proposedUseId !== use.id || decision.proposedUseVersion !== use.version) errors.push('Proposed-use version mismatch');
  if (Date.parse(decision.evaluatedAt) > Date.parse(decision.decidedAt)) errors.push('Decision predates evaluation');
  if (decision.validity.validUntil && Date.parse(decision.validity.validUntil) <= Date.parse(decision.validity.validFrom)) errors.push('Invalid decision validity interval');
  const profile = requireRecord(decision.evaluationMethod.profileId, decision.evaluationMethod.profileVersion);
  if (profile && (profile.recordType !== 'policy_profile' || !isCurrent(profile, decision.evaluatedAt))) errors.push('Invalid evaluation profile');
  if (aggregateOutcome(decision.gateResults) !== decision.outcome) errors.push('Outcome contradicts gate results');
  const gateNames = decision.gateResults.map(g => g.gate === 'organisation_defined' ? `organisation:${g.organisationGateName}` : g.gate);
  if (new Set(gateNames).size !== gateNames.length || CORE_GATES.some(g => !gateNames.includes(g))) errors.push('Missing or duplicate gate');
  const validBasis = {
    inventory: ['inventory_verification'], source_authority: ['rights_authority'], contributor_rights: ['rights_authority'],
    privacy_and_people_impact: ['privacy_basis'], operation: ['rights_authority', 'technical_verification'],
    purpose_and_destination: ['rights_authority'], environment: ['technical_verification'], obligations: ['operational_control']
  };
  for (const gate of decision.gateResults) {
    for (const id of [...gate.evidenceIds, ...gate.ruleIds]) requireRecord(id);
    for (const id of gate.ruleIds) if (!decision.applicableRuleIds.includes(id)) errors.push(`Unlisted applicable rule ${id}`);
    for (const basis of gate.basis) {
      if (gate.result === 'not_applicable' ? basis.kind !== 'non_applicability' : basis.kind === 'non_applicability' || (validBasis[gate.gate] && !validBasis[gate.gate].includes(basis.kind))) errors.push(`Wrong basis kind ${gate.gate}`);
      for (const id of basis.evidenceIds) {
        const record = requireRecord(id);
        if (record && !isCurrent(record, decision.evaluatedAt)) errors.push(`Stale positive basis ${id}`);
      }
      for (const id of basis.scopeReferences) if (id !== use.id) requireRecord(id);
    }
  }
  for (const id of decision.applicableRuleIds) {
    const rule = requireRecord(id);
    if (rule && (rule.recordType !== 'policy_rule' || !isCurrent(rule, decision.evaluatedAt))) errors.push(`Invalid applicable rule ${id}`);
  }
  if (!sameSet(decision.applicableRuleIds, decision.gateResults.flatMap(gate => gate.ruleIds))) errors.push('Applicable rule set differs from gate findings');
  for (const approval of decision.approvals) if (approval.evidenceId) requireRecord(approval.evidenceId);
  for (const condition of decision.conditions) {
    for (const id of [...(condition.completionEvidenceIds ?? []), ...(condition.waiverEvidenceIds ?? [])]) requireRecord(id);
    if (condition.status === 'satisfied' && !condition.completionEvidenceIds?.length) errors.push(`Unevidenced condition ${condition.id}`);
    if (condition.status === 'waived_by_authority' && !condition.waiverEvidenceIds?.length) errors.push(`Unevidenced waiver ${condition.id}`);
  }
  if (decision.gateResults.some(g => g.result === 'conditional') && !decision.conditions.length) errors.push('Conditional gate has no conditions');
  if (decision.gateResults.some(g => ['approval_required', 'missing_information', 'prohibited'].includes(g.result)) && !decision.blockers.length) errors.push('Unresolved gates have no blockers');
  if (decision.gateResults.some(g => g.result === 'approval_required') && !decision.requiredApproverIds.length) errors.push('Approval gate has no approver');
  for (const material of use.source.materials ?? []) requireRecord(material.materialId, material.version);
  if (use.source.collectionId) {
    const collection = requireRecord(use.source.collectionId, use.source.collectionVersion);
    if (collection?.facts.manifest) {
      for (const material of collection.facts.manifest) requireRecord(material.materialId, material.version);
      if (use.source.materials && !sameSet(use.source.materials.map(m => `${m.materialId}@${m.version}`), collection.facts.manifest.map(m => `${m.materialId}@${m.version}`))) errors.push('Proposed material set differs from collection manifest');
    } else if (use.source.inventoryStatus === 'verified') errors.push('Verified collection has no frozen manifest');
  }
  for (const id of [
    ...(use.source.sourceProductionIds ?? []), ...use.contractsAndContributors.representedPersonIds,
    ...(use.contractsAndContributors.representedCohortIds ?? []), ...use.contractsAndContributors.agreementIds,
    ...(use.contractsAndContributors.individualAgreementIds ?? []), ...(use.contractsAndContributors.collectiveInstrumentIds ?? []),
    ...(use.contractsAndContributors.consentRecordIds ?? []), ...(use.contractsAndContributors.privacyBasisIds ?? []),
    ...(use.purpose.destinationProductionIds ?? []), ...(use.purpose.beneficiaryOrganisationIds ?? []),
    ...(use.environment.subprocessorIds ?? []), ...(use.environment.connectedServiceIds ?? [])
  ]) requireRecord(id);
  for (const key of ['toolEnvironmentId', 'securityApprovalId']) if (use.environment[key]) requireRecord(use.environment[key]);
  const expectedRelationships = deriveProductionRelationships(use.source.sourceProductionIds, use.purpose.destinationProductionIds);
  if (!sameSet(use.purpose.productionRelationships, expectedRelationships)) errors.push('Production relationships contradict source/destination IDs');
  if (['permitted', 'permitted_with_conditions'].includes(decision.outcome)) {
    if (use.source.inventoryStatus !== 'verified' || use.contractsAndContributors.contributorInventoryStatus !== 'verified' || use.environment.status !== 'verified') errors.push('Permission requires verified inventories and environment');
    if (expectedRelationships.includes('unknown')) errors.push('Permission requires known production relationships');
    if (decision.conditions.some(c => ['failed', 'expired'].includes(c.status))) errors.push('Permission has failed conditions');
    if (decision.outcome === 'permitted' && decision.conditions.some(c => c.status === 'open')) errors.push('Unconditional permission has open conditions');
    for (const id of decision.requiredApproverIds) if (!decision.approvals.some(a => a.approverId === id && a.status === 'approved')) errors.push(`Missing approval ${id}`);
  }
  const findingIds = decision.evaluationMethod.findingRecordIds ?? [];
  if (['manual', 'hybrid'].includes(decision.evaluationMethod.type)) {
    if (findingIds.length !== decision.gateResults.length) errors.push('Incomplete frozen gate findings');
    for (const id of findingIds) {
      const record = requireRecord(id);
      if (!record || record.recordType !== 'gate_finding' || !isCurrent(record, decision.evaluatedAt)) { errors.push(`Invalid gate finding ${id}`); continue; }
      if (!decision.gateResults.some(gate => canonical(gate) === canonical(record.facts.gateResult))) errors.push(`Gate finding differs from decision ${id}`);
    }
    const findings = findingIds.map(id => byId.get(id)?.facts?.gateResult).filter(Boolean);
    if (!sameSet(findings.map(canonical), decision.gateResults.map(canonical))) errors.push('Frozen findings do not cover every decision gate');
  }
  return [...new Set(errors)];
}

/** Replay the decision core from frozen, human-verified findings; legal interpretation remains an input. */
export function replayManualDecision(bundle) {
  const errors = semanticErrors(bundle);
  if (errors.length) throw new Error(errors.join('\n'));
  const findings = bundle.decision.evaluationMethod.findingRecordIds;
  if (!findings?.length) throw new Error('Manual replay requires frozen gate findings');
  const byId = new Map(bundle.records.map(record => [record.id, record]));
  const gateResults = findings.map(id => structuredClone(byId.get(id).facts.gateResult));
  return {outcome: aggregateOutcome(gateResults), gateResults, applicableRuleIds: [...new Set(gateResults.flatMap(g => g.ruleIds))].sort()};
}
