import Link from "next/link";
import { Container } from "@/components/ui";

export function Nav() {
  return (
    <header className="border-b border-border">
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          Seifeldin Ali
        </Link>
        <div className="flex gap-6 text-sm text-muted">
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/#work" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <Link href="/demonstration" className="transition-colors hover:text-foreground">
            Demonstration
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </Container>
    </header>
  );
}
