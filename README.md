# SlateCheck

**Rights-Aware AI Governance for Creative Production**

Author: **Ben Gunsberger**

## Executive summary

SlateCheck is a governance method for deciding whether a specific use of AI is permitted within a creative business.

When someone proposes an AI activity, SlateCheck turns it into a structured case covering the exact material, the contracts and people connected to it, what the AI will do, why and where the result will be used, and the particular tool and account involved.

SlateCheck brings together the relevant facts, organisational rules and specialist decisions from Legal, Privacy, Security, Production and other responsible teams. It produces one of five clear outcomes: proceed, proceed with conditions, supply more information, obtain approval, or stop under the current rules.

Each answer applies only to the use that was assessed. It records the supporting evidence, required conditions, responsible people, validity period and changes that would require another review. Human specialists retain authority over contracts, privacy, security and approvals.

This repository currently contains a draft specification for the method: its governance model, decision rules, data structures, fictional examples, validation code and pilot plan. The planned pilot will test its usability, effectiveness and operating cost.

## How SlateCheck frames a request

SlateCheck answers a practical question:

> Given this material, these contributors, these agreements, this AI activity, this destination and this tool, are we permitted to proceed?

The **SLATE** model describes five dimensions of a proposed use:

- **Source** — the material, its provenance and contents
- **Legal authority and contributors** — the agreements, rights, people and collective terms governing it
- **AI operation** — what the AI system will do and retain
- **Target use** — the intended purpose, beneficiary, destination and audience
- **Environment** — the tool, account, provider, regions, access and retention settings

**Slate** names the complete proposed-use record; **Check** names the evidence-backed assessment applied to it.

SlateCheck records the evidence, authority, conditions and review triggers behind a bounded decision. It is designed for animation, VFX, games, film and other creative-production environments spanning client work, original IP, co-productions, employees, contractors and performers.

## Status and intended use

**Version 0.2.0 — working draft for review and controlled pilot evaluation.** The [five-case usability pilot](pilot/README.md) has [not yet started](pilot/RESULTS.md). Effectiveness and operating cost remain untested in that pilot. The reference code validates examples and selected semantics; it is a specification harness.

SlateCheck supports organisational decisions. It provides no legal advice or permission by itself. Adopters configure their own policies, authorities, jurisdictions and review process with qualified legal, privacy, security, production and workforce representatives.

The canonical publication location and reuse terms remain unresolved; see the [publication review](docs/PUBLICATION_REVIEW.md). This draft makes no open-licence grant. During the pilot, changes follow its evidence-led soft freeze.

## Reading guide

| Reader or task | Start here |
|---|---|
| Understand the framework | [Framework](docs/FRAMEWORK.md), then [worked scenarios](docs/SCENARIOS.md) |
| Ask what must be answered or approved | [Assessment checklist](docs/ASSESSMENT_CHECKLIST.md) |
| Set up governance and responsibilities | [Governance](docs/GOVERNANCE.md), then [conformance](docs/CONFORMANCE.md) |
| Implement or exchange records | [Data model](docs/DATA_MODEL.md), [decision rules](docs/DECISION_SPECIFICATION.md), [implementation requirements](docs/IMPLEMENTATION_SPECIFICATION.md) and [schemas](schemas/) |
| Evaluate usefulness and cost | [Five-case smoke pilot](pilot/README.md), then [comparative pilot](docs/PILOT_EVALUATION.md) |

## Specification set

The normative core comprises the Framework, Data Model, Decision Specification, Assessment Checklist, Governance, Implementation Specification, [Glossary](docs/GLOSSARY.md), Conformance and the five JSON Schemas. [Framework §2](docs/FRAMEWORK.md#2-normative-language) defines requirement language and document authority.

Supporting material is informative:

- [Scenarios](docs/SCENARIOS.md) — fictional worked assessments and boundary cases
- [Examples](examples/) — five JSON examples and a preliminary checklist; the [frozen bundle](examples/cross-show-lipsync.bundle.json) supports manual decision replay
- [Migration from 0.1](docs/MIGRATION_0.2.md) — incompatible purpose, selector and evidence changes
- [Interoperability and references](docs/INTEROPERABILITY.md) — conceptual relationships to ODRL 2.2, DPV 2.0, NIST AI RMF 1.0 and OAIC guidance
- [Pilot materials](pilot/README.md) and [comparative protocol](docs/PILOT_EVALUATION.md) — evaluation methods and unfilled results template
- [Publication review](docs/PUBLICATION_REVIEW.md) — editorial findings and remaining release decisions

## Validation

With Node.js and npm, install the locked dependencies and run:

```sh
npm ci
npm run validate:spec
npm run check
```

`validate:spec` validates all five JSON examples and runs the test suite, also available separately as `npm test`. The bundle checks frozen evidence and verified human gate findings; replay reconstructs its decision core. Domain review, authority completeness and execution controls require separate validation. [Conformance](docs/CONFORMANCE.md) states the harness's coverage and limitations.

A distribution should retain this README, `docs/`, `schemas/`, `examples/`, `reference/`, `scripts/`, `tests/`, blank pilot templates and both package manifests so readers can follow links and repeat validation. Exclude local dependencies, credentials and live pilot or client records. Archive an identified release snapshot with its date, publisher, licence and canonical location before public distribution.
