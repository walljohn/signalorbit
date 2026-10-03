"use client";

import { useEffect, useMemo, useState } from "react";
import { composeDemoEmail, DEMO_PROSPECTS, DEMO_SENDER } from "@/lib/demo";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Reveal } from "@/components/Reveal";

const TYPE_CHARS_PER_TICK = 4;
const TYPE_TICK_MS = 12;

export function EmailDemo() {
  const [prospectIndex, setProspectIndex] = useState(0);
  const prospect = DEMO_PROSPECTS[prospectIndex];

  const [selected, setSelected] = useState<string[]>(() =>
    DEMO_PROSPECTS[0].facts.map((f) => f.id),
  );

  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  const email = useMemo(() => composeDemoEmail(prospect, selected), [prospect, selected]);
  const animate = inView && !reduced;

  const [progress, setProgress] = useState<{ draft: string; count: number }>({
    draft: "",
    count: 0,
  });

  useEffect(() => {
    if (!animate || !email) return;

    const start = performance.now();
    const id = window.setInterval(() => {
      const ticks = Math.ceil((performance.now() - start) / TYPE_TICK_MS);
      const count = Math.min(ticks * TYPE_CHARS_PER_TICK, email.length);
      if (count >= email.length) window.clearInterval(id);
      setProgress({ draft: email, count });
    }, TYPE_TICK_MS);

    return () => window.clearInterval(id);
  }, [email, animate]);

  const switchProspect = (i: number) => {
    setProspectIndex(i);
    setSelected(DEMO_PROSPECTS[i].facts.map((f) => f.id));
  };

  const toggleFact = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((f) => f !== id) : [...current, id],
    );
  };

  const typed = animate ? (progress.draft === email ? progress.count : 0) : email.length;
  const visible = email.slice(0, typed);
  const typing = typed < email.length;

  return (
    <section id="demo" ref={ref} className="relative scroll-mt-24 pt-24 pb-28 sm:pt-32 sm:pb-36 lg:pt-36 lg:pb-44">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="caption text-fog">03 — Live brief</p>
            <h2 className="display mt-5 text-balance text-[2.35rem] text-cream sm:text-[3.1rem] lg:text-[3.4rem]">
              Verified facts in. A recommended approach out.
            </h2>
          </Reveal>
          <Reveal delay={70} variant="aside" className="flex items-end lg:col-span-7">
            <p className="max-w-md text-pretty text-[0.98rem] leading-[1.7] text-fog lg:ml-auto">
              Every lead we deliver comes with a recommended route and a draft opener built from what
              we verified. Toggle the facts and watch the draft change. Remove them all and there is
              nothing honest left to suggest, so in a real delivery that lead goes back for research.
            </p>
          </Reveal>
        </div>

        <Reveal delay={40} variant="fade">
          <p className="mt-8 inline-flex max-w-2xl flex-wrap items-baseline gap-x-3 gap-y-1 border-l-2 border-ember/60 pl-4 text-[0.8rem] leading-relaxed text-fog">
            <span className="caption text-ember">Demo</span>
            Fictional company, fictional contact, illustrative output. Not a customer, not a real
            prospect, and not a sample of anyone&rsquo;s results.
          </p>
        </Reveal>

        {/* Dossier: margin index + case file — Signal Orbit specific, not generic dashboard */}
        <div className="mt-14 overflow-hidden border border-[var(--edge-dark)] lg:mt-16">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--edge-dark)] bg-cream/[0.03] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="caption text-ember">SO-DOSSIER</span>
              <span className="hidden h-3 w-px bg-[var(--edge-dark-strong)] sm:block" />
              <span className="font-mono text-[10px] text-dim">
                SAMPLE · NOT FOR DELIVERY
              </span>
            </div>
            <div
              role="tablist"
              aria-label="Sample prospect"
              className="flex flex-wrap gap-1"
            >
              {DEMO_PROSPECTS.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  type="button"
                  aria-selected={i === prospectIndex}
                  onClick={() => switchProspect(i)}
                  className={[
                    "cursor-pointer px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] uppercase transition-colors duration-200",
                    i === prospectIndex
                      ? "bg-ember text-cream"
                      : "text-dim hover:text-cream",
                  ].join(" ")}
                >
                  {p.company.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <Reveal variant="none">
              <div className="border-b border-[var(--edge-dark)] p-5 sm:p-7 lg:border-r lg:border-b-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="caption text-dim">Prospect record</p>
                    <p className="mt-3 font-display text-[1.55rem] leading-tight text-cream sm:text-[1.75rem]">
                      {prospect.contact}
                    </p>
                    <p className="mt-2 text-[0.92rem] text-fog">
                      {prospect.role}
                    </p>
                    <p className="mt-0.5 text-[0.84rem] text-dim">
                      {prospect.company} · {prospect.location}
                    </p>
                  </div>
                  <span className="shrink-0 border border-ember/40 px-2 py-1 font-mono text-[9px] tracking-[0.14em] text-ember uppercase">
                    Verified
                  </span>
                </div>

                <fieldset className="mt-8">
                  <legend className="caption text-dim">
                    Verified business facts · {selected.length}/{prospect.facts.length} in use
                  </legend>

                  <ul className="mt-4 space-y-2">
                    {prospect.facts.map((fact, i) => {
                      const on = selected.includes(fact.id);
                      return (
                        <li key={fact.id}>
                          <label
                            className={[
                              "grid cursor-pointer grid-cols-[1.75rem_1fr] gap-3 border-b border-[var(--edge-dark)] py-3.5 transition-colors duration-200 last:border-0",
                              on ? "opacity-100" : "opacity-55 hover:opacity-80",
                            ].join(" ")}
                          >
                            <input
                              type="checkbox"
                              checked={on}
                              onChange={() => toggleFact(fact.id)}
                              className="sr-only"
                            />
                            <span className="pt-0.5 font-mono text-[10px] tabular-nums text-ember">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0">
                              <span className="flex items-start justify-between gap-3">
                                <span className={`block text-[0.9rem] leading-snug ${on ? "text-cream" : "text-fog"}`}>
                                  {fact.label}
                                </span>
                                <span
                                  aria-hidden
                                  className={[
                                    "mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center border",
                                    on ? "border-ember bg-ember" : "border-[var(--edge-dark-strong)]",
                                  ].join(" ")}
                                >
                                  {on ? (
                                    <svg viewBox="0 0 12 12" className="h-2 w-2 text-cream" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M2 6.2 4.8 9 10 3.4" />
                                    </svg>
                                  ) : null}
                                </span>
                              </span>
                              <span className="mt-1.5 block font-mono text-[10px] text-dim">
                                src · {fact.source}
                              </span>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </fieldset>
              </div>
            </Reveal>

            <Reveal delay={60} variant="none">
              <div className="dossier relative min-h-full">
                <div className="relative z-10 pl-0 sm:pl-12">
                  <div className="flex items-center justify-between gap-4 border-b border-[var(--edge-dark)] px-5 py-3.5 sm:px-7">
                    <span className="caption text-fog">Recommended approach</span>
                    <span className="font-mono text-[10px] text-dim uppercase">
                      {typing ? "Drafting…" : "Ready to send"}
                    </span>
                  </div>

                  <div className="space-y-2.5 border-b border-[var(--edge-dark)] px-5 py-5 text-[0.84rem] sm:px-7">
                    <p className="grid grid-cols-[3.5rem_1fr] gap-2">
                      <span className="text-dim">Route</span>
                      <span className="font-medium text-cream">{prospect.route}</span>
                    </p>
                    <p className="grid grid-cols-[3.5rem_1fr] gap-2">
                      <span className="text-dim">Why</span>
                      <span className="text-fog">{prospect.routeReason}</span>
                    </p>
                    <p className="grid grid-cols-[3.5rem_1fr] gap-2 border-t border-[var(--edge-dark)] pt-2.5">
                      <span className="text-dim">From</span>
                      <span className="text-fog">
                        {DEMO_SENDER.name} &lt;alex@meridian-systems.example&gt;
                      </span>
                    </p>
                    <p className="grid grid-cols-[3.5rem_1fr] gap-2">
                      <span className="text-dim">To</span>
                      <span className="text-fog">
                        {prospect.contact} &lt;{prospect.firstName.toLowerCase()}@
                        {prospect.id}.example&gt;
                      </span>
                    </p>
                    <p className="grid grid-cols-[3.5rem_1fr] gap-2">
                      <span className="text-dim">Subject</span>
                      <span className="text-cream">{prospect.subject}</span>
                    </p>
                  </div>

                  <div className="px-5 py-6 sm:px-7 sm:py-8">
                    {email ? (
                      <p
                        aria-hidden
                        className="min-h-[17rem] font-display text-[0.98rem] leading-[1.85] whitespace-pre-wrap text-fog sm:text-[1.02rem]"
                      >
                        {visible}
                        {typing ? (
                          <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-ember align-baseline motion-safe:animate-[caret_1.05s_steps(1)_infinite]" />
                        ) : null}
                      </p>
                    ) : (
                      <div className="flex min-h-[17rem] flex-col items-start justify-center gap-3">
                        <p className="font-display text-[1.2rem] text-cream">Nothing verified, nothing to say.</p>
                        <p className="max-w-sm text-[0.9rem] leading-relaxed text-dim">
                          With no confirmed facts on the record, there is no honest way to personalise
                          this approach. In a real delivery the lead goes back for research instead of
                          reaching you with a generic template.
                        </p>
                      </div>
                    )}

                    <p className="sr-only" aria-live="polite">
                      {email
                        ? `Recommended route: ${prospect.route}. Draft opener: ${email}`
                        : "No verified facts selected. No approach drafted."}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
