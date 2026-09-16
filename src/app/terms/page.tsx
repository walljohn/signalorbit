import type { Metadata } from "next";
import Link from "next/link";
import { Bullets, Fill, LegalShell, Section } from "@/components/legal/Legal";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that apply to using the SignalOrbit website, including what the site is and is not, and the limits of our liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Use"
      summary="These terms apply to your use of this website. They are not the agreement under which we deliver leads — that is a separate written proposal and contract agreed with each client."
    >
      <Section id="acceptance" heading="Using this site">
        <p>
          By using this website you accept these terms. If you do not accept them, please do not use
          the site. We may update them, and the effective date above tells you when they last
          changed.
        </p>
      </Section>

      <Section id="not-an-offer" heading="This site is not an offer or a contract">
        <p>
          Everything on this site is provided for information. Submitting the consultation form does
          not create a contract, does not oblige us to take on your work, and does not oblige you to
          buy anything. Any engagement begins only when we both agree a written proposal, including
          the definition of a qualifying lead and the price.
        </p>
        <p>
          Our published offer of a first batch of free leads is subject to us agreeing a written
          lead brief with you, and to our judgement about whether we can research your market
          properly. We may decline work.
        </p>
      </Section>

      <Section id="no-guarantee" heading="No guarantee of results">
        <p>
          We do not promise meetings, replies, pipeline or revenue, and nothing on this site should
          be read as such a promise. Leads are an input. What happens after you contact someone
          depends on your offer, your pricing, your market, your timing and your follow-up, none of
          which we control.
        </p>
      </Section>

      <Section id="demo" heading="Demonstration content">
        <p>
          The interactive demonstration on the home page uses fictional companies, fictional people
          and illustrative output. The companies shown do not exist, nobody shown is a customer of
          ours, and the sample email is not a record of anyone&rsquo;s results. Any resemblance to a
          real business is coincidental.
        </p>
      </Section>

      <Section id="your-obligations" heading="What you agree not to do">
        <Bullets
          items={[
            "use the site in a way that breaks any law, or that infringes anyone else’s rights",
            "attempt to gain unauthorised access to the site, its systems or its data",
            "scrape, copy or republish the site’s content for a competing service",
            "submit false information, or another person’s details, through the consultation form",
            "interfere with the site’s operation, including by automated submissions or denial of service",
          ]}
        />
        <p>
          Our{" "}
          <Link href="/acceptable-use" className="text-signal underline underline-offset-4 hover:text-signal-deep">
            Anti-Spam and Acceptable Use policy
          </Link>{" "}
          sets out the additional rules that apply to clients who receive leads from us.
        </p>
      </Section>

      <Section id="ip" heading="Intellectual property">
        <p>
          The design, text, code and graphics on this site belong to us, except where credited
          otherwise. You may read, print and share the pages for your own business purposes. You may
          not reproduce them as part of a commercial product or a competing offering without our
          written permission. Lead records we deliver to a client are licensed to that client for
          their own outreach, and may not be resold or redistributed.
        </p>
      </Section>

      <Section id="third-parties" heading="Third-party links">
        <p>
          Where this site links to another organisation, we do not control that site and are not
          responsible for its content, its accuracy or its privacy practices.
        </p>
      </Section>

      <Section id="liability" heading="Disclaimer and limitation of liability">
        <p>
          This website is provided on an &ldquo;as is&rdquo; basis. We make no warranty that it will
          be uninterrupted, error-free or fit for any particular purpose, to the fullest extent the
          law allows.
        </p>
        <p>
          To the extent permitted by law, we are not liable for indirect, incidental, special or
          consequential loss, including lost profits or lost business, arising from your use of this
          site. Nothing in these terms limits liability that cannot lawfully be limited, including
          liability for fraud or for death or personal injury caused by negligence. Where our
          liability cannot be excluded, it is limited to the amount you have paid us in the twelve
          months before the claim, or <Fill value="[MINIMUM LIABILITY CAP, e.g. CAD $100]" /> if you
          have paid us nothing.
        </p>
      </Section>

      <Section id="law" heading="Governing law">
        <p>
          These terms are governed by the laws of <Fill value={LEGAL.province} />, Canada, and the
          applicable federal laws of Canada. The courts of <Fill value={LEGAL.province} /> have
          exclusive jurisdiction, except that we may bring proceedings to protect our intellectual
          property in any competent court.
        </p>
      </Section>

      <Section id="contact" heading="Contact">
        <p>
          <Fill value={LEGAL.entity} />, operating as {LEGAL.tradingName}.{" "}
          <Fill value={LEGAL.address} />. Written enquiries to <Fill value={LEGAL.contactEmail} />.
        </p>
      </Section>
    </LegalShell>
  );
}
