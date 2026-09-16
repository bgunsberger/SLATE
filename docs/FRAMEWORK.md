# SCOPE Framework

Version 0.1.0 — working specification

## 1. Purpose

Creative studios hold material whose permitted use depends on several overlapping sources of authority: production agreements, ownership, licences, individual engagements, consent, collective agreements, privacy obligations, workplace policy and tool terms. AI adds operations that can extract, transform, reproduce or persist characteristics of that material in new forms.

SCOPE provides a consistent way to describe a proposed AI use, assemble the applicable evidence and return a bounded, explainable outcome. It supports human decision-making and organisational governance. It does not replace legal interpretation, consultation or approval.

The framework has four goals:

1. Give staff a practical route to an answer before material enters an AI system.
2. Let specialists maintain facts and rules in reusable modules instead of reviewing every combination from scratch.
3. Preserve the evidence, reasoning, conditions and accountability behind each answer.
4. Carry source obligations forward into transcripts, embeddings, datasets, outputs and models.

## 2. Normative language

The words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and **MAY** express requirement levels in this specification.

- **MUST / MUST NOT**: required for SCOPE conformance.
- **SHOULD / SHOULD NOT**: expected unless a documented reason supports a different implementation.
- **MAY**: optional.

## 3. Unit of assessment: the proposed use

Every assessment concerns one versioned **Proposed Use**:

> A defined set of source material, governed by identified rights and people, submitted to a stated AI operation for a stated purpose in a stated environment.

A proposed use is represented as:

`Source + Contracts and contributors + Operation + Purpose + Environment`

Changing any material fact creates a new version and triggers reassessment. Material changes include adding files or people, changing the operation, moving from one production to another, retaining a model, changing provider settings, adding an access region or distributing an output to a new audience.

## 4. The five SCOPE dimensions

### 4.1 Source

Source describes the material and its provenance.

It MUST identify:

- each material item or a controlled collection with a manifest;
- category and format;
- originating production, business function or external source;
- ownership and funding context where known;
- lifecycle state, such as development, active production, delivered, archived or deleted;
- every represented contributor or a documented method for identifying them;
- personal, sensitive, confidential, culturally sensitive and security classifications;
- governing agreements and licences;
- upstream material and downstream derivatives through lineage links.

Common source categories include:

- communications: email, chat, spaces, meeting recordings and transcripts;
- production tracking: notes, client notes, versions, approvals, schedules and histories;
- supplied inputs: scripts, bibles, designs, references, audio, video, scans, motion capture and datasets;
- production outputs: artwork, animation, renders, edit media, rigs, code, tools and models;
- business and people records: contracts, HR data, performance data, finance and security logs;
- external material: licensed libraries, stock assets, public-domain material and web content;
- derived material: summaries, transcripts, labels, embeddings, indexes, synthetic outputs, adapters and model weights.

Possession, access, payment and production completion are recorded as facts. They do not independently establish permission.

### 4.2 Contracts and contributors

Contracts and contributors describes every authority and person whose terms may govern the proposed use.

It MUST support:

- production, client, co-production and distribution agreements;
- licences and assignments;
- employment and contractor agreements;
- performer, artist and other contributor agreements;
- consent records, riders and releases;
- guild, union, award and collective terms;
- privacy notices and lawful processing bases;
- organisational policies and approved exceptions;
- jurisdiction, effective date, expiry, withdrawal and supersession;
- evidence provenance and a responsible verifier.

Rights are evaluated at the most granular level required by the evidence. A dataset containing ten performers can have ten different contributor outcomes. The dataset can proceed only when the proposed use is covered for every included item and person, or when uncleared elements are removed and the manifest is updated.

An agreement summary MUST link to its controlled source or custodian. The summary is a queryable interpretation, not a replacement for the executed document.

### 4.3 Operation

Operation describes what the system does to the source and which durable artefacts it creates.

The minimum operation vocabulary is:

- transcribe;
- summarise;
- translate;
- classify, tag or extract;
- analyse or infer;
- search, retrieve or create embeddings;
- generate or transform content;
- evaluate or test a model;
- automate or support a decision;
- train a base model;
- fine-tune, adapt or create a LoRA;
- reinforcement learning or preference optimisation;
- distil or transfer a capability;
- create a synthetic voice, likeness or performance.

An operation MUST also state persistence:

- ephemeral processing;
- saved output;
- retained transcript or labels;
- embeddings or searchable index;
- curated dataset;
- model weights;
- adapter or LoRA;
- evaluation set or logs.

Technical descriptions SHOULD explain what the system learns or retains in production language. Labels such as “analysis” or “internal AI” are too broad for a permission decision.

### 4.4 Purpose

Purpose describes the intended outcome, beneficiary, destination and audience.

It MUST distinguish:

- the same task;
- the same production;
- a different production;
- a reusable studio capability;
- client delivery;
- internal operations or communications;
- research or evaluation;
- public release or external distribution.

The destination production and its ownership context are separate facts from the source production. This distinction makes cross-production reuse visible, including movement from a client-funded show to company-owned IP.

The purpose record SHOULD include the expected benefit, affected people, intended users, output audience, commercial context and impact if the system is wrong or misused.

### 4.5 Environment

Environment describes the complete processing boundary.

It MUST identify:

