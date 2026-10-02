"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/hooks";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Scroll-triggered entrance. Transform + opacity only; reduced-motion collapses it.
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "transition-[opacity,transform] duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
