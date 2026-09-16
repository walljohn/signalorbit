import Link from "next/link";
import { FREE_LEADS, NAV_LINKS, SITE } from "@/lib/content";
import { LEGAL, LEGAL_PAGES } from "@/lib/legal";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--edge)] py-16">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 32 32" className="h-6 w-6 text-signal" aria-hidden fill="none">
                <ellipse cx="16" cy="16" rx="14" ry="6.4" stroke="currentColor" strokeOpacity="0.5" transform="rotate(-24 16 16)" />
                <ellipse cx="16" cy="16" rx="14" ry="6.4" stroke="currentColor" strokeOpacity="0.28" transform="rotate(34 16 16)" />
                <circle cx="16" cy="16" r="3.4" fill="currentColor" />
              </svg>
              <span className="text-[0.98rem] font-semibold tracking-[-0.02em] text-ink">
                {SITE.name}
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-[1.72] text-mist">
              Verified B2B leads, each with its sources and a recommended way in. We research and
              verify; you keep your accounts and decide who to contact.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
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
                    href="/#consultation"
                    className="text-[0.88rem] text-mist transition-colors hover:text-ink"
                  >
                    {`Get ${FREE_LEADS} leads free`}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#demo"
                    className="text-[0.88rem] text-mist transition-colors hover:text-ink"
                  >
                    See the demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-[0.88rem] text-mist transition-colors hover:text-ink"
                  >
                    Read the FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[10px] tracking-[0.24em] text-dim uppercase">Legal</p>
              <ul className="mt-4 space-y-2.5">
                {LEGAL_PAGES.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-[0.88rem] text-mist transition-colors hover:text-ink"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--edge)] pt-8">
          <p className="max-w-3xl text-[0.79rem] leading-[1.75] text-dim">
            SignalOrbit researches business-to-business prospects who have not previously contacted
            you and delivers them as verified leads with their sources. We don&rsquo;t send outreach
            on your behalf, and we don&rsquo;t guarantee meetings, pipeline or revenue — results
            depend on your offer, your market and your follow-up. Sample prospects and emails shown
            on this site are fictional demonstrations. If you have received outreach and want it to
            stop,{" "}
            <Link href="/do-not-contact" className="text-signal underline underline-offset-4 hover:text-signal-deep">
              ask us to suppress your details
            </Link>
            .
          </p>
          <p className="mt-6 text-[0.79rem] text-dim">
            &copy; {new Date().getFullYear()} {LEGAL.entity}, operating as {SITE.name}.{" "}
            {LEGAL.address}.
          </p>
        </div>
      </div>
    </footer>
  );
}
