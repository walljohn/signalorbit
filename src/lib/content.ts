export const SITE = {
  name: "SignalOrbit",
  tagline: "Verified B2B leads, ready to contact.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://signalorbit.app",
} as const;

/** Size of the free first batch. Every mention on the site reads from here. */
export const FREE_LEADS = 25;

export type NavLink = { label: string; href: string; id: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Process", href: "/#process", id: "process" },
  { label: "Demo", href: "/#demo", id: "demo" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Offer", href: "/#offer", id: "offer" },
  { label: "Onboarding", href: "/#onboarding", id: "onboarding" },
  { label: "FAQ", href: "/#faq", id: "faq" },
];

export type Criterion = { title: string; body: string };

/** The written definition of a lead. The offer, services and FAQ all point here. */
export const LEAD_CRITERIA: Criterion[] = [
  {
    title: "A named decision-maker",
    body: "The person who owns the problem you solve, not a generic info@ inbox.",
  },
  {
    title: "A company that matches your target",
    body: "Industry, size, region and any exclusions, exactly as written in your lead brief.",
  },
  {
    title: "A verified work email",
    body: "Checked before delivery. An address we can’t verify doesn’t count.",
  },
  {
    title: "At least two sourced reasons they fit",
    body: "Specific, checkable facts, each with a source you can open yourself.",
  },
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
    title: "Define your target",
    summary: "We agree on exactly who is worth your time.",
    detail:
      "We start from your best existing customers and what you sell, then write it down: industries, company size, region, buying signals, and the roles that own the problem you solve. That brief sets the criteria every lead is checked against.",
    points: [
      "Industry, company size, region and decision-making role",
      "Exclusions for current customers, partners and competitors",
      "A written lead brief you approve before research begins",
    ],
  },
  {
    n: "02",
    title: "Research prospects",
    summary: "We build the list from scratch against your brief.",
    detail:
      "Researchers and AI tooling work through public and licensed business sources to find companies that fit and the people who make the decision. Every fact we collect is recorded with where it came from.",
    points: [
      "Companies found through public and licensed business sources",
      "Decision-makers identified by what they own, not guessed from titles",
      "Every fact recorded alongside its source",
    ],
  },
  {
    n: "03",
    title: "Verify every lead",
    summary: "Nothing counts as a lead until it passes the checks.",
    detail:
      "Before a lead reaches you, a person confirms the role, verifies the work email, and makes sure there are at least two sourced reasons the company fits. Anything we can’t corroborate is dropped rather than guessed.",
    points: [
      "Role and work email confirmed before delivery",
      "At least two sourced reasons each lead fits",
      "Unverifiable or out-of-date details removed",
    ],
  },
  {
    n: "04",
    title: "Recommend the route",
    summary: "Each lead arrives with a way in.",
    detail:
      "For every lead we recommend the best route — email, LinkedIn, phone or an introduction — the angle to open with, and a draft opener built only from the verified facts. You send it from your own accounts, when it suits you.",
    points: [
      "The recommended channel for each lead, with the reason",
      "An angle and a draft opener grounded in the verified facts",
      "Delivered as a spreadsheet that imports into any CRM",
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
      "We build your lead list from scratch against a written brief, so every company on it is there for a reason you agreed to. The reasoning arrives with each lead, not buried in an anonymous export.",
    bullets: [
      "Your target written up as a brief you approve",
      "Companies and decision-makers found from public and licensed sources",
      "Existing customers, partners and competitors left out",
    ],
  },
  {
    kicker: "Verification",
    title: "Lead verification",
    body:
      "A name isn’t a lead until it’s been checked. Each one is confirmed against the same four criteria before it counts toward your delivery.",
    bullets: [
      "A named decision-maker at a company matching your target",
      "A work email verified before delivery",
      "At least two sourced reasons the company fits",
    ],
  },
  {
    kicker: "Approach",
    title: "Outreach recommendations",
    body:
      "For each lead we recommend how to get in touch and what to say first. AI drafts from the verified facts; a person checks the recommendation before it reaches you.",
    bullets: [
      "The best route for each lead: email, LinkedIn, phone or an introduction",
      "An angle and a draft opener grounded in the facts",
      "Guidance on identifying yourself and offering a clear opt-out",
    ],
  },
];

export type OnboardingStep = { n: string; title: string; body: string };

export const ONBOARDING: OnboardingStep[] = [
  {
    n: "01",
    title: "Tell us who you sell to",
    body:
      "Share your best customers, the market you want to grow in, and anyone to leave out. We turn it into a written lead brief with the criteria spelled out, and you approve it.",
  },
  {
    n: "02",
    title: `Receive your first ${FREE_LEADS} leads free`,
    body:
      "Delivered as a spreadsheet you can import into any CRM. Every lead lists its sources and a recommended route, so you can judge the quality line by line.",
  },
  {
    n: "03",
    title: "Decide what’s next",
    body:
      "If the leads are worth acting on, we’ll send a custom monthly proposal for ongoing delivery. If they aren’t, there’s nothing to cancel and nothing to pay.",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Are these warm leads?",
    a: "No, and we won’t call them that. A warm lead has already shown interest in you. Ours are researched, verified prospects who fit your target but haven’t heard from you yet. What they give your outreach is the best possible starting point: the right person, an address that works, and a real reason to get in touch.",
  },
  {
    q: `What counts as one of the ${FREE_LEADS} free leads?`,
    a: `A named decision-maker, at a company that matches your written target, with a verified work email and at least two sourced reasons they fit. A lead that misses any one of those doesn’t count toward your ${FREE_LEADS}, so the batch is judged on leads that meet the bar rather than on volume.`,
  },
  {
    q: "What happens after the free batch?",
    a: "If you want ongoing leads, we’ll prepare a custom monthly proposal based on your target market, how many leads you need, and how deep the research goes. Nothing rolls over automatically, and there’s nothing to cancel if you decide not to continue.",
  },
  {
    q: "Who sends the outreach?",
    a: "You do, from your own accounts. We recommend the channel, the angle and a draft opener for each lead, but we never send on your behalf or ask for access to your inbox or CRM.",
  },
  {
    q: "Where does the data come from?",
    a: "Public and licensed business sources — company websites, press releases, job listings, business directories and similar. Every lead lists the sources behind its facts so you can check them yourself, and anything we can’t corroborate doesn’t make it in.",
  },
  {
    q: "What is done by AI, and what is done by a person?",
    a: "AI handles the parts that scale: sifting sources, structuring company and contact records, and drafting openers from verified facts. People own the parts that need judgement: your lead brief, the verification checks, the recommended route, and a review of each batch before it’s delivered.",
  },
  {
    q: "What about anti-spam rules like CASL and CAN-SPAM?",
    a: "Commercial email is regulated — by CASL in Canada, CAN-SPAM in the US, and similar laws elsewhere. Our recommendations are written to help you comply: identify your business, keep the message relevant to the person’s role, and give a clear way to opt out. Because you send the messages, you’re responsible for how they’re sent, so confirm your approach with a qualified advisor.",
  },
  {
    q: "Will more leads guarantee more sales?",
    a: "No. Leads are an input, not an outcome. Results depend on your offer, your pricing, your market, your timing, and how quickly you follow up. We commit to the quality of the research and verification, and we’ll be straight with you about what we’re seeing.",
  },
];
