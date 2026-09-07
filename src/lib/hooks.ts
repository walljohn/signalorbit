"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Tracks `prefers-reduced-motion` and keeps up with changes at runtime. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

/**
 * Quality tier for the hero scene.
 *
 *  - `static`  no WebGL, reduced motion, save-data, or a very low-powered device
 *              -> render the non-animated fallback instead of a canvas
 *  - `low`     small screens and modest hardware -> fewer nodes, capped DPR
 *  - `high`    everything else
 *
 * Starts at `null` so nothing renders until we have measured the client, which
 * keeps the server and first client paint in agreement.
 */
export type RenderTier = "static" | "low" | "high";

type NetworkInfoLike = { saveData?: boolean };

export function useRenderTier(): RenderTier | null {
  const [tier, setTier] = useState<RenderTier | null>(null);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallMq = window.matchMedia("(max-width: 767px)");

    const evaluate = () => {
      const nav = navigator as Navigator & {
        deviceMemory?: number;
        connection?: NetworkInfoLike;
      };

      if (motionMq.matches || nav.connection?.saveData || !hasWebGL()) {
        setTier("static");
        return;
      }

      const memory = nav.deviceMemory ?? 8;
      const cores = nav.hardwareConcurrency ?? 8;

      if (memory <= 2 || cores <= 2) {
        setTier("static");
        return;
      }

      setTier(smallMq.matches || memory <= 4 || cores <= 4 ? "low" : "high");
    };

    evaluate();
    motionMq.addEventListener("change", evaluate);
    smallMq.addEventListener("change", evaluate);
    return () => {
      motionMq.removeEventListener("change", evaluate);
      smallMq.removeEventListener("change", evaluate);
    };
  }, []);

  return tier;
}

let webglSupport: boolean | null = null;

function hasWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

/** True once the element has scrolled into view; stays true afterwards. */
export function useInView<T extends HTMLElement>(
  options: { rootMargin?: string; threshold?: number } = {},
) {
  const { rootMargin = "0px 0px -12% 0px", threshold = 0.12 } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Exotic environments without IntersectionObserver still need the content
    // revealed; defer past the effect so we never cascade a synchronous render.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, inView };
}

/** Reports whether an element is currently on screen (both directions). */
export function useIsVisible<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? true),
      { threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/** Highlights the nav link for whichever section currently owns the viewport. */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      { threshold: [0, 0.25, 0.5, 0.75], rootMargin: "-20% 0px -50% 0px" },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Normalized (-1..1) pointer position, damped, for parallax. */
export function usePointerVector(enabled: boolean) {
  const vector = useRef({ x: 0, y: 0 });

  const onPointer = useCallback(
    (event: PointerEvent) => {
      if (!enabled) return;
      vector.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      vector.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    },
    [enabled],
  );

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, [enabled, onPointer]);

  return vector;
}
