# Docs Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a documentation section to the Presence Lab website where MDX files in `content/docs/` render as pages with a persistent sidebar navigation.

**Architecture:** Use `@next/mdx` (Next.js official MDX support) with dynamic imports in a `[...slug]` catch-all route. MDX files use exported metadata objects for frontmatter. A utility module scans the content directory at build time to generate the sidebar tree and static params. The docs section gets its own layout with a sidebar + content area.

**Tech Stack:** `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `rehype-pretty-code`, `shiki`, `globby`

**Spec:** `docs/superpowers/specs/2026-04-03-docs-section-design.md`

### Spec Deviations

The spec called for `next-mdx-remote` + `gray-matter` with YAML frontmatter. This plan uses `@next/mdx` (Next.js official MDX plugin) with `export const metadata = {...}` in MDX files instead. Rationale:
- `@next/mdx` is the officially documented approach for Next.js 16 and integrates natively with the build pipeline
- Exported metadata objects avoid a separate parsing step and work naturally with dynamic imports
- Fewer dependencies (`gray-matter` and `next-mdx-remote` are not needed)
- The authoring experience is comparable — metadata is defined at the top of each file

---

## File Structure

```
# New files
content/docs/development-tools/agentic-dev-best-practices.mdx   — seed doc
src/lib/docs.ts                                                  — utility: scan docs, build sidebar tree, resolve slugs
src/app/docs/layout.tsx                                          — docs layout: sidebar + content area
src/app/docs/page.tsx                                            — docs index: category cards
src/app/docs/[...slug]/page.tsx                                  — catch-all: render individual doc
src/components/DocsSidebar.tsx                                    — sidebar: collapsible category sections
src/components/DocsNavigation.tsx                                 — prev/next navigation at bottom of docs
mdx-components.tsx                                               — required by @next/mdx: maps MDX elements to styled components

# Modified files
next.config.ts                                                   — add @next/mdx integration + pageExtensions
src/components/Navigation.tsx:7-13                                — add "Docs" link
src/components/Footer.tsx:54-59                                   — add "Docs" to quick links
src/app/globals.css                                              — add prose/doc-content styles
tsconfig.json                                                    — add content/ to include paths
package.json                                                     — new dependencies
```

---

### Task 1: Install Dependencies and Configure MDX

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`
- Modify: `tsconfig.json`
- Create: `mdx-components.tsx`

- [ ] **Step 1: Install dependencies**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx rehype-pretty-code shiki globby
```

- [ ] **Step 2: Update next.config.ts to use @next/mdx**

Replace the contents of `next.config.ts` with:

```ts
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";

const nextConfig = {
  output: "export" as const,
  basePath: "",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
  },
});

export default withMDX(nextConfig);
```

> **Note:** If `rehype-pretty-code` doesn't work as a direct function reference with Turbopack, use the string form: `rehypePlugins: [["rehype-pretty-code", { theme: "github-dark" }]]`. Check the Next.js 16 docs at `node_modules/next/dist/docs/01-app/02-guides/mdx.md` for the current recommended approach.

- [ ] **Step 3: Update tsconfig.json to include content directory and MDX types**

Add `"content/**/*.mdx"` to the `include` array in `tsconfig.json`:

```json
"include": [
  "next-env.d.ts",
  "**/*.ts",
  "**/*.tsx",
  ".next/types/**/*.ts",
  ".next/dev/types/**/*.ts",
  "**/*.mts",
  "content/**/*.mdx"
]
```

- [ ] **Step 4: Create mdx-components.tsx at project root**

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {};
}
```

This is required by `@next/mdx`. We'll add styled component mappings in a later task.

- [ ] **Step 5: Verify build still works**

```bash
npm run build
```

Expected: Build succeeds with no errors. No pages changed.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json next.config.ts tsconfig.json mdx-components.tsx
git commit -m "feat(docs): configure @next/mdx and install dependencies"
```

---

### Task 2: Create Docs Utility Module

**Files:**
- Create: `src/lib/docs.ts`
- Create: `content/docs/development-tools/agentic-dev-best-practices.mdx`

- [ ] **Step 1: Create seed MDX doc**

Create `content/docs/development-tools/agentic-dev-best-practices.mdx`:

```mdx
export const metadata = {
  title: "Best Practices for Agentic Development",
  description: "A guide to onboarding students to AI-assisted development tools.",
  category: "Development Tools",
  order: 1,
};

# Best Practices for Agentic Development

This guide covers how to effectively use AI-assisted development tools in your research workflow.

## Getting Started

