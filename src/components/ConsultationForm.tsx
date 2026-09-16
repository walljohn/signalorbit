"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { FREE_LEADS } from "@/lib/content";
import {
  validateConsultation,
  type ConsultationInput,
  type FieldErrors,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

// Set only by the GitHub Pages workflow, which builds a static export with
// no /api route behind it (see next.config.ts). Everything else about the
// form — validation, honeypot, the success gate — behaves identically;
// only the wording of a failed submit changes, so a static preview never
// reads as a broken form.
const STATIC_PREVIEW = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true";

const EMPTY: ConsultationInput = {
  name: "",
  email: "",
  website: "",
  audience: "",
  goals: "",
};

const FIELDS: {
  key: keyof ConsultationInput;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  hint?: string;
  rows?: number;
}[] = [
  { key: "name", label: "Your name", placeholder: "Dana Whitfield", autoComplete: "name" },
  {
    key: "email",
    label: "Work email",
    placeholder: "you@yourcompany.com",
    type: "email",
    autoComplete: "email",
  },
  {
    key: "website",
    label: "Company website",
    placeholder: "yourcompany.com",
    autoComplete: "url",
  },
  {
    key: "audience",
    label: "Who are you trying to reach?",
    placeholder: "Operations directors at 3PL and freight businesses in the Benelux, 50–500 staff.",
    multiline: true,
    rows: 3,
    hint: "Industry, company size, region, and the role that owns the problem.",
  },
  {
    key: "goals",
    label: "What would a good outcome look like?",
    placeholder:
      "We want a steady flow of qualified conversations for two AEs, and a clearer read on which segments respond.",
    multiline: true,
    rows: 4,
    hint: "Be honest about constraints — it makes the proposal more useful.",
  },
];

export function ConsultationForm() {
  const [values, setValues] = useState<ConsultationInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const uid = useId();

  const setField = (key: keyof ConsultationInput, next: string) => {
    setValues((v) => ({ ...v, [key]: next }));
    // Clear an error as soon as the visitor starts fixing it.
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const validateField = (key: keyof ConsultationInput) => {
    const result = validateConsultation(values);
    setErrors((e) => ({ ...e, [key]: result.errors[key] }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const result = validateConsultation(values);
    if (!result.ok) {
      setErrors(result.errors);
      const first = FIELDS.find((f) => result.errors[f.key]);
      if (first) document.getElementById(`${uid}-${first.key}`)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...result.value,
          companyFax: honeypot.current?.value ?? "",
        }),
      });

      const data: { ok?: boolean; error?: string; fieldErrors?: FieldErrors } = await response
        .json()
        .catch(() => ({}));

      // Success is only ever shown for a request the server actually accepted.
      if (response.ok && data.ok) {
        setStatus("success");
        setValues(EMPTY);
        setErrors({});
        return;
      }

      if (data.fieldErrors) setErrors(data.fieldErrors);
      setFormError(
        STATIC_PREVIEW
          ? "This is a static preview with no backend behind it, so nothing was sent. Wire up the form per README.md on a real deployment."
          : (data.error ?? "Something went wrong. Please try again."),
      );
      setStatus("error");
    } catch {
      setFormError(
        STATIC_PREVIEW
          ? "This is a static preview with no backend behind it, so nothing was sent. Wire up the form per README.md on a real deployment."
          : "We could not reach the server. Check your connection and try again.",
      );
      setStatus("error");
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-abyss px-4 py-3 text-[0.95rem] text-ink placeholder:text-dim transition-all duration-300 focus:outline-none";

  return (
    <section id="consultation" className="relative scroll-mt-24 py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[var(--edge-strong)] to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Free leads"
                title={`Get your first ${FREE_LEADS} leads free.`}
                lede={`Tell us who you sell to. We’ll turn it into a written lead brief and deliver ${FREE_LEADS} verified leads against it before you pay anything.`}
              />

              <ul className="mt-10 space-y-4 border-t border-[var(--edge)] pt-8">
                {[
                  "A written lead brief with the criteria spelled out",
                  `${FREE_LEADS} verified leads, each with sources and a recommended route`,
                  "A custom monthly proposal only if you want more",
                ].map((item) => (
                  <li key={item} className="flex gap-3.5 text-[0.92rem] leading-relaxed text-dim">
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-signal"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.75 8.4 6.2 11.8l7-7.6" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="glass rounded-[var(--radius-glass)] p-6 sm:p-9">
              {status === "success" ? (
                <div className="flex min-h-[26rem] flex-col items-start justify-center">
                  <span
                    aria-hidden
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-signal/30 bg-signal-tint text-signal"
                  >
                    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.5 10.4 8 14.8l8.5-9.2" />
                    </svg>
                  </span>
                  <h3 className="mt-7 text-[1.5rem] font-medium tracking-[-0.02em] text-ink">
                    Your request is with us.
                  </h3>
                  <p className="mt-4 max-w-md text-[0.97rem] leading-[1.72] text-mist">
                    We&rsquo;ll read it properly and reply from a real person, usually within one
                    business day, to confirm your lead brief before any research starts.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 cursor-pointer text-[0.9rem] text-signal underline-offset-4 transition-colors hover:text-signal-deep hover:underline"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  {/* Honeypot — hidden from people, irresistible to bots. */}
                  <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor={`${uid}-companyFax`}>Company fax</label>
                    <input
                      ref={honeypot}
                      id={`${uid}-companyFax`}
                      name="companyFax"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid gap-5">
                    {FIELDS.map((field) => {
                      const id = `${uid}-${field.key}`;
                      const error = errors[field.key];
                      const describedBy =
                        [error ? `${id}-error` : null, field.hint ? `${id}-hint` : null]
                          .filter(Boolean)
                          .join(" ") || undefined;

                      const borderClass = error
                        ? "border-red-500/60 focus:border-red-600"
                        : "border-[var(--edge-strong)] focus:border-signal";

                      return (
                        <div key={field.key}>
                          <label
                            htmlFor={id}
                            className="mb-2 block text-[0.85rem] font-medium text-mist"
                          >
                            {field.label}
                          </label>

                          {field.multiline ? (
                            <textarea
                              id={id}
                              name={field.key}
                              rows={field.rows ?? 3}
                              value={values[field.key]}
                              onChange={(e) => setField(field.key, e.target.value)}
                              onBlur={() => validateField(field.key)}
                              placeholder={field.placeholder}
                              aria-invalid={error ? true : undefined}
                              aria-describedby={describedBy}
                              className={`${inputBase} ${borderClass} resize-y`}
                            />
                          ) : (
                            <input
                              id={id}
                              name={field.key}
                              type={field.type ?? "text"}
                              autoComplete={field.autoComplete}
                              value={values[field.key]}
                              onChange={(e) => setField(field.key, e.target.value)}
                              onBlur={() => validateField(field.key)}
                              placeholder={field.placeholder}
                              aria-invalid={error ? true : undefined}
                              aria-describedby={describedBy}
                              className={`${inputBase} ${borderClass}`}
                            />
                          )}

                          {field.hint && !error ? (
                            <p id={`${id}-hint`} className="mt-2 text-[0.79rem] text-dim">
                              {field.hint}
                            </p>
                          ) : null}

                          {error ? (
                            <p
                              id={`${id}-error`}
                              className="mt-2 flex items-center gap-1.5 text-[0.79rem] text-red-700"
                            >
                              <svg aria-hidden viewBox="0 0 14 14" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                                <circle cx="7" cy="7" r="5.6" />
                                <path d="M7 4.3v3.4M7 9.6v.1" />
                              </svg>
                              {error}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>

                  <div aria-live="polite">
                    {formError ? (
                      <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.86rem] leading-relaxed text-red-800">
                        {formError}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-signal px-7 py-3.5 text-[0.95rem] font-medium text-white shadow-[0_10px_28px_-12px_rgba(22,98,196,0.65)] transition-all duration-300 hover:bg-signal-deep disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                  >
                    {status === "submitting" ? "Sending…" : "Request my free leads"}
                    {status === "submitting" ? null : (
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                      </svg>
                    )}
                  </button>

                  <p className="mt-5 text-[0.79rem] leading-relaxed text-dim">
                    We use these answers to research your leads and to reply to you, and nothing
                    else. No list, no resale, and no automated sequence pointed back at you. See our{" "}
                    <Link
                      href="/privacy"
                      className="text-signal underline underline-offset-4 hover:text-signal-deep"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
