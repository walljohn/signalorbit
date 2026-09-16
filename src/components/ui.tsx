import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.24em] text-signal uppercase">
      <span aria-hidden className="h-px w-6 bg-signal/45" />
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
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.94rem] font-medium transition-all duration-300 will-change-transform";

  const styles =
    variant === "primary"
      ? "bg-signal text-white shadow-[0_10px_28px_-12px_rgba(22,98,196,0.65)] hover:bg-signal-deep hover:shadow-[0_16px_36px_-12px_rgba(22,98,196,0.75)] hover:-translate-y-0.5"
      : "border border-[var(--edge-strong)] bg-abyss text-ink hover:border-signal/45 hover:bg-signal-tint hover:-translate-y-0.5";

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
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-balance text-[2rem] leading-[1.12] font-semibold tracking-[-0.025em] text-ink sm:text-[2.6rem]">
        {title}
      </h2>
      {lede ? (
        <p className="mt-5 text-pretty text-[1.02rem] leading-[1.7] text-mist">{lede}</p>
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
