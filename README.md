# SCOPE

**Rights-Aware AI Governance for Creative Production**

SCOPE is an implementation-neutral framework for answering a practical question:

> Given this material, these contributors, these agreements, this AI activity, this destination and this tool, are we permitted to proceed?

The name describes the five dimensions of a proposed use:

- **Source** — what material is involved, where it came from and what it contains
- **Contracts and contributors** — which agreements, people and collective terms govern it
- **Operation** — what the AI system will do and what it will retain
- **Purpose** — why the work is being done, for whom and where the result will be used
- **Environment** — which tool, account, provider, locations, users and retention settings are involved

SCOPE turns fragmented production, contractual, contributor and technical information into a versioned decision record. It is designed for animation, VFX, games, film and other creative-production environments with a mix of client work, original IP, co-productions, employees, contractors and performers.

## Specification set

- [`docs/FRAMEWORK.md`](docs/FRAMEWORK.md) — conceptual model, principles, decision outcomes and conformance
- [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md) — records, relationships, required fields and data ownership
- [`docs/DECISION_SPECIFICATION.md`](docs/DECISION_SPECIFICATION.md) — deterministic assessment and conflict-resolution rules
- [`docs/GOVERNANCE.md`](docs/GOVERNANCE.md) — operating model, responsibilities and lifecycle controls
- [`docs/IMPLEMENTATION_SPECIFICATION.md`](docs/IMPLEMENTATION_SPECIFICATION.md) — system requirements, pilot structure and acceptance criteria
- [`docs/SCENARIOS.md`](docs/SCENARIOS.md) — worked examples for a fictional multi-location studio
- [`docs/GLOSSARY.md`](docs/GLOSSARY.md) — shared terminology
- [`schemas/`](schemas/) — JSON Schemas for proposed uses, policy rules and decisions
- [`examples/`](examples/) — machine-readable example assessments

The existing website prototype remains in `dist/` as design history. It is not the normative definition of SCOPE. The documents and schemas above are the source of truth for future implementations.

## Status

This is a working specification, version **0.1.0**. It is suitable for structured prototyping, stakeholder review and testing against real contract patterns. It does not provide legal advice or create permission. An organisation adopting SCOPE must configure its own policies, authorities, jurisdictions and review process with qualified legal, privacy, security, production and workforce representatives.

## Design foundations

SCOPE draws on established work without depending on a particular vendor or software stack:

- [W3C ODRL Information Model 2.2](https://www.w3.org/TR/odrl-model/) for permissions, prohibitions, duties, constraints and policy conflict
- [W3C Community Group Data Privacy Vocabulary 2.0](https://www.w3.org/community/reports/dpvcg/CG-FINAL-dpv-20240801/) for machine-readable descriptions of personal-data processing
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) for governed, documented risk management across the AI lifecycle
- [OAIC guidance on commercially available AI products](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products) and [model development and training](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-developing-and-training-generative-ai-models) for Australian privacy considerations

SCOPE extends these ideas with production-specific concepts such as show boundaries, contributor-level rights, client-funded work, source-to-model lineage, synthetic performance and cross-production reuse.

## Prototype validation

The schemas can be syntax-checked without installing dependencies:

```sh
npm run validate:spec
```

The earlier website prototype can still be checked with `npm run check` and `npm test`.
