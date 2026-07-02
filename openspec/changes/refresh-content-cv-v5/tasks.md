## 1. Experience & pedigree (about section)

- [x] 1.1 In `siteContent.ts`, update `about.lead` (EN + ES) to anchor the payments experience in the CenPOS platform / Elavon / U.S. Bank context, keeping the 17+ / 11+ figures.
- [x] 1.2 Update `about.strengths[0]` (payment platform depth, EN + ES) to name the transaction flow stages and the fact these run against major processors/acquirers.
- [x] 1.3 Verify `about.stats` still has exactly four entries with unchanged `target`/`suffix` shape (17+, 11+, cloud, languages).

## 2. Payments & integrations (services + hero)

- [x] 2.1 Update the payments services card `description` (card `02`, EN + ES) to name Fiserv, Elavon, TSYS, Chase Paymentech and ISO 8583 / XML messaging instead of generic "gateway connectivity".
- [x] 2.2 Review `hero.lead` and `hero.focusAreas` (EN + ES) for consistency with the sharpened payments/identity framing; adjust only if wording now conflicts.

## 3. Cloud honesty & credentials

- [x] 3.1 Update `about.strengths[3]` (EN + ES) to name "AWS Certified Cloud Practitioner (CLF-C02)" and frame Azure/DevOps as active upskilling, not production experience.
- [x] 3.2 Review the identity/cloud services card (card `03`, EN + ES) so cloud delivery language does not over-claim production cloud experience.

## 4. Technology stack

- [x] 4.1 Add `ISO 8583` to `technology.techStack` (EN + ES) under an appropriate category; align remaining cloud/tooling/identity entries with the CV skill grouping.
- [x] 4.2 Confirm `pill--<category>` categories used are within the `TechCategory` union so styling/type stay valid.

## 5. Footer & closing copy

- [x] 5.1 Review `footer.capabilities`, `footer.tagline`, and `closingCta` (EN + ES) for consistency with the refreshed claims; adjust wording only where it now conflicts.
- [x] 5.2 Confirm contact identity is unchanged: `info@innovatiox.com` retained, personal CV email/phone absent everywhere.

## 6. Verification

- [x] 6.1 Confirm EN and ES objects have identical key sets (no key added to one language only).
- [x] 6.2 Run `npm run build` and confirm it passes (tsc type-check + vite bundle) with no type or unused-symbol errors.
- [x] 6.3 Run `npm run dev`, toggle EN/ES, and visually confirm the refreshed copy renders correctly in both languages with no layout overflow.
