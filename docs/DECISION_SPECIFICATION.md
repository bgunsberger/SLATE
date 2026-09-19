# SlateCheck Decision Specification

Version 0.2.0

## 1. Objective

The decision process converts a confirmed Proposed Use and current controlled records into an explainable outcome. It is deterministic for identical inputs, evidence versions and rules. Human authority remains responsible for new interpretations, approvals, exceptions and conflicts.

The process answers two separate questions:

1. **Does a standing, verified basis cover this exact proposal?**
2. **If it does not, what information or authority is required next?**

## 2. Inputs

An assessment requires:

- one valid Proposed Use document;
- current source-material, model-artifact, production, contributor, agreement and environment records;
- active policy rules for the relevant organisation and jurisdictions;
- the identity and authority of the requester;
- an evaluation time;
- an evaluator version.

The evaluator MUST preserve the input and evidence versions used. A live link to a changeable record is insufficient for audit.

## 3. Assessment gates

Each proposal is evaluated through eight gates. Every gate produces `satisfied`, `conditional`, `missing_information`, `approval_required`, `prohibited` or `not_applicable`.

| Gate | Question |
|---|---|
| Inventory | Do we know the exact source material, every represented contributor and every model artifact? |
| Source authority | Is there a positive basis to use every material and model source in this way? |
| Contributor rights | Are individual, employment and collective requirements satisfied for every person? |
| Privacy and people impact | Is the personal-data processing justified, proportionate, transparent and appropriately controlled? |
| Operation | Does authority cover what the system learns, produces and retains? |
| Purpose and destination | Does authority cover the beneficiary, production, audience and reuse boundary? |
| Environment | Is the exact processing environment approved for this material and activity? |
| Obligations | Can all required notices, payments, consultations, reviews, deletion and access controls be completed and evidenced? |

Organisations MAY add gates for export control, Indigenous data governance, child safety, regulated content, national security or other domain needs. Added gates use the same status vocabulary.

## 4. Resolution procedure

### Step 1 — Validate and normalise

Validate the request against the Proposed Use schema. Resolve controlled IDs, normalise vocabulary values and preserve explicit unknowns. Reject malformed records as a system error rather than a rights outcome.

### Step 2 — Expand the source set

Expand every material collection to its manifest and every model inventory to its exact artifact references. Traverse upstream lineage required to identify governing sources, agreements, model licences or terms, and represented people. Record the version of every traversed edge. A provider-hosted model remains an upstream source even when only a controlled service identifier and provider provenance are available.

### Step 3 — Build the authority set

Collect all potentially applicable:

- production and client agreements;
- ownership, licence and supplier records;
- model, weights, checkpoint, adapter, code and dependency licences;
- provider terms, acceptable-use restrictions and model-ownership determinations;
- individual engagements, consents and riders;
- guild, union, award and collective instruments;
- privacy notices and processing bases;
- internal policies and exceptions;
- environment approvals and vendor terms;
- prior standing decisions.

Expired, superseded or withdrawn records remain in the audit trail and do not provide a current positive basis.

### Step 4 — Match rules

Rules use the set predicates and relationship binding in §12. All populated predicates and retention constraints are combined with AND. Omitted selectors are unrestricted within the rule's verified authority; an empty `values` list is invalid. Free text explains a rule and cannot satisfy a selector. A matched rule is a candidate for the gates named in its `gates` field. Its effect applies only within its authority and matched scope.

Rule matching MUST consider:

- the whole material set;
- the whole model-artifact set and each model's declared use roles;
- each represented person individually;
- every relevant jurisdiction;
- both source and destination production;
- durable artefacts created by the operation;
- actual environment settings.

### Step 5 — Evaluate each gate

For each gate:

1. establish the gate-specific basis and the complete set of applicable authorities described in §13;
2. apply prohibitions and mandatory requirements from all applicable authorities;
3. determine whether evidence is current and internally consistent;
4. identify conditions that can be completed operationally;
5. identify decisions reserved for a named authority.

