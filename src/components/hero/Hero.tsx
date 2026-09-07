"use client";

import dynamic from "next/dynamic";
import { useIsVisible, useMediaQuery, useRenderTier } from "@/lib/hooks";
import { Cta } from "@/components/ui";
import { OrbitFallback } from "./OrbitFallback";

// WebGL never runs on the server, and the three.js bundle stays out of the
// initial payload until the tier check says we are actually going to use it.
const OrbitScene = dynamic(() => import("./OrbitScene"), { ssr: false });

const ASSURANCES = [
  "You own the mailbox and the domain",
  "Human review before anything sends",
  "Opt-outs actioned the day they arrive",
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
            <OrbitFallback className="h-[min(96vw,760px)] w-[min(96vw,760px)] opacity-90" />
          </div>
        ) : null}
      </div>

      {/* Readability scrims: a wash from the left on wide layouts, a flat veil
          on narrow ones where the type sits directly over the network. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-void/72 lg:bg-[linear-gradient(100deg,#04060a_2%,rgba(4,6,10,0.92)_30%,rgba(4,6,10,0.42)_48%,rgba(4,6,10,0)_66%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-void via-void/80 to-transparent"
      />

      {/* ---------- Copy ---------- */}
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="animate-none inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-signal-soft uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            AI-assisted outbound sales
          </p>

          <h1 className="mt-7 text-balance text-[2.7rem] leading-[1.03] font-semibold tracking-[-0.035em] text-gradient-ice sm:text-[3.6rem] lg:text-[4.15rem]">
            Your next customer is out there.
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-[1.06rem] leading-[1.72] text-mist sm:text-[1.15rem]">
            We find the right people, write outreach that speaks to them, and help turn
            introductions into sales conversations.
          </p>

          <div className="mt-11 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Cta href="#consultation">
              Plan my outreach
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
              Explore the process
            </Cta>
          </div>

          <ul className="mt-14 flex flex-col gap-3 text-[0.86rem] text-dim sm:flex-row sm:flex-wrap sm:gap-x-7">
            {ASSURANCES.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 shrink-0 text-signal"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
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
        <span aria-hidden className="block h-8 w-px bg-gradient-to-b from-signal/70 to-transparent" />
      </a>
    </section>
  );
}
