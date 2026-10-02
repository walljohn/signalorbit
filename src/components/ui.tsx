import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-ember" : "text-ember";
  const rule = tone === "dark" ? "bg-ember/70" : "bg-ember/80";
  return (
    <span
      className={`inline-flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.32em] uppercase ${color}`}
    >
      <span aria-hidden className={`h-px w-8 ${rule}`} />
      {children}
    </span>
  );
}

type CtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "solid" | "ghost" | "invert";
  children: ReactNode;
};

/** Solid cream on dark / ink on light — fewer, stronger CTAs (Apple / Lightship). */
export function Cta({ href, variant = "solid", children, className = "", ...rest }: CtaProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.92rem] font-medium tracking-[-0.01em] transition-colors duration-300";

  const styles =
    variant === "solid"
      ? "bg-cream text-ink hover:bg-white"
      : variant === "invert"
        ? "bg-ink text-cream hover:bg-void"
        : "border border-current/30 text-inherit hover:border-current/60";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  const titleColor = tone === "dark" ? "text-cream" : "text-ink";
  const ledeColor = tone === "dark" ? "text-fog" : "text-mist";

  return (
    <div className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`display mt-7 text-balance text-[2.6rem] sm:text-[3.5rem] lg:text-[4.25rem] ${titleColor}`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-7 max-w-2xl text-pretty text-[1.05rem] leading-[1.75] sm:text-[1.12rem] ${ledeColor} ${align === "center" ? "mx-auto" : ""}`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export function Divider({ tone = "light" }: { tone?: "dark" | "light" }) {
  const via = tone === "dark" ? "via-[var(--edge-dark-strong)]" : "via-[var(--edge-light-strong)]";
  return (
    <div
      aria-hidden
      className={`mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent ${via} to-transparent`}
    />
  );
}
