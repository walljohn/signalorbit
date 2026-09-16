"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FREE_LEADS, NAV_LINKS, SITE } from "@/lib/content";
import { useActiveSection } from "@/lib/hooks";

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="6.4" stroke="currentColor" strokeOpacity="0.5" transform="rotate(-24 16 16)" />
      <ellipse cx="16" cy="16" rx="14" ry="6.4" stroke="currentColor" strokeOpacity="0.28" transform="rotate(34 16 16)" />
      <circle cx="16" cy="16" r="3.4" fill="currentColor" />
      <circle cx="28.2" cy="10.6" r="1.7" fill="currentColor" opacity="0.85" />
      <circle cx="5.4" cy="20.4" r="1.4" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // "top" is observed but has no nav link, so nothing is highlighted while the
  // hero owns the viewport.
  const ids = useMemo(() => ["top", ...NAV_LINKS.map((l) => l.id)], []);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-[var(--edge)] bg-white/85 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between gap-6 px-6 lg:px-8"
      >
        <Link
          href="#top"
          className="flex items-center gap-2.5 text-ink transition-opacity hover:opacity-70"
          onClick={() => setOpen(false)}
        >
          <Mark className="h-7 w-7 text-signal" />
          <span className="text-[1.02rem] font-semibold tracking-[-0.02em]">{SITE.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                aria-current={active === link.id ? "true" : undefined}
                className={[
                  "relative rounded-full px-3.5 py-2 text-[0.88rem] transition-colors duration-300",
                  active === link.id ? "text-ink" : "text-mist hover:text-ink",
                ].join(" ")}
              >
                {link.label}
                <span
                  aria-hidden
                  className={[
                    "absolute inset-x-3.5 -bottom-0.5 h-px bg-signal transition-all duration-300",
                    active === link.id ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="#consultation"
            className="hidden rounded-full bg-signal px-5 py-2.5 text-[0.86rem] font-medium text-white shadow-[0_8px_22px_-12px_rgba(22,98,196,0.7)] transition-all duration-300 hover:bg-signal-deep sm:inline-flex"
          >
            {`Get ${FREE_LEADS} leads free`}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--edge-strong)] bg-abyss text-ink lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M5 5l10 10M15 5 5 15" /> : <path d="M3 6.5h14M3 13.5h14" />}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-[var(--edge)] bg-white lg:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-6 py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-[var(--edge)] py-3.5 text-[0.98rem] text-mist transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#consultation"
              onClick={() => setOpen(false)}
              className="mt-4 mb-2 block rounded-full bg-signal px-5 py-3 text-center text-[0.94rem] font-medium text-white"
            >
              {`Get ${FREE_LEADS} leads free`}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
