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
