import type { Metadata } from "next";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "People",
  description: "Meet the researchers and students of the Presence Lab.",
};

interface Person {
  name: string;
  role: string;
  title?: string;
  bio: string;
  interests: string[];
}

const pi: Person = {
  name: "Andrew Robb",
  role: "Principal Investigator",
  title: "Assistant Professor, Clemson University",
  bio: "Dr. Robb directs the Presence Lab at Clemson University. His research focuses on understanding how people perceive and interact with virtual and augmented environments and intelligent conversational agents, with emphasis on spatial perception, cybersickness, social VR, affordance perception, human-agent interaction, and the design and evaluation of LLM-powered systems. He received his PhD from the University of Florida, where he studied mixed-agency teams and social presence in virtual human-based training simulations.",
  interests: [
    "Virtual Reality",
    "Spatial Perception",
    "Cybersickness",
    "Social VR",
    "Conversational Agents",
    "LLMs",
    "Affordances",
    "Avatars",
  ],
};

const members: Person[] = [
  {
    name: "Samaneh Zamanifard",
    role: "PhD Student",
    bio: "Investigates social virtual reality and its therapeutic potential, including using social VR to help overcome social anxiety disorder. Also studies perceptions of LLMs in higher education.",
    interests: ["Social VR", "Mental Health", "LLMs in Education"],
  },
  {
    name: "Sajad Goudarzi",
    role: "PhD Student",
    bio: "Researches perceptions and impacts of large language models in higher education settings.",
    interests: ["LLMs in Education", "HCI"],
  },
  {
    name: "Ralph Ugboko",
    role: "PhD Student",
    bio: "New member of the Presence Lab.",
    interests: [],
  },
];

interface Alum {
  name: string;
  info: string;
  role?: string;
  year?: string;
  position?: string;
}

const alumni: Alum[] = [
  { name: "Kristopher Kohm", role: "PhD, Advisor", info: "Spatial perception, depth compression, rotational gains, and direct perception for XR", year: "August 2024", position: "NASA Ames Research Center, Senior Software Engineer" },
  { name: "Rohith Venkatakrishnan", role: "PhD, Co-Advisor", info: "Cybersickness, affordances, avatarization, and mixed reality interactions", year: "December 2023", position: "University of Central Florida, Assistant Professor of Computer Science" },
  { name: "Roshan Venkatakrishnan", role: "PhD, Co-Advisor", info: "Cybersickness, motion control, and near-field interactions in VR", year: "December 2023", position: "University of Central Florida, Assistant Professor of Computer Science" },
  { name: "Moloud Nasiri", role: "PhD, Advisor", info: "Locomotion methods, spatial memory, and real-world gait after VR", year: "December 2023", position: "Converse University, Assistant Professor of Computer Science" },
  { name: "Divine Maloney", role: "PhD, Co-Advisor", info: "Social VR, children in virtual spaces, and ethical concerns of virtual avatars", year: "December 2021", position: "Apple, Senior AV/VR Software Engineer" },
  { name: "John Porter III", role: "PhD, Advisor", info: "Lingering VR effects, presence, simulator sickness, and porting games to VR", year: "May 2021", position: "Morehouse College, Postdoctoral Research Scientist" },
  { name: "Ayush Bhargava", role: "PhD, Co-Advisor", info: "Passability affordances, self-avatars, and affordance perception in VR", year: "December 2019", position: "Meta, UX Researcher" },
  { name: "James Dominic", role: "MS", info: "Navigation and annotation methods in virtual reality", year: "May 2019", position: "Spectrum, Principle Data Scientist" },
];

const avatarGradients = [
  "from-[#522D80] to-[#7B52AB]",
  "from-[#F56600] to-[#E8823A]",
  "from-[#3D3D3D] to-[#522D80]",
  "from-[#6B4A9E] to-[#F56600]",
  "from-[#522D80] to-[#3D3D3D]",
  "from-[#E8823A] to-[#522D80]",
];

