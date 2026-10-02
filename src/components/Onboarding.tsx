import { ONBOARDING } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Onboarding() {
  return (
    <section id="onboarding" className="relative scroll-mt-24 pt-4 pb-24 sm:pt-8 sm:pb-32 lg:pb-40">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="caption text-mist">06 — Getting started</p>
            <h2 className="display mt-5 text-balance text-[2.35rem] text-ink sm:text-[3.1rem]">
              Three steps, and nothing to pay to try it.
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-[1rem] leading-[1.7] text-mist">
              There&rsquo;s no setup, and we never ask for access to your email or your CRM. You tell
              us who you sell to, judge the free batch, and decide.
            </p>
          </div>
        </Reveal>

        {/* Staggered path — not equal three-up cards */}
        <ol className="relative mt-16 lg:mt-20">
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-[1.15rem] hidden w-px bg-[var(--edge-light)] sm:left-[1.4rem] lg:block"
          />
          {ONBOARDING.map((step, i) => (
            <Reveal key={step.n} delay={i * 80} variant={i === 1 ? "aside" : "rise"}>
              <li
                className={[
                  "relative grid gap-4 border-t border-[var(--edge-light)] py-10 sm:grid-cols-[4rem_1fr] sm:gap-8 lg:grid-cols-[5rem_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12",
                  i === 0 ? "border-t-0 pt-0" : "",
                  i === ONBOARDING.length - 1 ? "pb-0" : "",
                  i === 1 ? "lg:pl-16" : i === 2 ? "lg:pl-8" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-3 sm:block">
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center border border-ember/50 bg-paper font-mono text-[11px] text-ember sm:h-11 sm:w-11 sm:text-[12px]">
                    {step.n}
                  </span>
                </div>
                <h3 className="display text-[1.55rem] text-ink sm:text-[1.75rem] lg:pt-1">
                  {step.title}
                </h3>
                <p className="text-[0.95rem] leading-[1.72] text-mist sm:col-span-2 lg:col-span-1 lg:pt-2">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200} variant="fade">
          <aside className="mt-14 grid gap-5 border border-[var(--edge-light)] bg-panel p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8 sm:p-8">
            <p className="caption whitespace-nowrap text-ember">Note</p>
            <p className="text-[0.97rem] leading-[1.72] text-ink">
              <strong className="font-medium">You stay in control of your outreach.</strong>{" "}
              <span className="text-mist">
                We never send from your accounts or ask for access to your inbox. You choose which
                leads to contact, how, and when.
              </span>
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
