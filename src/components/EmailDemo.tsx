"use client";

import { useEffect, useMemo, useState } from "react";
import { composeDemoEmail, DEMO_PROSPECTS, DEMO_SENDER } from "@/lib/demo";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";

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

  // Progress is stored against the draft it belongs to, so a new draft starts
  // from zero by derivation rather than by resetting state inside an effect.
  const [progress, setProgress] = useState<{ draft: string; count: number }>({
    draft: "",
    count: 0,
  });

  // Retype whenever the composed draft changes — that is the point of the demo:
  // change what is verified, and the letter changes with it.
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
    <section id="demo" ref={ref} className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Interactive demo"
            title="Verified facts in. A recommended approach out."
            lede="Every lead we deliver comes with a recommended route and a draft opener built from what we verified. Toggle the facts and watch the draft change. Remove them all and there is nothing honest left to suggest, so in a real delivery that lead goes back for research."
          />
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-7 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-2xl border border-amber-300/25 sm:rounded-full bg-amber-200/[0.06] px-4 py-2 text-[0.8rem] text-amber-100/80">
            <span className="font-mono text-[10px] tracking-[0.22em] text-amber-200/90 uppercase">
              Demo
            </span>
            Fictional company, fictional contact, illustrative output. Not a customer, not a real
            prospect, and not a sample of anyone&rsquo;s results.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          {/* ---------- Record ---------- */}
          <Reveal>
            <div className="glass h-full rounded-[var(--radius-glass)] p-6 sm:p-8">
              <div
                role="tablist"
                aria-label="Sample prospect"
                className="flex flex-wrap gap-1.5"
              >
                {DEMO_PROSPECTS.map((p, i) => (
                  <button
                    key={p.id}
                    role="tab"
                    type="button"
                    aria-selected={i === prospectIndex}
                    onClick={() => switchProspect(i)}
                    className={[
                      "cursor-pointer rounded-full px-3.5 py-1.5 text-[0.8rem] transition-all duration-300",
                      i === prospectIndex
                        ? "bg-signal/15 text-ink ring-1 ring-signal/40"
                        : "text-dim hover:bg-white/5 hover:text-mist",
                    ].join(" ")}
                  >
                    {p.company}
                  </button>
                ))}
              </div>

              <div className="mt-7 border-t border-[var(--edge)] pt-7">
                <p className="font-mono text-[10px] tracking-[0.24em] text-dim uppercase">
                  Prospect record
                </p>
                <p className="mt-3 text-[1.22rem] font-medium tracking-[-0.02em] text-ink">
                  {prospect.contact}
                </p>
                <p className="mt-1 text-[0.92rem] text-mist">
                  {prospect.role} &middot; {prospect.company}
                </p>
                <p className="mt-0.5 text-[0.86rem] text-dim">{prospect.location}</p>
              </div>

              <fieldset className="mt-8">
                <legend className="font-mono text-[10px] tracking-[0.24em] text-dim uppercase">
                  Verified business facts &middot; {selected.length}/{prospect.facts.length} in use
                </legend>

                <ul className="mt-4 space-y-2.5">
                  {prospect.facts.map((fact) => {
                    const on = selected.includes(fact.id);
                    return (
                      <li key={fact.id}>
                        <label
                          className={[
                            "flex cursor-pointer gap-3.5 rounded-xl border p-3.5 transition-all duration-300",
                            on
                              ? "border-signal/30 bg-signal/[0.07]"
                              : "border-[var(--edge)] bg-white/[0.015] hover:border-[var(--edge-strong)]",
                          ].join(" ")}
                        >
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => toggleFact(fact.id)}
                            className="sr-only"
                          />
                          <span
                            aria-hidden
                            className={[
                              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition-all duration-200",
                              on ? "border-signal bg-signal" : "border-white/25 bg-transparent",
                            ].join(" ")}
                          >
                            {on ? (
                              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-[#03080f]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 6.2 4.8 9 10 3.4" />
                              </svg>
                            ) : null}
                          </span>
                          <span className="min-w-0">
                            <span className={`block text-[0.9rem] leading-snug ${on ? "text-ink" : "text-mist"}`}>
                              {fact.label}
                            </span>
                            <span className="mt-1 block font-mono text-[10px] tracking-[0.14em] text-dim uppercase">
                              Source &middot; {fact.source}
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

          {/* ---------- Draft ---------- */}
          <Reveal delay={120}>
            <div className="glass h-full overflow-hidden rounded-[var(--radius-glass)]">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--edge)] px-6 py-4 sm:px-8">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-signal/70" />
                  <span className="font-mono text-[10px] tracking-[0.24em] text-dim uppercase">
                    Recommended approach
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.18em] text-dim uppercase">
                  {typing ? "Drafting" : "Ready for you to send"}
                </span>
              </div>

              <div className="space-y-2 border-b border-[var(--edge)] px-6 py-5 text-[0.86rem] sm:px-8">
                <p className="flex gap-3">
                  <span className="w-14 shrink-0 text-dim">Route</span>
                  <span className="font-medium text-ink">{prospect.route}</span>
                </p>
                <p className="flex gap-3 pb-3">
                  <span className="w-14 shrink-0 text-dim">Why</span>
                  <span className="text-mist">{prospect.routeReason}</span>
                </p>
                <p className="flex gap-3 border-t border-[var(--edge)] pt-3">
                  <span className="w-14 shrink-0 text-dim">From</span>
                  <span className="text-mist">
                    {DEMO_SENDER.name} &lt;alex@meridian-systems.example&gt;
                  </span>
                </p>
                <p className="flex gap-3">
                  <span className="w-14 shrink-0 text-dim">To</span>
                  <span className="text-mist">
                    {prospect.contact} &lt;{prospect.firstName.toLowerCase()}@
                    {prospect.id}.example&gt;
                  </span>
                </p>
                <p className="flex gap-3">
                  <span className="w-14 shrink-0 text-dim">Subject</span>
                  <span className="text-ink">{prospect.subject}</span>
                </p>
              </div>

              <div className="px-6 py-7 sm:px-8 sm:py-8">
                {email ? (
                  <p
                    aria-hidden
                    className="min-h-[19rem] text-[0.95rem] leading-[1.78] whitespace-pre-wrap text-mist"
                  >
                    {visible}
                    {typing ? (
                      <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-signal align-baseline motion-safe:animate-[caret_1.05s_steps(1)_infinite]" />
                    ) : null}
                  </p>
                ) : (
                  <div className="flex min-h-[19rem] flex-col items-start justify-center gap-3">
                    <p className="text-[1.02rem] text-ink">Nothing verified, nothing to say.</p>
                    <p className="max-w-sm text-[0.92rem] leading-relaxed text-dim">
                      With no confirmed facts on the record, there is no honest way to personalise
                      this approach. In a real delivery the lead goes back for research instead of
                      reaching you with a generic template.
                    </p>
                  </div>
                )}

                {/* Screen readers get the finished draft once, instead of every keystroke. */}
                <p className="sr-only" aria-live="polite">
                  {email ? `Recommended route: ${prospect.route}. Draft opener: ${email}` : "No verified facts selected. No approach drafted."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
