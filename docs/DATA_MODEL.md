# SCOPE Data Model

Version 0.1.0

## 1. Model shape

SCOPE is a linked record system. It avoids one giant permission matrix and avoids precomputing every possible combination. Specialist teams maintain authoritative facts and reusable rules; an assessment joins the relevant records for one proposed use.

The model has four layers:

```text
Evidence layer       productions, materials, people, agreements, tools
Policy layer         structured permissions, prohibitions, duties and review triggers
Transaction layer    proposed uses and requested approvals
Audit layer          decisions, evidence snapshots, conditions and lifecycle events
```

Every record has a stable ID, version, owner, status and timestamps. Relationships use IDs so the storage system can change without breaking the model.

## 2. Common record envelope

Every controlled SCOPE record MUST contain:

| Field | Meaning |
|---|---|
| `id` | Permanent, unique identifier |
| `recordType` | Controlled record category |
| `version` | Immutable version identifier |
| `status` | Draft, active, superseded, expired, withdrawn or deleted |
| `name` | Human-readable label |
| `ownerId` | Accountable record owner |
| `sourceSystem` | Authoritative system or repository |
| `sourceReference` | Controlled link or document reference |
| `effectiveFrom` | Start of applicability |
| `effectiveUntil` | End of applicability, if any |
| `verifiedAt` | Last substantive verification |
| `verifiedBy` | Qualified verifier |
| `reviewAt` | Scheduled review date, if any |
| `changeTriggers` | Events that require reverification |
| `createdAt`, `updatedAt` | Audit timestamps |
| `classification` | Access and sensitivity classification |

Records containing contract interpretations or sensitive personal information MUST have access controls independent from the general staff query interface.

## 3. Core records

### 3.1 Organisation

Represents the studio, client, production partner, vendor, licensor, union, guild or other legal entity.

Required domain fields:

- legal and trading names;
- organisation role or roles;
- relevant jurisdictions;
- parent or affiliate relationships;
- contact or responsible role reference.

### 3.2 Production

Represents a show, film, game, development project or internal production.

Required domain fields:

- production type: client service, company-owned IP, co-production, licensed IP, pitch/development or internal media;
- owning and controlling parties;
- funding parties;
- operating locations;
- lifecycle state;
- principal agreement IDs;
- delivery, wrap and archive dates;
- background-IP and project-IP treatment where relevant.

The production type is descriptive. Permission comes from linked rules and evidence rather than the label alone.

### 3.3 Person or contributor

Represents a performer, artist, employee, contractor, participant or other identifiable person.

Required domain fields:

- internal pseudonymous or controlled person ID;
- relationship and role categories;
- applicable jurisdictions;
- engagement agreement IDs;
- collective-instrument IDs;
- consent-record IDs;
- represented-material links;
- withdrawal or dispute status.

General interfaces SHOULD display the minimum personal information needed for the decision. Contract details and identity data remain in restricted source systems.

### 3.4 Agreement

Represents an executed contract, licence, rider, release, consent, collective instrument, privacy notice, policy or formal exception.

Required domain fields:

- agreement type;
- parties and their roles;
- covered productions, materials and people;
- jurisdictions;
- execution and effective dates;
- source document reference;
- supersession relationships;
- interpretation owner;
- structured term IDs.

Collective terms and individual terms are separate agreement records even when they apply to the same person.

### 3.5 Policy rule

Represents one queryable interpretation of an authoritative source. A rule contains:

- effect: permit, prohibit, require condition, require information or require approval;
- authority and evidence references;
- selectors that define when it applies;
- conditions, duties or approval authorities;
- effective dates and jurisdictions;
- interpretation confidence and verifier;
- supersession and exception relationships.

One agreement usually creates several rules. Rules SHOULD remain atomic: one effect, one intelligible proposition and a bounded scope.

### 3.6 Material item

Represents a file, message, recording, shot version, design, script, rig, code repository, note, dataset, model or other source or derivative.

Required domain fields:

- material category, format and storage reference;
- originating production or business function;
- creator, supplier and represented-contributor IDs;
- ownership and licence evidence IDs;
- personal and sensitive-data classifications;
- confidentiality and security classification;
- creation, delivery and archive dates;
- lineage links;
- integrity identifier such as a manifest entry, content hash or immutable version.

### 3.7 Material collection

Represents a controlled set of material items used as one dataset, corpus, pack or batch.

It MUST contain or reference a versioned manifest. Its rights position is the intersection of the requirements applying to all included items and represented people. Removing an item produces a new collection version.

### 3.8 Tool environment

Represents an approved configuration, not a product brand in the abstract.

Required domain fields:

- product, provider, model and version;
- deployment and tenant type;
- contract and data-processing agreement IDs;
- approved material and operation classes;
- provider-training and human-review settings;
- processing, storage and support-access regions;
- authorised groups;
- source, output, log and backup retention;
- deletion mechanism and evidence capability;
- subprocessors, plugins and connected services;
- security approval and review dates.

### 3.9 Proposed use

Represents the request being assessed. It contains the five SCOPE dimensions and references controlled records wherever possible. The normative machine shape is defined in [`../schemas/scope-proposed-use.schema.json`](../schemas/scope-proposed-use.schema.json).

