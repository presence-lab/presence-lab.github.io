# Docs Section Design Spec

**Date:** 2026-04-03
**Status:** Draft

## Overview

Add a documentation section to the Presence Lab website where the PI and students can publish guides, best-practices, and reference material as MDX files that render as full pages with persistent sidebar navigation.

### Audience & Purpose

- All content is publicly accessible — no access gating or audience labels
- Primary audience: lab students (onboarding, tool guides, workflows)
- Secondary audience: broader academic/research community (shareable best-practices, methodological resources)

## Content Structure

### Directory Layout

```
content/docs/
├── development-tools/
│   ├── agentic-dev-best-practices.mdx
│   └── git-workflow.mdx
├── onboarding/
│   ├── getting-started.mdx
│   └── lab-tools-setup.mdx
└── research-methods/
    └── study-design.mdx
```

### Frontmatter Schema

Each `.mdx` file includes:

```yaml
---
title: "Best Practices for Agentic Development"
description: "A guide to onboarding students to AI-assisted development tools"
category: "Development Tools"    # display name for the sidebar section
order: 1                         # sort order within the category
---
```

- `title` (required): Document title, used in sidebar and page heading
- `description` (required): Brief summary, shown on index page cards
- `category` (required): Display name for the sidebar section grouping
- `order` (required): Numeric sort order within the category

Categories are organized by topic (e.g., "Onboarding," "Development Tools," "Research Methods") and grow organically as content is added.

## Routing

| Route | Purpose |
|-------|---------|
| `/docs` | Index page — shows all categories as cards with doc counts |
| `/docs/[...slug]` | Catch-all route rendering a specific doc, e.g. `/docs/development-tools/agentic-dev-best-practices` |

- Slug maps directly to the file path under `content/docs/`
- All pages statically generated at build time via `generateStaticParams`

## Page Layout

### Docs Layout (shared by index and all doc pages)

- **Sidebar** (~250px, left): Persistent, scrollable independently from content
  - Collapsible sections per category (active section expanded by default)
  - Active doc highlighted with orange left-border accent (matching existing `card-hover` pattern)
  - Section headers in small caps Clemson purple (matching existing section label style)
- **Main content area** (right): Max-width ~720px for comfortable reading
- **Breadcrumb**: `Docs > Category > Page Title` above content
- **Prev/next navigation**: Bottom of each doc page, linking to adjacent docs in the sidebar order
- **Mobile**: Sidebar collapses into a hamburger/drawer, consistent with the existing mobile nav pattern

### Docs Index Page (`/docs`)

- Header section matching other pages: dot-grid background, title, description, accent rule
- Category cards in a grid below, each showing:
  - Category name
  - Number of docs
  - Brief description
- Clicking a category links to the first doc in that section

### Navigation

- Add "Docs" link to the site nav, positioned between "Publications" and "Contact"

## Doc Content Rendering

- MDX compiled and rendered with site typography:
  - Cormorant Garamond for headings
  - Outfit for body text
- Standard markdown elements: headings, lists, tables, links, images, inline code
- Syntax-highlighted code blocks via `rehype-pretty-code` + `shiki` (bash, typescript, python, etc.)
- Custom MDX components available:
  - Callout/admonition boxes (tip, warning, note) — simple styled boxes with icon and text

## Build Infrastructure

### Utility Module (`src/lib/docs.ts`)

Responsibilities:
1. Scan `content/docs/` directory for all `.mdx` files
2. Parse frontmatter with `gray-matter`
3. Build sidebar tree: categories with ordered docs
4. Read and return raw MDX content for a given slug
5. Provide `generateStaticParams` data for static generation

### Dependencies

| Package | Purpose |
|---------|---------|
| `next-mdx-remote` | MDX compilation and rendering |
| `gray-matter` | Frontmatter parsing |
| `rehype-pretty-code` | Syntax highlighting integration |
| `shiki` | Syntax highlighting engine |

No heavy docs framework — focused libraries on top of existing Next.js infrastructure.

### Static Generation

- All doc pages pre-rendered at build time
- Adding a new doc = add an `.mdx` file and rebuild/deploy
- No runtime data fetching

## Design Decisions

1. **MDX over plain Markdown**: Allows embedding React components (callouts, interactive elements) while keeping everyday authoring simple
2. **Persistent sidebar over hub-and-spoke**: Better navigability for hierarchical content; users can always see where they are in the structure
3. **File-based content over CMS**: Keeps authoring in the repo alongside code, git-trackable, no external dependencies
4. **Topic-based organization**: More intuitive than audience-based; categories grow organically as content is added
5. **No access gating**: All content public — internal docs are simply more relevant to lab members but useful to anyone
