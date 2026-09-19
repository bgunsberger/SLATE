# SlateCheck Data Model

Version 0.2.0

## 1. Model shape

SlateCheck is a linked record system. It avoids one giant permission matrix and avoids precomputing every possible combination. Specialist teams maintain authoritative facts and reusable rules; an assessment joins the relevant records for one proposed use.

The model has four layers:

```text
Evidence layer       productions, materials, people, agreements, tools
Policy layer         structured permissions, prohibitions, duties and review triggers
Transaction layer    proposed uses and requested approvals
Audit layer          decisions, evidence snapshots, conditions and lifecycle events
```

Every record has a stable ID, version, responsible owner and timestamps; registry records also carry lifecycle status. Relationships use IDs so the storage system can change without breaking the model.

## 2. Common record envelope

Registry records, including policy rules, MUST contain the following envelope. `effectiveUntil` and `reviewAt` are optional when no such date applies. Proposed uses and immutable decisions are transaction records with their own explicit metadata in the published schemas; the registry envelope does not apply to them. `recordType` is `policy_rule` for a rule.

Every registry record MUST contain:

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

Required domain fields in §3 MUST be accounted for, with a verified value, explicit unknown or evidenced non-applicability. Dates for future lifecycle events may remain unknown. Incomplete intake stays provisional; a record used as a positive basis MUST have verified facts for its assessed scope. Where the exchange schema has no suitable unknown representation, retain the request as preliminary intake rather than inventing an ID or a completed fact.

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

#### Model record profile

A foundation model, pre-trained model, checkpoint, weights package, adapter or provider-hosted model is a material item with category `model_or_adapter`. Its controlled record MUST identify:

- artifact type;
- exact available model name, version, revision and integrity identifier, recognising that a provider service may expose a controlled version label rather than downloadable bytes;
- access mode: provider service, managed service, studio-hosted, on-premises, embedded or other;
- creator or supplier and the authoritative provenance source;
- every known upstream model ID and applicable dependency relationship;
- current authority evidence for the intended use, such as model or weights licences, provider terms, procurement agreements or an ownership determination; and
- interpreted rights and restrictions relevant to commercial use, inference, modification, fine-tuning, retained or derivative weights, redistribution, sublicensing, outputs, attribution and acceptable use.

Code, model weights, adapters and runtime dependencies can carry different terms. A verified model record keeps those authorities distinct. Unknown provenance, upstream lineage or authority remains explicit and cannot support permission.

### 3.7 Material collection

Represents a controlled set of material items used as one dataset, corpus, pack or batch.

It MUST contain or reference a versioned manifest. Its rights position is the intersection of the requirements applying to all included items and represented people. Removing an item produces a new collection version.

### 3.8 Tool environment

Represents an approved configuration, not a product brand in the abstract.

Required domain fields:

- product and provider;
- deployed or invoked model IDs matching the Source inventory;
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

Represents the request being assessed. It contains the five SLATE dimensions and references controlled records wherever possible. Source `inventoryStatus` covers both material and models. Each model reference contains only the model ID, exact record version and its role in this use. The controlled model record holds type, supplier, access mode, provenance, lineage and authority evidence. Environment repeats the model IDs to confirm what will actually run. The normative machine shape is defined in [`../schemas/slatecheck-proposed-use.schema.json`](../schemas/slatecheck-proposed-use.schema.json).

The request MUST preserve unknown values explicitly. A user-friendly front end can collect plain language first, then require confirmation of the structured proposal.

Use the schema's `unknown` or nullable values where available. Omitted optional facts remain unknown unless verified evidence establishes non-applicability. Empty contributor lists establish absence only with a verified inventory; empty production-ID lists mean verified absence of a production, while omission means unknown. Normalisation MUST preserve this distinction before rule matching.

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

The normative machine shape is defined in [`../schemas/slatecheck-decision.schema.json`](../schemas/slatecheck-decision.schema.json).

### 3.11 Obligation and event

Represents a required action and evidence of its lifecycle. Examples include consultation, payment, source deletion, model deletion, notice, attribution, human review and access removal.

An obligation has an owner, due date, status, evidence reference and consequence of non-completion. Completion does not alter the original decision; it adds a linked event.

The [assessment checklist](ASSESSMENT_CHECKLIST.md) is a working view over these records. Core record and authority status remain with the applicable fact, approval, obligation and decision records. A saved evidence-backed checklist references the decision version from which it was generated.

## 4. Required relationships

At minimum, a SlateCheck implementation MUST support these relationships:

