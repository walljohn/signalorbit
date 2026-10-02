import { SERVICES } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-28 sm:py-36 lg:py-44">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow="What you get"
            title="Every lead arrives ready to act on."
            lede="Research, verification and a recommended approach come together, so each lead reaches you as someone to contact rather than a name you still have to look up."
          />
        </Reveal>

        {/* Editorial stacked rows — OTR / Apple stage rhythm, not equal SaaS cards */}
        <div className="mt-20 divide-y divide-[var(--edge-light)] border-y border-[var(--edge-light)]">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 90}>
              <article className="grid gap-8 py-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-16 lg:py-16">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.28em] text-ember uppercase">
                    {service.kicker}
                  </p>
                  <h3 className="display mt-4 text-[2rem] text-ink sm:text-[2.4rem]">
                    {service.title}
                  </h3>
                </div>
                <div>
                  <p className="text-[1.05rem] leading-[1.75] text-mist">{service.body}</p>
                  <ul className="mt-8 space-y-3.5">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3.5 text-[0.92rem] leading-relaxed text-dim">
                        <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-ember" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
