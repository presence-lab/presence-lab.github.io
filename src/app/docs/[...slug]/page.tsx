import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllDocs, getDocSlugs } from "@/lib/docs";
import DocsNavigation from "@/components/DocsNavigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const filePath = slug.join("/");

  try {
    const mod = await import(`../../../../content/docs/${filePath}.mdx`);
    const meta = mod.metadata;
    return {
      title: meta?.title ?? "Documentation",
      description: meta?.description,
    };
  } catch {
    return { title: "Documentation" };
  }
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const filePath = slug.join("/");

  let Content: React.ComponentType;
  try {
    const mod = await import(`../../../../content/docs/${filePath}.mdx`);
    Content = mod.default;
  } catch {
    notFound();
  }

  // Build prev/next from ordered doc list
  const allDocs = await getAllDocs();
  const currentIndex = allDocs.findIndex(
    (d) => d.slug.join("/") === filePath
  );
  const prev = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const next =
    currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  // Find current doc for breadcrumb
  const currentDoc = allDocs[currentIndex];

  return (
    <article>
      {/* Breadcrumb */}
      {currentDoc && (
        <nav
          aria-label="Breadcrumb"
          className="font-body text-xs text-slate mb-6"
        >
          <Link href="/docs" className="hover:text-charcoal transition-colors">
            Docs
          </Link>
          <span className="mx-1.5" aria-hidden="true">
            &rsaquo;
          </span>
          <span className="text-charcoal-light">{currentDoc.category}</span>
          <span className="mx-1.5" aria-hidden="true">
            &rsaquo;
          </span>
          <span className="text-charcoal">{currentDoc.title}</span>
        </nav>
      )}

      {/* MDX content */}
      <div className="doc-content">
        <Content />
      </div>

      {/* Prev/Next */}
      <DocsNavigation prev={prev} next={next} />
    </article>
  );
}
