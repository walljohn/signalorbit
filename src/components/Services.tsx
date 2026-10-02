import { SERVICES } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionGlow, SectionHeading } from "@/components/ui";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-32 sm:py-40">
      <SectionGlow />
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What you get"
            title="Every lead arrives ready to act on."
            lede="Research, verification and a recommended approach come together, so each lead reaches you as someone to contact rather than a name you still have to look up."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 110}>
              <article className="group glass-panel relative h-full overflow-hidden rounded-[var(--radius-panel)] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-signal/30 hover:shadow-[var(--card-shadow-lift)] sm:p-9">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-8 -right-4 font-mono text-[7rem] leading-none font-semibold tracking-[-0.06em] text-signal/[0.06] select-none transition-colors duration-500 group-hover:text-signal/[0.1]"
                >
                  0{i + 1}
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(22,98,196,0.09),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.26em] text-signal uppercase">
                      {service.kicker}
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-signal/20 bg-signal-tint font-mono text-[10px] text-signal">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-[1.4rem] leading-snug font-medium tracking-[-0.025em] text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-[1.75] text-mist">{service.body}</p>

                  <ul className="mt-8 space-y-3.5 border-t border-[var(--edge)] pt-7">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[0.88rem] leading-relaxed text-dim">
                        <span aria-hidden className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-signal/80" />
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
