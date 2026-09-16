import type { Metadata } from "next";
import { Bullets, Fill, LegalShell, Section } from "@/components/legal/Legal";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "How the SignalOrbit website is built for accessibility, what we aim for, and how to report a problem.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalShell
      title="Accessibility"
      summary="We want this site to be usable by everyone, including people using a screen reader, a keyboard alone, or a device set to reduce motion. This page records what we have done and how to tell us when we have fallen short."
    >
      <Section id="standard" heading="What we aim for">
        <p>
          We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. We are not
          claiming a formal audit has been completed; this is a statement of intent and of the
          measures actually built into the site.
        </p>
      </Section>

      <Section id="measures" heading="What is built in">
        <Bullets
          items={[
            "Every interactive control is reachable and operable with a keyboard, and shows a visible focus ring.",
            "A skip link lets keyboard users jump straight to the main content.",
            "Headings follow a logical order, and landmarks identify the header, main content and footer.",
            "Text is checked for contrast against its background, and colour is never the only way information is conveyed.",
            "The animated hero respects the system 'reduce motion' setting: it is replaced with a still image, and page transitions are switched off.",
            "The hero animation is decorative and hidden from screen readers; its still alternative carries a text description.",
            "Form fields have permanent visible labels, and errors are announced, described in words, and linked to the field they concern.",
            "The layout reflows to a single column on small screens without horizontal scrolling, and respects browser zoom.",
          ]}
        />
      </Section>

      <Section id="known" heading="Known limitations">
        <Bullets
          items={[
            "The interactive demonstration is a rich widget; its output is exposed to screen readers as text, but the toggling experience is easier with a pointer.",
            "We have tested with keyboard navigation and automated checks, but not yet with a full range of assistive technologies.",
          ]}
        />
      </Section>

      <Section id="feedback" heading="Telling us about a problem">
        <p>
          If something on this site is difficult or impossible for you to use, please write to{" "}
          <Fill value={LEGAL.contactEmail} /> and describe what happened and what you were trying to
          do. We will reply within 10 business days, and we will tell you plainly whether we can fix
          it and when.
        </p>
        <p>
          If you need any information on this site in another format, ask and we will provide it at
          no cost. As an Ontario business we also support the aims of the Accessibility for
          Ontarians with Disabilities Act, and our accessibility contact is{" "}
          <Fill value={LEGAL.contactEmail} />.
        </p>
      </Section>
    </LegalShell>
  );
}
