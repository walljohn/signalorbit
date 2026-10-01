import { ONBOARDING } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";

export function Onboarding() {
  return (
    <section id="onboarding" className="relative scroll-mt-24 py-32 sm:py-40">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Getting started"
            title="Three steps, and nothing to pay to try it."
            lede="There’s no setup, and we never ask for access to your email or your CRM. You tell us who you sell to, judge the free batch, and decide."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {ONBOARDING.map((step, i) => (
            <Reveal key={step.n} delay={i * 110}>
              <div className="relative h-full">
                {i < ONBOARDING.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute top-[2.5rem] -right-3 z-10 hidden h-px w-6 bg-gradient-to-r from-signal/50 to-transparent md:block"
                  />
                ) : null}

                <div className="glass-panel group h-full rounded-[var(--radius-panel)] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--card-shadow-lift)] sm:p-9">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-signal/25 bg-gradient-to-b from-signal-tint to-abyss font-mono text-[0.8rem] text-signal shadow-[0_8px_20px_-12px_rgba(22,98,196,0.55)]">
                    {step.n}
                  </span>
                  <h3 className="mt-7 text-[1.22rem] font-medium tracking-[-0.022em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[0.94rem] leading-[1.75] text-mist">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={330}>
          <div className="mt-7 flex flex-col gap-4 rounded-[var(--radius-panel)] border border-signal/25 bg-gradient-to-br from-signal-tint via-signal-tint to-abyss p-6 shadow-[0_16px_40px_-28px_rgba(22,98,196,0.45)] sm:flex-row sm:items-center sm:gap-6 sm:p-8">
            <span
              aria-hidden
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-signal/30 bg-abyss text-signal shadow-sm"
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
