"use client";

import dynamic from "next/dynamic";
import { useAfterIdle, useIsVisible, useRenderTier, useScrollProgressRef } from "@/lib/hooks";
import { Cta } from "@/components/ui";
import { FREE_LEADS } from "@/lib/content";
import { OrbitFallback } from "./OrbitFallback";

const OrbitScene = dynamic(() => import("./OrbitScene"), {
  ssr: false,
  loading: () => null,
});

const ASSURANCES = [
  `Your first ${FREE_LEADS} leads are free`,
  "Named decision-makers with verified emails",
  "A recommended way in for every lead",
];

export function Hero() {
  const tier = useRenderTier();
  const { ref, visible } = useIsVisible<HTMLDivElement>();
  const scroll = useScrollProgressRef(true);

  const canUse3d = tier === "high" || tier === "low";
  const idleReady = useAfterIdle(canUse3d && visible, 900);
  const showCanvas = canUse3d && idleReady;

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden band-dark pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pb-24"
    >
      {/* Orbit pushed off-axis — cropped right, not centered soft-SaaS hub */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-8%] right-[-18%] flex h-[78%] w-[78%] items-center justify-center sm:right-[-10%] lg:top-[-4%] lg:right-[-6%] lg:h-[92%] lg:w-[58%]">
          <OrbitFallback
            theme="dark"
            className={[
              "h-full w-full max-h-[760px] max-w-[760px] transition-opacity duration-700 ease-out",
              showCanvas ? "opacity-0" : "opacity-70",
            ].join(" ")}
          />
          {showCanvas && tier ? (
            <div className="absolute inset-0 opacity-100 motion-safe:animate-[fade-in_0.85s_ease_both]">
              <OrbitScene tier={tier} mode="hero" paused={!visible} scroll={scroll} />
            </div>
          ) : null}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(20,18,16,0.97)_0%,rgba(20,18,16,0.88)_42%,rgba(20,18,16,0.35)_68%,rgba(20,18,16,0.55)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40%] bg-gradient-to-t from-void via-void/70 to-transparent"
      />

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 grid-cols-12 gap-6 px-6 lg:px-8">
        <div className="col-span-12 flex min-h-[calc(100svh-8rem)] flex-col justify-end pb-4 lg:col-span-7 lg:justify-center lg:pb-8 xl:col-span-6">
          <div className="motion-safe:animate-[rise_1.05s_cubic-bezier(0.22,1,0.36,1)_both]">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] tabular-nums text-ember">01</span>
              <span className="caption text-fog">SignalOrbit</span>
            </div>

            <h1 className="display-tight mt-7 text-balance text-[3rem] text-cream sm:text-[4.35rem] lg:text-[5.1rem]">
              Verified B2B leads,
              <span className="mt-1 block text-fog italic">ready to contact.</span>
            </h1>

            <p className="mt-8 max-w-[34rem] text-pretty text-[1.02rem] leading-[1.72] text-fog sm:text-[1.1rem]">
              We find the businesses that fit what you sell, verify the decision-maker and their work
              email, and recommend exactly how to reach each one. Your first {FREE_LEADS} leads are
              free.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
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
              <Cta href="#demo" variant="rule" className="text-fog hover:text-cream">
                See how a lead is built
              </Cta>
            </div>
          </div>

          <ul className="mt-14 grid max-w-xl gap-3 border-t border-[var(--edge-dark)] pt-7 sm:mt-16">
            {ASSURANCES.map((item, i) => (
              <li key={item} className="grid grid-cols-[2rem_1fr] items-baseline gap-3 text-[0.9rem] text-fog">
                <span className="font-mono text-[10px] tabular-nums text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Intentionally empty right columns on desktop — orbit lives in the negative space */}
        <div className="col-span-12 hidden lg:col-span-5 lg:block xl:col-span-6" aria-hidden />
      </div>

      <a
        href="#process"
        className="absolute bottom-6 left-6 hidden items-end gap-3 font-mono text-[10px] tracking-[0.18em] text-dim uppercase transition-colors hover:text-cream lg:flex"
      >
        <span className="block h-10 w-px bg-gradient-to-b from-ember/70 to-transparent" />
        Continue
      </a>
    </section>
  );
}
