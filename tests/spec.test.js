import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const readJson = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));

test('all schemas and examples contain valid JSON', async () => {
  for (const directory of ['../schemas/', '../examples/']) {
    const url = new URL(directory, import.meta.url);
    const files = (await readdir(url)).filter(file => file.endsWith('.json'));
    assert.ok(files.length > 0, `${directory} must contain JSON documents`);
    for (const file of files) {
      const value = JSON.parse(await readFile(new URL(file, url), 'utf8'));
      assert.equal(typeof value, 'object', `${file} must contain a JSON object`);
    }
  }
});

test('schemas use JSON Schema 2020-12 and stable SCOPE identifiers', async () => {
  const files = [
    '../schemas/scope-proposed-use.schema.json',
    '../schemas/scope-policy-rule.schema.json',
    '../schemas/scope-decision.schema.json'
  ];
  for (const file of files) {
    const schema = await readJson(file);
    assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
    assert.match(schema.$id, /^urn:scope:schema:/);
    assert.equal(schema.type, 'object');
  }
});

test('examples validate against their normative schemas', async () => {
  const ajv = new Ajv2020({allErrors: true, strict: true});
  addFormats(ajv);
  const pairs = [
    ['../schemas/scope-proposed-use.schema.json', '../examples/cross-show-lipsync.proposed-use.json'],
    ['../schemas/scope-policy-rule.schema.json', '../examples/rule-client-cross-production-approval.json'],
    ['../schemas/scope-decision.schema.json', '../examples/cross-show-lipsync.decision.json']
  ];

  for (const [schemaFile, exampleFile] of pairs) {
    const validate = ajv.compile(await readJson(schemaFile));
    const valid = validate(await readJson(exampleFile));
    assert.equal(valid, true, `${exampleFile}: ${ajv.errorsText(validate.errors)}`);
  }
});

test('worked decision references the exact proposed-use version and all core gates', async () => {
  const proposedUse = await readJson('../examples/cross-show-lipsync.proposed-use.json');
  const decision = await readJson('../examples/cross-show-lipsync.decision.json');
  assert.equal(decision.proposedUseId, proposedUse.id);
  assert.equal(decision.proposedUseVersion, proposedUse.version);
  assert.equal(decision.outcome, 'hold_approval_required');

  const gates = new Set(decision.gateResults.map(result => result.gate));
  for (const gate of [
    'inventory',
    'source_authority',
    'contributor_rights',
    'privacy_and_people_impact',
    'operation',
    'purpose_and_destination',
    'environment',
    'obligations'
  ]) assert.ok(gates.has(gate), `missing gate: ${gate}`);
});

test('cross-production rule is atomic, evidenced and testable', async () => {
  const rule = await readJson('../examples/rule-client-cross-production-approval.json');
  assert.equal(rule.effect, 'require_approval');
  assert.ok(rule.authority.recordIds.length > 0);
  assert.ok(rule.requirements.length > 0);
  assert.ok(rule.testCaseIds.length >= 2);
});
