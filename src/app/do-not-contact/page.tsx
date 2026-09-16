import type { Metadata } from "next";
import Link from "next/link";
import { Bullets, Callout, Fill, LegalShell, Section } from "@/components/legal/Legal";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Do Not Contact",
  description:
    "Ask SignalOrbit to delete your record, stop researching you, and add you to a permanent suppression list.",
  alternates: { canonical: "/do-not-contact" },
};

export default function DoNotContactPage() {
  return (
    <LegalShell
      title="Do Not Contact"
      summary="If you have received an email from one of our clients, or you simply do not want to appear in our research, this page tells you how to stop it. There is no form to fill in, no account to create, and we will not ask you why."
    >
      <Section id="how" heading="How to be removed">
        <Callout>
          Email <Fill value={LEGAL.privacyEmail} /> with the subject line{" "}
          <strong className="font-medium">Do not contact</strong>. Include the email address or
          domain you want suppressed. That is all we need.
        </Callout>
        <p>
          If you are comfortable forwarding the message you received, it helps us find the exact
          record and tell the right client, but it is not required. You do not need to know which of
          our clients contacted you.
        </p>
      </Section>

      <Section id="what-happens" heading="What we do when you ask">
        <Bullets
          items={[
            "We add your address, and your company domain if you ask us to, to a permanent suppression list.",
            "We apply that list to every campaign we research, for every client, from that point on.",
            "We delete the research record we hold about you, apart from the minimum needed to keep the suppression working.",
            "We tell the client who received your record to stop contacting you and to suppress you on their side.",
            "We confirm to you in writing when it is done.",
          ]}
        />
        <p>
          We action requests within one business day wherever possible, and within 10 business days
          at the outside, which is the deadline CASL and CAN-SPAM set for honouring an opt-out.
        </p>
      </Section>

      <Section id="why-suppression" heading="Why we keep one small record">
        <p>
          A suppression list only works if it survives. If we deleted every trace of you, the same
          public sources could surface your details again next month and you would be contacted a
          second time. So we keep the minimum needed to recognise and exclude you — typically the
          email address and domain — and nothing else. We never use that list for any other purpose
          and never share it outside the suppression process.
        </p>
      </Section>

      <Section id="other-requests" heading="Other requests">
        <p>
          You can also ask us what information we hold about you, where we obtained it, and to
          correct anything wrong. Those requests go to the same address and are answered within 30
          days. Our{" "}
          <Link href="/privacy" className="text-signal underline underline-offset-4 hover:text-signal-deep">
            Privacy Policy
          </Link>{" "}
          explains the detail, and our{" "}
          <Link href="/acceptable-use" className="text-signal underline underline-offset-4 hover:text-signal-deep">
            Anti-Spam and Acceptable Use policy
          </Link>{" "}
          sets out what we require of clients who send outreach.
        </p>
        <p>
          If you are not satisfied with how we handle your request, you may complain to the Office
          of the Privacy Commissioner of Canada at priv.gc.ca or 1-800-282-1376.
        </p>
      </Section>
    </LegalShell>
  );
}
