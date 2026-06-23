import { Resend } from "resend";
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

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  subject?: string;
  message?: string;
  "bot-field"?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email service not configured." }, { status: 500 });
  }

  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill every field. Accept silently so they don't retry.
  if (data["bot-field"]) {
    return Response.json({ ok: true });
  }

  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const subject = data.subject?.trim() ?? "";
  const message = data.message?.trim() ?? "";
  const company = data.company?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

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
