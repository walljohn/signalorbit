import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--edge)] py-16">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 32 32" className="h-6 w-6 text-signal" aria-hidden fill="none">
                <ellipse cx="16" cy="16" rx="14" ry="6.4" stroke="currentColor" strokeOpacity="0.42" transform="rotate(-24 16 16)" />
                <ellipse cx="16" cy="16" rx="14" ry="6.4" stroke="currentColor" strokeOpacity="0.22" transform="rotate(34 16 16)" />
                <circle cx="16" cy="16" r="3.4" fill="currentColor" />
              </svg>
              <span className="text-[0.98rem] font-semibold tracking-[-0.02em] text-ink">
                {SITE.name}
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-[1.72] text-dim">
              AI-assisted outbound sales, run through email accounts you own and control. We
              research prospects, write the outreach, and manage the replies — you keep the
              accounts, the approvals, and the final say.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-dim uppercase">Sections</p>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-[0.88rem] text-mist transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-dim uppercase">Start</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="#consultation"
                    className="text-[0.88rem] text-mist transition-colors hover:text-ink"
                  >
                    Plan my outreach
                  </Link>
                </li>
                <li>
                  <Link
                    href="#demo"
                    className="text-[0.88rem] text-mist transition-colors hover:text-ink"
                  >
                    See the demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="text-[0.88rem] text-mist transition-colors hover:text-ink"
                  >
                    Read the FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--edge)] pt-8">
          <p className="max-w-3xl text-[0.79rem] leading-[1.75] text-dim/80">
            SignalOrbit runs cold business-to-business outreach to prospects who have not previously
            contacted you. Every email identifies the sending business and carries a working way to
            opt out. We do not guarantee meetings, pipeline, or revenue — results depend on your
            offer, your market, and your follow-up. Sample emails and prospect records shown on this
            site are fictional demonstrations.
          </p>
          <p className="mt-6 text-[0.79rem] text-dim">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
