# SCOPE Implementation Specification

Version 0.2.0

## 1. Purpose and system boundary

This document defines what a SCOPE implementation must do without prescribing an interface or technology stack. A conforming implementation can be a controlled spreadsheet workflow, database-backed service, production-management integration or another system that satisfies the framework and audit requirements.

The implementation receives a proposed use, retrieves controlled facts and rules, produces an explainable result, routes unresolved work and preserves an immutable record. Source contracts, media and identity records can remain in their existing repositories.

## 2. Actors

The minimum actor set is:

- requester;
- production data steward;
- rights-record editor;
- qualified verifier;
- tool-environment owner;
- decision owner;
- approver;
- auditor;
- system administrator.

One person may hold several roles. Permissions attach to roles and records rather than job titles displayed to users.

## 3. Functional requirements

### FR-01 — Capture a proposed use

The system MUST capture and version all five SCOPE dimensions. It MUST preserve unknown values and MUST require confirmation before evaluation.

### FR-02 — Identify exact material

The system MUST accept individual material records or a versioned collection manifest. It MUST prevent a permitted outcome when the required inventory or represented-person set is unknown.

### FR-03 — Link controlled evidence

The system MUST link productions, materials, people, agreements, policy rules and tool environments through stable IDs. It MUST record evidence version and status in every decision snapshot.

### FR-04 — Evaluate contributors individually

The system MUST evaluate each represented person against their individual and collective records. It MUST support narrowing a collection and reassessing the new version.

### FR-05 — Resolve modular rules

The system MUST use the structured selector semantics and preserve rule effect, authority, explanation and requirements. Levels 1 and 2 may record human-verified matching and findings. A Level 3 evaluator MUST automate deterministic matching and authority coverage proofs.

### FR-06 — Require a positive basis

The system MUST require the gate-specific basis in the Decision Specification, including evidenced non-applicability where appropriate. Silence and ambiguity MUST produce a hold.

### FR-07 — Return a standard outcome

The system MUST use the five outcomes defined in the framework. It MUST show all blockers and unknowns even when one determines the headline result.

### FR-08 — Route unresolved work

Every missing item, approval and condition MUST have a responsible role, timing and evidence requirement. The system SHOULD support assignment and reminders.

### FR-09 — Record human authority

The system MUST distinguish a rules-engine result from an authorised human decision. Approvals and exceptions MUST record the person, authority exercised, date, scope and evidence.

### FR-10 — Preserve immutable decisions

Once issued, a decision MUST be immutable. Corrections or reassessments create linked successor decisions.

### FR-11 — Track conditions

The system MUST track conditions as open, satisfied, waived by an authorised person, failed or expired. Completion MUST reference evidence.

### FR-12 — Maintain lineage

The system MUST allow derivatives to reference all relevant sources and the decision that authorised creation. It SHOULD propagate source controls and identify affected derivatives when a source changes.

### FR-13 — Manage validity

The system MUST represent effective dates, review dates, expiry, withdrawal and supersession. It SHOULD automatically flag affected active decisions.

### FR-14 — Explain safely

The system MUST provide a plain-language answer while respecting access controls on contract text and personal information. Redacted users receive the verified rule ID, effect, owner and required action.

### FR-15 — Export and test

Level 2 and above MUST support the published machine-readable exports. Every level MUST preserve reconstructable records and pass documented rule regression cases before activation. Level 3 MUST automate those cases.

## 4. Quality requirements

### Security

- Role-based access applies to record type, field and source reference where required.
- Authentication uses the organisation's managed identity service.
- Administrative and approval actions require strong authentication.
- Changes, reads of restricted records and exports are logged.
- Secrets and vendor credentials remain outside SCOPE records.

### Privacy

- Interfaces expose the minimum identity and contract data required for each role.
- Broad interfaces use contributor IDs or approved display names.
- Search and analytics respect record-level permissions.
- Retention and deletion rules cover SCOPE's own logs, requests and snapshots.
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
- Extensions identify their namespace and do not change the meaning of core fields.

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

## 6. Controlled-sheet pilot

A Google Sheets pilot can test the model before software development. Use one protected workbook with these tabs:

| Tab | Key columns |
|---|---|
| `Productions` | ID, type, owners, funders, locations, state, agreement IDs |
| `Materials` | ID, version, category, production, represented people, classifications, source reference |
| `Collections` | ID, version, manifest reference, material IDs, steward, status |
| `People` | Controlled ID, role, jurisdiction, agreement IDs, collective IDs, consent status |
| `Agreements` | ID, type, parties, scope, effective dates, controlled document reference, verifier |
| `Rules` | ID, version, effect, selectors, requirements, authority, dates, verifier |
| `Environments` | ID, product, tenant, regions, access, provider training, retention, approval |
| `Requests` | Proposed Use fields and confirmation state |
| `Decisions` | Outcome, scope, gates, rules, evidence snapshot, owner, validity |
| `Obligations` | Decision, condition, owner, due date, status, completion evidence |
| `Lineage` | Parent, child, operation, decision, transfer type, date |
| `Vocabulary` | Allowed values, definitions and status |

