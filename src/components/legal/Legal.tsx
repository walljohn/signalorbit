import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL, isPlaceholder } from "@/lib/legal";

/** Highlights a value the business still has to supply. */
export function Fill({ value }: { value: string }) {
  if (!isPlaceholder(value)) return <>{value}</>;
  return (
    <mark className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-[0.85em] text-amber-900">
      {value}
    </mark>
  );
}

export function Section({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-[var(--edge)] pt-10">
      <h2 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.5rem]">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-[0.97rem] leading-[1.75] text-mist">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5">
          <span aria-hidden className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-signal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A callout for the things a reader most needs to notice. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-signal/25 bg-signal-tint p-5 text-[0.95rem] leading-[1.7] text-ink">
      {children}
    </div>
  );
}

export function LegalShell({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pt-32 pb-28 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[0.86rem] text-signal transition-colors hover:text-signal-deep"
      >
        <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" />
        </svg>
        Back to SignalOrbit
      </Link>

      <h1 className="mt-8 text-balance text-[2.1rem] leading-[1.12] font-semibold tracking-[-0.03em] text-ink sm:text-[2.7rem]">
        {title}
      </h1>
      <p className="mt-5 text-[1.02rem] leading-[1.72] text-mist">{summary}</p>

      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-2 border-y border-[var(--edge)] py-5 font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
        <div className="flex gap-2">
          <dt>Effective</dt>
          <dd className="text-ink">{LEGAL.effective}</dd>
        </div>
        <div className="flex gap-2">
          <dt>Last updated</dt>
          <dd className="text-ink">{LEGAL.updated}</dd>
        </div>
      </dl>

      <div className="mt-12 space-y-12">{children}</div>

      <p className="mt-16 border-t border-[var(--edge)] pt-8 text-[0.86rem] leading-[1.7] text-dim">
        Questions about this page? Write to <Fill value={LEGAL.privacyEmail} />.
      </p>
    </div>
  );
}
