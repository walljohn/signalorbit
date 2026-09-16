# Legal pages — what you must fill in

The legal pages are drafts. Every value below is a placeholder, rendered on the
page with a yellow highlight so an unfinished document is obvious to anyone
reading it. Fill them in, then the highlights disappear on their own.

**Have a Canadian lawyer review these before relying on them.** They were
drafted for a business operating from Canada and prospecting in Canada and the
United States. They are not legal advice.

## 1. Values in `src/lib/legal.ts`

| Placeholder | What to put |
| --- | --- |
| `entity` | Your exact legal name — your own name if you are a sole proprietor, or the incorporated company name |
| `address` | A real mailing address. CAN-SPAM requires a valid physical postal address in commercial email, and a privacy policy needs a contact point |
| `privacyEmail` | The address that receives privacy, access and do-not-contact requests. It must be monitored |
| `contactEmail` | General and accessibility contact |
| `province` | The province whose law governs your terms, e.g. Ontario |
| `effective` / `updated` | Change both when you materially change the wording |
| `enquiryRetention` | How long you keep consultation enquiries. Currently 24 months |
| `prospectRetention` | How long you keep prospect records after an engagement ends. Currently 24 months |

## 2. Values written inline on the pages

| Page | Placeholder | What to put |
| --- | --- | --- |
| Privacy | `[HOSTING PROVIDER — e.g. Vercel]` | Your host. Vercel today |
| Privacy | `[EMAIL / CRM PROVIDER]` | Whatever receives the consultation form, e.g. Resend, or the webhook destination |
| Privacy | `[DATA SOURCES]` | The licensed or public sources your research actually uses. Be specific; this is the section a regulator reads first |
| Terms | `[MINIMUM LIABILITY CAP, e.g. CAD $100]` | The floor on your liability cap. Ask your lawyer |

## 3. Decisions to confirm before you launch a campaign

- **Retention periods.** 24 months is a reasonable default, not a legal
  requirement. Pick something you will actually honour.
- **Suppression list.** The Do Not Contact page promises action within one
  business day where possible and 10 business days at the outside. Make sure a
  real process exists behind that promise.
- **The privacy inbox.** Both the Privacy Policy and the Do Not Contact page
  promise a reply within 30 days for access requests. That inbox must be watched.
- **Sub-processor list.** Update the Privacy Policy whenever you add a tool that
  touches client or prospect data.
- **UK and EU prospects.** These documents deliberately do not cover GDPR. If you
  ever research or contact people in the UK or EU, you need a lawful-basis
  assessment, an Article 14 notice to each person whose data you sourced
  indirectly, a data-subject request process, and international transfer terms.
  Get advice before, not after.

## 4. Where the pages live

```
src/app/privacy/page.tsx          Privacy Policy
src/app/terms/page.tsx            Terms of Use
src/app/acceptable-use/page.tsx   Anti-Spam & Acceptable Use
src/app/do-not-contact/page.tsx   Do Not Contact / suppression requests
src/app/accessibility/page.tsx    Accessibility statement
src/lib/legal.ts                  Every placeholder value, in one place
src/components/legal/Legal.tsx    Shared page shell and the highlight for unfilled values
src/app/robots.ts, sitemap.ts     robots.txt and sitemap.xml
```
