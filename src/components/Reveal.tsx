"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/hooks";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Different entrances per section — avoids identical fade-up everywhere. */
  variant?: "rise" | "fade" | "aside" | "none";
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "rise",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  if (variant === "none") {
    return <div className={className}>{children}</div>;
  }

  const hidden =
    variant === "fade"
      ? "opacity-0"
      : variant === "aside"
        ? "translate-x-5 opacity-0"
        : "translate-y-7 opacity-0";

  const shown =
    variant === "fade"
      ? "opacity-100"
      : variant === "aside"
        ? "translate-x-0 opacity-100"
        : "translate-y-0 opacity-100";

  const duration =
    variant === "fade" ? "duration-[700ms]" : variant === "aside" ? "duration-[900ms]" : "duration-[850ms]";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        `transition-[opacity,transform] ${duration} ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:transform-none`,
        inView ? shown : hidden,
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
