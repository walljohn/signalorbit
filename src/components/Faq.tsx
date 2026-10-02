"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 pt-20 pb-28 sm:pt-28 sm:pb-36 lg:pt-32 lg:pb-40">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="caption text-mist">07 — Questions</p>
              <h2 className="display mt-5 text-balance text-[2.2rem] text-ink sm:text-[2.75rem]">
                The things worth asking before you start.
              </h2>
              <p className="mt-5 max-w-xs text-pretty text-[0.95rem] leading-[1.7] text-mist">
                If a question you have is not here, ask it on the consultation call. We would rather
                lose the work than win it on a misunderstanding.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} variant="aside" className="lg:col-span-8">
            <ul>
              {FAQS.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <li
                    key={faq.q}
                    className="border-t border-[var(--edge-light)] last:border-b"
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-trigger-${i}`}
                        className="group grid w-full cursor-pointer grid-cols-[2.5rem_1fr_auto] items-start gap-3 py-6 text-left sm:gap-5 sm:py-7"
                      >
                        <span className="pt-1 font-mono text-[10px] tabular-nums text-dim">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={[
                            "text-[1.02rem] leading-snug font-medium tracking-[-0.015em] transition-colors duration-300 sm:text-[1.08rem]",
                            isOpen ? "text-ink" : "text-mist group-hover:text-ink",
                          ].join(" ")}
                        >
                          {faq.q}
                        </span>
                        <span
                          aria-hidden
                          className={[
                            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-sm transition-transform duration-300",
                            isOpen ? "rotate-45 text-ember" : "text-dim",
                          ].join(" ")}
                        >
                          +
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      hidden={!isOpen}
                    >
                      <p className="max-w-2xl pr-10 pb-7 pl-[calc(2.5rem+0.75rem)] text-[0.93rem] leading-[1.78] text-dim sm:pl-[calc(2.5rem+1.25rem)]">
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
