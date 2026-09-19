# SlateCheck Publication Review

Review date: 19 September 2026

Specification: 0.2.0 working draft

Author: Ben Gunsberger

Scope: current specification, schemas, examples, reference harness and pilot materials

## Assessment

The specification is sufficiently comprehensive for external working-draft review and controlled pilot evaluation. It covers intake, individual and collective authority, technical processing, purpose and distribution, conditions, lineage, change response, appeals, privacy, conformance and evaluation. The minimum-overhead profile provides a bounded adoption path using existing jobs and repositories, a standing approval and one short repeat-use record. Further expansion should follow observed pilot findings.

Public distribution still needs an identified publication location and release snapshot. Explicit reuse terms now cover the human-readable framework and the technical implementation materials. Operational effectiveness remains untested: the five-case pilot is not started. This review establishes editorial and technical consistency within the checks below; it supplies no legal validation or operational certification.

## Findings addressed

| Finding | Revision |
|---|---|
| New readers lacked a short route through the document set | Added an audience-based reading guide and clearer working-draft status; credited the author. |
| Normative authority and handling of conflicting prose/schema requirements were unclear | Defined document authority and the separate responsibilities of structure, semantics and conformance. |
| Required record fields could imply that incomplete intake must invent facts | Defined unknown, provisional and non-applicable content, including when intake stays preliminary. |
| Extension advice conflicted with closed exchange objects | Specified supported extension points, profile requirements and schema-version metadata. |
| Processing readiness did not explicitly clear distribution duties | Added a release check for actual artefacts, recipients, channels and `before_release` conditions. The harness's lack of release enforcement is explicit. |
| Immutable archives and deletion duties needed a shared rule | Defined retention, authorised disposal, reconstruction limits and reassessment when active evidence is lost. |
| Checklist example used an undefined “condition plan” kind and lacked resolution-status guidance | Made it an approval action and explained links to the authoritative resolution records. |
| Conformance, adoption steps and reference descriptions repeated across documents | Consolidated the conformance matrix, adoption sequence and references; shortened redundant evaluation prose. |
| Examples could be mistaken for complete decisions across all outcomes | Distinguished the single complete bundle from abbreviated scenarios and added unconditional-permission and release boundary cases. |
| Digest description omitted JavaScript serialization behaviour | Documented integer-key ordering, number serialization and Unicode preservation for independent implementations. |
| Pilot scoring assumed five different requesters despite requiring only two | Expressed comprehension targets and denominators per case session. |
| The operating model implied a large role catalogue and an eight-step minimum workflow | Reduced the core to four responsibility functions, added a five-question routine path and moved the larger registry model to an expansion pattern. |
| Reuse terms were unresolved | Applied CC BY 4.0 to human-readable framework materials and Apache 2.0 to technical implementation materials; added a repository licence map, notice and brand policy. |
| Foundation and pre-trained models were implicit within the tool environment | Added a model Source inventory, controlled provenance and authority records, Environment binding, rule selectors and permission tests for provider-hosted and on-premises models. |

## Remaining release decisions

| Item | Required before public distribution |
|---|---|
| Canonical location and feedback | Identify the repository or publication URL and a corrections/contact route. |
| Release identity | Archive a dated, immutable snapshot with its tag or commit, version and change note. Keep historical releases available. |
| Distribution contents | Include the linked specification, schemas, fictional examples and validation harness. Publish blank pilot templates; review and de-identify any future completed results separately. |

Editorial corrections can retain the working-draft version before release. After publication, issue a new identified release for changes. During 0.x development, incompatible schema or decision-semantic changes require a new minor version and migration guidance; editorial corrections require an identified patch release. Record compatibility explicitly.

## Validation and limits

- All five JSON examples pass structural validation; the complete bundle passes selected semantic checks and manual decision replay.
- All 46 tests pass, including model inventory, provenance, authority, environment-binding and whole-scope selector cases; reference JavaScript syntax checks pass.
- All 67 local Markdown file links and all 6 local heading links resolve across 21 Markdown documents.
- The five primary foundation links were retrieved from their publishers. [Interoperability](INTEROPERABILITY.md#primary-references) identifies the cited editions and guidance.
- Validation environment: Node.js 25.8.1 and npm 11.11.0. Other runtime versions were not tested.

The complete published bundle ends in an approval hold. Tests exercise individual matching and execution primitives; they do not constitute a full evaluator suite for every outcome, authority combination or lifecycle event. Before production automation, implement the required cases in [Decision Specification §11](DECISION_SPECIFICATION.md#11-required-evaluator-tests), including release enforcement, domain validation and authority coverage. Independent ports also need digest interoperability tests.

The review preserved the generated PDF artefact for later regeneration and made no deployment or external publication changes. The repository now includes the selected reuse terms and explicit model-source controls. The remaining publisher decisions above remain open, and no external release was created.
