/** Reference primitives for SlateCheck 0.2. These do not interpret contracts or grant rights. */
export const CORE_GATES = ['inventory', 'source_authority', 'contributor_rights', 'privacy_and_people_impact', 'operation', 'purpose_and_destination', 'environment', 'obligations'];
const OUTCOMES = [
  ['prohibited', 'prohibited_under_current_rules'],
  ['approval_required', 'hold_approval_required'],
  ['missing_information', 'hold_information_required'],
  ['conditional', 'permitted_with_conditions']
];
const UNKNOWN = value => value === undefined || value === null || value === 'unknown';

export function aggregateOutcome(gates) {
  if (!Array.isArray(gates) || !gates.length || gates.some(g => !['satisfied', 'conditional', 'missing_information', 'approval_required', 'prohibited', 'not_applicable'].includes(g.result))) {
    throw new Error('Complete, recognised gate findings are required');
  }
  return OUTCOMES.find(([status]) => gates.some(g => g.result === status))?.[1] ?? 'permitted';
}

/** Three-valued matching: true, false, or null (unknown). Empty actual sets never establish permission. */
export function matchSet(actual, {operator, values}) {
  if (!['any_of', 'all_in', 'contains_all', 'equals_set'].includes(operator) || !Array.isArray(values) || !values.length || values.some(UNKNOWN)) throw new Error('Invalid set predicate');
  if (UNKNOWN(actual)) return null;
  if (!Array.isArray(actual)) throw new Error('Selector facts must be sets');
  if (!actual.length) return false;
  const known = actual.filter(v => !UNKNOWN(v));
  const uncertain = known.length !== actual.length;
  const allowed = new Set(values);
  const present = new Set(known);
  if (operator === 'any_of') return known.some(v => allowed.has(v)) ? true : uncertain ? null : false;
  if (operator === 'contains_all') return values.every(v => present.has(v)) ? true : uncertain ? null : false;
  if (known.some(v => !allowed.has(v))) return false;
  if (uncertain) return null;
  return operator === 'all_in' || values.every(v => present.has(v));
}

export function deriveProductionRelationships(sourceIds, destinationIds) {
  if (!Array.isArray(sourceIds) || !Array.isArray(destinationIds) || [...sourceIds, ...destinationIds].some(UNKNOWN)) return ['unknown'];
  if (!sourceIds.length || !destinationIds.length) return ['no_production'];
  return [...new Set(sourceIds.flatMap(source => destinationIds.map(destination => source === destination ? 'same_production' : 'different_production')))].sort();
}

const conjunction = values => values.includes(false) ? false : values.includes(null) ? null : true;
const get = (object, path) => path.split('.').reduce((value, key) => value?.[key], object);
export function matchRetention(actual, limit) {
  if (!Number.isInteger(limit) || limit < 0) throw new Error('Invalid retention limit');
  if (Array.isArray(actual)) return conjunction(actual.map(value => matchRetention(value, limit)));
  if (actual === 'indefinite') return false;
  if (actual === 'session_only') return true;
  if (Number.isInteger(actual) && actual >= 0) return actual <= limit;
  return null;
}

export function isCurrent(record, at) {
  const time = Date.parse(at);
  return Number.isFinite(time) && record.status === 'active' &&
    Date.parse(record.effectiveFrom) <= time && Date.parse(record.verifiedAt) <= time &&
    (!record.effectiveUntil || time < Date.parse(record.effectiveUntil)) &&
    (!record.reviewAt || time < Date.parse(record.reviewAt));
}

/** Each row binds source selectors to ONE material/person relationship. Global facts are copied into each row. */
export function buildSourceRows(materials, globalFacts) {
  const localKeys = ['materialIds', 'sourceProductionIds', 'personIds', 'agreementIds', 'collectiveInstrumentIds', 'materialCategories', 'classificationValues', 'contributorRoles'];
  if (localKeys.some(key => key in globalFacts)) throw new Error('Source facts must come from a bound material row');
  return materials.flatMap(material => {
    const people = material.people === null || material.people === undefined ? [null] : material.people.length ? material.people : [{id: null, absent: true}];
    return people.map(person => ({
      ...globalFacts,
      materialIds: [material.id], sourceProductionIds: material.productionId ? [material.productionId] : material.productionId === null ? [] : undefined,
      materialCategories: material.categories, classificationValues: material.classifications,
      personIds: person?.absent ? [] : person ? [person.id] : undefined,
      agreementIds: material.agreementIds && (person?.absent || person?.agreementIds) ? [...new Set([...material.agreementIds, ...(person?.agreementIds ?? [])])] : undefined,
      collectiveInstrumentIds: person?.collectiveInstrumentIds,
      contributorRoles: person?.roles
    }));
  });
}

export const WHOLE_SCOPE_SELECTORS = ['operationTypes', 'persistenceTypes', 'destinationProductionIds', 'productionRelationships', 'businessPurposes', 'reuseIntents', 'distribution', 'audiences', 'toolEnvironmentIds', 'deploymentTypes', 'providerTrainingValues', 'processingRegions', 'accessGroupIds', 'jurisdictions'];
export function matchRule(rule, row, at) {
  if (!isCurrent(rule, at)) return {result: null, reason: 'inactive_or_stale_rule'};
  if (rule.effect === 'permit' && Object.entries(rule.selectors).some(([key, predicate]) => WHOLE_SCOPE_SELECTORS.includes(key) && !['all_in', 'equals_set'].includes(predicate.operator))) {
    throw new Error('Permit rules must cover whole-scope selector sets');
  }
  return {result: conjunction([
    ...Object.entries(rule.selectors).map(([key, predicate]) => matchSet(row[key], predicate)),
    ...(rule.constraints ?? []).map(constraint => matchRetention(get(row, constraint.field), constraint.days))
  ])};
}

/** A preflight result is separate from the immutable rights decision. Inputs must be freshly attested by an operator. */
export function executionReadiness(decision, check) {
  const now = Date.parse(check.at);
  if (!Number.isFinite(now) || !['permitted', 'permitted_with_conditions'].includes(decision.outcome)) return 'suspended';
  if (check.decisionId !== decision.id || check.decisionVersion !== decision.version || check.scopeMatches !== true || check.evidenceCurrent !== true || check.triggersClear !== true) return 'suspended';
  if (now < Date.parse(decision.validity.validFrom) || (decision.validity.validUntil && now >= Date.parse(decision.validity.validUntil)) || (decision.validity.reviewAt && now >= Date.parse(decision.validity.reviewAt))) return 'suspended';
  if (!Array.isArray(check.conditions) || check.conditions.length !== decision.conditions.length || new Set(check.conditions.map(c => c.id)).size !== check.conditions.length) return 'suspended';
  for (const original of decision.conditions) {
    const condition = check.conditions.find(c => c.id === original.id);
    if (!condition || !['open', 'satisfied', 'waived_by_authority', 'failed', 'expired'].includes(condition.status)) return 'suspended';
    if (['failed', 'expired'].includes(condition.status)) return 'suspended';
    if (['satisfied', 'waived_by_authority'].includes(condition.status) && (!condition.evidenceIds?.length || condition.evidenceVerified !== true)) return 'suspended';
    if (condition.status === 'waived_by_authority' && condition.waiverAuthorised !== true) return 'suspended';
    if (condition.status === 'open' && original.dueAt && now >= Date.parse(original.dueAt)) return 'suspended';
  }
  if (decision.conditions.some(c => c.timing === 'before_processing' && check.conditions.find(current => current.id === c.id).status === 'open')) return 'awaiting_prerequisites';
  return 'ready';
}
