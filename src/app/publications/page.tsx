import type { Metadata } from "next";
import { publications } from "@/data/publications";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Selected publications from the Presence Lab at Clemson University.",
};

const years = Array.from(new Set(publications.map((p) => p.year))).sort(
  (a, b) => b - a
);

const typeConfig: Record<string, { style: string; icon: string }> = {
  Journal: { style: "bg-clemson-purple/10 text-clemson-purple", icon: "\u25A0" },
  Conference: { style: "bg-clemson-orange/10 text-clemson-orange", icon: "\u25B6" },
  Workshop: { style: "bg-cream-dark text-charcoal-light", icon: "\u25C6" },
  Dissertation: { style: "bg-cream-dark text-charcoal-light", icon: "\u25CB" },
  Editorial: { style: "bg-cream-dark text-slate", icon: "\u2014" },
};

export default function PublicationsPage() {
  const totalPubs = publications.length;
  const journalCount = publications.filter((p) => p.type === "Journal").length;
  const confCount = publications.filter(
    (p) => p.type === "Conference" || p.type === "Workshop"
  ).length;

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div
          className="dot-grid absolute inset-0 opacity-50"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <p className="section-label mb-5">Scholarly Output</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-4">
            Publications
          </h1>
          <p className="font-body text-lg text-charcoal-light max-w-xl leading-relaxed mb-6">
            Selected publications from our lab. For a complete list, see the{" "}
            <a
              href="https://scholar.google.com/citations?user=p5CTzgYAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-clemson-purple hover:text-clemson-purple-light transition-colors font-medium"
            >
              Google Scholar profile
              <svg className="external-link-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
              </svg>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: "Total Publications", value: totalPubs },
              { label: "Journal Articles", value: journalCount },
              { label: "Conference Papers", value: confCount },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-clemson-purple">
                  {stat.value}
                </span>
                <span className="font-body text-sm text-slate">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <hr className="accent-rule mx-auto max-w-6xl" aria-hidden="true" />
      </section>

      {/* Legend */}
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-2">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="font-body text-xs text-slate font-medium">
            Type:
          </span>
          {Object.entries(typeConfig).map(([type, { style, icon }]) => (
            <span
              key={type}
              className={`inline-flex items-center gap-1.5 font-body text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded ${style}`}
            >
              <span aria-hidden="true">{icon}</span>
              {type}
            </span>
          ))}
        </div>
      </section>

      {/* Publication List */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        {years.map((year) => (
          <div key={year} className="mb-14 last:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="sr-only">{year}</h2>
              <span className="font-display text-4xl font-bold text-clemson-purple/20" aria-hidden="true">
                {year}
              </span>
              <hr className="flex-1 border-card-border" aria-hidden="true" />
              <span className="font-body text-xs text-slate">
                {publications.filter((p) => p.year === year).length} paper
                {publications.filter((p) => p.year === year).length !== 1
                  ? "s"
                  : ""}
              </span>
            </div>
            <div className="space-y-0">
              {publications
                .filter((p) => p.year === year)
                .map((pub, i) => {
                  const config = typeConfig[pub.type] || { style: "bg-cream-dark text-slate", icon: "\u2022" };
                  return (
                    <div key={i} className="pub-entry py-5">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-1.5">
                        <span
                          className={`inline-flex items-center gap-1.5 w-fit sm:w-[90px] sm:justify-center font-body text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shrink-0 sm:mt-1 ${config.style}`}
                        >
                          <span aria-hidden="true">{config.icon}</span>
                          {pub.type}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-lg font-semibold text-charcoal leading-snug">
                            {pub.title}
                          </h3>
                          <p className="font-body text-sm text-charcoal-light mt-1">
                            {pub.authors}
                          </p>
                          {pub.venue && (
                            <p className="font-body text-sm italic text-slate mt-0.5">
                              {pub.venue}
                            </p>
                          )}
                          {pub.link && (
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-body text-sm font-medium text-clemson-purple hover:text-clemson-purple-light transition-colors mt-1"
                            >
                              View paper
                              <svg className="external-link-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
                              </svg>
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
