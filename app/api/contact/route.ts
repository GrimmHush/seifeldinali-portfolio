import { Resend } from "resend";
import { z } from "zod";
import { contact } from "@/lib/contact";

// Contact-form backend. The contact page stays static; this is the one
// serverless function on the site. Submissions are emailed via Resend.
// Field names mirror components/ContactForm.tsx.

export const runtime = "nodejs";

// Where submissions land. Defaults to the published contact address.
const TO = process.env.CONTACT_TO_EMAIL ?? contact.email;
// Resend needs a verified sender domain. `onboarding@resend.dev` works without
// one, but only delivers to the account owner — verify seifeldinali.com and set
// CONTACT_FROM_EMAIL (e.g. "Portfolio <contact@seifeldinali.com>") for production.
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

// Trim, normalise, and cap every field — caps keep a spammer from posting megabytes.
const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(200).transform((s) => s.toLowerCase()),
  company: z.string().trim().max(150).optional().default(""),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(5000),
});

// Best-effort in-memory rate limit. Serverless instances aren't shared, so this
// caps bursts against a warm instance rather than enforcing a hard global limit
// — enough to blunt casual abuse; reach for Upstash/Vercel KV if you need a
// strict cap across instances.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email service not configured." }, { status: 500 });
  }

  if (rateLimited(clientIp(req))) {
    return Response.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a hidden field real users never see. Accept silently so the bot
  // believes it succeeded and doesn't retry.
  if (raw && typeof raw === "object" && (raw as Record<string, unknown>)["bot-field"]) {
    return Response.json({ ok: true });
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  const { name, email, company, subject, message } = parsed.data;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Portfolio contact: ${subject}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      company && `Company: ${company}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    return Response.json({ error: "Could not send message." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