Agentic development tools like Claude Code, GitHub Copilot, and Cursor can accelerate your work — but they require a different mindset than traditional coding.

## Key Principles

- **Be specific in your prompts.** Vague instructions produce vague code.
- **Review everything.** AI-generated code can contain subtle bugs.
- **Understand before you accept.** Never merge code you don't understand.
- **Iterate.** Treat AI suggestions as a starting point, not a final answer.

## Recommended Workflow

1. Start with a clear plan of what you want to build
2. Break the work into small, testable steps
3. Use the AI tool to help with each step
4. Review and test before moving to the next step
5. Commit frequently with descriptive messages
```

- [ ] **Step 2: Create the docs utility module**

Create `src/lib/docs.ts`:

```ts
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

/**
 * Scan all MDX files in content/docs/ and return their metadata.
 * Dynamically imports each file to read the exported `metadata` object.
 */
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

/**
 * Group docs by category, sorted alphabetically by category name.
 */
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

/**
 * Build a flat ordered list of all doc slugs for prev/next navigation.
 */
export async function getDocSlugs(): Promise<string[][]> {
  const docs = await getAllDocs();
  return docs.map((d) => d.slug);
}
```

- [ ] **Step 3: Verify the module compiles**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add content/docs/ src/lib/docs.ts
git commit -m "feat(docs): add docs utility module and seed MDX document"
```

---

### Task 3: Create Docs Sidebar Component

**Files:**
- Create: `src/components/DocsSidebar.tsx`

- [ ] **Step 1: Create the sidebar component**

Create `src/components/DocsSidebar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface DocLink {
  title: string;
  slug: string[];
}

interface SidebarCategory {
  name: string;
  docs: DocLink[];
}

export default function DocsSidebar({
  categories,
}: {
  categories: SidebarCategory[];
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="w-full">
      <div className="space-y-6">
        {categories.map((category) => (
          <SidebarSection
            key={category.name}
            category={category}
            pathname={pathname}
          />
        ))}
      </div>
    </nav>
  );
}

function SidebarSection({
  category,
  pathname,
}: {
  category: SidebarCategory;
  pathname: string;
}) {
  const hasActive = category.docs.some(
    (doc) => pathname === `/docs/${doc.slug.join("/")}`
  );
  const [open, setOpen] = useState(hasActive);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left font-body text-xs font-semibold tracking-widest uppercase text-clemson-purple mb-2"
        aria-expanded={open}
      >
        {category.name}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-transform ${open ? "rotate-90" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 4l4 4-4 4" />
        </svg>
      </button>
      {open && (
        <ul className="space-y-0.5">
          {category.docs.map((doc) => {
            const href = `/docs/${doc.slug.join("/")}`;
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`block font-body text-sm py-1.5 px-3 rounded-md transition-colors ${
                    isActive
                      ? "text-charcoal font-medium bg-clemson-orange/10 border-l-2 border-clemson-orange"
                      : "text-slate hover:text-charcoal hover:bg-cream-dark"
                  }`}
                >
                  {doc.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/DocsSidebar.tsx
git commit -m "feat(docs): add collapsible sidebar component"
```

---

### Task 4: Create Docs Prev/Next Navigation Component

**Files:**
- Create: `src/components/DocsNavigation.tsx`

- [ ] **Step 1: Create the prev/next navigation component**

Create `src/components/DocsNavigation.tsx`:

```tsx
import Link from "next/link";

interface NavDoc {
  title: string;
  slug: string[];
}

export default function DocsNavigation({
  prev,
  next,
}: {
  prev: NavDoc | null;
  next: NavDoc | null;
}) {
  return (
    <nav
      aria-label="Document pagination"
      className="flex justify-between items-center mt-12 pt-8 border-t border-card-border"
    >
      {prev ? (
        <Link
          href={`/docs/${prev.slug.join("/")}`}
          className="group font-body text-sm text-slate hover:text-clemson-purple transition-colors inline-flex items-center gap-1"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          >
            <path d="M10 4l-4 4 4 4" />
          </svg>
          {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug.join("/")}`}
          className="group font-body text-sm text-slate hover:text-clemson-purple transition-colors inline-flex items-center gap-1"
        >
          {next.title}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M6 4l4 4-4 4" />
          </svg>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/DocsNavigation.tsx
