# SlateCheck Relationship to Existing Models

Version 0.2.0

SlateCheck combines established governance and policy concepts with creative-production records. The mappings below describe conceptual relationships. They are not assertions of formal standards conformance or lossless interchange.

| SlateCheck concept | Related foundation | SlateCheck-specific treatment |
|---|---|---|
| Permit, prohibit, conditions and constraints | ODRL permissions, prohibitions, duties and constraints | Gate-specific evidence, studio authority boundaries and contributor-level coverage |
| Materials, collections and governing parties | ODRL assets, asset collections and parties | Show provenance, manifests, individual riders and client-funded work |
| Purpose, processing, people, location and controls | Data Privacy Vocabulary (DPV) | Production relationship, retained capability, contributor and tool-environment records |
| Accountable ownership, review and lifecycle monitoring | NIST AI Risk Management Framework | An operational assessment, decision and obligation workflow for creative production |
| AI-product due diligence and ongoing review | OAIC guidance | Actual tenant, regions, provider use, retention and change-trigger evidence |

ODRL can provide policy-expression mappings; DPV can provide vocabulary mappings. Implementations should publish explicit term mappings, supported subsets, extensions and information lost during conversion. For example, a SlateCheck hold for missing evidence must retain its unresolved status rather than becoming an ODRL permission. A generic purpose label must preserve SlateCheck's independent production, reuse and distribution dimensions.

A future formal ODRL profile or DPV-aligned export requires separate specification and conformance tests. SlateCheck's contribution is the integrated production-specific workflow and its evaluated usefulness. Research novelty requires a broader literature and practice comparison than these mappings alone.

## Primary references

These are the editions used as design foundations. They are informative references; implementations verify the current law and guidance applicable to their own use. Links checked 16 September 2026.

- [W3C ODRL Information Model 2.2](https://www.w3.org/TR/odrl-model/)
- [Data Privacy Vocabulary 2.0, W3C Community Group report](https://www.w3.org/community/reports/dpvcg/CG-FINAL-dpv-20240801/) — a Community Group specification
- [NIST AI Risk Management Framework 1.0](https://doi.org/10.6028/NIST.AI.100-1) (2023)
- [OAIC guidance on commercially available AI products](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products)
- [OAIC guidance on developing and training generative AI models](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-developing-and-training-generative-ai-models)
