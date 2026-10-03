import { SERVICES } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="caption text-mist">04 — Delivery</p>
              <h2 className="display mt-5 text-balance text-[2.4rem] text-ink sm:text-[3.2rem] lg:text-[3.6rem]">
                Every lead arrives ready to act on.
              </h2>
            </div>
            <p className="max-w-xs text-pretty text-[0.95rem] leading-[1.7] text-mist sm:pb-1 sm:text-right">
              Research, verification and a recommended approach come together, so each lead reaches
              you as someone to contact rather than a name you still have to look up.
            </p>
          </div>
        </Reveal>

        {/* Asymmetric rows — each service is a different composition */}
        <div className="mt-16 space-y-0 lg:mt-20">
          {SERVICES.map((service, i) => {
            const odd = i % 2 === 1;
            return (
              <Reveal key={service.title} delay={i * 60} variant={odd ? "aside" : "rise"}>
                <article
                  className={[
                    "border-t border-[var(--edge-light)] py-12 lg:py-16",
                    i === SERVICES.length - 1 ? "border-b" : "",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "grid gap-8 lg:gap-12",
                      odd
                        ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
                        : "lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]",
                    ].join(" ")}
                  >
                    <div className={odd ? "lg:order-2" : ""}>
                      <div className="flex items-baseline gap-4">
                        <span className="font-display text-[2.4rem] leading-none text-ember/80 sm:text-[2.8rem]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="caption text-mist">{service.kicker}</p>
                          <h3 className="display mt-2 text-[1.85rem] text-ink sm:text-[2.15rem]">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className={odd ? "lg:order-1 lg:pr-8" : "lg:pl-4"}>
                      <p className="text-[1.02rem] leading-[1.72] text-mist">{service.body}</p>
                      <ul className="mt-7 border-l-2 border-ember/40 pl-5 space-y-3">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="text-[0.9rem] leading-relaxed text-dim">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
