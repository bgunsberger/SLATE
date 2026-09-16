# Preliminary — requirements need verification

This non-normative example applies the preliminary stage in
[`ASSESSMENT_CHECKLIST.md`](../docs/ASSESSMENT_CHECKLIST.md).

## Use case

Train an internal audio-to-facial-animation model from voice recordings and
approved facial animation from one season of a company-owned series, then use
it to assist animation on a later season of the same IP.

The description excludes synthetic voice, unrelated IP, studio-wide reuse,
public release and provider model improvement. These boundaries remain
unverified.

## Supplied facts and assumptions

| Dimension | Supplied or assumed fact | State |
|---|---|---|
| Source | One season's recordings and matching approved facial animation | Supplied, unverified |
| Contracts and contributors | The company holds the same IP and distribution rights for both seasons | Supplied, unverified |
| Operation | Training maps audio to facial animation and retains a model | Partly supplied; retained artefacts assumed |
| Purpose | Assist production on a later season of the same IP | Supplied, unverified |
| Environment | Internal use | Supplied but insufficiently specific |

Separate production IDs, season-specific agreements, contributor terms,
upstream rig or capture rights, and the actual processing environment may still
change the assessment.

## Questions

| ID | Question | Owner | Evidence needed | Depends on |
|---|---|---|---|---|
| Q1 | What are the source and destination production IDs, parties and rights records? | Production data steward | Verified production and agreement references | — |
| Q2 | Which recordings, shots, performers and animation assets are included? | Production data steward | Versioned manifest and exclusions | Q1 |
| Q3 | Which rigs, capture, reference, vendor and third-party assets contributed to the facial animation? | Data steward and animation supervisor | Upstream lineage references | Q2 |
| Q4 | Which individual, employment, supplier and collective terms govern each represented contributor? | Business and Legal Affairs | Contributor-to-agreement mapping | Q2, Q3 |
| Q5 | What does the model learn, output and retain, and can it reproduce identity- or performance-specific characteristics? | ML lead | Reviewed technical description and evaluation plan | Q2, Q3 |
| Q6 | What product, model, tenant, regions, users, provider settings, retention and deletion controls apply? | IT and security | Verified environment record | Q5 |
| Q7 | Who has authority to verify rights, privacy, labour and environment findings? | Decision owner | Authority matrix and delegations | Q1, Q4, Q6 |

## Potential approval routes

These remain potential until the answers and controlled records establish that
they apply:

- rights authority for the exact sources, training, retained model and later season;
- individual and collective contributor coverage;
- privacy and people-impact review for identifiable recordings and learned characteristics;
- technical-environment approval; and
- an executable obligation plan for access, review, compensation, retention,
  withdrawal and deletion.

## Next action

Complete Q1 and Q2 first, then gather the remaining evidence in parallel.
Confirm a versioned Proposed Use and run all eight decision gates. Any
evidence-backed checklist is then derived from the resulting decision and
contains only unresolved work. This preliminary checklist grants no permission.
