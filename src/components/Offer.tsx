import { FREE_LEADS, LEAD_CRITERIA } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Cta, Eyebrow } from "@/components/ui";

export function Offer() {
  return (
    <section id="offer" className="relative scroll-mt-24 py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[36rem] -translate-y-1/2 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(77,163,255,0.09),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="glass overflow-hidden rounded-[var(--radius-glass)]">
            <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:p-16">
              <div>
                <Eyebrow>The offer</Eyebrow>
                <p className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-[5rem] leading-none font-semibold tracking-[-0.05em] text-gradient-ice tabular-nums sm:text-[6.5rem]">
                    {FREE_LEADS}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.22em] whitespace-nowrap text-signal uppercase">
                    verified leads, free
                  </span>
                </p>

                <h2 className="mt-8 max-w-md text-balance text-[1.6rem] leading-[1.2] font-semibold tracking-[-0.02em] text-ink sm:text-[1.9rem]">
                  Judge the leads before you pay anything.
                </h2>
                <p className="mt-5 max-w-md text-pretty text-[1rem] leading-[1.72] text-mist">
                  We deliver your first {FREE_LEADS} leads against criteria we agree in writing.
                  If they&rsquo;re worth acting on, we&rsquo;ll put together a custom monthly
                  proposal for ongoing delivery. If they aren&rsquo;t, you owe nothing.
                </p>

                <div className="mt-9">
                  <Cta href="#consultation">
                    {`Get ${FREE_LEADS} leads free`}
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                    </svg>
                  </Cta>
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] tracking-[0.24em] text-dim uppercase">
                  What counts as a lead
                </p>
                <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-[var(--edge)]">
                  {LEAD_CRITERIA.map((item) => (
                    <li key={item.title} className="flex gap-4 bg-abyss/80 p-6 sm:p-7">
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        className="mt-1 h-4 w-4 shrink-0 text-signal"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.75 8.4 6.2 11.8l7-7.6" />
                      </svg>
                      <div>
                        <h3 className="text-[1.02rem] font-medium tracking-[-0.015em] text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[0.9rem] leading-[1.68] text-dim">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[0.86rem] leading-[1.7] text-dim">
                  A lead that misses any of these doesn&rsquo;t count toward your {FREE_LEADS}. These
                  are researched prospects who haven&rsquo;t heard from you yet, not warm leads —
                  what happens next depends on your offer, your market and your follow-up.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