git commit -m "feat(docs): add prev/next navigation component"
```

---

### Task 5: Add MDX Content Styles

**Files:**
- Modify: `src/app/globals.css`
- Modify: `mdx-components.tsx`

- [ ] **Step 1: Add doc-content prose styles to globals.css**

Append to the end of `src/app/globals.css` (before the `@media (prefers-reduced-motion)` block):

```css
/* ── Doc content typography ── */
.doc-content h1 {
  font-family: var(--font-cormorant);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--charcoal);
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  line-height: 1.2;
}
.doc-content h2 {
  font-family: var(--font-cormorant);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--charcoal);
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}
.doc-content h3 {
  font-family: var(--font-cormorant);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--charcoal);
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}
.doc-content p {
  font-family: var(--font-outfit);
  font-size: 1rem;
  color: var(--charcoal-light);
  line-height: 1.75;
  margin-bottom: 1rem;
}
.doc-content ul, .doc-content ol {
  font-family: var(--font-outfit);
  font-size: 1rem;
  color: var(--charcoal-light);
  line-height: 1.75;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}
.doc-content li {
  margin-bottom: 0.25rem;
}
.doc-content ul li {
  list-style-type: disc;
}
.doc-content ol li {
  list-style-type: decimal;
}
.doc-content strong {
  font-weight: 600;
  color: var(--charcoal);
}
.doc-content a {
  color: var(--clemson-purple);
  text-decoration: underline;
  text-decoration-color: var(--clemson-purple);
  text-underline-offset: 2px;
  transition: color 0.2s ease;
}
.doc-content a:hover {
  color: var(--clemson-purple-light);
}
.doc-content code {
  font-size: 0.875em;
  background: var(--cream-dark);
  padding: 0.15em 0.35em;
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
.doc-content pre {
  background: var(--charcoal);
  color: var(--cream);
  padding: 1rem 1.25rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.6;
}
.doc-content pre code {
  background: none;
  padding: 0;
  border-radius: 0;
  color: inherit;
}
.doc-content blockquote {
  border-left: 3px solid var(--clemson-orange);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: var(--charcoal-light);
  font-style: italic;
}
.doc-content hr {
  border: none;
  height: 1px;
  background: var(--card-border);
  margin: 2rem 0;
}
.doc-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  font-family: var(--font-outfit);
  font-size: 0.9rem;
}
.doc-content th {
  text-align: left;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-bottom: 2px solid var(--card-border);
  color: var(--charcoal);
}
.doc-content td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--card-border);
  color: var(--charcoal-light);
}
```

- [ ] **Step 2: Update mdx-components.tsx with Callout component**

Replace `mdx-components.tsx`:

```tsx
import type { MDXComponents } from "mdx/types";

function Callout({
  type = "note",
  children,
}: {
  type?: "note" | "tip" | "warning";
  children: React.ReactNode;
}) {
  const styles = {
    note: { border: "var(--clemson-purple)", bg: "rgba(46, 26, 71, 0.05)", label: "Note" },
    tip: { border: "var(--clemson-orange)", bg: "rgba(245, 102, 0, 0.05)", label: "Tip" },
    warning: { border: "#b45309", bg: "rgba(180, 83, 9, 0.05)", label: "Warning" },
  };
  const s = styles[type];

  return (
    <div
      style={{
        borderLeft: `3px solid ${s.border}`,
        background: s.bg,
        padding: "0.75rem 1rem",
        borderRadius: "0 6px 6px 0",
        margin: "1.5rem 0",
      }}
    >
      <p
        style={{
          fontWeight: 600,
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "0.25rem",
          color: s.border,
        }}
      >
        {s.label}
      </p>
      <div style={{ fontSize: "0.95rem" }}>{children}</div>
    </div>
  );
}

