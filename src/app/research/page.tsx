import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research areas and ongoing projects at the Presence Lab, Clemson University.",
};

interface Paper {
  title: string;
  citation: string;
}

interface ResearchArea {
  title: string;
  description: string;
  projects: string[];
  papers: Paper[];
}

const researchAreas: ResearchArea[] = [
  {
    title: "Spatial Perception & Affordances",
    description:
      "A core focus of the lab is understanding how people perceive space, distance, and action possibilities in virtual environments. We study depth compression, near-field size perception, passability judgments, and how these change over time with repeated VR exposure. Our work on impossible spaces investigates how self-overlapping virtual architectures affect distance perception and spatial reasoning.",
    projects: [
      "Depth compression and calibration over repeated VR sessions",
      "Passability affordances with self-avatars and virtual objects",
      "Spatial judgments in impossible and self-overlapping spaces",
      "Near-field size perception of tangible objects in VR",
      "Effects of eye height and body representation on action judgments",
    ],
    papers: [
      {
        title: "Objects may be farther than they appear: depth compression diminishes over time with repeated calibration in virtual reality",
        citation: "K Kohm, SV Babu, C Pagano, A Robb. IEEE TVCG 28(11), 2022",
      },
      {
        title: "Exploring the effects of self-overlapping spaces on distance perception and action judgments",
        citation: "J Payne, A Robb. ACM TAP 21(4), 2024",
      },
      {
        title: "How virtual hand representations affect the perceptions of dynamic affordances in virtual reality",
        citation: "R Venkatakrishnan et al. IEEE TVCG 29(5), 2023",
      },
      {
        title: "It Is Only Eco-Logical: Direct Perception for XR Research",
        citation: "K Kohm, A Robb, SV Babu, C Pagano. ACM SAP, 2025",
      },
    ],
  },
  {
    title: "Cybersickness & Locomotion",
    description:
      "We investigate the causes of cybersickness and the lingering aftereffects of VR use. Our research compares locomotion methods such as joystick and teleportation, examining their longitudinal effects on spatial memory, navigation behavior, and real-world gait. We also study how secondary tasks, distractions, and motion control influence sickness and comfort in immersive experiences.",
    projects: [
      "Longitudinal impact of locomotion method on spatial memory and gait",
      "Effects of auditory, visual, and cognitive distractions on cybersickness",
      "Secondary task demands and cybersickness during active exploration",
      "Lingering aftereffects of consumer VR use",
      "Sensitivity to rotational gains over time",
    ],
    papers: [
      {
        title: "Longitudinal Impact of Joystick and Teleportation Locomotion Methods on Spatial Memory in Virtual Reality and Real-World Gait After Exiting Virtual Reality",
        citation: "M Nasiri, O Nasiry, A Robb. IJHCI, 2025",
      },
      {
        title: "The effects of auditory, visual, and cognitive distractions on cybersickness in virtual reality",
        citation: "R Venkatakrishnan et al. IEEE TVCG 30(8), 2023",
      },
      {
        title: "Changes in navigation over time: A comparison of teleportation and joystick-based locomotion",
        citation: "M Nasiri, J Porter, K Kohm, A Robb. ACM TAP 20(4), 2023",
      },
      {
        title: "Experience matters: Longitudinal changes in sensitivity to rotational gains in virtual reality",
        citation: "A Robb, K Kohm, J Porter. ACM TAP 19(4), 2022",
      },
    ],
  },
  {
    title: "Avatars & Self-Representation",
    description:
      "How does seeing a virtual body change what you think you can do? We examine how avatar appearance, fidelity, and hand representations affect perception-action, the virtual hand illusion, and near-field interactions in both VR and mixed reality. Our work spans full-body self-avatars, avatarized end effectors in AR, and the effects of altered body proportions.",
    projects: [
      "Virtual hand visibility and near-field size perception",
      "Avatarization and interaction techniques in mixed reality",
      "Effects of anthropomorphic fidelity on reach and depth perception",
      "Self-avatars and calibration for passability judgments",
      "The virtual hand illusion: hand size and interaction modality",
    ],
    papers: [
      {
        title: "An Empirical Evaluation of How Virtual Hand Visibility Affects Near-Field Size Perception and Reporting of Tangible Objects in Virtual Reality",
        citation: "C Murmu et al. IEEE TVCG, 2025",
      },
      {
        title: "Investigating the effects of avatarization and interaction techniques on near-field mixed reality interactions with physical components",
        citation: "R Venkatakrishnan et al. IEEE TVCG 30(5), 2024",
      },
      {
        title: "Examining the effects of altered avatars on perception-action in virtual reality",
        citation: "B Day, E Ebrahimi, LS Hartman, CC Pagano, AC Robb, SV Babu. J. Exp. Psych.: Applied 25(1), 2019",
      },
      {
        title: "Can I squeeze through? Effects of self-avatars and calibration in a person-plus-virtual-object system on perceived lateral passability in VR",
        citation: "A Bhargava et al. IEEE TVCG 29(5), 2023",
      },
    ],
  },
  {
    title: "Social Virtual Reality",
    description:
      "We explore how people form connections, navigate social dynamics, and build community in shared virtual spaces. Our research examines teenagers' and children's experiences in social VR, the ethical implications of virtual identity and avatar use, and therapeutic applications such as overcoming social anxiety through social VR exposure.",
    projects: [
      "Why teenagers and children engage in social VR",
      "Ethical considerations of social VR and virtual avatars",
      "Social VR for overcoming social anxiety disorder",
      "Interacting with children in virtual social spaces",
      "Implicit bias and embodied avatar representation",
    ],
    papers: [
      {
        title: "Social virtual reality: ethical considerations and future directions for an emerging research space",
        citation: "D Maloney, G Freeman, A Robb. IEEE VR Workshops, 2021",
      },
      {
        title: "Stay connected in an immersive world: Why teenagers engage in social virtual reality",
        citation: "D Maloney, G Freeman, A Robb. ACM IDC, 2021",
      },
      {
        title: "Social virtual reality is my therapist: overcoming social anxiety disorder through using social virtual reality",
        citation: "S Zamanifard, A Robb. CHI EA, 2023",
      },
      {
        title: "A virtual space for all: Exploring children\u2019s experience in social virtual reality",
        citation: "D Maloney, G Freeman, A Robb. CHI PLAY, 2020",
      },
    ],
  },
  {
    title: "Conversational Agents & LLMs",
    description:
      "A growing direction of the lab investigates how people perceive, trust, and interact with LLM-powered conversational agents. We study the dynamics of human-agent communication across modalities — from text-based dialogue systems to voice interfaces and embodied virtual agents. Our work examines how agent design, conversational style, and embodiment shape user perceptions, and explores applications in education, mental health, and collaborative problem-solving.",
    projects: [
      "Perceptions and impacts of LLMs in higher education",
      "Trust and credibility in human-agent dialogue",
      "Embodied vs. disembodied conversational agents",
      "LLM-powered virtual agents for social skill training",
      "Conversational design for therapeutic and educational applications",
    ],
    papers: [
      {
        title: "Perceptions of LLMs in higher education settings",
        citation: "S Zamanifard, S Goudarzi, A Robb. In progress",
      },
    ],
  },
  {
    title: "Applied XR & Interdisciplinary Collaboration",
    description:
      "We collaborate across disciplines to apply XR and conversational agent research to real-world problems. This includes pedestrian behavior around autonomous vehicles, healthcare design evaluation, virtual patients for medical education, team training with virtual humans, and LLM-based tools for learning. Our applied work bridges computer science, psychology, transportation, and health sciences.",
    projects: [
      "Pedestrian-AV interaction in VR driving simulations",
      "VR for comparing healthcare facility design alternatives",
      "Virtual humans for medical team training and communication",
      "Display fidelity effects on spatial learning",
      "Navigation with screen-fixed and world-fixed annotations",
    ],
    papers: [
      {
        title: "Pedestrian behavior interacting with autonomous vehicles during unmarked midblock multilane crossings: Role of infrastructure design, AV operations and signaling",
        citation: "F Zou, J Ogle, W Jin, P Gerard, D Petty, A Robb. Transportation Research Part F 100, 2024",
      },
      {
        title: "Using virtual reality to compare design alternatives using subjective and objective evaluation methods",
        citation: "D Wingler, A Joseph, S Bayramzadeh, A Robb. HERD 13(1), 2020",
      },
      {
        title: "Leveraging virtual humans to effectively prepare learners for stressful interpersonal experiences",
        citation: "A Robb, R Kopper, R Ambani, F Qayyum, D Lind, LM Su, B Lok. IEEE TVCG 19(4), 2013",
      },
      {
        title: "Exploring effects of screen-fixed and world-fixed annotation on navigation in virtual reality",
        citation: "J Dominic, A Robb. IEEE VR, 2020",
      },
    ],
  },
];

