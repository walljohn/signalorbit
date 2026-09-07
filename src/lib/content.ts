export const SITE = {
  name: "SignalOrbit",
  tagline: "AI-assisted outbound, run with your permission and your oversight.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://signalorbit.example",
} as const;

export type NavLink = { label: string; href: string; id: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Process", href: "#process", id: "process" },
  { label: "Demo", href: "#demo", id: "demo" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Scale", href: "#scale", id: "scale" },
  { label: "Onboarding", href: "#onboarding", id: "onboarding" },
  { label: "FAQ", href: "#faq", id: "faq" },
];

export type Step = {
  n: string;
  title: string;
  summary: string;
  detail: string;
  points: string[];
};

export const PROCESS_STEPS: Step[] = [
  {
    n: "01",
    title: "Define your audience",
    summary: "We agree on exactly who is worth a conversation.",
    detail:
      "We start from your best existing customers and your commercial goals, then turn that into a written definition: industries, company size, geography, technology signals, and the roles who actually own the problem you solve.",
    points: [
      "Industry, headcount band, region, and buying role",
      "Exclusion rules for current customers, partners, and competitors",
      "A written audience brief you sign off on before any research begins",
    ],
  },
  {
    n: "02",
    title: "Research prospects",
    summary: "We assemble a shortlist with facts we can point to.",
    detail:
      "Our researchers and AI tooling work through public and licensed business sources to build company and contact records. Every fact that reaches an email carries a source, and anything we cannot corroborate is dropped rather than guessed.",
    points: [
      "Company records built from public and licensed business sources",
      "Role, seniority, and contact details checked before use",
      "Unverifiable or stale details are discarded, not inferred",
    ],
  },
  {
    n: "03",
    title: "Personalize outreach",
    summary: "Each email is written for one reader, not one segment.",
    detail:
      "AI drafts from the verified facts on each record, working inside messaging you approve. A human reviews the sequence and spot-checks drafts before anything sends, so tone, claims, and offer stay accurate to your business.",
    points: [
      "Drafts grounded in the verified facts on that specific record",
      "Human review of messaging, claims, and tone before launch",
      "Your approval on the sequence before the first email leaves",
    ],
  },
  {
    n: "04",
    title: "Manage replies",
    summary: "Interested replies reach you ready to answer.",
    detail:
      "We monitor the inbox, sort replies, handle scheduling logistics, and hand you the conversations worth your time. Opt-outs and negative replies are actioned immediately and suppressed across every future campaign.",
    points: [
      "Replies triaged daily and routed to the right person on your team",
      "Meeting scheduling handled through to a confirmed calendar invite",
      "Opt-outs honoured immediately and suppressed permanently",
    ],
  },
];

export type Service = {
  title: string;
  kicker: string;
  body: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    kicker: "Research",
    title: "Prospect research",
    body:
      "We build the target list from scratch against your audience brief, then verify it. You get company and contact records with the reasoning attached, not an anonymous CSV.",
    bullets: [
      "Audience brief translated into a working target list",
      "Contact and company details verified before use",
      "Suppression of existing customers, partners, and competitors",
    ],
  },
  {
    kicker: "Messaging",
    title: "Personalized outreach",
    body:
      "Every email is drafted from what we actually know about that business. AI does the drafting at volume; a person owns the standard of what goes out under your name.",
    bullets: [
      "One-to-one drafts built from verified facts on each record",
      "Sequences, follow-ups, and timing you approve in advance",
      "Clear identification of your business and a working opt-out",
    ],
  },
  {
    kicker: "Conversations",
    title: "Reply management",
    body:
      "Outbound only pays off if replies are handled well. We watch the inbox, answer the routine questions, and bring you the conversations that deserve a salesperson.",
    bullets: [
      "Daily triage of interested, not-now, and not-interested replies",
      "Scheduling handled to a confirmed meeting on your calendar",
      "Weekly reporting on sends, replies, and booked conversations",
    ],
  },
];

export type OnboardingStep = { n: string; title: string; body: string };

export const ONBOARDING: OnboardingStep[] = [
  {
    n: "01",
    title: "Create a dedicated mailbox",
    body:
      "You create a new mailbox for outbound — typically on a separate domain you own and register yourself. It stays isolated from the inboxes your team relies on every day.",
  },
  {
    n: "02",
    title: "Authorize access",
    body:
      "You grant SignalOrbit access to that mailbox through your provider's standard authorization flow. You can review the permissions when you grant them and revoke them at any time, from your side, without asking us.",
  },
  {
    n: "03",
    title: "Approve the campaign",
    body:
      "You review the audience brief, the messaging, and the sequence. Nothing sends until you have approved it in writing, and changes mid-campaign go through the same approval.",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Who controls the email accounts and domains?",
    a: "You do. You register the domains, you create the mailboxes, and you own the billing relationship with your email provider. We work inside access you grant us, and you can withdraw that access at any moment through your provider's admin console — no request to us, no waiting period. There is no domain ownership transfer at any point in working with us, and nothing about your account is held in our name.",
  },
  {
    q: "What is done by AI, and what is done by a person?",
    a: "AI handles the parts that scale: sifting research sources, structuring company and contact records, and drafting individual emails from verified facts. People own the parts that carry judgement: the audience definition, the claims your business is willing to make, review of the message before launch, spot-checks of drafts during a campaign, and every reply that needs a real answer. No campaign launches on AI output alone.",
  },
  {
    q: "How are opt-outs and unsubscribe requests handled?",
    a: "Every email identifies your business and gives a working way to opt out. When someone opts out — through the link or by simply replying and asking — we action it on the day and add them to a permanent suppression list applied across every current and future campaign we run for you. We also honour the applicable rules in the regions you are contacting, and we will tell you plainly if an audience you want to reach sits somewhere we are not comfortable sending.",
  },
  {
    q: "Does sending more email guarantee more meetings or sales?",
    a: "No, and we will not claim otherwise. Volume is an input, not an outcome. Results depend on how well your offer fits the audience, how crowded your market is, your pricing, your reputation, how the timing lands, and how quickly your team follows up on the conversations we surface. We commit to the work — research quality, message quality, and how replies are handled — and we report honestly on what came back. Anyone promising you a number of meetings before they have seen your market is guessing.",
  },
  {
    q: "Where does the prospect data come from?",
    a: "Public and licensed business sources, assembled into records for the roles and companies in your audience brief. These are cold business prospects who have not asked to hear from you — we are direct about that, and we never describe them as inbound or organic leads. Facts we cannot corroborate do not make it into an email.",
  },
  {
    q: "What does it cost?",
    a: "We quote a custom monthly proposal after the consultation. Pricing depends on audience size, research depth, how many mailboxes are in play, and how much of the reply handling you want us to carry. We would rather scope it properly than publish a number that turns out to be wrong for your business.",
  },
];
