import type { Metadata } from "next";
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

const alumni: { name: string; info: string }[] = [
  { name: "M. Nasiri", info: "Locomotion methods, spatial memory, and real-world gait after VR" },
  { name: "K. Kohm", info: "Spatial perception, depth compression, rotational gains, and direct perception for XR" },
  { name: "C. Murmu", info: "Virtual hand visibility and near-field size perception" },
  { name: "D. Diaz", info: "Color and environmental surroundings effects on spatial cognition in VR" },
  { name: "J. Payne", info: "Distance perception and action judgments in self-overlapping spaces" },
  { name: "R. Venkatakrishnan", info: "Cybersickness, affordances, avatarization, and mixed reality interactions" },
  { name: "R. Venkatakrishnan", info: "Cybersickness, motion control, and near-field interactions in VR" },
  { name: "A. Bhargava", info: "Passability affordances, self-avatars, and affordance perception in VR" },
  { name: "J. Porter III", info: "Lingering VR effects, presence, simulator sickness, and porting games to VR" },
  { name: "D. Maloney", info: "Social VR, children in virtual spaces, and ethical concerns of virtual avatars" },
  { name: "B. Raveendranath", info: "Texture perception, affordances, and cybersickness in VR" },
  { name: "C. Barwulor", info: "Spatial judgments and room size perception in impossible spaces" },
  { name: "J. Dominic", info: "Navigation and annotation methods in virtual reality" },
];

function PersonCard({ person, large }: { person: Person; large?: boolean }) {
  const initials = person.name
    .replace(/\[|\]/g, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={`bg-card-bg border border-card-border rounded-lg p-6 card-hover ${large ? "md:p-8" : ""}`}>
      <div className="flex items-start gap-4 mb-4">
        {/* Placeholder avatar */}
        <div
          className={`shrink-0 rounded-md bg-clemson-purple/10 flex items-center justify-center text-clemson-purple font-display font-bold ${
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
        <hr className="accent-rule mx-auto max-w-6xl" />
      </section>

      {/* PI Section — two-column layout */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="section-label mb-6">Lab Director</p>
        <div className="bg-card-bg border border-card-border border-t-2 border-t-clemson-purple/15 rounded-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-start">
              <div className="w-20 h-20 rounded-md bg-clemson-purple/10 flex items-center justify-center text-clemson-purple font-display font-bold text-3xl mb-4" aria-hidden="true">
                AR
              </div>
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
        <p className="section-label mb-6">Current Members</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((person) => (
            <AnimateOnScroll key={person.name}>
              <PersonCard person={person} />
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* Alumni */}
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="section-label !text-clemson-orange-muted mb-6">Alumni & Past Collaborators</p>
          <div className="space-y-4">
            {alumni.map((alum) => (
              <div
                key={alum.name}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-charcoal-light last:border-b-0"
              >
                <span className="font-display text-lg font-bold">{alum.name}</span>
                <span className="font-body text-sm text-cream-dark">{alum.info}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
