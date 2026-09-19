# SlateCheck Governance Model

Version 0.2.0

## 1. Governance objective

SlateCheck creates a shared operational method for creative production. Its governance model assigns each fact and decision to a person with the relevant knowledge or authority while reusing existing organisational processes.

The governing principle is simple: staff receive a useful answer, specialists retain authority over their domain, and every decision remains traceable to verified evidence.

## 2. Responsibilities and authority

SlateCheck uses four responsibility functions. Adopters assign them within existing jobs and teams.

| Function | Responsibility |
|---|---|
| Proposer | Describes the intended use, confirms the proposal, follows conditions and reports changes. |
| Decision owner | Accepts accountability for the recorded outcome, routes unresolved questions and keeps the next action clear. |
| Authorised authority | Supplies the specific interpretation, verification, approval or external permission required by a gate. |
| Operator | Confirms that the actual use remains within the decision scope and that prerequisites are complete. |

One person may perform several functions. Existing producers, production staff and specialist contacts can perform them through current processes. Independence or separation applies where the governing authority, organisational policy or conformance level requires it.

The decision records which function a person performed and what authority they exercised. External clients, contributors and rights holders can supply decisions within their own authority. An internal title does not expand that authority.

The [Minimum-Overhead Profile](MINIMUM_OVERHEAD_PROFILE.md) defines the smallest operating pattern. Larger implementations can add data stewardship, policy administration, workflow administration and independent assurance as volume and risk justify them.

## 3. Illustrative authority mapping

The organisation maps each decision area to its actual authority. The following functions are examples rather than required departments.

| Decision area | Accountable authority | Required inputs |
|---|---|---|
| Contract meaning and external reuse rights | Business and Legal Affairs | Controlled agreement, proposed use, production context |
| Contributor consent and collective coverage | Legal with Casting / People / labour relations | Individual record, applicable collective terms, exact operation |
| Personal-data processing | Privacy owner or delegated qualified role | Data categories, people affected, purpose, notice and controls |
| Tool technical approval | IT and security | Architecture, settings, contract, regions, access, retention |
| Creative suitability | Creative owner | Rights-cleared inputs and outputs, intended production use |
| Production acceptance | Producer or production executive | Conditions, budget, schedule and client obligations |
| New policy or standing approval | Named governance authority | Cross-functional review and test cases |
| Exception | Authority named by the governing rule | Exact scope, rationale, evidence, expiry and conditions |

## 4. Operating workflows

Sections 4.1–4.4 describe reusable setup for organisations that maintain shared records. A minimum-overhead adopter starts with one bounded use and records only the evidence needed for that use. Setup expands when another real use requires it.

### 4.1 Production onboarding

At greenlight or contract execution:

1. create the production and organisation records;
2. register controlling, funding and delivery parties;
3. link principal agreements;
4. record project IP, background IP and client-material treatment;
5. identify locations, likely contributor groups and collective instruments;
6. create initial structured rules;
7. schedule review at delivery, amendment and wrap.

### 4.2 Contributor onboarding

At engagement:

1. assign a controlled contributor ID;
2. link the engagement agreement and applicable collective terms;
3. record represented material categories;
4. capture purpose-specific AI consent or restriction when present;
5. record compensation, notice, consultation, expiry and withdrawal mechanisms;
6. verify the structured interpretation before use.

### 4.3 Material, dataset and model registration

Before an assessment:

1. identify the exact files or controlled collection;
2. create a versioned manifest;
3. map provenance, production and governing agreements;
4. enumerate represented people;
5. classify confidentiality and personal information;
6. verify lineage and exclusions;
7. assign a data steward.

For every model artifact used by an operation, also:

1. create or resolve a controlled model material record, including provider-hosted models;
2. record its exact available version, artifact type, use roles, access mode, supplier, provenance and upstream lineage;
3. link current authority evidence for the intended inference, modification, fine-tuning, retained derivative and distribution scope;
4. keep code, weights, adapters and runtime dependency terms distinct; and
5. assign model-provenance and model-authority change triggers.

### 4.4 Tool onboarding

Before an environment can satisfy a decision gate:

1. identify the actual product, controlled model-artifact IDs, tenant and features;
2. bind deployed artifacts to the Source model inventory and review their licences, provider terms and acceptable-use restrictions;
3. verify provider training and human-access settings;
4. document regions, subprocessors and integrations;
5. test access, retention, export and deletion controls;
6. define approved data and operation classes;
7. record owner, evidence and review date.

### 4.5 Proposed-use assessment

The proposer describes the use in plain language and confirms all five SLATE dimensions. A routine use follows the five-question check in the Minimum-Overhead Profile. The decision owner routes changed or unresolved gates to the relevant authority. Processing begins only when the outcome permits it and prerequisite conditions are complete.

### 4.6 Operation and closeout

The operational owner:

- records durable derivatives and lineage;
- monitors model, checkpoint, adapter, upstream-lineage and model-authority changes;
- completes and evidences conditions;
- monitors access and incidents;
- reviews the decision when scope changes;
- performs required deletion or archive actions;
- closes the use when retention ends.

## 5. Rule authoring and review

Every rule moves through:

1. **Draft** — created by a domain specialist from a controlled source.
2. **Review** — checked for scope, authority, vocabulary and test coverage.
3. **Active** — approved by the named authority and available to assessments.
4. **Superseded, expired or withdrawn** — unavailable as a positive basis and retained for audit.

Each active rule MUST include at least one positive and one boundary test. High-impact rules SHOULD be reviewed by a second qualified person.

Rule text uses plain language and controlled selectors. Contract quotations remain minimal and access-controlled. Interpretive uncertainty is represented as an approval requirement rather than hidden in notes.

## 6. Decision review and appeal

A requester or affected person can seek review when:

