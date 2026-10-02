import { FREE_LEADS, LEAD_CRITERIA } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Cta, Eyebrow } from "@/components/ui";

export function Offer() {
  return (
    <section id="offer" className="relative scroll-mt-24 py-28 sm:py-36 lg:py-44">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          {/* Inverted statement band inside paper — high-contrast product moment */}
          <div className="overflow-hidden bg-void text-cream">
            <div className="grid gap-14 p-8 sm:p-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:p-16 xl:p-20">
              <div>
                <Eyebrow tone="dark">The offer</Eyebrow>
                <p className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <span className="display text-[6.5rem] leading-none text-cream tabular-nums sm:text-[8.5rem]">
                    {FREE_LEADS}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.28em] whitespace-nowrap text-ember uppercase">
                    verified leads, free
                  </span>
                </p>

                <h2 className="display mt-10 max-w-md text-balance text-[2rem] text-cream sm:text-[2.5rem]">
                  Judge the leads before you pay anything.
                </h2>
                <p className="mt-6 max-w-md text-pretty text-[1.02rem] leading-[1.75] text-fog">
                  We deliver your first {FREE_LEADS} leads against criteria we agree in writing.
                  If they&rsquo;re worth acting on, we&rsquo;ll put together a custom monthly
                  proposal for ongoing delivery. If they aren&rsquo;t, you owe nothing.
                </p>

                <div className="mt-10">
                  <Cta href="#consultation" variant="solid">
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
                <p className="font-mono text-[10px] tracking-[0.26em] text-dim uppercase">
                  What counts as a lead
                </p>
                <ul className="mt-6 divide-y divide-[var(--edge-dark)] border-y border-[var(--edge-dark)]">
                  {LEAD_CRITERIA.map((item) => (
                    <li key={item.title} className="flex gap-4 py-6">
                      <span aria-hidden className="mt-2 h-px w-5 shrink-0 bg-ember" />
                      <div>
                        <h3 className="text-[1.05rem] font-medium tracking-[-0.015em] text-cream">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[0.9rem] leading-[1.7] text-fog">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[0.86rem] leading-[1.72] text-dim">
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