function PersonCard({ person, large, index = 0 }: { person: Person; large?: boolean; index?: number }) {
  const initials = person.name
    .replace(/\[|\]/g, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  const gradient = avatarGradients[index % avatarGradients.length];

  return (
    <div className={`bg-card-bg border border-card-border rounded-lg p-6 card-hover ${large ? "md:p-8" : ""}`}>
      <div className="flex items-start gap-4 mb-4">
        {/* Gradient avatar placeholder */}
        <div
          className={`shrink-0 rounded-md bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-display font-bold shadow-sm ${
            large ? "w-16 h-16 text-2xl" : "w-12 h-12 text-lg"
          }`}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <h3 className={`font-display font-bold text-charcoal ${large ? "text-2xl" : "text-lg"}`}>
            {person.name}
          </h3>
          <p className="font-body text-sm font-medium text-clemson-purple">
            {person.role}
          </p>
          {person.title && (
            <p className="font-body text-xs text-slate mt-0.5">{person.title}</p>
          )}
        </div>
      </div>
      <p className={`font-body text-charcoal-light leading-relaxed mb-4 ${large ? "text-base" : "text-sm"}`}>
        {person.bio}
      </p>
      <div className="flex flex-wrap gap-2">
        {person.interests.map((interest) => (
          <span
            key={interest}
            className="font-body text-[11px] font-medium px-2.5 py-1 rounded-full bg-cream-dark text-charcoal-light"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PeoplePage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <p className="section-label mb-5">Our Team</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-4">
            People
          </h1>
          <p className="font-body text-lg text-charcoal-light max-w-xl leading-relaxed">
            The Presence Lab brings together researchers from computer science,
            psychology, and human factors, united by a shared interest in
            understanding perception and interaction in virtual environments
            and with intelligent conversational agents.
          </p>
        </div>
        <hr className="accent-rule mx-auto max-w-6xl" aria-hidden="true" />
      </section>

      {/* PI Section — two-column layout */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="section-label mb-6">Lab Director</h2>
        <div className="bg-card-bg border border-card-border border-t-2 border-t-clemson-purple/15 rounded-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-start">
              <Image
                src="/images/people/andrew-robb.jpg"
                alt="Andrew Robb"
                width={112}
                height={112}
                className="w-28 h-28 rounded-md object-cover shadow-sm mb-4"
              />
              <h3 className="font-display text-2xl font-bold text-charcoal">
                {pi.name}
              </h3>
              <p className="font-body text-sm font-medium text-clemson-purple">
                {pi.role}
              </p>
              {pi.title && (
                <p className="font-body text-xs text-slate mt-0.5">{pi.title}</p>
              )}
              <a
                href="https://scholar.google.com/citations?user=p5CTzgYAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 font-body text-xs font-medium text-clemson-purple hover:text-clemson-purple-light transition-colors bg-clemson-purple/5 px-3 py-1.5 rounded-full"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="7" cy="4" r="3" />
                  <path d="M2 13c0-3 2-5 5-5s5 2 5 5" />
                </svg>
                Google Scholar
                <svg className="external-link-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
                </svg>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <div className="flex flex-wrap gap-2 mt-4">
                {pi.interests.map((interest) => (
                  <span
                    key={interest}
                    className="font-body text-[11px] font-medium px-2.5 py-1 rounded-full bg-cream-dark text-charcoal-light"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="font-body text-base text-charcoal-light leading-relaxed">
                {pi.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Members */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="section-label mb-6">Current Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((person, i) => (
            <AnimateOnScroll key={person.name}>
              <PersonCard person={person} index={i + 1} />
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* Alumni */}
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="section-label !text-clemson-orange-muted mb-6">Alumni & Past Collaborators</h2>
          <div className="space-y-4">
            {alumni.map((alum) => (
              <div
                key={alum.name}
                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-charcoal-light last:border-b-0"
              >
                <div className="sm:w-56 shrink-0">
                  <span className="font-display text-lg font-bold">{alum.name}</span>
                  {(alum.role || alum.year) && (
                    <p className="font-body text-xs text-slate mt-0.5">
                      {[alum.role, alum.year].filter(Boolean).join(" \u00B7 ")}
                    </p>
                  )}
                </div>
                <div className="min-w-0">
                  <span className="font-body text-sm text-cream-dark">{alum.info}</span>
                  {alum.position && (
                    <p className="font-body text-xs text-clemson-orange-muted mt-0.5">
                      Now: {alum.position}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
