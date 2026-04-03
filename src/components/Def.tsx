"use client";

import { useState, useRef, useEffect } from "react";
import glossary from "./Glossary";

export default function Def({
  children,
  term,
}: {
  children: React.ReactNode;
  term?: string;
}) {
  const key = term ?? (typeof children === "string" ? children : "");
  const definition = glossary[key] ?? glossary[key.toLowerCase()];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  // Close on click outside or Escape
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (!definition) {
    return <>{children}</>;
  }

  return (
    <span ref={ref} className="def-wrapper">
      <span
        role="button"
        tabIndex={0}
        aria-describedby={open ? `def-${key}` : undefined}
        className="def-term"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(!open);
          }
        }}
      >
        {children}
      </span>
      {open && (
        <span
          ref={tooltipRef}
          id={`def-${key}`}
          role="tooltip"
          className="def-tooltip"
        >
          {definition}
        </span>
      )}
    </span>
  );
}