A positive basis must cover the full scope. Partial coverage creates a hold unless the proposal can be partitioned into separately assessed collections.

### Step 6 — Aggregate the outcome

The primary outcome follows the highest-severity gate result:

1. `prohibited_under_current_rules`
2. `hold_approval_required`
3. `hold_information_required`
4. `permitted_with_conditions`
5. `permitted`

All discovered blockers and missing facts remain visible even when a higher-severity result determines the headline.

### Step 7 — Create the decision snapshot

Write an immutable decision containing the confirmed proposal, gate results, explanation, applicable rule IDs, evidence versions, conditions, owner, validity and reevaluation triggers.

When presenting an [assessment checklist](ASSESSMENT_CHECKLIST.md), derive its evidence-backed items from this snapshot and include every unresolved gate finding. Satisfied and non-applicable findings remain in the decision. Preliminary questions may precede Step 1; verified answers feed a new assessment and successor decision.

### Step 8 — Register downstream artefacts

When processing proceeds, create material and lineage records for durable outputs. Attach the decision ID and inherited controls. Conditions remain open until completion evidence is recorded.

## 5. Evaluation contract

Implementations follow §4 in order and preserve the evaluation time, expanded scope, evidence versions, matched rules and gate findings needed to reproduce the result.

Each gate evaluation MUST require the gate-specific basis when the gate is applicable and an evidenced non-applicability finding otherwise. Silence resolves to `approval_required` when the relevant facts are known and an authority must interpret or grant rights. Missing, stale or contradictory facts resolve to `missing_information`.

## 6. Rules and conflict handling

### 6.1 Rule effects

SlateCheck supports five effects:

- `permit` — supplies a positive basis for a bounded use;
- `prohibit` — expressly disallows a bounded use;
- `require_condition` — attaches an operational duty;
- `require_information` — identifies evidence required before resolution;
- `require_approval` — reserves the decision for an identified authority.

### 6.2 Cumulative application

Rules from independent authorities apply cumulatively. For example, a client permission, performer consent, collective requirement, privacy basis and environment approval may all be required.

### 6.3 Specificity

Specific rules can refine general organisational rules when the specific rule has authority to do so. A valid, signed project exception can narrow a general internal policy for one named dataset and environment. It cannot override an independent client's rights or a contributor's agreement unless its authority expressly includes them.

### 6.4 Conflicts

The evaluator MUST NOT invent legal precedence. It may apply precedence explicitly recorded in an authorised policy, supersession record or agreement interpretation. An unresolved conflict between applicable records produces `hold_approval_required` and identifies the decision owner.

An express prohibition determines `prohibited_under_current_rules` when the evidence is current and no authorised exception or superseding rule applies.

### 6.5 Overrides and exceptions

An override is a new controlled record, not an edit to historical evidence. It MUST identify:

- the rule or decision being overridden;
- the authority and evidence supporting the override;
- exact scope;
- conditions;
- effective and expiry dates;
- approver and rationale.

## 7. Contributor-set evaluation

Each represented person is evaluated separately against individual and collective records. The collection gate aggregates those results:

```text
if any person is prohibited: prohibited
else if any person requires approval: hold for approval
else if any person's evidence is missing: hold for information
else if any person has conditions: permitted with combined conditions
else: satisfied
```

Group assumptions such as “all employees signed the same contract” require a verified cohort record and an exception check. Named individual riders always remain discoverable.

## 8. Derived artefacts

The requested operation must declare each expected durable artefact. The evaluator treats those artefacts as prospective derivatives and tests whether the positive basis covers:

- creation;
- retention duration;
- access;
- use on the destination production;
- further training or adaptation;
- distribution;
- deletion or withdrawal response.

“Training” is incomplete without naming whether the result is a base model, fine-tune, LoRA, embedding index, classifier, evaluation set or another retained capability. The assessment also names every upstream model artifact and verifies that its authority covers the declared operation, retained derivative and distribution boundary.

## 9. Decision validity

A decision remains valid only while its facts, evidence and conditions remain valid. Reassessment triggers include:

