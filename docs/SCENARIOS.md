# SCOPE Worked Scenarios

Version 0.1.0

## Fictional studio

Northstar Animation is a fictional studio with teams in Sydney, Brisbane, Los Angeles and Vancouver. It produces client-funded series, company-owned originals, co-productions and internal media. Every name, agreement and decision below is invented.

These scenarios demonstrate reasoning structure rather than real legal outcomes. The same facts can produce different decisions under another contract, jurisdiction or policy.

## Scenario map

| Scenario | Source | Operation | Purpose | Environment | Outcome |
|---|---|---|---|---|---|
| 1. Client-show voices for an original | Completed client voice recordings | Train lip-sync model | Different, company-owned show | Private research tenant | Hold — approval required |
| 2. Same-show meeting summary | Production-only transcript | Summarise | Same production | Approved enterprise workspace | Permitted with conditions |
| 3. Original-show concept exploration | Cleared internal concept pack | Generate and transform | Same production | Private creative tenant | Permitted with conditions |
| 4. Employee-message ranking | Internal email and chat | Rank people | Employment decision support | Studio-hosted model | Prohibited under current rules |
| 5. Search across client notes | Multi-show notes and client feedback | Embed and retrieve | Reusable studio knowledge base | Private search environment | Hold — information required |
| 6. Client-funded improvements to a studio rig | Rig code with mixed lineage | Fine-tune rigging assistant | Reusable studio capability | Studio-hosted model | Hold — information required |
| 7. Approved source in a provider-training account | Cleared original-show art | Generate | Same production | Vendor account with training enabled | Prohibited under current rules |
| 8. Internal-show performer experiment | Named performer recordings | Train mouth-shape predictor | Same production research | Australia-only research tenant | Permitted with conditions |

## 1. Can we use voice recordings from a completed client show to train a lip-sync model for our own IP show?

### Confirmed proposal

- **Source:** Session HH-204 from the completed client service production *Harbor Heroes*. The manifest contains 12 WAV takes from Ava Lin and Mateo Ruiz.
- **Contracts and contributors:** StreamWave Kids controls archived production material. Ava's rider requires a purpose-specific training agreement. Mateo's rider prohibits synthetic voice substitution and does not expressly address mouth-shape training. Different fictional collective terms apply to each performer.
- **Operation:** Train and retain a model that predicts mouth shapes from dialogue audio. The technical description says the model does not generate audio, but its learned representation and deletion behaviour still require confirmation.
- **Purpose:** Use the model on *Moss & Moon*, a different production owned by Northstar.
- **Environment:** MotionMap Lab, an Australia-hosted private tenant with provider training disabled and a retained model artefact.

### Gate result

| Gate | Result | Reason |
|---|---|---|
| Inventory | Satisfied | Exact takes and represented performers are known. |
| Source authority | Approval required | No verified client permission covers cross-production model training. |
| Contributor rights | Approval required | Ava requires a new agreement; Mateo's terms need an authorised interpretation and potentially new consent. |
| Privacy and people impact | Approval required | Purpose-specific handling and contributor expectations require review. |
| Operation | Approval required | The retained capability must be described clearly enough to distinguish lip-sync prediction from synthetic performance. |
| Purpose and destination | Approval required | The proposed use crosses from client work to company IP. |
| Environment | Conditional | The private tenant is technically suitable if Legal approves this dataset and purpose. |
| Obligations | Approval required | Consent, compensation, collective minimums, model expiry and withdrawal response are unresolved. |

### Decision

**Hold — approval required. Do not train the model yet.**

The next action is a coordinated review owned by Business and Legal Affairs. It requires:

1. written client authority covering the exact recordings, learned artefact, destination production and retention;
2. a separate conclusion for each performer under their agreement and collective terms;
3. a technical statement describing inputs, outputs, learned capability, memorisation testing, access and deletion;
4. purpose-specific agreement, compensation and withdrawal terms where required;
5. an environment approval bound to the final scope.

Client approval alone would leave the contributor gates unresolved. Performer consent alone would leave the client and cross-production gates unresolved. The collection can be narrowed and reassessed if one performer's takes are excluded.

## 2. Can we summarise a production meeting for the same client show?

### Confirmed proposal

- **Source:** Transcript TT-0912 containing delivery and scheduling discussion for *Tiny Titans*. Personal discussion and performance commentary were removed. Participants received notice.
- **Contracts and contributors:** The client agreement permits same-show workflow assistance. A standing privacy and information-governance approval covers production-only meetings.
- **Operation:** Create a summary and action list. No embeddings or model training.
- **Purpose:** Share with the authorised *Tiny Titans* production team.
- **Environment:** NotePilot Enterprise in the show's tenant; provider training disabled; source deleted within 90 days.

