"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/people", label: "People" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector("a");
      firstLink?.focus();
    }
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-card-border">
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo / Lab Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm bg-clemson-purple flex items-center justify-center">
            <span className="text-white font-display text-lg font-bold leading-none">P</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold text-charcoal tracking-tight leading-tight">
              Presence Lab
            </span>
            <span className="text-[10px] font-body font-medium text-slate tracking-widest uppercase leading-tight">
              Clemson University
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-link font-body text-sm font-medium ${
                    isActive ? "text-charcoal" : "text-slate hover:text-charcoal"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu button */}
        <button
          ref={buttonRef}
          className="md:hidden p-2 text-charcoal"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile nav with transition */}
      <div
        ref={menuRef}
        className={`md:hidden border-t border-card-border bg-cream px-6 mobile-menu ${menuOpen ? "is-open" : ""}`}
      >
        <ul className="flex flex-col gap-1">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={`block font-body text-base px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "text-charcoal font-semibold bg-clemson-purple/5"
                      : "text-slate hover:bg-cream-dark"
                  }`}
                >
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-clemson-orange mr-2" aria-hidden="true" />
                  )}
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
