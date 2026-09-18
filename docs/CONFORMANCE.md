# SlateCheck Conformance and Validation

Version 0.2.0

All unqualified MUST requirements apply at every level. Manual controls can meet a requirement unless automation or machine-readable exchange is explicitly assigned to a higher level. A conformance statement identifies the organisation, profile version, jurisdictions, level, responsible authority, evidence date and limitations.

Conformance levels describe capability, not staff count or organisational structure. The [Minimum-Overhead Profile](MINIMUM_OVERHEAD_PROFILE.md) is a valid Level 1 pattern: one person can perform several responsibility functions, evidence can remain in existing repositories, and a current standing approval can reduce each unchanged routine use to one short confirmation.

| Capability | Level 1 — Recorded | Level 2 — Governed | Level 3 — Connected | Level 4 — Assured |
|---|---|---|---|---|
| Five dimensions, eight gates, five outcomes and gate-specific bases | Required | Required | Required | Required |
| Routine use within a bounded standing approval | Five-question manual confirmation | Managed confirmation and assignments | Automated bounded matching and preflight | Independently tested |
| Preliminary intake and decision-derived action checklist | Manual preparation allowed | Managed assignments and authoritative resolution links | Integrated assessment workflow | Independently tested |
| Current evidence, full authority review and prerequisite checks | Human controls allowed | Human controls allowed | Automated checks plus reserved human decisions | Independently tested |
| Immutable decision and reconstructable evidence versions | Controlled archive allowed | Controlled archive and standard exports | Automated snapshots and replay | Independently tested |
| Access control, audit history and source/derivative references | Manual controlled registers allowed | Maintained programme | Integrated registers | Independently tested |
| Expiry, withdrawal, incident and suspension response | Named operator and events | Managed queues and service levels | Automated impact detection and enforcement | Exercised and audited |
| Rule positive/boundary regression cases | Documented review | Documented review | Executable conformance suite | Independently sampled |
| Standing approvals, verified cohorts and exception checks | Optional; controls required if used | Maintained programme | Automated bounded matching | Effectiveness measured |
| Published JSON export and semantic validation | Optional | Required | Required | Required |
| Deterministic rule evaluation and tuple-level coverage proof | Human findings preserved | Human findings preserved | Required automation | Independently tested |
| Independent control assurance and comparative performance measurement | Pilot encouraged | Pilot encouraged | Pilot required before production automation | Required periodically |

An implementation claiming Level 1 still needs the rights, privacy, security, validity and stop-use controls that apply to its bounded use. A verified standing approval supplies those findings until a recorded trigger, expiry or changed fact requires targeted review. A spreadsheet format alone establishes no conformance.

## Validation layers

1. **Structural:** JSON Schema checks types, mandatory properties, gate cardinality and effect-specific requirements.
2. **Semantic:** application checks cross-record references, exact versions and record digests, time, outcome aggregation, basis kinds, rule scope, conditions and approvals.
3. **Domain:** qualified reviewers verify the source facts, authority completeness, interpretations, technical settings and effectiveness of duties.
4. **Operational:** an operator or integration confirms the approved scope and prerequisites at execution, tracks changes and evidences completion.

The first two layers cannot establish the last two. A valid export can faithfully represent an incorrect human interpretation.

## Repository implementation status

`reference/semantics.js` contains executable primitives for three-valued set and retention matching, bound source rows, production-relationship derivation, gate aggregation and preflight readiness. `reference/validation.js` validates structural schemas and selected cross-record invariants and replays frozen manual findings. The CLI validates every published JSON example.

The helpers do not implement automated legal interpretation, a registry service, full authority-set discovery, exhaustive coverage proof checking, exception authorisation, identity verification, live environment monitoring, release-duty checks or operational enforcement. The bundle demonstrates a manual/hybrid decision core. The repository itself claims no operational conformance level. A complete implementation demonstrates its selected level through the controls above.

The [assessment checklist](ASSESSMENT_CHECKLIST.md) defines a derived output format, generation rules, acceptance cases and a worked example. Automated generation remains unimplemented. Existing tests cover the published schemas and reference helpers; checklist acceptance cases still require implementation validation.
