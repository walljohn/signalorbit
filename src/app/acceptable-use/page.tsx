import type { Metadata } from "next";
import Link from "next/link";
import { Bullets, Callout, Fill, LegalShell, Section } from "@/components/legal/Legal";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Anti-Spam & Acceptable Use",
  description:
    "The standards SignalOrbit holds itself to, and the rules clients agree to when they use leads we deliver, under CASL and CAN-SPAM.",
  alternates: { canonical: "/acceptable-use" },
};

export default function AcceptableUsePage() {
  return (
    <LegalShell
      title="Anti-Spam & Acceptable Use"
      summary="Cold outreach is regulated. This page sets out what we do to stay on the right side of those rules, and what clients must do with the leads we deliver. It forms part of every client agreement."
    >
      <Section id="who-sends" heading="We research. You send.">
        <Callout>
          We do not send outreach on a client&rsquo;s behalf and we never ask for access to a
          client&rsquo;s inbox. Clients send their own messages, from their own accounts. That means
          the sender is legally responsible for the messages they send, and this page explains what
          that responsibility involves.
        </Callout>
      </Section>

      <Section id="law" heading="The rules that apply">
        <p>
          <strong className="font-medium text-ink">CASL (Canada).</strong> Commercial electronic
          messages sent to Canadian recipients need consent, which may be express or implied.
          Implied consent includes a conspicuously published business address where the message is
          relevant to the person&rsquo;s role and no statement refuses such messages. Every message
          must identify the sender, give contact information valid for at least 60 days, and include
          an unsubscribe mechanism that is acted on within 10 business days. Penalties reach millions
          of dollars.
        </p>
        <p>
          <strong className="font-medium text-ink">CAN-SPAM (United States).</strong> Commercial
          email must not use misleading headers or subject lines, must identify itself as a
          solicitation where relevant, must include a valid physical postal address, and must offer
          a working opt-out honoured within 10 business days.
        </p>
        <p>
          This is a summary, not legal advice. Whether a particular campaign is lawful depends on
          who you are contacting and what you say. Take your own advice before you send.
        </p>
      </Section>

      <Section id="our-standards" heading="What we do">
        <Bullets
          items={[
            "Research only business contact information, for people in their professional capacity.",
            "Record a source for every fact we attach to a lead, so claims in outreach can be checked.",
            "Drop anything we cannot corroborate rather than guessing.",
            "Refuse to take information from behind a login or a paywall, or from a source whose terms prohibit it.",
            "Keep a permanent suppression list, and apply it across every campaign we research for every client.",
            "Write recommended openers that identify the sender and include a clear way to opt out.",
            "Tell a client plainly when an audience they want is one we are not comfortable researching.",
          ]}
        />
      </Section>

      <Section id="client-obligations" heading="What clients agree to">
        <p>By accepting leads from us, a client agrees to all of the following:</p>
        <Bullets
          items={[
            "Send only from accounts the client owns and controls, and identify the sending business honestly in every message.",
            "Include a working opt-out in every commercial message, and action opt-outs within 10 business days at the latest — same day is our recommendation.",
            "Pass every opt-out back to us promptly, so it can be added to the suppression list.",
            "Use leads only for business-to-business outreach relevant to the recipient’s role.",
            "Never use leads for consumer marketing, political messaging, adult content, gambling, cryptocurrency promotion, or anything the recipient would not reasonably expect.",
            "Never resell, publish, share or redistribute lead records, and never load them into a shared or third-party marketing database.",
            "Never send anything deceptive, threatening, harassing, or designed to look like it comes from someone else.",
            "Take their own legal advice on the campaigns they run.",
          ]}
        />
      </Section>

      <Section id="enforcement" heading="If these rules are broken">
        <p>
          If we learn that a client is using leads in a way this page prohibits, we may stop
          delivery immediately, end the engagement, and decline further work, without refund of
          amounts already earned. Serious misuse may be reported to the relevant regulator. This is
          not a technicality for us: our ability to operate depends on the people we research being
          treated properly.
        </p>
      </Section>

      <Section id="removal" heading="If you received an email and want it to stop">
        <p>
          You do not have to work out which client contacted you. Tell us and we will add you to our
          permanent suppression list and delete your record. Use the{" "}
          <Link href="/do-not-contact" className="text-signal underline underline-offset-4 hover:text-signal-deep">
            Do Not Contact page
          </Link>{" "}
          or write to <Fill value={LEGAL.privacyEmail} />.
        </p>
      </Section>
    </LegalShell>
  );
}
