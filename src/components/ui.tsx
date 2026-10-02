import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/** Small margin index — print caption, not mono-tracking AI eyebrow. */
export function IndexMark({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-fog" : "text-mist";
  return (
    <span className={`caption inline-block ${color}`}>
      {children}
    </span>
  );
}

type CtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "solid" | "ghost" | "invert" | "rule";
  children: ReactNode;
};

export function Cta({ href, variant = "solid", children, className = "", ...rest }: CtaProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 text-[0.92rem] font-medium tracking-[-0.01em] transition-colors duration-300";

  const styles =
    variant === "solid"
      ? "bg-cream px-8 py-4 text-ink hover:bg-white"
      : variant === "invert"
        ? "bg-ink px-8 py-4 text-cream hover:bg-void"
        : variant === "rule"
          ? "border-b border-current/40 pb-1 text-inherit hover:border-current"
          : "border border-current/30 px-8 py-4 text-inherit hover:border-current/60";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

/** Prefer composing headings per-section. Kept for legal pages / form leftovers. */
export function SectionHeading({
  index,
  title,
  lede,
  tone = "light",
  wide = false,
}: {
  index?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "dark" | "light";
  wide?: boolean;
}) {
  const titleColor = tone === "dark" ? "text-cream" : "text-ink";
  const ledeColor = tone === "dark" ? "text-fog" : "text-mist";

  return (
    <div className={wide ? "max-w-5xl" : "max-w-3xl"}>
      {index ? <IndexMark tone={tone}>{index}</IndexMark> : null}
      <h2
        className={`display ${index ? "mt-5" : ""} text-balance text-[2.4rem] sm:text-[3.15rem] lg:text-[3.75rem] ${titleColor}`}
      >
        {title}
      </h2>
      {lede ? (
        <p className={`mt-6 max-w-xl text-pretty text-[1.02rem] leading-[1.7] sm:text-[1.08rem] ${ledeColor}`}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export function Rule({ tone = "light", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const color = tone === "dark" ? "border-[var(--edge-dark)]" : "border-[var(--edge-light)]";
  return <hr className={`border-0 border-t ${color} ${className}`} />;
}
