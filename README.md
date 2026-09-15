# SignalOrbit

Marketing site for SignalOrbit, a B2B lead generation service. Each lead is a
named decision-maker at a company matching the client's written target, with a
verified work email, at least two sourced reasons they fit, and a recommended
outreach route. Clients get their first 25 verified leads free, then a custom
monthly proposal. SignalOrbit does not send outreach on the client's behalf.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and React Three
Fiber.

**Live preview:** https://walljohn.github.io/signalorbit/ — a static export
built by `.github/workflows/deploy-pages.yml` on every push to `main`. GitHub
Pages has no Node runtime, so that workflow deletes `src/app/api` before
building and Next falls back to a static export (`next.config.ts` switches on
`GITHUB_PAGES=true`). Everything on the preview is fully live — the 3D scene,
the process walkthrough, the demo composer, form validation — except actual
delivery of the consultation form, which correctly reports that no backend is
connected rather than faking a success. Deploy the full app (this repo, with
`src/app/api` intact) to a Node host such as Vercel for a working form.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also typechecks)
npm start        # serve the production build
npx eslint .     # lint
npx tsc --noEmit # typecheck only
```

---

## Required backend configuration

The consultation form is the only part of the site that needs configuration.
`POST /api/consultation` validates the submission server-side and then delivers
it. **It refuses to report success for an enquiry it did not deliver** — with no
delivery target configured it returns `503` and the form tells the visitor the
enquiry was not sent.

Copy `.env.example` to `.env.local` and configure **one** of:

| Option | Variables | Behaviour |
| --- | --- | --- |
| Webhook *(recommended)* | `CONSULTATION_WEBHOOK_URL` | `POST`s the enquiry as JSON. Any non-2xx response is surfaced to the visitor as a failure. |
| Email via [Resend](https://resend.com) | `RESEND_API_KEY`, `CONSULTATION_TO_EMAIL`, `CONSULTATION_FROM_EMAIL` | Sends the enquiry as plain text with `reply_to` set to the sender. The `from` domain must be verified in Resend. |
| Console log *(dev only)* | `CONSULTATION_DEV_LOG=true` | Logs the enquiry and returns success. Delivers nothing — never enable in production. |

Webhook payload:

```json
{
  "name": "Dana Whitfield",
  "email": "dana@harborline.example",
  "website": "https://harborline.example",
  "audience": "Operations directors at Benelux 3PL businesses, 50–500 staff.",
  "goals": "A steady flow of qualified conversations for two AEs.",
  "receivedAt": "2026-09-07T10:04:11.221Z",
  "userAgent": "Mozilla/5.0 …"
}
```

Also set `NEXT_PUBLIC_SITE_URL` (or edit `SITE.url` in `src/lib/content.ts`) so
canonical URLs and Open Graph tags point at the real domain.

### Route behaviour

| Status | Meaning |
| --- | --- |
| `200 {ok:true}` | Delivered. Only this shows the success state in the UI. |
| `422` | Validation failed; `fieldErrors` are mapped back onto the inputs. |
| `429` | Rate limited — 5 submissions per IP per 10 minutes. |
| `502` | The configured destination rejected the enquiry. |
| `503` | No delivery target configured. |

Two things to harden before real traffic:

- **Rate limiting is in-memory**, so it is per-instance. Behind more than one
  instance, back `src/app/api/consultation/route.ts` with Redis, Upstash, or
  Vercel KV.
- **Spam protection is a honeypot field only.** Add a CAPTCHA or Turnstile check
  if the form attracts bots.

---

## Structure

```
src/
  app/
    layout.tsx                  Metadata, fonts, JSON-LD, skip link, nav, footer
    page.tsx                    Section composition
    globals.css                 Design tokens, glass utilities, motion prefs
    api/consultation/route.ts   Validation, rate limiting, delivery
  components/
    hero/Hero.tsx               Hero copy, scrims, tier selection
    hero/OrbitScene.tsx         React Three Fiber orbital network
    hero/OrbitFallback.tsx      Static inline-SVG stand-in
    Nav.tsx  Footer.tsx  Reveal.tsx  ui.tsx
    Process.tsx                 Auto-advancing four-stage walkthrough
    EmailDemo.tsx               Verified facts → recommended approach (labelled demo)
    Services.tsx  Offer.tsx  Onboarding.tsx  Faq.tsx  ConsultationForm.tsx
  lib/
    content.ts                  All site copy
    demo.ts                     Fictional prospects for the composer demo
    hooks.ts                    Motion, viewport, render-tier, parallax hooks
    validation.ts               Form rules shared by client and server
```

---

## The hero scene

`useRenderTier()` in `src/lib/hooks.ts` picks one of three tiers on the client
before anything renders, so the canvas is never mounted on hardware that should
not run it:

| Tier | Chosen when | What renders |
| --- | --- | --- |
| `high` | Desktop-class hardware | Full canvas: 36 nodes, dust field, antialiasing, DPR up to 1.9 |
| `low` | Screens under 768px, ≤4 GB memory, or ≤4 cores | Canvas with 23 nodes, no antialiasing, DPR capped at 1.4, smaller framing |
| `static` | `prefers-reduced-motion: reduce`, `navigator.connection.saveData`, no WebGL context, or ≤2 GB / ≤2 cores | `OrbitFallback` — motionless inline SVG, no three.js on the page at all |

Other performance and accessibility properties:

- three.js is loaded through `next/dynamic` with `ssr: false`, so it stays out of
  the initial payload until a tier has been chosen.
- The canvas sets `frameloop="never"` once the hero scrolls out of view, so no
  frames are rendered while you are reading the rest of the page.
- All animation is additive-blended `Points`, `Sprite`, and `LineSegments` — no
  lights, no shadows, no post-processing.
- The canvas is `pointer-events: none` and `aria-hidden`; the fallback SVG
  carries `role="img"` and a label.
- Node placement uses a seeded PRNG, so the constellation is identical on every
  load rather than reshuffling.

The global `prefers-reduced-motion` rule in `globals.css` also flattens every CSS
transition, the scroll-reveal animations, smooth scrolling, the process
auto-advance, and the demo typewriter.

---

## Content notes

The copy is deliberately conservative. There are no prices, testimonials,
customer logos, performance statistics, or outcome guarantees anywhere on the
site.

- **The offer lives in one constant.** `FREE_LEADS` in `src/lib/content.ts`
  drives every mention of the free batch — hero, offer section, onboarding, FAQ,
  form and metadata. Change the number there.
- **A lead has a written definition.** `LEAD_CRITERIA` in the same file is the
  bar a lead must clear to count: a named decision-maker, a company matching the
  target, a verified work email, and at least two sourced reasons they fit.
- **Leads are never called warm.** They are researched prospects who haven't
  heard from the client yet. The FAQ says so directly; keep it that way, since a
  pay-after-results offer is exactly where an overstated promise turns into a
  payment dispute.
- **SignalOrbit recommends, the client sends.** The site describes outreach
  recommendations (route, angle, draft opener) and says plainly that we never
  send from client accounts. The FAQ points clients to CASL / CAN-SPAM and to a
  qualified advisor, because they are responsible for what they send.
- The composer demo uses fictional companies and contacts and is labelled as a
  demo in the UI, not only in source comments.
