/** Shared by the browser form and the API route so both agree on what is valid. */

export type ConsultationInput = {
  name: string;
  email: string;
  website: string;
  audience: string;
  goals: string;
};

export type FieldErrors = Partial<Record<keyof ConsultationInput, string>>;

export const FIELD_LIMITS = {
  name: { min: 2, max: 80 },
  audience: { min: 12, max: 600 },
  goals: { min: 12, max: 1000 },
} as const;

// Deliberately permissive: enough structure to catch typos, not so strict that
// it rejects addresses that genuinely deliver.
const EMAIL_RE = /^[^\s@,]+@[^\s@,.]+(\.[^\s@,.]+)+$/;

const CONSUMER_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mail.com",
  "gmx.com",
  "proton.me",
  "protonmail.com",
  "yandex.com",
  "zoho.com",
]);

export function normalizeWebsite(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isValidWebsite(raw: string): boolean {
  try {
    const url = new URL(normalizeWebsite(raw));
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    const host = url.hostname;
    return host.includes(".") && !host.startsWith(".") && !host.endsWith(".") && host.length > 3;
  } catch {
    return false;
  }
}

export function validateConsultation(input: Partial<ConsultationInput>): {
  ok: boolean;
  errors: FieldErrors;
  value: ConsultationInput;
} {
  const value: ConsultationInput = {
    name: (input.name ?? "").trim(),
    email: (input.email ?? "").trim().toLowerCase(),
    website: normalizeWebsite(input.website ?? ""),
    audience: (input.audience ?? "").trim(),
    goals: (input.goals ?? "").trim(),
  };

  const errors: FieldErrors = {};

  if (value.name.length < FIELD_LIMITS.name.min) {
    errors.name = "Please tell us your name.";
  } else if (value.name.length > FIELD_LIMITS.name.max) {
    errors.name = `Please keep this under ${FIELD_LIMITS.name.max} characters.`;
  }

  if (!value.email) {
    errors.email = "A work email address is required.";
  } else if (!EMAIL_RE.test(value.email)) {
    errors.email = "That does not look like a valid email address.";
  } else if (CONSUMER_DOMAINS.has(value.email.split("@")[1] ?? "")) {
    errors.email = "Please use your work email address so we can see the business behind it.";
  }

  if (!value.website) {
    errors.website = "Your company website is required.";
  } else if (!isValidWebsite(value.website)) {
    errors.website = "Enter a valid website, for example acme.com.";
  }

  if (value.audience.length < FIELD_LIMITS.audience.min) {
    errors.audience = "A sentence or two is enough — who should we be reaching?";
  } else if (value.audience.length > FIELD_LIMITS.audience.max) {
    errors.audience = `Please keep this under ${FIELD_LIMITS.audience.max} characters.`;
  }

  if (value.goals.length < FIELD_LIMITS.goals.min) {
    errors.goals = "Tell us what a good outcome looks like for you.";
  } else if (value.goals.length > FIELD_LIMITS.goals.max) {
    errors.goals = `Please keep this under ${FIELD_LIMITS.goals.max} characters.`;
  }

  return { ok: Object.keys(errors).length === 0, errors, value };
}