- source collection or contributor-set changes;
- agreement amendment, expiry, withdrawal or dispute;
- destination or audience change;
- operation, output or retention change;
- tool, model artifact, upstream lineage, model licence, account, provider term, region or access change;
- new legal or collective requirements;
- missed condition;
- security or privacy incident;
- scheduled review date.

Affected decisions SHOULD be discovered automatically through reverse links. Reassessment creates a new decision and preserves the old record.

## 10. Explanation requirements

The answer shown to a requester MUST:

- lead with the outcome in plain language;
- describe the exact bounded use;
- distinguish known restrictions from missing information;
- name the next responsible function or authority;
- state each condition as a testable action;
- show validity and change triggers;
- provide traceable evidence references appropriate to the requester's access.

It MUST NOT expose confidential contract text or personal information to unauthorised users. A redacted explanation can refer to a verified rule ID and owner.

## 11. Required evaluator tests

A conforming implementation MUST document positive and boundary cases. A Level 3 evaluator MUST automate tests for:

1. same-show summarisation with a standing approval;
2. cross-show reuse where client permission is absent;
3. a mixed contributor set with one restrictive rider;
4. an expired consent;
5. provider training enabled in an otherwise approved tool;
6. a changed processing region;
7. a missing material manifest;
8. conflicting contract interpretations;
9. a valid specific exception;
10. a derivative whose source permission is withdrawn;
11. automated employment ranking prohibited by policy;
12. a rule update that invalidates a previously permitted decision;
13. an unknown or unlicensed model artifact in an otherwise approved proposal; and
14. equivalent model-authority checks for a provider-hosted service and an on-premises checkpoint.

Tests MUST assert the outcome, gate results, evidence set, conditions and responsible owner.

## 12. Selector and normalisation semantics

A selector is `{ "operator": "all_in", "values": ["AU"] }`, with a non-empty, unique controlled value set. Actual facts are sets. The operators mean:

| Operator | True when |
|---|---|
| `any_of` | At least one known actual value is in the selector set. |
| `all_in` | Every actual value is known and belongs to the selector set. |
| `contains_all` | Every selector value occurs among the known actual values. |
| `equals_set` | Both known sets have exactly the same members. |

A confirmed empty actual set matches none of these operators. Missing facts, null and `unknown` are unknown. With partial knowledge, a known intersection establishes `any_of`; all required known members establish `contains_all`; a known disallowed member disproves `all_in` and `equals_set`. Other unresolved comparisons remain unknown. In an AND expression, false dominates unknown, and unknown dominates true. Unknown never supplies a positive basis. An unknown potentially applicable requirement is retained as an information blocker.

Whole-proposal selectors on a `permit` rule MUST use `all_in` or `equals_set`: operations, persistence, destination productions, production relationships, business purposes, reuse intent, distribution, audiences, environment IDs, model-artifact IDs, deployments, provider training, processing regions, access groups and jurisdictions. This prevents an Australia-only permission from covering an Australia-and-US environment or an approval for one model from silently covering another. `any_of` can detect a prohibited member or trigger an approval requirement. An omitted whole-proposal selector is unrestricted only within the verified source authority; rule authors must substantiate that breadth.

Source selectors bind to a single material/person relationship. Each expanded row contains one material, its production, one relevant person (or an explicitly verified absence), and agreements linked to that material/person. A rule requiring Show A and Person B matches only where both belong to that row. Values from unrelated assets MUST NOT be joined to manufacture a match. Contributor-specific agreement, role and collective selectors use that person's linked records. Jurisdictions are the full applicable set for the proposal and are not inferred from a person's location alone.

A collection-wide prohibition is established by any verified matching row. Positive coverage is evaluated for every required material/person/authority combination; one permitted row cannot clear the collection. Verified cohort records can supply individual coverage only with a current membership manifest and exception check.