export function useMDXComponents(): MDXComponents {
  return {
    Callout,
  };
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css mdx-components.tsx
git commit -m "feat(docs): add MDX content styles and Callout component"
```

---

### Task 6: Create Docs Layout and Index Page

**Files:**
- Create: `src/app/docs/layout.tsx`
- Create: `src/app/docs/page.tsx`

- [ ] **Step 1: Create docs layout with sidebar**

Create `src/app/docs/layout.tsx`:

```tsx
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
      <div className="flex gap-10">
        {/* Sidebar — hidden on mobile, shown on md+ */}
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
```

- [ ] **Step 2: Create docs index page**

Create `src/app/docs/page.tsx`:

```tsx
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
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. `/docs` route appears in the output.

- [ ] **Step 4: Commit**

```bash
git add src/app/docs/
git commit -m "feat(docs): add docs layout with sidebar and index page"
```

---

### Task 7: Create Catch-All Doc Page Route

**Files:**
- Create: `src/app/docs/[...slug]/page.tsx`

- [ ] **Step 1: Create the catch-all page**

Create `src/app/docs/[...slug]/page.tsx`:

```tsx
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
    const mod = await import(`@/../../content/docs/${filePath}.mdx`);
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
    const mod = await import(`@/../../content/docs/${filePath}.mdx`);
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
          <a href="/docs" className="hover:text-charcoal transition-colors">
            Docs
          </a>
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
```

- [ ] **Step 2: Verify full build**

```bash
npm run build
```

Expected: Build succeeds. Both `/docs` and `/docs/development-tools/agentic-dev-best-practices` appear in output.

- [ ] **Step 3: Visually verify with dev server**

```bash
npm run dev
```

Open `http://localhost:3000/docs` — should show the index page with "Development Tools" category card.
Click into the doc — should render the MDX content with sidebar, breadcrumb, and styled prose.

- [ ] **Step 4: Commit**

```bash
git add src/app/docs/
git commit -m "feat(docs): add catch-all doc page with breadcrumb and prev/next nav"
```

---

### Task 8: Add Docs to Site Navigation

**Files:**
- Modify: `src/components/Navigation.tsx:7-13`
- Modify: `src/components/Footer.tsx:54-59`

- [ ] **Step 1: Add "Docs" to the main navigation links array**

In `src/components/Navigation.tsx`, change the links array (lines 7–13) to:

```ts
const links = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/people", label: "People" },
  { href: "/publications", label: "Publications" },
  { href: "/docs", label: "Docs" },
  { href: "/contact", label: "Contact" },
];
```

- [ ] **Step 2: Add "Docs" to the footer quick links**

In `src/components/Footer.tsx`, change the quick links array (lines 54–59) to:

```ts
{[
  { href: "/research", label: "Research" },
  { href: "/people", label: "People" },
  { href: "/publications", label: "Publications" },
  { href: "/docs", label: "Docs" },
  { href: "/contact", label: "Join the Lab" },
].map(({ href, label }) => (
```

- [ ] **Step 3: Verify full build**

```bash
npm run build
```

- [ ] **Step 4: Visually verify navigation**

```bash
npm run dev
```

Confirm "Docs" appears in both desktop and mobile nav, and in the footer. Clicking it navigates to `/docs`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navigation.tsx src/components/Footer.tsx
git commit -m "feat(docs): add Docs link to site navigation and footer"
```

---

### Task 9: Mobile Sidebar Drawer

**Files:**
- Modify: `src/app/docs/layout.tsx`
- Modify: `src/components/DocsSidebar.tsx`

- [ ] **Step 1: Add mobile toggle to docs layout**

Update `src/app/docs/layout.tsx` to wrap the sidebar in a mobile-aware container. Replace the component with:

```tsx
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
```

- [ ] **Step 2: Add mobile mode to DocsSidebar**

Update `src/components/DocsSidebar.tsx` to accept a `mobile` prop. When `mobile` is true, render the sidebar inside a collapsible drawer with a toggle button:

Add `mobile?: boolean` to the component props:

```tsx
export default function DocsSidebar({
  categories,
  mobile = false,
}: {
  categories: SidebarCategory[];
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (
    <div className="space-y-6">
      {categories.map((category) => (
        <SidebarSection
          key={category.name}
          category={category}
          pathname={pathname}
        />
      ))}
    </div>
  );

  if (mobile) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 font-body text-sm font-medium text-clemson-purple"
          aria-expanded={mobileOpen}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M3 4h12M3 9h12M3 14h12" />
          </svg>
          Browse docs
        </button>
        {mobileOpen && (
          <div className="mt-4 border border-card-border rounded-lg p-4 bg-card-bg">
            <nav aria-label="Documentation">{sidebar}</nav>
          </div>
        )}
      </>
    );
  }

  return <nav aria-label="Documentation">{sidebar}</nav>;
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/docs/layout.tsx src/components/DocsSidebar.tsx
git commit -m "feat(docs): add mobile sidebar drawer for docs navigation"
```

---

### Task 10: Final Verification

- [ ] **Step 1: Full production build**

```bash
npm run build
```

Expected: Clean build, no warnings. Routes include `/docs`, `/docs/development-tools/agentic-dev-best-practices`.

- [ ] **Step 2: Visual review**

```bash
npm run dev
```

Check:
- `/docs` index page: header, category cards, sidebar visible on desktop
- `/docs/development-tools/agentic-dev-best-practices`: breadcrumb, styled content, sidebar with active highlight, prev/next nav
- Mobile: sidebar collapses to "Browse docs" toggle
- Navigation: "Docs" link in header and footer, active state works
- Styling: headings use Cormorant, body uses Outfit, code blocks styled, links purple

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: No lint errors.

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix(docs): address any issues found during verification"
```
