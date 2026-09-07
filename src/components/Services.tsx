import { SERVICES } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What we run"
            title="Three pieces of work, held to one standard."
            lede="You can take all three or start with the part that is missing. Either way the standard is the same: nothing goes out under your name that we would not be comfortable receiving."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 110}>
              <article className="group glass relative h-full overflow-hidden rounded-[var(--radius-glass)] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--edge-strong)] sm:p-8">
                {/* Accent wash that only appears on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(77,163,255,0.16),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-signal uppercase">
                      {service.kicker}
                    </span>
                    <span className="font-mono text-[10px] text-dim">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-[1.34rem] leading-snug font-medium tracking-[-0.022em] text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[0.94rem] leading-[1.72] text-mist">{service.body}</p>

                  <ul className="mt-7 space-y-3 border-t border-[var(--edge)] pt-6">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[0.875rem] leading-relaxed text-dim">
                        <span aria-hidden className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-signal/70" />
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
