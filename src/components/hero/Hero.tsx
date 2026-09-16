"use client";

import dynamic from "next/dynamic";
import { useIsVisible, useMediaQuery, useRenderTier } from "@/lib/hooks";
import { Cta } from "@/components/ui";
import { FREE_LEADS } from "@/lib/content";
import { OrbitFallback } from "./OrbitFallback";

// WebGL never runs on the server, and the three.js bundle stays out of the
// initial payload until the tier check says we are actually going to use it.
const OrbitScene = dynamic(() => import("./OrbitScene"), { ssr: false });

const ASSURANCES = [
  `Your first ${FREE_LEADS} leads are free`,
  "Named decision-makers with verified emails",
  "A recommended way in for every lead",
];

export function Hero() {
  const tier = useRenderTier();
  const split = useMediaQuery("(min-width: 1024px)");
  const { ref, visible } = useIsVisible<HTMLDivElement>();

  const showCanvas = tier === "high" || tier === "low";

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      {/* ---------- Backdrop ---------- */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {showCanvas ? (
          <OrbitScene tier={tier} split={split} paused={!visible} />
        ) : tier === "static" ? (
          <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[6vw]">
            <OrbitFallback className="h-[min(96vw,760px)] w-[min(96vw,760px)]" />
          </div>
        ) : null}
      </div>

      {/* Readability scrims: a flat veil on narrow layouts, where the type sits
          over the network, and a left-to-right wash on wide ones. `lg:bg-transparent`
          matters: the veil is a background-COLOR and the wash a background-IMAGE, so
          without it the flat veil would stay under the gradient and mute the canvas. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-void/75 lg:bg-transparent lg:bg-[linear-gradient(90deg,#f7f9fc_0%,rgba(247,249,252,0.94)_34%,rgba(247,249,252,0.45)_52%,rgba(247,249,252,0)_64%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-void via-void/85 to-transparent"
      />

      {/* ---------- Copy ---------- */}
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-[var(--edge-strong)] bg-abyss px-4 py-1.5 font-mono text-[11px] font-medium tracking-[0.2em] text-signal uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            B2B lead generation
          </p>

          <h1 className="mt-7 text-balance text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.035em] text-ink sm:text-[3.4rem] lg:text-[3.9rem]">
            Verified B2B leads, ready to contact.
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-[1.06rem] leading-[1.72] text-mist sm:text-[1.15rem]">
            We find the businesses that fit what you sell, verify the decision-maker and their work
            email, and recommend exactly how to reach each one. Your first {FREE_LEADS} leads are
            free.
          </p>

          <div className="mt-11 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Cta href="#consultation">
              {`Get ${FREE_LEADS} leads free`}
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
              </svg>
            </Cta>
            <Cta href="#process" variant="ghost">
              See how it works
            </Cta>
          </div>

          <ul className="mt-14 flex flex-col gap-3 text-[0.88rem] text-mist sm:flex-row sm:flex-wrap sm:gap-x-7">
            {ASSURANCES.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 shrink-0 text-signal"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.75 8.4 6.2 11.8l7-7.6" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href="#process"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] tracking-[0.28em] text-dim uppercase transition-colors hover:text-ink lg:flex"
      >
        Scroll
        <span aria-hidden className="block h-8 w-px bg-gradient-to-b from-signal/60 to-transparent" />
      </a>
    </section>
  );
}
