import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          Seif El Din Ali
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/#work" className="hover:underline">
            Work
          </Link>
          <Link href="/engineering" className="hover:underline">
            Engineering
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
