"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-32 sm:py-40">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Questions"
                title="The things worth asking before you start."
                lede="If a question you have is not here, ask it on the consultation call. We would rather lose the work than win it on a misunderstanding."
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="overflow-hidden rounded-[var(--radius-panel)] border border-[var(--edge)] bg-abyss shadow-[var(--card-shadow)]">
              {FAQS.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <li key={faq.q} className="border-b border-[var(--edge)] last:border-b-0">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-trigger-${i}`}
                        className="group flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-6 text-left sm:px-8 sm:py-7"
                      >
                        <span
                          className={[
                            "text-[1.04rem] leading-snug font-medium tracking-[-0.015em] transition-colors duration-300 sm:text-[1.1rem]",
                            isOpen ? "text-ink" : "text-mist group-hover:text-ink",
                          ].join(" ")}
                        >
                          {faq.q}
                        </span>
                        <span
                          aria-hidden
                          className={[
                            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                            isOpen
                              ? "rotate-45 border-signal/40 bg-signal-tint text-signal"
                              : "border-[var(--edge)] text-dim group-hover:border-[var(--edge-strong)]",
                          ].join(" ")}
                        >
                          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                            <path d="M6 1.5v9M1.5 6h9" />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      hidden={!isOpen}
                    >
                      <p className="max-w-2xl px-6 pr-14 pb-7 text-[0.95rem] leading-[1.8] text-dim sm:px-8">
                        {faq.a}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
