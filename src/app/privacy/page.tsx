import type { Metadata } from "next";
import Link from "next/link";
import { Bullets, Callout, Fill, LegalShell, Section } from "@/components/legal/Legal";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SignalOrbit handles information about clients, website visitors and the business prospects we research.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      summary="This policy explains what information we collect, why we collect it, who we share it with, and how to ask us to change or delete it. It covers two different groups of people: our clients and website visitors, and the business prospects we research on a client’s behalf."
    >
      <Section id="summary" heading="The short version">
        <Bullets
          items={[
            "This website sets no cookies, runs no analytics and loads no tracking pixels.",
            "If you fill in the consultation form, we use your answers to prepare your lead brief and to reply to you. We do not sell them or add you to a marketing list.",
            "We research business contact information about people in their professional capacity, from public and licensed business sources, and provide it to the client who commissioned the research.",
            "We do not send outreach for clients. Clients send their own messages from their own accounts.",
            <>
              Anyone can ask to be removed from our research and added to our permanent suppression
              list, at any time, through our{" "}
              <Link href="/do-not-contact" className="text-signal underline underline-offset-4 hover:text-signal-deep">
                Do Not Contact page
              </Link>
              .
            </>,
          ]}
        />
      </Section>

      <Section id="who-we-are" heading="Who we are">
        <p>
          <Fill value={LEGAL.entity} />, operating as {LEGAL.tradingName} (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;), is responsible for the information described in this policy. Our
          mailing address is <Fill value={LEGAL.address} /> and our privacy contact is{" "}
          <Fill value={LEGAL.privacyEmail} />.
        </p>
        <p>
          We operate from Canada and provide services to businesses in Canada and the United
          States. This policy is written to meet our obligations under Canada&rsquo;s Personal
          Information Protection and Electronic Documents Act (PIPEDA) and applicable United States
          privacy and anti-spam laws.
        </p>
      </Section>

      <Section id="website" heading="This website">
        <p>
          We deliberately keep this site free of tracking. It sets no cookies, uses no analytics
          product, and embeds no advertising or social media pixels. Fonts are served from our own
          domain, so viewing the site does not report your visit to a third party.
        </p>
        <p>Our hosting provider records standard server logs when a page is requested, including:</p>
        <Bullets
          items={[
            "the IP address the request came from",
            "the page requested, the time, and the response",
            "the browser user agent string",
          ]}
        />
        <p>
          These logs exist to keep the site running and secure, and are retained according to our
          hosting provider&rsquo;s standard schedule. Our contact form endpoint also holds IP
          addresses in memory for roughly ten minutes to limit how many submissions one connection
          can make. That short-lived record is never written to disk or shared.
        </p>
      </Section>

      <Section id="clients" heading="Information from our consultation form">
        <p>When you submit the consultation form, we collect:</p>
        <Bullets
          items={[
            "your name",
            "your work email address",
            "your company website",
            "the audience you want to reach, and the outcome you are aiming for, in your own words",
            "the time of submission and the browser user agent string, which help us spot automated abuse",
          ]}
        />
        <p>
          We use this to prepare your lead brief, to quote for the work, and to reply to you about
          your enquiry. We do not use it for unrelated marketing, we do not sell it, and we do not
          add you to any list we supply to anyone else.
        </p>
        <p>
          Submissions are delivered to our own inbox or customer records through the provider named
          in the list of service providers below. We keep enquiries for {LEGAL.enquiryRetention}{" "}
          from your last contact with us, then delete them, unless you become a client and we need
          them for our records.
        </p>
      </Section>

      <Section id="prospects" heading="Information about business prospects">
        <Callout>
          This is the section that matters most if you have received an email from one of our
          clients and are trying to work out how they found you. You can ask us to delete your
          record and stop researching you at any time, and we will action it whether or not the
          message came from a client of ours.
        </Callout>
        <p>
          The core of our service is researching businesses that fit a client&rsquo;s written
          target, and identifying the person who makes the relevant decision. About those people we
          may record:
        </p>
        <Bullets
          items={[
            "name, job title and employer",
            "a work email address, and sometimes a work phone number or a professional profile URL",
            "publicly reported facts about the business, such as a new location, a published job posting or an announcement, each stored alongside the source it came from",
          ]}
        />
        <p>We collect this from public and licensed business sources. We do not:</p>
        <Bullets
          items={[
            "collect personal email addresses, home addresses or personal phone numbers",
            "collect information about anyone in a personal or consumer capacity",
            "collect sensitive information such as health, financial, biometric or political data",
            "take information from behind a login, a paywall, or any source whose terms prohibit it",
            "buy consumer marketing lists",
          ]}
        />
        <p>
          Under PIPEDA, business contact information that is collected, used and disclosed solely to
          communicate with someone about their employment, business or profession is excluded from
          the Act&rsquo;s consent requirements. Our research is intended to fall within that
          exclusion. We nevertheless apply the protections in this policy to those records, and we
          honour deletion requests regardless of whether the law obliges us to.
        </p>
        <p>
          We provide each record only to the client who commissioned that research. We do not
          publish records, resell them, or supply the same record to several clients as a packaged
          list.
        </p>
        <p>
          We keep prospect records for the duration of the client engagement and for up to{" "}
          {LEGAL.prospectRetention} afterwards, then delete them. There is one exception: when
          someone asks not to be contacted, we keep the minimum information needed to enforce that
          (typically the email address and domain) on a suppression list indefinitely, because
          deleting it would let the same person be researched and contacted again later.
        </p>
      </Section>

      <Section id="sharing" heading="Who we share information with">
        <p>We share information in four situations, and no others:</p>
        <Bullets
          items={[
            "With the client who commissioned the research, for prospect records only.",
            <>
              With service providers who operate parts of our business under contract: our website
              host (<Fill value="[HOSTING PROVIDER — e.g. Vercel]" />), our form delivery and email
              provider (<Fill value="[EMAIL / CRM PROVIDER]" />), and our research data sources (
              <Fill value="[DATA SOURCES]" />). They may use the information only to provide their
              service to us.
            </>,
            "Where the law requires it, such as a valid court order or a lawful request from a regulator. We will tell you unless we are legally prohibited from doing so.",
            "If the business is sold or merged, in which case the buyer is bound by this policy until it gives notice of any change.",
          ]}
        />
        <p>We do not sell personal information, and we do not share it for advertising.</p>
      </Section>

      <Section id="location" heading="Where information is stored">
        <p>
          Our website, records and email are hosted on servers located in Canada and the United
          States. Information stored in the United States, or handled by a provider based there,
          may be accessible to United States courts and law enforcement under that
          country&rsquo;s laws. If you would prefer your enquiry not be processed on that basis,
          contact us at <Fill value={LEGAL.privacyEmail} /> instead of using the form.
        </p>
      </Section>

      <Section id="security" heading="How we protect information">
        <Bullets
          items={[
            "All traffic to this website is encrypted in transit using HTTPS.",
            "Access to client and prospect records is limited to the people who need it to do the work.",
            "Accounts used to run the business are protected with multi-factor authentication where the provider supports it.",
            "We collect the minimum we need, which is the most reliable protection of all.",
          ]}
        />
        <p>
          No method of transmission or storage is completely secure. If a breach occurs that creates
          a real risk of significant harm, we will notify affected people and the Office of the
          Privacy Commissioner of Canada as PIPEDA requires.
        </p>
      </Section>

      <Section id="rights" heading="Your choices and your rights">
        <p>Whoever you are, and wherever you are, you may ask us to:</p>
        <Bullets
          items={[
            "tell you what information we hold about you and where we obtained it",
            "correct anything inaccurate or out of date",
            "delete your information and stop researching you",
            "stop contacting you, permanently",
          ]}
        />
        <p>
          Write to <Fill value={LEGAL.privacyEmail} /> or use the{" "}
          <Link href="/do-not-contact" className="text-signal underline underline-offset-4 hover:text-signal-deep">
            Do Not Contact page
          </Link>
          . We respond within 30 days, as PIPEDA requires. We may ask you to confirm your identity
          before we release information, but never more than we need to match you to a record.
        </p>
        <p>
          <strong className="font-medium text-ink">In Canada:</strong> if you are not satisfied with
          our response, you may complain to the Office of the Privacy Commissioner of Canada at
          priv.gc.ca or 1-800-282-1376.
        </p>
        <p>
          <strong className="font-medium text-ink">In the United States:</strong> residents of
          California, Virginia, Colorado, Connecticut, Utah and other states with comprehensive
          privacy laws have rights to access, correct, delete and opt out of the sale or sharing of
          personal information. Those laws apply to us only if we meet their thresholds, which as a
          small business we may not. We honour access and deletion requests from anyone in the
          United States regardless, and we do not sell personal information or use it for targeted
          advertising.
        </p>
      </Section>

      <Section id="children" heading="Children">
        <p>
          This is a business-to-business service. It is not directed at children, and we do not
          knowingly collect information about anyone under 18. If you believe we have, tell us and
          we will delete it.
        </p>
      </Section>

      <Section id="changes" heading="Changes to this policy">
        <p>
          When we change how we handle information, we update this page and change the effective
          date at the top. If the change is material, we will say so plainly here rather than hoping
          you notice. Previous versions are available on request.
        </p>
      </Section>
    </LegalShell>
  );
}