### Decision

**Permitted with conditions.** The user records the meeting ID, checks the attendee and content exclusions, keeps the summary within the show team, verifies human accuracy and follows the 90-day deletion rule. A meeting containing HR, health or performance discussion requires a fresh assessment.

## 3. Can we use our original-show artwork for concept exploration?

### Confirmed proposal

The source is a manifest of 18 internally commissioned *Moss & Moon* designs. Artist riders cover same-show generative exploration. Licensed references and performer likenesses are excluded. The operation generates exploratory images for the same show in a private Australian tenant with provider training disabled.

### Decision

**Permitted with conditions.** Outputs remain within *Moss & Moon*, carry source-pack lineage, receive art-director review and are checked for unintended third-party or likeness content. Uploaded inputs are deleted within 14 days. Adding licensed reference images creates a new collection version and assessment.

## 4. Can we analyse staff messages to rank individual performance?

### Confirmed proposal

The sources are employee email, chat and production metrics. The operation scores and ranks named people for management use. The environment is studio-hosted.

### Decision

**Prohibited under current rules.** Northstar's fictional workforce AI policy expressly prohibits using communications or production metrics to score individual performance or make automated employment decisions. Hosting the model internally does not change the outcome. A separate aggregate workflow-health study could be proposed with de-identification, workforce consultation, privacy review and controls preventing individual inference.

## 5. Can we build a searchable AI knowledge base from all client notes?

### Confirmed proposal

The initial source selection points to “all ShotGrid notes” across five productions. It includes internal notes, client comments, review media links, personal names and unknown attachments. The operation creates embeddings and a persistent retrieval index for studio-wide use.

### Decision

**Hold — information required.** The source is not a controlled collection. The data steward must inventory productions, note categories, attachments, contributors and agreements; separate client-confidential and personal content; and identify which productions permit persistent cross-show retrieval. Each approved partition receives its own manifest, access group, retention and decision. “All notes” cannot act as an assessable source.

## 6. Can a reusable rigging assistant learn from a rig improved on a client-funded show?

### Confirmed proposal

Northstar brought a pre-existing rig framework to *Forest Patrol*, a client-funded service show. During production, the team added a deformation system, client character setup and show-specific scripts. The proposed operation fine-tunes a reusable rigging assistant for future productions.

### Decision

**Hold — information required.** Ownership of the pre-existing framework does not establish rights in every improvement. Production Operations and Legal must map the repository into:

- documented Northstar background IP;
- general improvements permitted for reuse;
- client-funded project IP;
- client assets and character-specific data;
- employee and contractor contributions;
- third-party libraries and licences.

The team can create a clean collection containing only positively cleared components, then reassess training, model retention and future destinations. This scenario shows why “our rig” is an insufficient source description.

## 7. Can cleared artwork be used in a vendor account that improves its models from customer data?

### Confirmed proposal

The source and same-show purpose are covered. The selected account allows the provider to retain inputs and outputs for service improvement and model training.

### Decision

**Prohibited under current rules.** Northstar's active environment policy prohibits provider training on confidential production material. The requester can move the proposal to an approved private tenant with provider training disabled and run a new assessment. Source clearance and environment approval are independent gates.

## 8. Can we run a same-show lip-sync experiment with a performer who has agreed?

### Confirmed proposal

Nia Okafor signed a fictional rider permitting named *Moss & Moon* takes to train a mouth-shape predictor for that production. The rider excludes voice and likeness synthesis, limits access to the Sydney and Brisbane research team, requires a research fee, requires source deletion within 30 days and sets model deletion for 31 December 2026. Applicable collective minimums have been checked. MotionMap Lab matches the stated Australian environment.

### Decision

**Permitted with conditions.** The decision lists the exact takes, team, environment, operation and dates. It requires payment evidence, source and model deletion records, lineage and immediate stop-use review if consent is withdrawn. US access, another performer, another show or a voice-generation feature creates a new assessment.

## What these scenarios demonstrate

The same data category can receive different outcomes because permission depends on the full proposal. Training is also not one category: a mouth-shape predictor, synthetic voice model, embedding index and reusable foundation model create different artefacts and risks. SCOPE makes those distinctions explicit and routes each unresolved issue to its actual owner.
