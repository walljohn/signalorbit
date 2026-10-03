import { FREE_LEADS, LEAD_CRITERIA } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/ui";

export function Offer() {
  return (
    <section id="offer" className="relative scroll-mt-24 pt-8 pb-24 sm:pt-12 sm:pb-32 lg:pb-36">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal variant="fade">
          {/* Full-bleed ink slab with offset number — not a padded SaaS card */}
          <div className="relative overflow-hidden bg-void text-cream">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-8 select-none font-display text-[14rem] leading-none text-cream/[0.04] sm:text-[18rem] lg:-right-4 lg:text-[22rem]"
            >
              {FREE_LEADS}
            </div>

            <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-12 lg:gap-10 lg:p-16 xl:p-20">
              <div className="lg:col-span-5">
                <p className="caption text-fog">05 — The offer</p>
                <p className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-1">
                  <span className="display-tight text-[5.5rem] leading-none text-cream tabular-nums sm:text-[7rem]">
                    {FREE_LEADS}
                  </span>
                  <span className="mb-3 max-w-[7rem] caption text-ember">
                    verified leads, free
                  </span>
                </p>

                <h2 className="display mt-8 max-w-sm text-balance text-[1.85rem] text-cream sm:text-[2.25rem]">
                  Judge the leads before you pay anything.
                </h2>
                <p className="mt-5 max-w-sm text-pretty text-[0.98rem] leading-[1.72] text-fog">
                  We deliver your first {FREE_LEADS} leads against criteria we agree in writing.
                  If they&rsquo;re worth acting on, we&rsquo;ll put together a custom monthly
                  proposal for ongoing delivery. If they aren&rsquo;t, you owe nothing.
                </p>

                <div className="mt-9">
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

              <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-[var(--edge-dark)]">
                <p className="caption text-dim">What counts as a lead</p>
                <ol className="mt-6">
                  {LEAD_CRITERIA.map((item, i) => (
                    <li
                      key={item.title}
                      className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-[var(--edge-dark)] py-5 first:border-t-0 first:pt-0"
                    >
                      <span className="font-display text-[1.4rem] leading-none text-ember">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[1.02rem] font-medium tracking-[-0.015em] text-cream">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-[0.88rem] leading-[1.68] text-fog">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 border-t border-[var(--edge-dark)] pt-5 text-[0.84rem] leading-[1.7] text-dim">
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
