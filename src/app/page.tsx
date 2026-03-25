import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import HeroConstellation from "@/components/HeroConstellation";
import { publications } from "@/data/publications";

const researchHighlights = [
  {
    title: "Spatial Perception & Affordances",
    description:
      "How do people judge distances, passability, and object sizes in virtual environments? We study depth compression, impossible spaces, and how self-avatars shape affordance perception.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="14" cy="14" r="10" />
        <circle cx="14" cy="14" r="4" />
        <circle cx="14" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Cybersickness & Locomotion",
    description:
      "What causes discomfort in VR, and how does locomotion method affect spatial memory and real-world gait? We investigate the longitudinal effects of immersive technology use.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="8" width="22" height="13" rx="3" />
        <path d="M8 8V6a6 6 0 0 1 12 0v2" />
        <circle cx="10.5" cy="14.5" r="2" />
        <circle cx="17.5" cy="14.5" r="2" />
      </svg>
    ),
  },
  {
    title: "Social Virtual Reality",
    description:
      "How do people connect, interact, and build community in shared virtual spaces? We explore the social dynamics of VR for teenagers, children, and adults, including ethical considerations.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="10" cy="10" r="4" />
        <circle cx="19" cy="12" r="3" />
        <path d="M3 22c0-4 3-7 7-7s7 3 7 7" />
        <path d="M19 22c0-3 1.5-5.5 4-5.5" />
      </svg>
    ),
  },
  {
    title: "Conversational Agents & LLMs",
    description:
      "How do people perceive, trust, and interact with LLM-powered conversational agents? We study human-agent communication across text, voice, and embodied virtual representations.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="5" width="22" height="16" rx="3" />
        <path d="M8 13h6" />
        <path d="M8 17h10" />
        <circle cx="20" cy="9" r="2" />
      </svg>
    ),
  },
];

const featuredPubs = publications.filter((p) => p.featured);

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="hidden lg:block absolute right-0 top-0 w-[55%] h-full">
          <HeroConstellation />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="max-w-3xl">
            <p className="font-body text-2xl md:text-3xl font-bold text-charcoal border-l-[3px] border-clemson-orange pl-4 mb-6 animate-fade-in-up stagger-1">
              P<span className="text-[0.7em] uppercase tracking-wide">resence</span> L<span className="text-[0.7em] uppercase tracking-wide">ab</span>
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-charcoal leading-[1.1] tracking-tight mb-6 animate-fade-in-up stagger-2">
              Virtual Encounters,
              <span className="block text-clemson-regalia">Real Experiences</span>
            </h2>
            <p className="font-body text-lg md:text-xl text-charcoal-light leading-relaxed max-w-xl mb-6 animate-fade-in-up stagger-3">
              We investigate how people perceive, interact with, and relate to
              virtual environments and intelligent agents &mdash; from spatial
              cognition in XR to trust, communication, and social dynamics with
              conversational AI systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-4">
              <Link
                href="/research"
                className="inline-flex items-center justify-center px-6 py-3 bg-clemson-purple text-white font-body font-medium text-sm rounded-md hover:bg-clemson-purple-light transition-colors"
              >
                Explore Our Research
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-card-border text-charcoal font-body font-medium text-sm rounded-md hover:bg-cream-dark transition-colors"
              >
                Join the Lab
              </Link>
            </div>
          </div>
        </div>
        <hr className="accent-rule mx-auto max-w-6xl" aria-hidden="true" />
      </section>

      {/* ── Research Highlights ── */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="section-label mb-3">What We Study</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 tracking-tight">
          Research Areas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchHighlights.map((item, i) => (
            <AnimateOnScroll key={item.title} stagger={i + 1}>
              <div className="bg-card-bg border border-card-border border-t-2 border-t-clemson-purple/15 rounded-lg p-6 card-hover h-full">
                <div className="w-12 h-12 rounded-md bg-clemson-purple/10 flex items-center justify-center text-clemson-purple mb-5">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-charcoal-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/research"
            className="group font-body text-sm font-medium text-clemson-purple hover:text-clemson-purple-light transition-colors inline-flex items-center gap-1"
          >
            View all research
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── News ── */}
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="section-label !text-clemson-orange-muted mb-2">Latest Updates</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 tracking-tight">
            Recent Publications
          </h2>
          <div className="space-y-0 divide-y divide-charcoal-light">
            {featuredPubs.map((pub, i) => (
              <AnimateOnScroll key={i} stagger={i + 1}>
                <div className="py-4">
                  <span className="inline-block font-body text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded bg-white/[0.06] text-clemson-orange-muted mb-2">
                    {pub.venue}
                  </span>
                  <p className="font-body text-base text-cream-dark leading-relaxed">
                    {pub.title}
                  </p>
                  <p className="font-body text-sm text-cream-dark/60 mt-1">
                    {pub.authors}
                  </p>
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-body text-sm font-medium text-clemson-orange-muted hover:text-clemson-orange transition-colors mt-2"
                    >
                      View paper
                      <svg className="external-link-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
                      </svg>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="relative dot-grid">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3 tracking-tight">
            Interested in Our Work?
          </h2>
          <p className="font-body text-charcoal-light text-lg max-w-lg mx-auto mb-6 leading-relaxed">
            We&apos;re always looking for motivated researchers, graduate students,
            and collaborators interested in XR, perception, conversational AI, and human factors.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-clemson-orange text-white font-body font-semibold text-sm rounded-md hover:bg-clemson-orange-muted transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
