import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-card-border bg-charcoal text-cream overflow-hidden">
      {/* Concentric circle motif */}
      <div className="absolute -right-24 -bottom-24 w-64 h-64 opacity-[0.04]" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#522D80" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" stroke="#522D80" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="30" stroke="#522D80" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Lab identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/clemson-paw.png"
                alt=""
                className="w-7 h-7 brightness-0 invert"
                aria-hidden="true"
              />
              <span className="font-display text-lg font-bold tracking-tight">
                P<span className="text-[0.7em] uppercase tracking-wide">resence</span> L<span className="text-[0.7em] uppercase tracking-wide">ab</span>
              </span>
            </div>
            <p className="font-body text-sm text-cream-dark leading-relaxed max-w-xs mb-3">
              Studying spatial perception, cybersickness, avatars, social
              dynamics, and human-agent interaction in virtual environments
              and with conversational AI at Clemson University.
            </p>
            <nav aria-label="University affiliation" className="font-body text-xs text-cream-dark/70 leading-relaxed">
              <a href="https://www.clemson.edu/cecas/" className="hover:text-white transition-colors">
                College of Engineering, Computing and Applied Science
              </a>
              {" · "}
              <a href="https://www.clemson.edu/cecas/departments/computing/" className="hover:text-white transition-colors">
                School of Computing
              </a>
              {" · "}
              <span>Human-Centered Computing</span>
            </nav>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-clemson-orange-muted mb-4">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {[
                { href: "/research", label: "Research" },
                { href: "/people", label: "People" },
                { href: "/publications", label: "Publications" },
                { href: "/docs", label: "Docs" },
                { href: "/contact", label: "Join the Lab" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-cream-dark hover:text-white transition-colors inline-block py-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-clemson-orange-muted mb-4">
              Contact
            </h3>
            <address className="font-body text-sm text-cream-dark leading-relaxed not-italic">
              Clemson University<br />
              Clemson, SC 29634<br />
              <a href="mailto:arobb@clemson.edu" className="hover:text-white transition-colors">arobb@clemson.edu</a>
            </address>
            <a
              href="https://github.com/presencelab"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-body text-sm text-cream-dark hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <hr className="border-charcoal-light mt-10 mb-6" />

        <p className="font-body text-xs text-slate text-center sm:text-left">
          &copy; {new Date().getFullYear()} P<span className="text-[0.7em] uppercase tracking-wide">resence</span> L<span className="text-[0.7em] uppercase tracking-wide">ab</span>, Clemson University. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
