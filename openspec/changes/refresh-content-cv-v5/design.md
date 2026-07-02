## Context

The landing page is fully static; all marketing copy lives in a single typed store, `src/content/siteContent.ts`, as `Record<Language, SiteContent>` with `en` and `es` objects. Components (`Hero`, `Services`, `About`, `Technology`, `Footer`) read strings by key via the `useLanguage` hook — they hold no literal copy. This change is a copy refresh sourced from `CV_Biancardi_v5.md`; it is content work, not visual or interaction work, so the existing visual specs are untouched.

The only real complexity is (a) keeping the two language objects and the `SiteContent` type in lockstep so `npm run build` passes, and (b) honoring the CV's explicit honesty boundary between professional experience and study-level/personal skills.

## Goals / Non-Goals

**Goals:**
- Align hero, services, about, technology, and footer copy with CV v5 in both EN and ES.
- Turn generic phrasing into concrete, verifiable proof (CenPOS/Elavon/U.S. Bank, named processors, ISO 8583, AWS CLF-C02).
- Preserve the professional vs. study-level honesty distinction the CV makes about cloud.

**Non-Goals:**
- No layout, component structure, styling, or animation changes.
- No new sections (e.g. testimonials, certifications block) — this refreshes existing copy only.
- No change to contact identity (`info@innovatiox.com` stays; personal CV email/phone excluded).
- No i18n infrastructure changes; the existing two-language store is sufficient.

## Decisions

- **Edit copy in place, prefer no schema change.** Most updates fit existing keys (leads, descriptions, techStack entries, footer capabilities). Editing string values avoids touching components and keeps the diff reviewable. *Alternative considered:* adding a dedicated "credentials" or "trusted platforms" field — rejected for this change because it implies a new UI element (out of scope) and can be a follow-up if a visual block is wanted.
- **If a new field is unavoidable, update the `SiteContent` interface and both language objects in the same edit.** This keeps the `Record<Language, SiteContent>` type valid and the build green. Any new field is optional-free (both languages fill it) to avoid `undefined` handling in components.
- **Frame cloud honestly.** Replace "AWS certified" with "AWS Certified Cloud Practitioner (CLF-C02)" and keep Azure as active upskilling. *Why:* matches the CV's own "certification & study level (not production experience)" wording, protecting credibility with technical buyers who can verify.
- **Name integrations only as the CV does.** Fiserv, Elavon, TSYS, Chase Paymentech, ISO 8583, XML messaging are all CV-stated and safe to surface. We do not name specific merchant clients or invent metrics.
- **Keep ES accent/encoding conventions consistent with the existing file.** The current `es` copy already uses accented characters in some places and unaccented in others; new/edited ES strings follow the surrounding style so the diff stays minimal and the file stays consistent.

## Risks / Trade-offs

- **[EN/ES drift or missing key] →** After edits, run `npm run build`; the `Record<Language, SiteContent>` type fails compilation if a key exists in one language but not the other, catching drift automatically.
- **[Over-claiming / NDA sensitivity]** naming a payment platform and processors →** Only surface facts already public in the CV; keep it at pedigree level (platform + processors), no proprietary internals, no client names.
- **[Stat tuple breakage] →** `about.stats` is a fixed `[Stat, Stat, Stat, Stat]`; keep exactly four entries and preserve `target`/`suffix`/`label` shape.
- **[Scope creep into visuals] →** Restrict edits to `siteContent.ts` unless a genuinely new field is required; if so, limit the component touch to reading that field.

## Migration Plan

Not applicable — static content change deployed via the normal build/deploy pipeline. Rollback is a git revert of the content commit. No data, no runtime state.

## Open Questions

- Should the AWS credential and Azure upskilling get a small dedicated visual element later, or is inline copy enough for now? (Assumed inline for this change.)
- Is naming processors (Fiserv/TSYS/etc.) acceptable to the client, or should it stay at "major U.S. processors and acquirers"? (Defaulting to naming them since the CV does; easy to soften if the user prefers.)
