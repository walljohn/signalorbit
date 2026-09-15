"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PROCESS_STEPS } from "@/lib/content";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";

const DWELL_MS = 7000;

/* Four small abstract scenes, one per stage. They share a grid and a palette so
   the walkthrough reads as one continuous system rather than four illustrations. */
/** Math.cos/sin can differ in the last bit between Node and the browser, which
 *  shows up as a hydration mismatch on server-rendered SVG. Rounding the
 *  coordinates makes both sides serialize identically. */
const r2 = (n: number) => Math.round(n * 100) / 100;

function StepVisual({ index }: { index: number }) {
  const common = "h-full w-full";
  const dim = "#1d2b3d";
  const on = "#4da3ff";
  const bright = "#cfe6ff";

  if (index === 0) {
    return (
      <svg viewBox="0 0 320 200" className={common} aria-hidden>
        {[86, 62, 38].map((r, i) => (
          <circle
            key={r}
            cx="160"
            cy="100"
            r={r}
            fill="none"
            stroke={on}
            strokeOpacity={0.1 + i * 0.09}
            strokeDasharray={i === 2 ? "0" : "3 6"}
          />
        ))}
        {Array.from({ length: 26 }).map((_, i) => {
          const a = (i / 26) * Math.PI * 2;
          const inside = i % 5 === 0;
          const r = inside ? 26 : 78 + (i % 3) * 14;
          return (
            <circle
              key={i}
              cx={r2(160 + Math.cos(a) * r)}
              cy={r2(100 + Math.sin(a) * r * 0.66)}
              r={inside ? 3.4 : 2}
              fill={inside ? bright : dim}
              opacity={inside ? 1 : 0.85}
            />
          );
        })}
        <circle cx="160" cy="100" r="5" fill={on} />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 320 200" className={common} aria-hidden>
        <rect x="42" y="30" width="236" height="140" rx="10" fill="none" stroke={on} strokeOpacity="0.22" />
        <rect x="42" y="30" width="236" height="30" rx="10" fill={on} fillOpacity="0.06" />
        <circle cx="62" cy="45" r="5" fill={on} fillOpacity="0.7" />
        <rect x="76" y="41" width="72" height="7" rx="3.5" fill={bright} fillOpacity="0.6" />
        {[78, 100, 122, 144].map((y, i) => (
          <g key={y}>
            <rect x="60" y={y} width={[96, 132, 74, 112][i]} height="6" rx="3" fill={dim} />
            <circle cx="258" cy={y + 3} r="4" fill={i === 3 ? "#3a4859" : on} fillOpacity={i === 3 ? 1 : 0.8} />
          </g>
        ))}
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 320 200" className={common} aria-hidden>
        <rect x="30" y="52" width="104" height="96" rx="8" fill="none" stroke={on} strokeOpacity="0.2" />
        {[70, 88, 106, 124].map((y, i) => (
          <rect key={y} x="44" y={y} width={[64, 44, 72, 52][i]} height="5" rx="2.5" fill={on} fillOpacity="0.45" />
        ))}
        <path d="M142 100h36" stroke={on} strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="4 4" />
        <path d="M172 95l7 5-7 5" fill="none" stroke={on} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="188" y="40" width="102" height="120" rx="8" fill={on} fillOpacity="0.05" stroke={on} strokeOpacity="0.28" />
        {[62, 78, 94, 110, 126].map((y, i) => (
          <rect key={y} x="202" y={y} width={[74, 58, 70, 46, 64][i]} height="5" rx="2.5" fill={bright} fillOpacity={0.28 + i * 0.06} />
        ))}
        <rect x="202" y="142" width="32" height="8" rx="4" fill={on} fillOpacity="0.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 200" className={common} aria-hidden>
      {[
        { y: 42, label: 0.9, color: on },
        { y: 84, label: 0.5, color: on },
        { y: 126, label: 0.28, color: dim },
      ].map((lane, i) => (
        <g key={lane.y}>
          <rect x="34" y={lane.y} width="252" height="34" rx="8" fill="none" stroke={on} strokeOpacity={0.1 + i * 0.02} />
          <circle cx="54" cy={lane.y + 17} r="5" fill={lane.color} fillOpacity={lane.label} />
          <rect x="70" y={lane.y + 13} width={[128, 96, 110][i]} height="6" rx="3" fill={bright} fillOpacity={lane.label * 0.5} />
          <rect x="240" y={lane.y + 11} width="30" height="10" rx="5" fill={on} fillOpacity={i === 0 ? 0.75 : 0.14} />
        </g>
      ))}
    </svg>
  );
}

export function Process() {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const timer = useRef<number | null>(null);

  const auto = inView && !reduced && !engaged;

  useEffect(() => {
    if (!auto) return;
    timer.current = window.setTimeout(
      () => setActive((i) => (i + 1) % PROCESS_STEPS.length),
      DWELL_MS,
    );
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [auto, active]);

  const select = useCallback((i: number) => {
    setActive(i);
    setEngaged(true);
  }, []);

  const step = PROCESS_STEPS[active];

  return (
    <section id="process" ref={ref} className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The process"
            title="Four stages, run in the open."
            lede="You approve who we look for before research starts, and every lead shows how it was verified. Nothing arrives as an anonymous list."
          />
        </Reveal>

        <div
          className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14"
          onMouseEnter={() => setEngaged(true)}
          onFocusCapture={() => setEngaged(true)}
        >
          {/* Stage selector */}
          <Reveal>
            <ol className="flex flex-col">
              {PROCESS_STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.n}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={isActive ? "step" : undefined}
                      className="group relative w-full cursor-pointer border-t border-[var(--edge)] py-6 text-left last:border-b"
                    >
                      {/* Dwell indicator doubles as the active marker */}
                      <span
                        aria-hidden
                        className={[
                          "absolute top-0 left-0 h-px bg-signal transition-[width]",
                          isActive
                            ? auto
                              ? "w-full ease-linear"
                              : "w-full duration-300"
                            : "w-0 duration-300",
                        ].join(" ")}
                        style={isActive && auto ? { transitionDuration: `${DWELL_MS}ms` } : undefined}
                      />
                      <div className="flex items-baseline gap-5">
                        <span
                          className={[
                            "font-mono text-[11px] tracking-[0.2em] transition-colors duration-300",
                            isActive ? "text-signal" : "text-dim group-hover:text-mist",
                          ].join(" ")}
                        >
                          {s.n}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={[
                              "block text-[1.18rem] font-medium tracking-[-0.02em] transition-colors duration-300 sm:text-[1.3rem]",
                              isActive ? "text-ink" : "text-mist group-hover:text-ink",
                            ].join(" ")}
                          >
                            {s.title}
                          </span>
                          <span
                            className={[
                              "mt-1.5 block text-[0.92rem] leading-relaxed transition-colors duration-300",
                              isActive ? "text-mist" : "text-dim",
                            ].join(" ")}
                          >
                            {s.summary}
                          </span>
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* Stage detail */}
          <Reveal delay={120}>
            <div className="glass sticky top-28 overflow-hidden rounded-[var(--radius-glass)]">
              <div className="relative h-60 border-b border-[var(--edge)] bg-[radial-gradient(120%_120%_at_50%_0%,rgba(77,163,255,0.14),transparent_62%)] px-6 py-5">
                <div
                  key={active}
                  className="h-full w-full motion-safe:animate-[fade-up_620ms_cubic-bezier(0.16,1,0.3,1)]"
                >
                  <StepVisual index={active} />
                </div>
                <span className="absolute top-5 right-6 font-mono text-[10px] tracking-[0.26em] text-dim uppercase">
                  Stage {step.n}
                </span>
              </div>

              <div className="p-7 sm:p-9">
                <h3 className="text-[1.35rem] font-medium tracking-[-0.02em] text-ink">{step.title}</h3>
                <p className="mt-4 text-[0.98rem] leading-[1.72] text-mist">{step.detail}</p>
                <ul className="mt-7 space-y-3.5">
                  {step.points.map((point) => (
                    <li key={point} className="flex gap-3.5 text-[0.92rem] leading-relaxed text-dim">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
