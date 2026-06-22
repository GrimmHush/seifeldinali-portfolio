import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Co-founder of Iano, a two-person studio where both founders engineered every build.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">About</h1>
      {/* M1 fills: two-person-studio honest framing; both founders engineered every build. */}
      <div className="mt-8 opacity-50">[About body — populated in M1]</div>
    </article>
  );
}