export default function ResearchPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="section-label mb-5">Our Work</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal tracking-tight mb-4">
                Research
              </h1>
              <p className="font-body text-lg text-charcoal-light leading-relaxed">
                Our research bridges computer science, psychology, and human factors
                to understand how people perceive and act in virtual, augmented, and
                mixed reality environments &mdash; and how they communicate with and
                relate to intelligent conversational agents.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/research/vr-user.png"
                alt="Researcher using a VR headset and controllers in the Presence Lab"
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

      {/* Research Areas */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="space-y-16">
          {researchAreas.map((area, i) => (
            <AnimateOnScroll key={area.title}>
              <article
                className={`grid grid-cols-1 lg:grid-cols-5 gap-8 ${
                  i !== 0 ? "pt-16 border-t border-card-border" : ""
                }`}
              >
                <div className="lg:col-span-2 relative">
                  <span className="font-display text-4xl lg:text-6xl font-bold text-clemson-purple/15 leading-none" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal tracking-tight mt-2">
                    {area.title}
                  </h2>
                </div>
                <div className="lg:col-span-3">
                  <p className="font-body text-base text-charcoal-light leading-relaxed mb-6">
                    {area.description}
                  </p>
                  <div className="mb-8">
                    <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-slate mb-3">
                      Selected Topics
                    </h3>
                    <ul className="space-y-2">
                      {area.projects.map((project) => (
                        <li
                          key={project}
                          className="flex items-start gap-3 font-body text-sm text-charcoal"
                        >
                          <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-clemson-orange shrink-0" aria-hidden="true" />
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-slate mb-3">
                      Representative Papers
                    </h3>
                    <ul className="space-y-3">
                      {area.papers.map((paper) => (
                        <li key={paper.title} className="border-l-2 border-clemson-purple/20 pl-4">
                          <p className="font-display text-sm font-normal text-charcoal leading-snug">
                            {paper.title}
                          </p>
                          <p className="font-body text-xs text-slate mt-0.5">
                            {paper.citation}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/publications"
            className="group font-body text-sm font-medium text-clemson-purple hover:text-clemson-purple-light transition-colors inline-flex items-center gap-1"
          >
            View full publication list
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Collaborators */}
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="section-label !text-clemson-orange-muted mb-5">Our Network</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-8">
            Key Collaborators
          </h2>
          <p className="font-body text-sm text-cream-dark leading-relaxed mb-8 max-w-2xl">
            Our work is enriched by collaboration with faculty across Clemson and
            beyond, spanning computer science, psychology, engineering, health sciences, and AI.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Interdisciplinary XR Research",
                desc: "We collaborate closely with colleagues in perception, eye-tracking, and ecological psychology on studies of affordances, depth perception, and perceptual fidelity in immersive environments.",
              },
              {
                name: "Conversational AI & Human-Agent Interaction",
                desc: "We partner with researchers in NLP, education, and behavioral science to study how people interact with LLM-powered agents across text, voice, and embodied modalities.",
              },
              {
                name: "Applied Domains",
                desc: "Our partnerships with transportation, healthcare, and education researchers allow us to study pedestrian-AV interactions, medical team training, healthcare facility design, and AI-assisted learning.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="border border-charcoal-light rounded-lg p-8 bg-white/[0.03]"
              >
                <h3 className="font-display text-xl font-bold mb-3">
                  {item.name}
                </h3>
                <p className="font-body text-sm text-cream-dark leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
