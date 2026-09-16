# Migrating SlateCheck 0.1 to 0.2

Version 0.2 introduces incompatible schema and semantic changes. Preserve historic 0.1 decisions and schemas with their original version identifiers. Reassessment produces new 0.2 records and successor links where the old decision was operationally issued.

## Purpose

Replace the single `purpose.relationship` with:

- `productionRelationships`: derived from all source and destination production IDs;
- `businessPurposes`: production work, research/evaluation, internal operations/communications or explicit unknown;
- `reuseIntent`: task-only, production-only, reusable studio capability or unknown;
- `distribution`: internal, client delivery, external distribution, public release or unknown.

A legacy value alone cannot establish the missing dimensions. Confirm them with the requester. Research can coexist with different-production use and public release. The migrated example explicitly records research and production work on a different show with internal distribution.

## Rules

Replace selector arrays with `{ "operator": "...", "values": [...] }`. Review each predicate's intended set semantics; automatic conversion to `any_of` is unsafe for permissions. Whole-proposal selectors in permit rules require `all_in` or `equals_set`. Empty selector values are invalid; omitted predicates are unrestricted within the rule's verified authority.

The old client-approval rule used alternatives in a single purpose field. Version 0.2 publishes separate atomic rules for cross-production use and reusable capability. Matching both produces one obligation per distinct required act where the verified authority and scope are identical; preserve both rule references.

Add `gates`, registry-envelope metadata, current interpretation confidence and positive/boundary test references. Requirements include timing and evidence requirements. Approval effects identify an approver and an approval requirement; information effects identify an information requirement. Numeric retention constraints belong in `constraints`, with the associated operational duty recorded separately.

## Decisions and evidence

Record every core gate exactly once, plus uniquely named extension gates. Add gate-specific basis evidence, responsible roles, evaluation time and policy-profile version. Preserve every relied-on evidence and rule version in a complete snapshot. For manual/hybrid bundle replay, retain the verified gate findings as controlled evidence records and list their IDs in the evaluation method.

Collection-only intake is supported when a versioned collection and manifest are referenced. Before permission, the collection must be expanded and verified. Registry records follow the common envelope; proposed uses and decisions follow their specialised transaction schemas.

## Execution and lineage

Keep execution state separate from decision outcome. Record preflight, suspension and completion events. Retain a per-obligation applicability finding for relevant derivative types. Existing derivatives with uncertain inherited duties require review of the affected use.

## Verification

Run `npm run validate:spec`, `npm test` and `npm run check`. Then perform domain review and pilot validation. The repository tests check formats and selected semantics; organisational conformance requires the controls in [CONFORMANCE.md](CONFORMANCE.md).
