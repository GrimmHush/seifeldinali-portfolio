"use client";

import { useState } from "react";

// Netlify Forms, the App-Router way: the form is registered at build time by the
// static stub in public/__forms.html, and we submit here via fetch (no full-page
// reload). Field names MUST stay in sync with public/__forms.html.

type Status = "idle" | "submitting" | "success" | "error";

const FORM_NAME = "contact";

const labelClass = "font-mono text-xs uppercase tracking-widest text-muted";
const fieldClass =
  "mt-2 w-full rounded border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const body = new URLSearchParams(
      // FormData → string pairs; honeypot + form-name ride along automatically.
      Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)]),
    );

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        aria-live="polite"
        className="mt-10 rounded border border-border p-6 leading-relaxed"
      >
        <p className="text-xl text-foreground">Thanks — your message is on its way.</p>
        <p className="mt-2 text-muted">
          I read everything that comes in and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      name={FORM_NAME}
      onSubmit={handleSubmit}
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="mt-10 space-y-6"
    >
      {/* Netlify needs form-name in the payload to route the submission. */}
      <input type="hidden" name="form-name" value={FORM_NAME} />
      {/* Honeypot: hidden from humans, catches bots that fill every field. */}
      <p className="hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input id="name" name="name" type="text" required className={fieldClass} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} />
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company <span className="normal-case">(optional)</span>
        </label>
        <input id="company" name="company" type="text" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input id="subject" name="subject" type="text" required className={fieldClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className="text-sm text-muted">
          {status === "error" && (
            <span className="text-foreground">
              Something went wrong — please email me directly.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
