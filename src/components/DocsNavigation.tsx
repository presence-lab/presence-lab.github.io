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
