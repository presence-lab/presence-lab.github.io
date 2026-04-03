import type { Metadata } from "next";
import Link from "next/link";
import { getDocsByCategory } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Guides, best practices, and resources from the Presence Lab.",
};

export default async function DocsPage() {
  const categories = await getDocsByCategory();

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div
          className="dot-grid absolute inset-0 opacity-40"
          aria-hidden="true"
        />
        <div className="relative pb-8">
          <p className="section-label mb-5">Resources</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-4">
            Documentation
          </h1>
          <p className="font-body text-lg text-charcoal-light leading-relaxed max-w-2xl">
            Guides, best practices, and reference material for lab members and
            the broader community.
          </p>
        </div>
        <hr className="accent-rule" aria-hidden="true" />
      </section>

      {/* Category cards */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/docs/${category.docs[0].slug.join("/")}`}
              className="card-hover block bg-card-bg border border-card-border rounded-lg p-6 transition-all"
            >
              <h2 className="font-body text-xs font-semibold tracking-widest uppercase text-clemson-purple mb-2">
                {category.name}
              </h2>
              <p className="font-body text-sm text-slate">
                {category.docs.length}{" "}
                {category.docs.length === 1 ? "guide" : "guides"}
              </p>
              <ul className="mt-3 space-y-1">
                {category.docs.map((doc) => (
                  <li
                    key={doc.slug.join("/")}
                    className="font-body text-sm text-charcoal-light"
                  >
                    {doc.title}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
