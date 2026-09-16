import {readFile, readdir} from 'node:fs/promises';
import {createValidators, semanticErrors, replayManualDecision} from '../reference/validation.js';
const validators = await createValidators();
const directory = new URL('../examples/', import.meta.url);
let count = 0;
for (const file of (await readdir(directory)).filter(name => name.endsWith('.json')).sort()) {
  const document = JSON.parse(await readFile(new URL(file, directory), 'utf8'));
  const kind = file.endsWith('.bundle.json') ? 'assessment-bundle' : file.endsWith('.proposed-use.json') ? 'proposed-use' : file.endsWith('.decision.json') ? 'decision' : file.startsWith('rule-') ? 'policy-rule' : null;
  if (!kind) throw new Error(`Unclassified example ${file}`);
  const validate = validators[kind];
  if (!validate(document)) throw new Error(`${file}: ${JSON.stringify(validate.errors, null, 2)}`);
  if (kind === 'assessment-bundle') {
    const errors = semanticErrors(document);
    if (errors.length) throw new Error(`${file}: ${errors.join('\n')}`);
    const replay = replayManualDecision(document);
    console.log(`${file}: frozen manual findings replay to ${replay.outcome}`);
  }
  count++;
}
console.log(`${count} examples pass structural validation; assessment bundles also pass semantic validation and manual replay.`);
