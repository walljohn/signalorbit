/**
 * Fictional data for the composer demo on the home page.
 *
 * None of this is a real company, a real person, or a real customer. It exists
 * only to show the shape of the work: verified facts in, a recommended
 * approach out. The UI labels it as a demo in the markup, not just in this comment.
 */

export type DemoFact = {
  id: string;
  label: string;
  source: string;
  /** The sentence this fact contributes to the draft. */
  line: string;
};

export type DemoProspect = {
  id: string;
  company: string;
  contact: string;
  firstName: string;
  role: string;
  location: string;
  /** The channel we'd recommend opening with. */
  route: string;
  /** One line on why, grounded in what's on the record. */
  routeReason: string;
  subject: string;
  ask: string;
  facts: DemoFact[];
};

export const DEMO_SENDER = {
  name: "Alex Moreau",
  role: "Founder",
  company: "Meridian Systems",
  address: "Meridian Systems, 4 Example Way, Manchester M1 0AA",
} as const;

export const DEMO_PROSPECTS: DemoProspect[] = [
  {
    id: "harborline",
    company: "Harborline Freight",
    contact: "Dana Whitfield",
    firstName: "Dana",
    role: "Director of Operations",
    location: "Rotterdam, NL",
    route: "Email",
    routeReason:
      "The work email is verified, and the new-site hiring gives a timely, specific reason to write now.",
    subject: "Rotterdam site + the coordinator hiring",
    ask: "Worth fifteen minutes to compare notes on how other Benelux 3PLs handled the same stretch? Happy to send the short version by email instead if that is easier.",
    facts: [
      {
        id: "site",
        label: "Opened a second distribution site in Rotterdam",
        source: "Company newsroom",
        line: "Congratulations on the second Rotterdam site — standing up a new distribution point while the first one is still at full tilt is not a small thing.",
      },
      {
        id: "hiring",
        label: "Hiring four warehouse coordinators",
        source: "Careers page",
        line: "I noticed you are hiring four warehouse coordinators, which usually means the new site is absorbing more manual coordination than planned.",
      },
      {
        id: "wms",
        label: "Job spec references an on-premise WMS",
        source: "Public job specification",
        line: "The coordinator spec mentions your on-premise WMS, so I am guessing cross-site stock visibility is being stitched together by people rather than by software right now.",
      },
      {
        id: "clients",
        label: "Serves 3PL clients across the Benelux",
        source: "Company website",
        line: "With 3PL clients across the Benelux, that visibility gap tends to show up first as client status calls your team cannot answer on the spot.",
      },
    ],
  },
  {
    id: "northvale",
    company: "Northvale Dental Group",
    contact: "Priya Raman",
    firstName: "Priya",
    role: "Practice Operations Lead",
    location: "Birmingham, UK",
    route: "Email, then a phone call",
    routeReason:
      "Email first so the note about the acquisitions can be forwarded to clinic managers; call head office if there's no reply within a week.",
    subject: "Nine locations, one intake process",
    ask: "If it is useful, I can walk you through what the first ninety days looked like for a group at a similar size. Fifteen minutes, and a straight answer on whether it applies to you.",
    facts: [
      {
        id: "acquired",
        label: "Acquired two clinics in the past year",
        source: "Press release",
        line: "Two acquisitions in a year is a lot of integration work, and the operations lead is usually the one absorbing it.",
      },
      {
        id: "locations",
        label: "Nine locations across the Midlands",
        source: "Locations page",
        line: "Across nine Midlands locations, the practices you inherited almost certainly do reception differently to the ones you built.",
      },
      {
        id: "paper",
        label: "Patient FAQ still references paper intake forms",
        source: "Patient FAQ page",
        line: "Your patient FAQ still points people at paper intake forms, which is often the last thing to get standardised after a merge.",
      },
      {
        id: "coordinator",
        label: "Advertising for a patient coordinator",
        source: "Job board listing",
        line: "The patient coordinator opening suggests you are solving the throughput problem with headcount for now.",
      },
    ],
  },
  {
    id: "cobalt",
    company: "Cobalt & Rowe",
    contact: "Marcus Ellery",
    firstName: "Marcus",
    role: "Managing Partner",
    location: "Leeds, UK",
    route: "Introduction, else email",
    routeReason:
      "An introduction through a mutual contact carries more weight with a managing partner; without one, email about the new practice group.",
    subject: "The new employment practice and where the enquiries land",
    ask: "Would a short call be useful — fifteen minutes on what tends to work for firms launching a practice group from scratch? No pitch deck, and I will send the summary either way.",
    facts: [
      {
        id: "practice",
        label: "Launched an employment law practice group",
        source: "Firm announcement",
        line: "Launching the employment practice group is the interesting part — a new group has to find its own enquiry flow rather than inherit one.",
      },
      {
        id: "size",
        label: "Team of 24 fee earners",
        source: "About page",
        line: "At 24 fee earners, partner time is the constraint on business development, not appetite.",
      },
      {
        id: "briefing",
        label: "Publishes a monthly HR compliance briefing",
        source: "Firm blog",
        line: "Your monthly HR compliance briefing is genuinely good, and it is the sort of asset that earns replies when it reaches the right in-house team directly.",
      },
      {
        id: "offices",
        label: "Two offices, Leeds and Manchester",
        source: "Contact page",
        line: "With Leeds and Manchester covered, the catchment for that group is wider than the firm's current referral network reaches.",
      },
    ],
  },
];

export function composeDemoEmail(prospect: DemoProspect, selected: string[]): string {
  const lines = prospect.facts.filter((f) => selected.includes(f.id)).map((f) => f.line);

  if (lines.length === 0) return "";

  const opening = lines[0];
  const middle = lines.slice(1);

  const paragraphs = [
    `Hi ${prospect.firstName},`,
    opening,
    ...(middle.length ? [middle.join(" ")] : []),
    prospect.ask,
    `${DEMO_SENDER.name}\n${DEMO_SENDER.role}, ${DEMO_SENDER.company}`,
    `Reply "no thanks" and you will not hear from me again. ${DEMO_SENDER.address}`,
  ];

  return paragraphs.join("\n\n");
}