Protected ranges assign editing rights by stewardship domain. The request experience can initially use a Google Form or a separate intake sheet. Decision rows become append-only after issue. Sensitive contract text and identity data stay outside the workbook.

The pilot succeeds when the team can answer representative questions consistently, discover missing source records and update a rule without rewriting every scenario.

## 7. Minimum pilot workflow

1. Requester submits and confirms a Proposed Use.
2. Data steward verifies the material collection and represented people.
3. A simple evaluator matches active rules and creates gate results.
4. The decision owner reviews the explanation and routes holds.
5. Qualified approvers record new decisions where required.
6. A decision snapshot is issued.
7. Conditions and derivatives are tracked to closure.
8. Evidence changes trigger an impact report and reassessment queue.

The pilot may calculate results manually. It still uses the same record structure and outcome rules.

## 8. Acceptance criteria

An initial implementation is ready for controlled internal use when it can demonstrate the following. Automated evaluation is required only at Level 3; lower levels demonstrate equivalent documented human controls. Machine-readable export criteria apply at Level 2 and above:

1. all example JSON documents validate against their schemas;
2. every active rule has authority, verifier, effective status and tests;
3. the same snapshot always returns the same gate results;
4. mixed contributor terms are evaluated individually;
5. an unknown manifest cannot produce permission;
6. an explicit prohibition cannot be hidden by a general permission;
7. an expired or withdrawn record cannot provide a current positive basis;
8. a changed destination or environment triggers reassessment;
9. users without contract access receive a safe, useful explanation;
10. decision snapshots remain reconstructable after source records change;
11. conditions have owners and completion evidence;
12. reverse lineage identifies decisions and derivatives affected by a source change;
13. access, export, backup and deletion controls pass security testing;
14. Legal, Privacy, Security, Production and workforce representatives approve the pilot operating model;
15. user testing shows that staff can distinguish permission, conditions, missing information, approval and prohibition.

## 9. Phased implementation

### Phase 1 — Vocabulary and evidence sample

Agree on terms, owners and five to ten real but safely controlled scenarios. Enter only the evidence needed to test them.

### Phase 2 — Structured pilot

Build the controlled workbook or small database, run decisions manually, refine schemas and measure missing information.

### Phase 3 — Rules and workflow

Automate deterministic matching for standing approvals, add assignments, condition tracking and regression tests.

### Phase 4 — Production integration

Connect identity, production tracking, contract references, asset manifests and tool inventory. Add lineage and change-impact notifications.

### Phase 5 — Assurance and publication

Test controls independently, publish conformance and methodology, and release fictional examples or open schemas suitable for external review.

## 10. Explicitly deferred interface questions

Visual design, conversational query, dashboards, notifications and integrations remain implementation choices. The framework first needs validation against real production agreements, contributor patterns, tool configurations and decision workflows. Interface work should begin from tested user tasks and the stable outcome vocabulary in this specification.

## 11. Implementation priorities for version 0.2

1. Agree on gate-specific authority and non-applicability decisions with domain owners.
2. Migrate purpose fields and selectors using [MIGRATION_0.2.md](MIGRATION_0.2.md).
3. Complete a frozen assessment bundle and run structural and semantic checks.
4. Operate prerequisite checks, suspension and obligation events manually in a bounded pilot.
5. Measure reviewer agreement, decision quality and maintenance cost using [PILOT_EVALUATION.md](PILOT_EVALUATION.md).
6. Automate only validated standing approvals, with bound source relationships, full authority coverage and change-trigger enforcement.

A controlled-sheet pilot must use a restricted audience and external controlled evidence storage. Protected editing ranges allocate stewardship; confidentiality needs appropriate file/record access boundaries. Issued decision snapshots must be retained immutably outside mutable intake rows or through an equivalent controlled archive.

## 12. Additional acceptance criteria

- Research labels preserve cross-production and public-distribution facts.
- A rule requiring a production/person relationship cannot match unrelated material rows.
- Australia-only permission fails an Australia-plus-US processing environment.
- Unknown selector facts and retention never establish positive coverage.
- Every satisfied or non-applicable gate has the right kind of evidence and verifier.
- Every referenced rule/evidence version resolves in the frozen bundle.
- A conditional decision remains blocked until prerequisite evidence is verified.
- Withdrawal, stale evidence and missed duties suspend affected processing.
- A retained derivative obligation and an authorised release are both reconstructable.
- Conformance statements identify the level, manual controls, automated capabilities and unimplemented extensions.
