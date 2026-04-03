import path from "path";
import { globby } from "globby";

export interface DocMeta {
  title: string;
  description: string;
  category: string;
  order: number;
  slug: string[];
  children?: DocMeta[];
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
    const mod = await import(`../../content/docs/${file}`);
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

/** Flat list of all docs in sidebar order (parents then children interleaved). */
export async function getAllDocsFlat(): Promise<DocMeta[]> {
  const categories = await getDocsByCategory();
  const flat: DocMeta[] = [];
  for (const cat of categories) {
    for (const doc of cat.docs) {
      flat.push(doc);
      if (doc.children) {
        for (const child of doc.children) {
          flat.push(child);
        }
      }
    }
  }
  return flat;
}

export async function getDocsByCategory(): Promise<DocCategory[]> {
  const docs = await getAllDocs();

  // Build parent-child relationships from slug structure.
  // A doc is a child if its slug (minus the last segment) matches another doc's slug.
  const bySlugKey = new Map<string, DocMeta>();
  for (const doc of docs) {
    bySlugKey.set(doc.slug.join("/"), doc);
  }

  const childKeys = new Set<string>();
  for (const doc of docs) {
    if (doc.slug.length > 2) {
      const parentKey = doc.slug.slice(0, -1).join("/");
      const parent = bySlugKey.get(parentKey);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(doc);
        childKeys.add(doc.slug.join("/"));
      }
    }
  }

  // Sort children by order
  for (const doc of docs) {
    if (doc.children) {
      doc.children.sort((a, b) => a.order - b.order);
    }
  }

  // Build categories from top-level docs only
  const topLevel = docs.filter((d) => !childKeys.has(d.slug.join("/")));
  const categories = new Map<string, DocMeta[]>();
  for (const doc of topLevel) {
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
