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
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* ---------- Backdrop ---------- */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 mesh-aurora motion-safe:animate-[aurora_18s_ease-in-out_infinite]" />
        {showCanvas ? (
          <OrbitScene tier={tier} split={split} paused={!visible} />
        ) : tier === "static" ? (
          <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[6vw]">
            <OrbitFallback className="h-[min(96vw,760px)] w-[min(96vw,760px)] motion-safe:animate-[float-slow_12s_ease-in-out_infinite]" />
          </div>
        ) : null}
      </div>

      {/* Readability scrims: a flat veil on narrow layouts, where the type sits
          over the network, and a left-to-right wash on wide ones. `lg:bg-transparent`
          matters: the veil is a background-COLOR and the wash a background-IMAGE, so
          without it the flat veil would stay under the gradient and mute the canvas. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-void/78 lg:bg-transparent lg:bg-[linear-gradient(90deg,#f4f7fb_0%,rgba(244,247,251,0.96)_32%,rgba(244,247,251,0.5)_50%,rgba(244,247,251,0)_64%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-void via-void/90 to-transparent"
      />

      {/* ---------- Copy ---------- */}
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-[var(--edge-strong)] bg-abyss/90 px-4 py-1.5 font-mono text-[11px] font-medium tracking-[0.22em] text-signal uppercase shadow-[0_8px_24px_-16px_rgba(22,98,196,0.45)] backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            B2B lead generation
          </p>

          <h1 className="mt-8 text-balance text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.045em] text-ink sm:text-[3.65rem] lg:text-[4.25rem]">
            Verified B2B leads,{" "}
            <span className="text-gradient-ice">ready to contact.</span>
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-[1.08rem] leading-[1.75] text-mist sm:text-[1.18rem]">
            We find the businesses that fit what you sell, verify the decision-maker and their work
            email, and recommend exactly how to reach each one. Your first {FREE_LEADS} leads are
            free.
          </p>

          <div className="mt-12 flex flex-col gap-3.5 sm:flex-row sm:items-center">
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

          <ul className="mt-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3">
            {ASSURANCES.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2.5 rounded-full border border-[var(--edge)] bg-abyss/80 px-4 py-2 text-[0.86rem] text-mist shadow-[0_6px_20px_-14px_rgba(11,26,46,0.35)] backdrop-blur-sm"
              >
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
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-dim uppercase transition-colors hover:text-ink lg:flex"
      >
        Scroll
        <span
          aria-hidden
          className="block h-10 w-px bg-gradient-to-b from-signal/70 via-signal/30 to-transparent motion-safe:animate-[float-slow_2.8s_ease-in-out_infinite]"
        />
      </a>
    </section>
  );
}
