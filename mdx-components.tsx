import type { MDXComponents } from "mdx/types";
import Def from "@/components/Def";

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
    Def,
  };
}
