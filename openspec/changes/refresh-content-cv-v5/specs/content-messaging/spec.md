## ADDED Requirements

### Requirement: Copy claims map to verifiable CV facts

Every experience or credential claim in the landing copy SHALL correspond to a fact stated in `CV_Biancardi_v5.md`. Numeric claims (years, credentials) SHALL match the CV; the copy SHALL NOT introduce metrics, clients, or outcomes not supported by the CV.

#### Scenario: Numeric claims match the CV

- **WHEN** the about section renders its stat counters and lead paragraph
- **THEN** the years-of-experience figure SHALL be `17+` and the payments-platform figure SHALL be `11+`, matching the CV's "17+ years" and "last 11 years focused on payment processing"

#### Scenario: No unsupported claims

- **WHEN** any card, strength, or lead paragraph asserts a capability, client, or result
- **THEN** that assertion SHALL be traceable to a line in `CV_Biancardi_v5.md`, with no invented client names, revenue/uptime figures, or team sizes

### Requirement: Payments pedigree and integrations are surfaced

The copy SHALL surface the CenPOS / Elavon / U.S. Bank pedigree and the named processor/acquirer integrations as concrete credibility signals, replacing generic phrasing such as "gateway connectivity".

#### Scenario: Pedigree appears in the experience narrative

- **WHEN** the about/experience section renders
- **THEN** the copy SHALL reference the CenPOS payment platform and its Elavon / U.S. Bank context as the setting for the payments experience

#### Scenario: Named integrations and message formats

- **WHEN** the payments messaging (services card and/or technology stack) renders
- **THEN** it SHALL name real integrations from the CV — Fiserv, Elavon, TSYS, Chase Paymentech — and reference ISO 8583 / XML-based payment messaging rather than only generic "integrations"

### Requirement: Cloud claims respect the professional/study honesty boundary

The copy SHALL present cloud experience at the honesty level the CV states: AWS as a held certification and Azure/DevOps as active study, NOT as production experience. The specific AWS credential SHALL be named.

#### Scenario: AWS credential is specific

- **WHEN** the copy references AWS certification
- **THEN** it SHALL name the AWS Certified Cloud Practitioner (CLF-C02) credential rather than a vague "AWS certified" phrase

#### Scenario: Azure framed as upskilling, not production

- **WHEN** the copy references Azure or DevOps cloud skills
- **THEN** it SHALL frame them as active upskilling / study-level (e.g., AZ-204, DevOps, containers/Kubernetes in progress) and SHALL NOT claim production cloud delivery experience the CV explicitly disclaims

### Requirement: EN and ES copy remain in parity

All refreshed copy SHALL exist in both `en` and `es` variants of `SiteContent`, expressing the same claims, with the `Record<Language, SiteContent>` type and existing keys (including the `[Stat, Stat, Stat, Stat]` tuple) preserved so `npm run build` passes.

#### Scenario: Both languages carry the same claims

- **WHEN** the language toggle switches between EN and ES
- **THEN** both variants SHALL present the same pedigree, integrations, and credential claims, with no claim present in one language but missing in the other

#### Scenario: Type integrity preserved

- **WHEN** `npm run build` runs after the copy refresh
- **THEN** it SHALL pass with no type errors, meaning every key present in `en` is present in `es` and the stats tuple retains exactly four entries

### Requirement: Business contact identity is preserved

The refresh SHALL keep the InnovatioX business identity for contact details and SHALL NOT expose the personal contact information from the CV.

#### Scenario: Business email retained

- **WHEN** the contact and footer sections render
- **THEN** the email SHALL remain `info@innovatiox.com`, and the personal CV email/phone SHALL NOT appear on the site
