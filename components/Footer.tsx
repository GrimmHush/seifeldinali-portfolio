export function Footer() {
  return (
    <footer className="border-t border-black/10 px-6 py-10 text-sm dark:border-white/10">
      <div className="mx-auto max-w-5xl">
        {/* Contact bar component lands here: clickable email / phone / WhatsApp / LinkedIn
            + "Save Contact" vCard + link to the Iano profile card.
            Details are placeholders until confirmed (the screenshot showed the co-founder's card). */}
        <p className="opacity-60">© {new Date().getFullYear()} Seif El Din Ali · Built with Next.js</p>
      </div>
    </footer>
  );
}
