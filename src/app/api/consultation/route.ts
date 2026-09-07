import { NextResponse } from "next/server";
import { validateConsultation, type ConsultationInput } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ *
 * Rate limiting
 *
 * In-memory and therefore per-instance: good enough to blunt casual abuse of a
 * single deployment, not a substitute for a shared store. If you run more than
 * one instance, back this with Redis / Upstash / Vercel KV instead.
 * ------------------------------------------------------------------ */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/* ------------------------------------------------------------------ *
 * Delivery
 *
 * Configure exactly one of these (see README):
 *   CONSULTATION_WEBHOOK_URL  — POST the enquiry as JSON anywhere you like
 *   RESEND_API_KEY + CONSULTATION_TO_EMAIL + CONSULTATION_FROM_EMAIL
 *   CONSULTATION_DEV_LOG=true — log to the server console (local dev only)
 *
 * With none of them set the route returns 503 and the form reports that the
 * endpoint is not configured. It never reports success for an enquiry that was
 * not actually delivered somewhere.
 * ------------------------------------------------------------------ */
type Submission = ConsultationInput & { receivedAt: string; userAgent: string };

async function deliver(submission: Submission): Promise<
  { ok: true } | { ok: false; status: number; error: string }
> {
  const webhook = process.env.CONSULTATION_WEBHOOK_URL;
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(submission),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[consultation] webhook rejected the enquiry", response.status);
      return { ok: false, status: 502, error: "We could not record your enquiry. Please try again." };
    }
    return { ok: true };
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONSULTATION_TO_EMAIL;
  const from = process.env.CONSULTATION_FROM_EMAIL;

  if (resendKey && to && from) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${resendKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.email,
        subject: `Consultation request — ${submission.name}`,
        text: [
          `Name: ${submission.name}`,
          `Work email: ${submission.email}`,
          `Website: ${submission.website}`,
          "",
          "Target audience:",
          submission.audience,
          "",
          "Sales goals:",
          submission.goals,
          "",
          `Received: ${submission.receivedAt}`,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[consultation] email delivery failed", response.status);
      return { ok: false, status: 502, error: "We could not record your enquiry. Please try again." };
    }
    return { ok: true };
  }

  if (process.env.CONSULTATION_DEV_LOG === "true") {
    console.info("[consultation] CONSULTATION_DEV_LOG is on — enquiry logged, not delivered:");
    console.info(JSON.stringify(submission, null, 2));
    return { ok: true };
  }

  console.error(
    "[consultation] No delivery target configured. Set CONSULTATION_WEBHOOK_URL, or " +
      "RESEND_API_KEY + CONSULTATION_TO_EMAIL + CONSULTATION_FROM_EMAIL. See README.md.",
  );
  return {
    ok: false,
    status: 503,
    error:
      "This form is not connected to a destination yet, so your enquiry was not sent. Please email us directly while we fix that.",
  };
}

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries from this connection. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const payload = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Answer 200 so the bot has no signal to tune against, but deliver nothing.
  if (typeof payload.companyFax === "string" && payload.companyFax.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { ok, errors, value } = validateConsultation({
    name: String(payload.name ?? ""),
    email: String(payload.email ?? ""),
    website: String(payload.website ?? ""),
    audience: String(payload.audience ?? ""),
    goals: String(payload.goals ?? ""),
  });

  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors: errors },
      { status: 422 },
    );
  }

  const result = await deliver({
    ...value,
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? "unknown",
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