- product, provider, model and material version where relevant;
- deployment type: local, studio-hosted, private tenant, managed enterprise service or public service;
- account or tenant;
- provider use of inputs, outputs and telemetry, including model improvement;
- storage and processing regions;
- authorised people, teams and service operators;
- retention, deletion and backup behaviour;
- subprocessors and external integrations;
- security classification and approved data classes;
- export, monitoring and incident-response controls.

A product-level approval is insufficient when settings vary by account, region or feature. SCOPE evaluates the actual environment used for the proposed activity.

## 5. Cross-cutting concepts

### 5.1 Positive basis

Permission requires a recorded positive basis covering the proposed use. Contractual silence, missing records or general ownership claims create a hold for information or approval.

### 5.2 Cumulative rights

Applicable authorities accumulate. A client approval does not satisfy a performer consent requirement. An individual consent does not remove a collective minimum. Tool approval does not confer rights in the material.

### 5.3 Lineage and inheritance

Derived artefacts MUST link to their sources. Unless an authorised rule explicitly narrows or replaces an obligation, a derivative inherits the relevant restrictions, expiry, access boundaries and deletion triggers of every source used to create it.

This applies to transcripts, summaries, crops, annotations, embeddings, indexes, prompts, outputs, datasets, evaluation sets, adapters, LoRAs and model weights.

### 5.4 Purpose and environment binding

Permissions are bound to their recorded purpose and environment. Approval for same-show summarisation in a private tenant does not cover cross-show training or a public account.

### 5.5 Time and change

Evidence and decisions are time-bound. Each record MUST state its effective status, verification date and review or expiry trigger. Withdrawal, amendment, tool-setting changes, incidents and new destinations trigger reassessment.

### 5.6 Human authority

SCOPE distinguishes an engine result from an authorised decision. Automated evaluation can confirm that a proposal matches a standing approval. It cannot create a new permission, waive a restriction or resolve an ambiguous contract.

## 6. Decision outcomes

SCOPE uses five plain-language outcomes:

| Outcome | Meaning | Staff action |
|---|---|---|
| **Permitted** | Current verified records positively cover the exact proposed use. | Proceed within the recorded scope. |
| **Permitted with conditions** | Positive permission exists and listed controls must be satisfied. | Complete and monitor every condition. |
| **Hold — information required** | A material fact or valid evidence record is missing, stale or inconsistent. | Supply or verify the requested information. |
| **Hold — approval required** | The facts are known and an authorised person or external party must decide. | Keep material out of the workflow until approval is recorded. |
| **Prohibited under current rules** | An applicable, verified rule expressly disallows the proposed use. | Change the proposal or obtain a valid amendment through the authorised process. |

Every outcome MUST include:

- a plain-language answer;
- the exact assessed scope;
- blockers and conditions;
- applicable rules and evidence versions;
- decision owner and required approvers;
- validity period and reassessment triggers;
- engine or method version;
- creation time and immutable decision ID.

## 7. The decision record

The output is a versioned evidence snapshot, not a free-floating answer. A conforming decision record MUST allow a reviewer to reconstruct:

1. what was proposed;
2. what facts were known;
3. which records and rule versions applied;
4. how each gate resolved;
5. who made or owned the decision;
6. which conditions remain active;
7. what change would invalidate the answer.

Previous decisions MAY be used as evidence of a standing approval. Precedent never broadens beyond its recorded scope.

## 8. Framework architecture

SCOPE separates five services. They can begin as controlled spreadsheets and document repositories, then move to a database without changing the conceptual model.

1. **Source and lineage register** — productions, materials, collections, contributors and derivatives.
2. **Rights and policy register** — agreements, interpreted terms, consent, collective terms and internal rules.
3. **Tool and environment register** — approved configurations, regions, access and retention behaviour.
4. **Assessment service** — structured proposed uses, rule matching and unresolved questions.
5. **Decision and obligation register** — outcomes, approvals, conditions, expiry, deletion and audit events.

Controlled source documents remain in their systems of record. SCOPE stores stable references, structured interpretations and verification metadata.

## 9. Conformance levels

### Level 1 — Recorded

An implementation:

- captures all five SCOPE dimensions;
- uses the five outcome states;
- records evidence, owner, date and scope;
- preserves an immutable decision snapshot.

### Level 2 — Governed

An implementation also:

- assigns record owners and verifiers;
- versions rules and interpretations;
- tracks expiry, withdrawal and reassessment triggers;
- enforces role-based access and audit history;
- records conditions through completion.

### Level 3 — Connected

An implementation also:

- maintains item- and contributor-level lineage;
- propagates relevant restrictions to derived artefacts;
- detects affected decisions when evidence changes;
- supports deterministic rule evaluation and test cases;
- integrates production, identity, contract and tool inventories.

### Level 4 — Assured

An implementation also:

- undergoes periodic independent control testing;
- measures decision quality, coverage and review performance;
- supports appeals, incident handling and accountable overrides;
- publishes its configured vocabulary, governance process and conformance statement.

## 10. Scope boundaries

SCOPE is a governance and decision-record framework. It does not determine ownership, interpret law by itself, guarantee that source records are accurate, assess model quality or replace consultation with affected workers and contributors. Its value depends on verified records, clear authority and a working process for uncertainty.

An implementation MUST describe its jurisdictional coverage and limitations. Public examples SHOULD use fictional organisations, productions, people and agreements unless publication rights and privacy have been confirmed.
