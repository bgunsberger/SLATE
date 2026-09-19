# SlateCheck Implementation Specification

Version 0.2.0

## 1. Purpose and system boundary

This document defines what a SlateCheck implementation must do without prescribing an interface or technology stack. A conforming implementation can be a controlled spreadsheet workflow, database-backed service, production-management integration or another system that satisfies the framework and audit requirements.

The implementation receives a proposed use, retrieves controlled facts and rules, produces an explainable result, routes unresolved work and preserves an immutable record. Source contracts, media and identity records can remain in their existing repositories.

## 2. Actors

The implementation supports four responsibility functions: proposer, decision owner, authorised authority and operator. [Governance §2–3](GOVERNANCE.md#2-responsibilities-and-authority) defines their responsibilities and authority. One person may perform several functions; permissions attach to the authority exercised and the record. Data stewardship, policy administration, workflow administration and assurance are optional separations as scale and conformance level require.

## 3. Functional requirements

### FR-01 — Capture a proposed use

The system MUST capture and version all five SLATE dimensions. It MUST preserve unknown values and MUST require confirmation before evaluation.

### FR-02 — Identify exact material and models

The system MUST accept individual material records or a versioned collection manifest and MUST capture the models used by every proposal. One Source inventory status covers both. Each model reference contains its controlled ID, version and role in the proposed use. Model detail and authority live in the controlled record. The system MUST prevent permission when the required material, represented-person or model set is unknown, or when model provenance or authority is unverified.

### FR-03 — Link controlled evidence

The system MUST link productions, materials, models, people, agreements, policy rules and tool environments through stable IDs. Source and Environment model IDs MUST match, and every decision snapshot records the evidence version and status.

### FR-04 — Evaluate contributors individually

The system MUST evaluate each represented person against their individual and collective records. It MUST support narrowing a collection and reassessing the new version.

### FR-05 — Resolve modular rules

The system MUST use the structured selector semantics and preserve rule effect, authority, explanation and requirements. Levels 1 and 2 may record human-verified matching and findings. A Level 3 evaluator MUST automate deterministic matching and authority coverage proofs.

### FR-06 — Require a positive basis

The system MUST require the gate-specific basis in the Decision Specification, including evidenced non-applicability where appropriate. Silence and ambiguity MUST produce a hold.

### FR-07 — Return a standard outcome

The system MUST use the five outcomes defined in the framework. It MUST show all blockers and unknowns even when one determines the headline result.

### FR-08 — Route unresolved work

Every missing item, approval and condition MUST have a responsible function or authority, timing and evidence requirement. The system SHOULD support assignment and reminders.

### FR-09 — Record human authority

The system MUST distinguish a rules-engine result from an authorised human decision. Approvals and exceptions MUST record the person, authority exercised, date, scope and evidence.

### FR-10 — Preserve immutable decisions

Once issued, a decision MUST be immutable. Corrections or reassessments create linked successor decisions.

### FR-11 — Track conditions

The system MUST track conditions as open, satisfied, waived by an authorised person, failed or expired. Completion MUST reference evidence.

### FR-12 — Maintain lineage

The system MUST link derivatives to relevant sources and their creation decision, record obligation applicability and identify affected uses when a source changes. Levels 1 and 2 may operate these controls manually; Level 3 automates them.

### FR-13 — Manage validity

The system MUST represent effective dates, review dates, expiry, withdrawal and supersession. It SHOULD automatically flag affected active decisions.

### FR-14 — Explain safely

The system MUST provide a plain-language answer while respecting access controls on contract text and personal information. Redacted users receive the verified rule ID, effect, owner and required action.

### FR-15 — Export and test

Level 2 and above MUST support the published machine-readable exports. Every level MUST preserve reconstructable records and pass documented rule regression cases before activation. Level 3 MUST automate those cases.

### FR-16 — Generate an assessment checklist

The system MUST support a use-case-specific [assessment checklist](ASSESSMENT_CHECKLIST.md), manually or through software. Preliminary items distinguish facts, assumptions and potential requirements. Evidence-backed items are derived from the current decision, include every unresolved gate finding and link resolution to controlled records. The checklist MUST NOT become an independent permission or execution-readiness record.

## 4. Quality requirements

### Security

- Role-based access applies to record type, field and source reference where required.
- Authentication uses the organisation's managed identity service.
- Administrative and approval actions require strong authentication.
- Changes, reads of restricted records and exports are logged.
- Secrets and vendor credentials remain outside SlateCheck records.

### Privacy

- Interfaces expose the minimum identity and contract data required for each responsibility function.
- Broad interfaces use contributor IDs or approved display names.
- Search and analytics respect record-level permissions.
- Retention and deletion rules cover SlateCheck's own logs, requests and snapshots.
- Production use receives a privacy impact assessment appropriate to its jurisdictions and data classes.

### Reliability and integrity

- Stable IDs never point to a different logical record.
- Versions are immutable after verification.
- Evaluation is repeatable from the stored snapshot.
- Backups, restore and disaster recovery are tested.
- Clock, timezone and date semantics are explicit.

### Usability

- Requesters can describe intent in production language.
- Structured interpretation remains visible and editable before confirmation.
- Outcomes lead with the action the user can take.
- Conditions are concrete, assigned and time-bound.
- The system distinguishes missing information, required approval and prohibition.

### Interoperability

- Records use documented controlled vocabularies and stable IDs.
- Level 2 and above import and export JSON matching the published schemas and semantic invariants.
- Source references can point to contract, production, identity and asset systems without copying protected contents.
- Extensions follow the version and extension rules in [Data Model §12](DATA_MODEL.md#12-exchange-versions-and-extensions).

## 5. Reference service boundaries

A mature implementation can expose these logical services:

| Service | Responsibility |
|---|---|
| Registry | Controlled productions, people, materials, agreements and environments |
| Policy | Versioned rules, tests, authority and vocabulary |
| Assessment | Validation, expansion, rule matching and gate evaluation |
| Workflow | Assignments, approvals, conditions, reminders and appeals |
| Lineage | Source, derivative and impact relationships |
| Audit | Immutable decisions, evidence snapshots, events and exports |

Services may share one datastore in a pilot. Their responsibilities remain separate.

## 6. Minimum-overhead implementation

The [Minimum-Overhead Profile](MINIMUM_OVERHEAD_PROFILE.md) can use three protected tables or equivalent records: `Standing approvals`, `Uses` and `Events`. Existing contract, identity, asset and tool systems remain authoritative. The implementation stores stable references and the verified findings required to reconstruct each bounded decision.

An unchanged routine use records one five-question confirmation and a ready event. A changed answer routes the affected gate to its authority while preserving unaffected findings. This is the default pilot starting point.

## 7. Expanded controlled-sheet pilot

A controlled workbook can test the model before software development. One possible structure uses these tabs:

| Tab | Key columns |
|---|---|
| `Productions` | ID, type, owners, funders, locations, state, agreement IDs |
| `Materials` | ID, version, category, production, represented people, model type/use role where applicable, classifications, source reference |
| `Collections` | ID, version, manifest reference, material IDs, steward, status |
| `People` | Controlled ID, role, jurisdiction, agreement IDs, collective IDs, consent status |
| `Agreements` | ID, type, parties, scope, effective dates, controlled document reference, verifier |
| `Rules` | ID, version, effect, selectors, requirements, authority, dates, verifier |
| `Environments` | ID, product, deployed model IDs, tenant, regions, access, provider training, retention, approval |
| `Requests` | Proposed Use fields and confirmation state |
| `Decisions` | Outcome, scope, gates, rules, evidence snapshot, owner, validity |
| `Obligations` | Decision, condition, owner, due date, status, completion evidence |
| `Lineage` | Parent, child, operation, decision, transfer type, date |
| `Vocabulary` | Allowed values, definitions and status |

Protected ranges assign editing rights by stewardship domain. The request experience can initially use a Google Form or a separate intake sheet. Decision rows become append-only after issue. Sensitive contract text and identity data stay outside the workbook.

The pilot succeeds when the team can answer representative questions consistently, discover missing source records and update a rule without rewriting every scenario.

## 8. Expanded pilot workflow

A requester may first receive a preliminary checklist to gather missing facts. After assessment, a decision-derived checklist routes the remaining work.

1. Requester submits and confirms a Proposed Use.
2. Data steward verifies the material collection and represented people.
3. A simple evaluator matches active rules and creates gate results.
4. The decision owner reviews the explanation and routes holds.
5. Qualified approvers record new decisions where required.
6. A decision snapshot is issued.
7. Conditions and derivatives are tracked to closure.
8. Evidence changes trigger an impact report and reassessment queue.

The pilot may calculate results manually. It still uses the same record structure and outcome rules.

## 9. Acceptance criteria

An initial implementation is ready for controlled internal use when it can demonstrate the following. Automated evaluation is required only at Level 3; lower levels use documented human controls. Machine-readable export criteria apply at Level 2 and above:

1. published examples validate, and every active rule has authority, verification, effective status and positive and boundary tests;
2. the same frozen snapshot produces the same gate results and resolves every cited rule and evidence version;
3. contributor, material and model relationships are evaluated without combining unrelated rows, and whole-scope selectors do not turn partial coverage into permission;
4. unknown, stale, expired, withdrawn or changed facts cannot provide a positive basis and trigger reassessment or suspension as applicable;
5. explicit prohibitions and every lower-severity blocker remain visible;
6. every satisfied or non-applicable gate has the required evidence, scope and verifier, including current provenance and authority evidence for every model;
7. decisions, prerequisites, conditions and retained or released derivative obligations remain reconstructable, with owners and completion evidence;
8. reverse lineage identifies decisions and derivatives affected by a source change;
9. access, explanation, export, backup and deletion controls pass security and privacy testing;
10. preliminary and evidence-backed checklists pass the acceptance cases in [ASSESSMENT_CHECKLIST.md](ASSESSMENT_CHECKLIST.md);
11. the authorities applicable to the selected pilot scope approve the operating model, and users distinguish the five outcomes; and
12. the conformance statement identifies the level, manual controls, automated capabilities and unimplemented extensions.

## 10. Adoption sequence

1. **Prove one routine path.** Select one common bounded use, establish one standing approval and test the five-question confirmation. Measure initial setup and repeat-use effort separately.
2. **Test varied decisions.** Run the [five-case smoke pilot](../pilot/README.md) with controlled evidence and manual assessment. Record whether users understand the answer and can resolve a hold.
3. **Evaluate the operating model.** Run the [comparative pilot](PILOT_EVALUATION.md), including standing approvals, evidence changes, preflight, release and closeout. Measure preparation and maintenance effort alongside decision quality.
4. **Connect validated controls.** Automate bounded approvals and integrations only after the required Level 3 tests pass. Independent assurance supports Level 4.

Use restricted access for a controlled-sheet pilot. Protected editing ranges allocate stewardship; confidentiality requires file or record access boundaries. Archive issued decisions immutably outside mutable intake rows or through an equivalent controlled mechanism.

Visual design, conversational interfaces, dashboards and integrations remain implementation choices. Existing 0.1 implementations follow [MIGRATION_0.2.md](MIGRATION_0.2.md). Publication of a working draft can precede implementation assurance when its status and limitations are explicit.
