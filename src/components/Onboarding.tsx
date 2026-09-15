import { ONBOARDING } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";

export function Onboarding() {
  return (
    <section id="onboarding" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Getting started"
            title="Three steps, and nothing to pay to try it."
            lede="There’s no setup, and we never ask for access to your email or your CRM. You tell us who you sell to, judge the free batch, and decide."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {ONBOARDING.map((step, i) => (
            <Reveal key={step.n} delay={i * 110}>
              <div className="relative h-full">
                {/* Connector between cards on wide layouts */}
                {i < ONBOARDING.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute top-[2.35rem] -right-3 hidden h-px w-6 bg-gradient-to-r from-signal/40 to-transparent md:block"
                  />
                ) : null}

                <div className="glass h-full rounded-[var(--radius-glass)] p-7 sm:p-8">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-signal/25 bg-signal/[0.08] font-mono text-[0.78rem] text-signal">
                    {step.n}
                  </span>
                  <h3 className="mt-6 text-[1.18rem] font-medium tracking-[-0.02em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3.5 text-[0.93rem] leading-[1.72] text-mist">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={330}>
          <div className="mt-6 flex flex-col gap-4 rounded-[var(--radius-glass)] border border-signal/20 bg-signal/[0.05] p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
            <span
              aria-hidden
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-signal/30 bg-void/60 text-signal"
            >
              <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2.5 3.5 5.2v4.4c0 3.6 2.6 6.9 6.5 7.9 3.9-1 6.5-4.3 6.5-7.9V5.2L10 2.5Z" />
                <path d="M7.6 10.1 9.3 11.8l3.3-3.6" />
              </svg>
            </span>
            <p className="text-[0.95rem] leading-[1.7] text-ink">
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
