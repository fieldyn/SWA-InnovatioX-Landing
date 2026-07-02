## Why

The landing copy in `src/content/siteContent.ts` predates the v5 CV (`CV_Biancardi_v5.md`) and leaves the strongest trust signals on the table: it never names the CenPOS/Elavon/U.S. Bank pedigree, the specific processors and acquirers integrated (Fiserv, Elavon, TSYS, Chase Paymentech), the ISO 8583 messaging depth, or the now-concrete AWS Certified Cloud Practitioner (CLF-C02) credential. Prospective clients evaluating senior payments help judge on exactly these proofs, so the copy currently reads more generic than the experience warrants.

## What Changes

- Refresh the hero, about, services, technology, and footer copy (both `en` and `es`) so the messaging reflects CV v5 without over-claiming.
- Surface the **Elavon / U.S. Bank (CenPOS platform)** pedigree as an anchoring credibility signal in the about/experience section.
- Name the **processor & acquirer integrations** (Fiserv, Elavon, TSYS, Chase Paymentech) and **ISO 8583 / XML messaging** in the payments messaging and stack, replacing today's generic "gateway connectivity" phrasing.
- Replace the vague "AWS certified" line with the specific, verifiable **AWS Certified Cloud Practitioner (CLF-C02, 2026)** credential, and frame Azure as active upskilling (AZ-204, DevOps, containers/Kubernetes) rather than production experience — matching the honesty of the CV's "certification & study level (not production experience)" framing.
- Update the technology stack pills to include ISO 8583 and align cloud/tooling entries with the CV's skill grouping.
- Keep EN and ES copy in parity, keep the business email `info@innovatiox.com` (not the personal CV email), and keep all copy honest about professional vs. personal/side-project experience.

## Capabilities

### New Capabilities
- `content-messaging`: The set of requirements governing the landing page's marketing copy — what claims it makes, how those claims map to verifiable CV facts, the honesty boundary between professional and study-level/personal experience, and EN/ES parity.

### Modified Capabilities
<!-- None. Existing specs (hero-redesign, interactive-surfaces, layout-and-rhythm, visual-foundation) govern visual/interaction behavior, not copy content; their requirements are unchanged. -->

## Impact

- **Content:** `src/content/siteContent.ts` — hero, services, about (lead + strengths), technology (techStack), footer, and closingCta strings for both `en` and `es`.
- **Components:** No structural changes expected. `About.tsx`, `Services.tsx`, `Technology.tsx`, `Hero.tsx` consume content by key; edits are string-level. If a new field is needed (e.g., a "trusted platform" line), the `SiteContent` interface and both language objects update together.
- **Quality gate:** `npm run build` (tsc + vite) — types must stay in sync across the `Record<Language, SiteContent>`; the `[Stat, Stat, Stat, Stat]` tuple and existing keys must be preserved.
- **Source of truth:** `CV_Biancardi_v5.md` (currently untracked at repo root).