`constraints` contains typed `lte_days` predicates for source, output, log, backup and derivative retention. Numeric durations are non-negative days; `session_only` is zero for comparison, `indefinite` exceeds every finite limit, and `unknown` or unevidenced `not_applicable` is unresolved. `derivatives.retention` evaluates all retained derivatives. A verified absence of retained derivatives satisfies that constraint. Retention requirements also need an operational duty and evidence mechanism.

Production relationships are derived from all source/destination pairs. Equal IDs yield `same_production`; different IDs yield `different_production`; a mixed set retains both. A verified absence of a source or destination production yields `no_production`; unknown IDs yield `unknown`. Business purpose, reuse intent and distribution never replace this derivation. Unknown vocabulary values and contradictory declared/derived facts are validation errors or explicit information holds; implementations MUST NOT silently coerce them into permission.

Effective intervals are start-inclusive and end-exclusive in UTC. At a review deadline, a record needs reverification before supplying a positive basis. Every evaluator records its evaluation time and policy-profile version. Inactive rules are excluded from active matching; uncertain applicability of potentially governing evidence remains a blocker and must not disappear during filtering.

## 13. Gate bases and authority coverage

| Gate | Required basis | Accountable verifier |
|---|---|---|
| Inventory | Verified material manifest, model inventory, contributor mapping, exclusions and relevant lineage | Data steward and technical owner |
| Source authority | Bounded ownership/licence/contract/legal conclusion for each relevant material and model authority | Authorised rights reviewer |
| Contributor rights | Individual and collective coverage, including an evidenced determination where a permission is unnecessary | Authorised rights and labour reviewer |
| Privacy and people impact | Purpose-specific processing basis and required impact/people controls | Privacy owner |
| Operation | Rights coverage plus verified technical account of processing and persistence | Rights reviewer and technical owner |
| Purpose and destination | Rights coverage for beneficiaries, production boundaries, reuse and distribution | Authorised rights reviewer |
| Environment | Current verified configuration and approval for the data/operation classes | IT/security and relevant privacy authority |
| Obligations | Assigned, feasible, testable duties, prerequisites and consequences | Operational owner and duty authority |

Permission requires a verified model inventory, verified provenance for each referenced model artifact, current model-authority evidence and an Environment binding to the deployed artifact IDs. An unknown model, an unverified checkpoint licence or a provider product name without controlled model evidence creates an information hold.

Each satisfied or conditional gate records `basis` entries with kind, evidence, verifier and scope. A `not_applicable` gate records a `non_applicability` basis with equivalent evidence. Examples include a verified non-personal source or a qualified conclusion that a specific rights permission is unnecessary. A model's quality or an internal risk acceptance cannot supply a missing external right.

Before claiming complete coverage, the reviewer MUST attest that the applicable authority set is complete for the declared jurisdictional and source scope. Missing authority records create an information hold. For each rights question, preserve the material, person where relevant, operation, authority, supporting evidence and finding. Independent authority requirements accumulate; permission from one authority can cover multiple items only within its scope. In automated evaluation, these tuples form an explicit coverage proof, and unresolved tuples prevent permission.

An unresolved conflict in meaning is routed to the appropriate authority. A verified independent prohibition still determines the headline outcome; a conflict about whether that prohibition governs must first be resolved as an approval hold. Rule specificity alone supplies no override authority.

## 14. Validation and replay boundaries

Structural validation checks the JSON shapes, core gate cardinality and effect-specific fields. Semantic validation checks outcome aggregation, evidence closure, versions, time, basis kinds, approvals, conditions and purpose consistency. Domain validation establishes whether facts, rights interpretations, authority coverage and operational controls are substantively adequate. All three are required before operational reliance.

The repository's reference helpers implement set/retention matching, bound source rows, aggregation, preflight readiness and selected semantic invariants. They are a specification test harness. They do not implement a complete Level 3 evaluator.

`cross-show-lipsync.bundle.json` freezes the manual/hybrid assessment. Replay reconstructs gate results, the primary outcome and the applicable rule set from independently stored, verified gate findings. Those findings are human interpretation inputs. The replay validates their consistency with the exported decision and frozen evidence. It does not independently derive legal interpretations from contract text or certify authority completeness.
