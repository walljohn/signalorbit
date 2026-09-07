"use client";

import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";

const TARGET = 2500;
const DURATION_MS = 1400;

const CONSTRAINTS = [
  {
    title: "Audience size",
    body: "A tightly drawn audience runs out of qualified companies long before it runs out of daily capacity. We would rather stop than pad the list.",
  },
  {
    title: "Provider policies",
    body: "Your email provider sets its own limits on what a mailbox may send. We work inside them; we do not try to route around them.",
  },
  {
    title: "Deliverability",
    body: "Warm-up schedules, reply rates, and complaint signals all shape what a mailbox can safely carry. Volume gets throttled when the signals say so.",
  },
];

function useCountUp(active: boolean, reduced: boolean) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimated(Math.round(TARGET * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced]);

  // Anyone who asked for reduced motion simply gets the final number.
  if (!active) return 0;
  return reduced ? TARGET : animated;
}

export function Scale() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const value = useCountUp(inView, reduced);

  return (
    <section id="scale" ref={ref} className="relative scroll-mt-24 py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[36rem] -translate-y-1/2 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(77,163,255,0.09),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="glass overflow-hidden rounded-[var(--radius-glass)]">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:p-16">
              <div>
                <Eyebrow>Scale</Eyebrow>
                <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className="text-[4.4rem] leading-none font-semibold tracking-[-0.05em] text-gradient-ice tabular-nums sm:text-[5.6rem]"
                    aria-hidden
                  >
                    {value.toLocaleString("en-US")}
                  </span>
                  <span className="sr-only">2,500</span>
                  <span className="font-mono text-[11px] tracking-[0.22em] whitespace-nowrap text-signal uppercase">
                    per business day
                  </span>
                </p>
                <p className="mt-8 max-w-md text-pretty text-[1.05rem] leading-[1.7] text-ink">
                  Campaigns designed for up to 2,500 new prospects per business day, subject to
                  audience size, provider policies, and deliverability.
                </p>
                <p className="mt-6 max-w-md text-[0.92rem] leading-[1.7] text-dim">
                  That is a ceiling on capacity, not a promise about outcomes. In practice most
                  campaigns settle well below it, because the three limits below bite first — and we
                  would rather tell you that now than at the end of month one.
                </p>
              </div>

              <ul className="grid gap-px overflow-hidden rounded-2xl bg-[var(--edge)] sm:grid-cols-1">
                {CONSTRAINTS.map((item, i) => (
                  <li key={item.title} className="bg-abyss/80 p-6 sm:p-7">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-signal">0{i + 1}</span>
                      <div>
                        <h3 className="text-[1.02rem] font-medium tracking-[-0.015em] text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[0.9rem] leading-[1.68] text-dim">{item.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
