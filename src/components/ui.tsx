import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.28em] text-signal uppercase">
      <span aria-hidden className="h-px w-7 bg-gradient-to-r from-signal/70 to-signal/10" />
      {children}
    </span>
  );
}

type CtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
};

export function Cta({ href, variant = "primary", children, className = "", ...rest }: CtaProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-[0.95rem] font-medium transition-all duration-300 will-change-transform";

  const styles =
    variant === "primary"
      ? "bg-signal text-white shadow-[0_12px_32px_-12px_rgba(22,98,196,0.7)] hover:bg-signal-deep hover:shadow-[0_18px_40px_-12px_rgba(22,98,196,0.8)] hover:-translate-y-0.5 active:translate-y-0"
      : "border border-[var(--edge-strong)] bg-abyss/90 text-ink backdrop-blur-sm hover:border-signal/45 hover:bg-signal-tint hover:-translate-y-0.5 active:translate-y-0";

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
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-6 text-balance text-[2.15rem] leading-[1.08] font-semibold tracking-[-0.035em] text-ink sm:text-[2.85rem] lg:text-[3.15rem]">
        {title}
      </h2>
      {lede ? (
        <p className="mt-6 max-w-2xl text-pretty text-[1.05rem] leading-[1.75] text-mist sm:text-[1.1rem]">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** Hairline rule that fades at both ends — used to separate major sections. */
export function Divider() {
  return (
    <div
      aria-hidden
      className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-[var(--edge-strong)] to-transparent"
    />
  );
}

/** Soft radial wash behind a section for cinematic depth (Apple / Lightship). */
export function SectionGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[42rem] -translate-y-1/2 bg-[radial-gradient(55%_45%_at_50%_50%,rgba(22,98,196,0.08),transparent_72%)] ${className}`}
    />
  );
}
