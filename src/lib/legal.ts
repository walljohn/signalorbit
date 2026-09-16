/**
 * Every value the legal pages need that depends on the real business.
 *
 * Anything still written as [SQUARE BRACKETS] is a placeholder and is rendered
 * with a highlight on the page, so an unfinished document is obvious at a
 * glance rather than quietly wrong. LEGAL-CHECKLIST.md lists them all.
 */
export const LEGAL = {
  entity: "[LEGAL ENTITY NAME]",
  tradingName: "SignalOrbit",
  address: "[BUSINESS MAILING ADDRESS]",
  privacyEmail: "[PRIVACY CONTACT EMAIL]",
  contactEmail: "[CONTACT EMAIL]",
  province: "[PROVINCE]",
  /** Update both whenever the wording changes materially. */
  effective: "15 September 2026",
  updated: "15 September 2026",
  /** Retention periods are business decisions — confirm before relying on them. */
  enquiryRetention: "24 months",
  prospectRetention: "24 months",
} as const;

export const LEGAL_PAGES = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/acceptable-use", label: "Anti-Spam & Acceptable Use" },
  { href: "/do-not-contact", label: "Do Not Contact" },
  { href: "/accessibility", label: "Accessibility" },
] as const;

/** True when a string still contains an unfilled placeholder. */
export function isPlaceholder(value: string): boolean {
  return value.includes("[") && value.includes("]");
}
