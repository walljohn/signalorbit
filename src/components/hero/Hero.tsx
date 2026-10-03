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

  // Static SVG paints first. WebGL only after idle + visible, and never when
  // reduced-motion / low-power forced the static tier.
  const canUse3d = tier === "high" || tier === "low";
  const idleReady = useAfterIdle(canUse3d && visible, 900);
  const showCanvas = canUse3d && idleReady;

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden band-dark pt-28 pb-16 sm:pb-20 lg:justify-center lg:pb-0"
    >
      {/* Full-bleed orbit — static shell always; 3D crossfades in when ready */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <OrbitFallback
            theme="dark"
            className={[
              "h-[min(110vw,820px)] w-[min(110vw,820px)] transition-opacity duration-700 ease-out",
              showCanvas ? "opacity-0" : "opacity-80",
            ].join(" ")}
          />
        </div>

        {showCanvas && tier ? (
          <div className="absolute inset-0 opacity-100 motion-safe:animate-[rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both]">
            <OrbitScene tier={tier} mode="hero" paused={!visible} scroll={scroll} />
          </div>
        ) : null}
      </div>

      {/* Cinematic vignette — readability without soft blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,9,13,0.35)_55%,rgba(7,9,13,0.92)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-t from-void via-void/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-void to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl motion-safe:animate-[rise_1.15s_cubic-bezier(0.16,1,0.3,1)_both]">
          <p className="font-mono text-[11px] tracking-[0.32em] text-ember uppercase">
            SignalOrbit
          </p>

          <h1 className="display mt-6 text-balance text-[3.1rem] text-cream sm:text-[4.5rem] lg:text-[5.75rem]">
            Verified B2B leads,
            <br />
            <span className="text-fog">ready to contact.</span>
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-[1.05rem] leading-[1.75] text-fog sm:text-[1.15rem]">
            We find the businesses that fit what you sell, verify the decision-maker and their work
            email, and recommend exactly how to reach each one. Your first {FREE_LEADS} leads are
            free.
          </p>

          <div className="mt-12">
            <Cta href="#consultation">
              Request my free leads
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
          </div>

          <ul className="mt-14 flex flex-col gap-3 border-t border-[var(--edge-dark)] pt-8 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
            {ASSURANCES.map((item) => (
              <li key={item} className="flex items-baseline gap-3 text-[0.88rem] text-fog">
                <span aria-hidden className="font-mono text-[10px] tracking-[0.2em] text-ember">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href="#process"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-dim uppercase transition-colors hover:text-cream lg:flex"
      >
        Scroll
        <span
          aria-hidden
          className="block h-12 w-px bg-gradient-to-b from-ember/80 via-ember/30 to-transparent motion-safe:animate-[float-slow_2.8s_ease-in-out_infinite]"
        />
      </a>
    </section>
  );
}
