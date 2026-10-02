import { ONBOARDING } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";

export function Onboarding() {
  return (
    <section id="onboarding" className="relative scroll-mt-24 py-28 sm:py-36 lg:py-44">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow="Getting started"
            title="Three steps, and nothing to pay to try it."
            lede="There’s no setup, and we never ask for access to your email or your CRM. You tell us who you sell to, judge the free batch, and decide."
          />
        </Reveal>

        <div className="mt-20 grid gap-0 border-t border-[var(--edge-light)] md:grid-cols-3">
          {ONBOARDING.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <div
                className={[
                  "relative h-full border-b border-[var(--edge-light)] py-10 md:border-b-0 md:py-12",
                  i < ONBOARDING.length - 1 ? "md:border-r md:pr-10 md:mr-0 lg:pr-14" : "",
                  i > 0 ? "md:pl-10 lg:pl-14" : "",
                ].join(" ")}
              >
                <span className="font-mono text-[11px] tracking-[0.28em] text-ember">
                  {step.n}
                </span>
                <h3 className="display mt-5 text-[1.65rem] text-ink sm:text-[1.85rem]">
                  {step.title}
                </h3>
                <p className="mt-5 text-[0.95rem] leading-[1.75] text-mist">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-12 flex flex-col gap-4 border border-[var(--edge-light)] bg-panel p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
            <span
              aria-hidden
              className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--edge-light-strong)] text-ember"
            >
              <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2.5 3.5 5.2v4.4c0 3.6 2.6 6.9 6.5 7.9 3.9-1 6.5-4.3 6.5-7.9V5.2L10 2.5Z" />
                <path d="M7.6 10.1 9.3 11.8l3.3-3.6" />
              </svg>
            </span>
            <p className="text-[0.97rem] leading-[1.72] text-ink">
              <strong className="font-medium">You stay in control of your outreach.</strong>{" "}
              <span className="text-mist">
                We never send from your accounts or ask for access to your inbox. You choose which
                leads to contact, how, and when.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
