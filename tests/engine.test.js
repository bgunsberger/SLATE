import test from 'node:test';
import assert from 'node:assert/strict';
import {assess} from '../dist/engine.js';
import {scenarios,findRecord} from '../dist/data.js';
const run=(i,change={})=>assess({...scenarios[i].facts,...change});
test('representative outcomes reflect recorded permissions',()=>{
 assert.deepEqual(scenarios.map(s=>assess(s.facts).status),['Review required','Approved','Conditional','Restricted','Conditional','Review required']);
});
test('missing or changed material never inherits a sample approval',()=>{
 for(const i of [1,2,4]) {assert.equal(run(i,{inventory:'unknown'}).status,'Review required');assert.equal(run(i,{tool:'unknown'}).status,'Review required');assert.equal(run(i,{destination:'public'}).status,'Review required');}
});
test('performer restrictions are operation-specific and dataset-specific',()=>{
 assert.equal(run(0).status,'Review required');
 assert.equal(run(0,{operation:'synthesise'}).status,'Restricted');
 assert.equal(run(0,{operation:'synthesise',dataset:'ava'}).status,'Review required');
 assert.equal(run(0,{dataset:'ava'}).evidence.includes('MATEO-08'),false);
});
test('restrictions dominate missing information and conditional permission',()=>{
 assert.equal(run(3,{tool:'unknown'}).status,'Restricted');
 assert.equal(run(4,{location:'Los Angeles'}).status,'Restricted');
 assert.equal(run(1,{tool:'public'}).status,'Restricted');
});
test('a co-production and unmatched combinations require human review',()=>{
 assert.equal(run(5).status,'Review required');
 assert.equal(run(1,{material:'rigs',operation:'search'}).status,'Review required');
});
test('all decision evidence resolves and every outcome has an accountable owner',()=>{
 for(const s of scenarios){const r=assess(s.facts);assert.ok(r.owner);assert.ok(r.reasons.length);for(const id of r.evidence)assert.ok(findRecord(id),id);}
});
