import DocsSidebar from "@/components/DocsSidebar";
import { getDocsByCategory } from "@/lib/docs";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getDocsByCategory();

  const sidebarData = categories.map((cat) => ({
    name: cat.name,
    docs: cat.docs.map((doc) => ({
      title: doc.title,
      slug: doc.slug,
    })),
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden mb-6">
        <DocsSidebar categories={sidebarData} mobile />
      </div>

      <div className="flex gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <DocsSidebar categories={sidebarData} />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
