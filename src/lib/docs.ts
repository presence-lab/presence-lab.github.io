import path from "path";
import { globby } from "globby";

export interface DocMeta {
  title: string;
  description: string;
  category: string;
  order: number;
  slug: string[];
}

export interface DocCategory {
  name: string;
  docs: DocMeta[];
}

const CONTENT_DIR = path.join(process.cwd(), "content/docs");

export async function getAllDocs(): Promise<DocMeta[]> {
  const files = await globby("**/*.mdx", { cwd: CONTENT_DIR });
  const docs: DocMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "").split("/");
    const mod = await import(`@/../../content/docs/${file}`);
    const meta = mod.metadata;
    if (!meta?.title || !meta?.category) continue;
    docs.push({
      title: meta.title,
      description: meta.description ?? "",
      category: meta.category,
      order: meta.order ?? 0,
      slug,
    });
  }

  return docs.sort((a, b) => a.category.localeCompare(b.category) || a.order - b.order);
}

export async function getDocsByCategory(): Promise<DocCategory[]> {
  const docs = await getAllDocs();
  const categories = new Map<string, DocMeta[]>();
  for (const doc of docs) {
    const list = categories.get(doc.category) ?? [];
    list.push(doc);
    categories.set(doc.category, list);
  }
  return Array.from(categories.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, docs]) => ({ name, docs }));
}

export async function getDocSlugs(): Promise<string[][]> {
  const docs = await getAllDocs();
  return docs.map((d) => d.slug);
}