- facts are wrong or incomplete;
- relevant evidence was omitted;
- the proposal can be narrowed;
- an authorised exception may apply;
- the person is exercising a contractual, workplace or privacy right;
- the system explanation is unclear.

The review records the issue, reviewer, evidence considered, outcome and relationship to the original decision. Historical decisions remain unchanged. An appeal cannot be decided solely by the person whose original judgement is contested when organisational policy requires independence.

## 7. Change, withdrawal and incident response

Evidence owners publish changes as new versions. The system identifies linked active decisions, collections and derivatives. The decision owner then records one of:

- still valid;
- valid with revised conditions;
- paused pending review;
- revoked;
- expired and closed.

Consent withdrawal or a rights dispute immediately suspends affected active uses while the decision owner performs stop-use review. The suspension also covers affected derivatives whose obligation applicability is uncertain. A security or privacy incident follows the organisation's incident process and also triggers SlateCheck impact analysis.

## 8. Information security and privacy

A SlateCheck implementation SHOULD apply:

- least-privilege and role-based access;
- separate storage for identity, contract text and general metadata;
- pseudonymous contributor IDs in broad interfaces;
- encryption in transit and at rest;
- access and change logging;
- retention limits for requests and evidence snapshots;
- tested export and deletion controls;
- confidential explanations for restricted users;
- periodic access certification;
- secure handling of vendor credentials and integrations.

The system itself can contain sensitive contract and personal information. Its design requires a privacy and security assessment before live data is entered.

The organisation MUST set retention periods for decisions, evidence and audit events, including any applicable preservation hold. Immutability protects records during that period. Authorised disposal records the scope, authority and date without retaining deleted sensitive content; the archive marks any resulting limit on reconstruction. Active uses that lose a necessary evidence basis require reassessment.

## 9. Oversight forum

A Level 2–4 implementation or an organisation with recurring high-impact uses SHOULD maintain a cross-functional SlateCheck forum on a defined cadence and after significant incidents. A minimum-overhead implementation can review its standing approval at expiry and convene the relevant authorities when a trigger occurs. The forum reviews:

- new high-impact uses;
- recurring unresolved questions;
- tool and policy changes;
- contributor and workforce concerns;
- incidents and appeals;
- rule quality and inconsistent decisions;
- conformance and audit findings;
- publication of framework updates.

The forum includes meaningful creative, production and workforce representation alongside legal and technical functions.

## 10. Metrics

Metrics support improvement and must not become employee-performance scores. Useful measures include:

- assessment volume by operation and outcome;
- median time to resolve holds;
- proportion blocked by missing inventory, contributor or tool facts;
- expiring evidence and overdue conditions;
- decisions affected by record changes;
- rule test coverage and failed regression tests;
- incidents, appeals and reversals;
- number of active derivatives with complete lineage;
- user comprehension of answers and conditions.

Targets and service levels are configured locally. Speed never substitutes for the required authority.

## 11. Publication and research governance

A public SlateCheck specification can publish the framework, vocabulary, schemas, fictional scenarios and conformance tests. Implementations protect client names, contract terms, contributor identities, security architecture and decision records.

Research using operational data requires its own SlateCheck assessment, ethics and privacy review where applicable, a publication plan and a method for de-identification. Contributors and affected workers should have a route to challenge inaccurate characterisation of their rights or views.

## 12. Execution state and preflight

The current execution state is separate from the immutable decision outcome:

| State | Meaning and next action |
|---|---|
| `awaiting_prerequisites` | The decision allows a conditional use; pre-processing duties remain open. |
| `ready` | A fresh preflight confirms scope, evidence, authority and prerequisite completion. |
| `active` | The operational owner has started the verified use. |
| `suspended` | A hold, changed material fact, expired basis, dispute, withdrawal, missed duty or relevant incident prevents continuation. |
| `closed` | Processing ended and remaining retention/deletion duties are recorded and tracked. |

Immediately before each job or bounded batch, a named operator MUST verify the decision ID/version, actual manifest and environment, current evidence, open triggers, prerequisite evidence and expiry. For a routine use, the five answers in the Minimum-Overhead Profile form this ready check. A ready check applies only to that job/batch and scope. Recurring workflows declare batch boundaries and a maximum recheck interval in their standing approval; any intervening trigger suspends the affected work immediately. Human preflight is supported at every level; Level 3 can enforce it through integrations.

Before client delivery, external distribution or public release, the operator MUST verify that the actual artefacts, recipients and channel are within the decision's distribution scope and that every `before_release` duty is satisfied or validly waived. Record this release check as an execution event. A changed audience or artefact requires reassessment; a processing preflight alone cannot clear release duties.

Condition evidence or a waiver must be verified by the duty's authority. An operational owner cannot waive an external party's right. Failed or expired conditions suspend processing; future deletion duties can remain open until due. Resume requires a new documented preflight and a successor decision whenever assessed facts or scope changed. The owner records suspension, restart and closeout events without altering the historical decision.

## 13. Standing approvals, cohorts and operating cost

Standing approvals define source classes, verified cohorts, operations, environment configurations, purposes, distribution boundaries, exclusions, expiry and recheck cadence. New items or people enter only after the steward verifies membership and individual exceptions. Uncertain membership routes to a hold. Cohort membership and exception checks are versioned evidence.

The governance owner assigns response service levels and escalation owners for each hold type. The pilot measures specialist minutes per decision, initial record preparation, ongoing maintenance, repeated-use savings, unnecessary holds, bypass attempts and user abandonment alongside missed restrictions. Record exclusions and declined uses so the evaluation includes work that never reaches a permitted outcome. The comparative pilot protocol in [PILOT_EVALUATION.md](PILOT_EVALUATION.md) defines the evidence needed before broader rollout.
