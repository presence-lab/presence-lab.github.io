import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Presence Lab or learn about joining as a student or collaborator.",
};

const opportunities = [
  {
    role: "Prospective PhD Students",
    description:
      "We are looking for motivated PhD students interested in virtual reality, spatial perception, cybersickness, social VR, conversational AI, LLM-based agents, or human-computer interaction. Applicants should apply through the Clemson University graduate admissions process and mention the Presence Lab in their application.",
    requirements: [
      "Background in CS, Psychology, Human Factors, or related field",
      "Research experience or strong interest in empirical methods",
      "Interest in VR/AR, conversational AI, perception, or human factors",
    ],
  },
  {
    role: "Master\u2019s Students",
    description:
      "MS students can join the lab through thesis or directed research options. Current projects span locomotion in VR, spatial perception, avatar representation, social VR, and human-agent interaction with LLMs. Contact Dr. Robb to discuss potential projects.",
    requirements: [
      "Enrollment in a Clemson graduate program",
      "Interest in lab research areas",
    ],
  },
  {
    role: "Undergraduate Researchers",
    description:
      "Undergraduates at Clemson can gain research experience in the lab through Creative Inquiry or independent study. Past undergraduates have contributed to published research on cybersickness, affordance perception, VR navigation, and conversational AI.",
    requirements: [
      "Currently enrolled at Clemson University",
      "Commitment of at least 2 semesters",
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="section-label mb-5">Get Involved</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-4">
                Contact & Join
              </h1>
              <p className="font-body text-lg text-charcoal-light leading-relaxed">
                Interested in our research on virtual reality, conversational AI,
                perception, and human-computer interaction? We welcome inquiries
                from prospective students, collaborators, and visitors.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/mcadams-hall.png"
                alt="McAdams Hall, Clemson University School of Computing"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
        <hr className="accent-rule mx-auto max-w-6xl" aria-hidden="true" />
      </section>

      {/* Contact Info */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              label: "Email",
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2" y="4" width="18" height="14" rx="2" />
                  <path d="M2 6l9 6 9-6" />
                </svg>
              ),
              content: (
                <a
                  href="mailto:arobb@clemson.edu"
                  className="font-body text-base text-clemson-purple hover:text-clemson-purple-light transition-colors"
                >
                  arobb@clemson.edu
                </a>
              ),
            },
            {
              label: "Location",
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M11 2C7.13 2 4 5.13 4 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z" />
                  <circle cx="11" cy="9" r="2.5" />
                </svg>
              ),
              content: (
                <span className="font-body text-base text-charcoal-light">
                  McAdams Hall, Room 111C<br/>
                  Clemson University<br />
                  Clemson, SC 29634
                </span>
              ),
            },
            {
              label: "Office Hours",
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="11" cy="11" r="9" />
                  <path d="M11 6v5l3 3" />
                </svg>
              ),
              content: (
                <span className="font-body text-base text-charcoal-light">
                  By appointment<br />
                  Email to schedule
                </span>
              ),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-card-bg border border-card-border rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md bg-clemson-purple/10 flex items-center justify-center text-clemson-purple">
                  {item.icon}
                </div>
                <h2 className="font-body text-xs font-semibold tracking-widest uppercase text-slate">
                  {item.label}
                </h2>
              </div>
              {item.content}
            </div>
          ))}
        </div>
      </section>

      {/* Opportunities */}
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="section-label !text-clemson-orange-muted mb-3">
            Opportunities
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Join the Lab
          </h2>
          <div className="space-y-8">
            {opportunities.map((opp) => (
              <div
                key={opp.role}
                className="border border-charcoal-light rounded-lg p-8 bg-white/[0.03]"
              >
                <h3 className="font-display text-xl font-bold mb-3">
                  {opp.role}
                </h3>
                <p className="font-body text-sm text-cream-dark leading-relaxed mb-4">
                  {opp.description}
                </p>
                <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-slate mb-3">
                  Requirements
                </h4>
                <ul className="space-y-2">
                  {opp.requirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-3 font-body text-sm text-cream-dark"
                    >
                      <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-clemson-orange shrink-0" aria-hidden="true" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative dot-grid">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3 tracking-tight">
            Ready to Reach Out?
          </h2>
          <p className="font-body text-charcoal-light max-w-md mx-auto mb-6 leading-relaxed">
            Send an email with your CV, a brief description of your research
            interests, and why the Presence Lab is a good fit.
          </p>
          <a
            href="mailto:arobb@clemson.edu"
            className="inline-flex items-center justify-center px-8 py-3 bg-clemson-purple text-white font-body font-semibold text-sm rounded-md hover:bg-clemson-purple-light transition-colors"
          >
            Email Dr. Robb
          </a>
        </div>
      </section>
    </>
  );
}