The request MUST preserve unknown values explicitly. A user-friendly front end can collect plain language first, then require confirmation of the structured proposal.

### 3.10 Decision

Represents the immutable result for one proposed-use version. It includes:

- outcome and plain-language answer;
- evaluated gates;
- blockers and active conditions;
- approvals;
- applicable rule IDs;
- evidence versions or hashes;
- validity and reassessment triggers;
- responsible owner;
- evaluation method and version.

The normative machine shape is defined in [`../schemas/scope-decision.schema.json`](../schemas/scope-decision.schema.json).

### 3.11 Obligation and event

Represents a required action and evidence of its lifecycle. Examples include consultation, payment, source deletion, model deletion, notice, attribution, human review and access removal.

An obligation has an owner, due date, status, evidence reference and consequence of non-completion. Completion does not alter the original decision; it adds a linked event.

## 4. Required relationships

At minimum, a SCOPE implementation MUST support these relationships:

```text
Production  --governed by--> Agreement
Person      --party to------> Agreement
Person      --covered by----> Collective instrument
Material    --originated in-> Production
Material    --represents----> Person
Material    --governed by---> Agreement
Collection  --contains------> Material
Derivative  --derived from--> Material or Collection
Rule        --supported by--> Agreement or Policy
Rule        --applies to----> SCOPE selectors
Proposed use--uses----------> Material or Collection
Proposed use--runs in-------> Tool environment
Decision    --assesses------> Proposed use version
Decision    --relies on-----> Record versions
Decision    --creates-------> Obligation
Event       --satisfies-----> Obligation
```

Relationships MAY be stored in relational join tables, graph edges, document references or controlled spreadsheet tabs. Their semantics remain the same.

## 5. Source-to-derivative lineage

Lineage answers three questions:

1. Which exact sources contributed to this artefact?
2. Which people and agreements are represented through those sources?
3. Which active restrictions, conditions and expiry events must be reconsidered?

Each lineage edge records:

- parent and child IDs and versions;
- transformation or operation;
- date and responsible process;
- whether content, features, labels or capability were transferred;
- contribution granularity when known;
- governing decision ID.

A model record SHOULD describe whether source influence can be isolated or removed. When removal cannot be reliably demonstrated, the model inherits the strictest relevant deletion or stop-use trigger pending human review.

## 6. Rule selectors

Policy rules are modular because they match facts across standard selector groups:

| Selector group | Examples |
|---|---|
| Source | production, material category, supplier, classification, lifecycle state |
| Contract/contributor | agreement, party, contributor role, collective instrument, consent state, jurisdiction |
| Operation | summarisation, embeddings, generation, training, synthetic performance, automated decision |
| Purpose | same production, cross-production, reusable capability, public release, audience |
| Environment | tool, tenant, deployment, region, access group, provider training, retention |
| Time | effective period, expiry, production stage |

Selectors may use controlled categories and explicit IDs. Free-text selectors MUST NOT drive an automated permission outcome.

## 7. Data stewardship

| Record family | Supplies facts | Verifies interpretation | Typical change event |
|---|---|---|---|
| Productions and ownership | Production operations | Business and legal affairs | Greenlight, amendment, delivery, wrap |
| Materials and lineage | Department or data steward | Production technology | Ingest, edit, collection change, archive |
| Contributor identity and engagement | Casting / People and Culture | Business and legal affairs | Engagement, rider, withdrawal, role change |
| Collective terms | People and Culture / labour relations | Qualified legal adviser | New agreement, jurisdiction or term |
| Privacy basis and notices | Privacy owner | Privacy or legal adviser | New data class, purpose or notice |
| Tool environment | IT / security / procurement | Security, privacy and AI governance | Vendor, feature, region, setting or contract change |
| Policy rules | Domain owner | Named authority | Interpretation, policy or source change |
| Proposed use | Requester and project owner | Relevant data steward | Any scope change |
| Decision and conditions | Decision owner | Required approvers | Approval, expiry, appeal or evidence change |

The person entering a fact and the person authorising its interpretation SHOULD be separately identified.

## 8. Storage and access pattern

A first implementation can use a controlled Google Sheet with one tab per record family, stable IDs and protected ranges. Contract documents, identity data and sensitive evidence remain in access-controlled repositories; the sheet stores references and approved structured summaries.

A production implementation SHOULD provide:

- field-level access controls for personal and contractual data;
- append-only decision and event history;
- immutable version snapshots;
- validation against controlled vocabularies;
- automated reminders for expiry and reverification;
- impact queries from changed evidence to affected decisions and derivatives;
- export in a documented machine-readable form;
- tested backup, retention and deletion procedures.

## 9. Minimum viable dataset

A useful pilot does not require every historic asset. It requires enough connected records to test real decisions:

1. two service productions, one company-owned production and one co-production;
2. representative materials across notes, artwork, voice, scripts, rigs and communications;
3. several contributors with deliberately different terms;
4. production, individual and collective agreement summaries verified by Legal;
5. three tool environments with different data handling;
6. ten to twenty policy rules;
7. known decisions covering each outcome state;
8. lineage for at least one dataset, one generated output and one model artefact.

The pilot SHOULD measure how often answers are blocked by missing facts. That reveals which records need operational ownership before further automation.
