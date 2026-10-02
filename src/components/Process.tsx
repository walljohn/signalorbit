"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PROCESS_STEPS } from "@/lib/content";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Reveal } from "@/components/Reveal";

const DWELL_MS = 7000;

const r2 = (n: number) => Math.round(n * 100) / 100;

function StepVisual({ index }: { index: number }) {
  const common = "h-full w-full";
  const dim = "#c8c2b6";
  const on = "#b33a2b";
  const bright = "#141210";

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
            strokeOpacity={0.12 + i * 0.1}
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
        <rect x="42" y="30" width="236" height="140" rx="0" fill="none" stroke={on} strokeOpacity="0.28" />
        <rect x="42" y="30" width="236" height="30" rx="0" fill={on} fillOpacity="0.08" />
        <circle cx="62" cy="45" r="5" fill={on} fillOpacity="0.7" />
        <rect x="76" y="41" width="72" height="7" rx="0" fill={bright} fillOpacity="0.6" />
        {[78, 100, 122, 144].map((y, i) => (
          <g key={y}>
            <rect x="60" y={y} width={[96, 132, 74, 112][i]} height="6" rx="0" fill={dim} />
            <circle cx="258" cy={y + 3} r="4" fill={i === 3 ? dim : on} fillOpacity={i === 3 ? 1 : 0.8} />
          </g>
        ))}
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 320 200" className={common} aria-hidden>
        <rect x="30" y="52" width="104" height="96" rx="0" fill="none" stroke={on} strokeOpacity="0.25" />
        {[70, 88, 106, 124].map((y, i) => (
          <rect key={y} x="44" y={y} width={[64, 44, 72, 52][i]} height="5" rx="0" fill={on} fillOpacity="0.45" />
        ))}
        <path d="M142 100h36" stroke={on} strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="4 4" />
        <path d="M172 95l7 5-7 5" fill="none" stroke={on} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="188" y="40" width="102" height="120" rx="0" fill={on} fillOpacity="0.06" stroke={on} strokeOpacity="0.3" />
        {[62, 78, 94, 110, 126].map((y, i) => (
          <rect key={y} x="202" y={y} width={[74, 58, 70, 46, 64][i]} height="5" rx="0" fill={bright} fillOpacity={0.28 + i * 0.06} />
        ))}
        <rect x="202" y="142" width="32" height="8" rx="0" fill={on} fillOpacity="0.8" />
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
          <rect x="34" y={lane.y} width="252" height="34" rx="0" fill="none" stroke={on} strokeOpacity={0.12 + i * 0.02} />
          <circle cx="54" cy={lane.y + 17} r="5" fill={lane.color} fillOpacity={lane.label} />
          <rect x="70" y={lane.y + 13} width={[128, 96, 110][i]} height="6" rx="0" fill={bright} fillOpacity={lane.label * 0.5} />
          <rect x="240" y={lane.y + 11} width="30" height="10" rx="0" fill={on} fillOpacity={i === 0 ? 0.75 : 0.14} />
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
    <section id="process" ref={ref} className="relative scroll-mt-24 pt-20 pb-28 sm:pt-28 sm:pb-36 lg:pt-32 lg:pb-44">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Split masthead: index + title left, lede hanging right */}
        <div className="grid gap-8 border-b border-[var(--edge-light)] pb-12 lg:grid-cols-12 lg:gap-6 lg:pb-16">
          <Reveal className="lg:col-span-7">
            <p className="caption text-mist">02 — Process</p>
            <h2 className="display mt-5 max-w-xl text-balance text-[2.55rem] text-ink sm:text-[3.4rem] lg:text-[3.9rem]">
              Four stages, run in the open.
            </h2>
          </Reveal>
          <Reveal delay={90} variant="aside" className="flex items-end lg:col-span-5">
            <p className="max-w-sm text-pretty text-[1.02rem] leading-[1.7] text-mist lg:ml-auto lg:text-right">
              You approve who we look for before research starts, and every lead shows how it was
              verified. Nothing arrives as an anonymous list.
            </p>
          </Reveal>
        </div>

        <div
          className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14"
          onMouseEnter={() => setEngaged(true)}
          onFocusCapture={() => setEngaged(true)}
        >
          <Reveal variant="fade">
            <ol className="flex flex-col">
              {PROCESS_STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.n}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={isActive ? "step" : undefined}
                      className="group relative w-full cursor-pointer border-b border-[var(--edge-light)] py-6 text-left first:pt-0 last:border-b-0"
                    >
                      <span
                        aria-hidden
                        className={[
                          "absolute bottom-0 left-0 h-px origin-left bg-ember transition-[width]",
                          isActive
                            ? auto
                              ? "w-full ease-linear"
                              : "w-full duration-300"
                            : "w-0 duration-300",
                        ].join(" ")}
                        style={isActive && auto ? { transitionDuration: `${DWELL_MS}ms` } : undefined}
                      />
                      <div className="grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                        <span
                          className={[
                            "font-display text-[1.65rem] leading-none transition-colors duration-300 sm:text-[1.9rem]",
                            isActive ? "text-ember" : "text-dim group-hover:text-mist",
                          ].join(" ")}
                        >
                          {s.n}
                        </span>
                        <span className="min-w-0 pb-1">
                          <span
                            className={[
                              "block text-[1.2rem] font-medium tracking-[-0.02em] transition-colors duration-300 sm:text-[1.35rem]",
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

          <Reveal delay={100} variant="aside">
            <aside className="stage-frame sticky top-28 overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--edge-light)] px-5 py-3">
                <span className="caption text-mist">Stage {step.n}</span>
                <span className="font-mono text-[10px] tabular-nums text-dim">
                  {active + 1}/{PROCESS_STEPS.length}
                </span>
              </div>
              <div className="relative h-56 border-b border-[var(--edge-light)] bg-[linear-gradient(180deg,rgba(179,58,43,0.06),transparent)] px-5 py-5 sm:h-64">
                <div
                  key={active}
                  className="h-full w-full motion-safe:animate-[fade-up_520ms_cubic-bezier(0.22,1,0.36,1)]"
                >
                  <StepVisual index={active} />
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="display text-[1.7rem] text-ink sm:text-[1.95rem]">{step.title}</h3>
                <p className="mt-4 text-[0.97rem] leading-[1.72] text-mist">{step.detail}</p>
                <ul className="mt-7 space-y-3">
                  {step.points.map((point, i) => (
                    <li key={point} className="grid grid-cols-[1.5rem_1fr] gap-2 text-[0.9rem] leading-relaxed text-dim">
                      <span className="font-mono text-[10px] tabular-nums text-ember">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