```text
Production  --governed by--> Agreement
Person      --party to------> Agreement
Person      --covered by----> Collective instrument
Material    --originated in-> Production
Material    --represents----> Person
Material    --governed by---> Agreement
Collection  --contains------> Material
Proposed use--uses model----> Model material
Environment --deploys-------> Model material
Derivative  --derived from--> Material or Collection
Rule        --supported by--> Agreement or Policy
Rule        --applies to----> SlateCheck selectors
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

For a model, the first question includes its upstream foundation models, pre-trained checkpoints, adapters and conversions. Provider-hosted models retain lineage through controlled identifiers and documented provider provenance even when their bytes are unavailable.

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
| Source | production, material category, model ID, supplier, classification, lifecycle state |
| Legal authority/contributor | agreement, model authority evidence, party, contributor role, collective instrument, consent state, jurisdiction |
| AI operation | summarisation, embeddings, generation, training, synthetic performance, automated decision |
| Target use | same production, cross-production, reusable capability, public release, audience |
| Environment | tool, model ID, tenant, deployment, region, access group, provider training, retention |
| Time | effective period, expiry, production stage |

Selectors may use controlled categories and explicit IDs. Free-text selectors MUST NOT drive an automated permission outcome.

## 7. Data stewardship

The following table is an illustrative mapping for a larger studio. Minimum-overhead adopters assign the same fact-supply and verification responsibilities within their existing team and create rows only for the bounded uses they assess.

| Record family | Supplies facts | Verifies interpretation | Typical change event |
|---|---|---|---|
| Productions and ownership | Production operations | Business and legal affairs | Greenlight, amendment, delivery, wrap |
| Materials and lineage | Department or data steward | Production technology | Ingest, edit, collection change, archive |
| Models and upstream lineage | ML or tool owner / procurement | Production technology and authorised rights reviewer | Model, checkpoint, adapter, supplier, licence or provider-term change |
| Contributor identity and engagement | Casting / People and Culture | Business and legal affairs | Engagement, rider, withdrawal, role change |
| Collective terms | People and Culture / labour relations | Qualified legal adviser | New agreement, jurisdiction or term |
| Privacy basis and notices | Privacy owner | Privacy or legal adviser | New data class, purpose or notice |
| Tool environment | IT / security / procurement | Security, privacy and AI governance | Vendor, feature, region, setting or contract change |
| Policy rules | Domain owner | Named authority | Interpretation, policy or source change |
| Proposed use | Proposer and project owner | Relevant verifier | Any scope change |
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

A useful pilot does not require every historic asset. It needs enough connected records to exercise the selected real cases: representative productions, materials and models; contributors with differing terms; verified agreement and model-authority summaries; materially different tool environments; the rules needed for those cases; expected outcome states; and at least one derivative lineage chain.

The pilot SHOULD measure how often answers are blocked by missing facts. That reveals which records need operational ownership before further automation.

## 10. Obligation applicability and execution records

An obligation applicability record MUST identify the source obligation and its version, source authority, parent and child versions, transformation, affected artefact category, triggering event, disposition (`retained`, `released_by_interpretation`, `uncertain`), verifier and evidence. It MUST state the downstream consequence: restrict access, stop use, delete, quarantine, retire or retrain. A release cites a qualified interpretation covering the exact transformation and scope. Uncertainty remains actionable and visible.

Source-file deletion, output deletion, index removal and model retirement are distinct obligations. Removing a file from a training directory does not evidence removal of its influence from model weights. Where isolation is unverified, record quarantine, retirement or retraining as the pending response, with an owner and deadline.

An execution event records the decision ID/version, operator, time, actual manifest and environment versions, validity check, trigger check, prerequisite evidence and resulting execution state. Events append to history; they do not change issued decisions. Obligation completion and waivers similarly append evidence-backed events.

## 11. Frozen evidence bundles

The assessment-bundle schema packages a proposed use, decision, rules and controlled evidence records. Every referenced evidence and rule version MUST resolve to frozen content, including the evaluation profile, authority dependencies, collective terms and technical approvals. Records may point to restricted documents, but the archived snapshot must retain the verified facts and interpretations actually used. A hash alone cannot reconstruct unavailable content.

The evidence-record schema validates registry metadata and dependency references. Its `facts` object carries the record-family content described in this document. Each implementation MUST validate that domain content against its declared profile; passing the envelope schema alone establishes no rights.

The example bundle uses fictional controlled facts and verified gate findings. Its evidence records are projections of the facts used in the assessment, rather than complete operational registry exports; omitted domain facts remain outside the example's claims. It supports replay of a manual decision's gate aggregation. Automated implementations additionally preserve expanded source/person bindings, rule-match results and authority coverage proofs.

Bundle snapshots include a `sha256:` digest of each archived record using the `recordDigest` serialization: recursively sort object keys in UTF-16 lexicographic order, rebuild objects, then apply JavaScript `JSON.stringify` and hash the UTF-8 bytes. Integer-index keys follow JavaScript's numeric enumeration order; arrays retain their order, numbers use JavaScript serialization, and strings retain their Unicode form. Other runtimes MUST reproduce these bytes. Readers verify versions and digests; archive controls and verifier authority establish provenance.

## 12. Exchange versions and extensions

Version 0.2 uses JSON Schema Draft 2020-12 and versioned schema URNs. Load the five schemas together to resolve their references. A bundle declares `specVersion`; standalone records MUST travel with their schema URN in exchange metadata. A record's `version` identifies its content revision, independently of the specification version. Unsupported schema or profile versions require review before operational reliance.

Most exchange objects reject undeclared fields. Extensions MUST use declared schema extension points. Profiles MAY define namespaced domain fields inside evidence `facts` and extension gates through `organisation_defined` and `organisationGateName`. A versioned policy profile MUST document its vocabularies, domain validation, added gates and basis requirements. Other extensions require separately identified schemas or linked records. Extensions MUST preserve core meanings; unknown values or unsupported extensions affecting permission remain unresolved.
