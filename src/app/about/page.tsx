import type { Metadata } from "next";

import { FinalCTA } from "@/components/home/FinalCTA";
import { processSteps } from "@/components/home/ProcessSection";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Corvane Consulting is an enterprise software and AI solutions company that helps organisations in Pakistan and the GCC improve operations.",
  path: "/about",
});

/**
 * About content is limited to approved positioning. Company history, leadership,
 * team size and office details are pending management input
 * (docs/PRODUCT_CONTENT_REQUIREMENTS.md).
 */
const principles = [
  {
    title: "Understand before building",
    text: "We spend time with the people who run the process. Good systems come from understanding the operation, not from features.",
  },
  {
    title: "Integrate, don't accumulate",
    text: "Every new system should reduce complexity. We design for connection between tools, data and teams.",
  },
  {
    title: "Practical over fashionable",
    text: "We use AI and automation where they solve a real problem, and say so when a simpler approach is better.",
  },
  {
    title: "Honest about scope",
    text: "We agree what will be delivered, how success is measured and what it will take before work begins.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero
        eyebrow="About Corvane"
        title="Business systems. Intelligent solutions."
        description={settings.description}
      />

      <Section labelledBy="mission-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">What we do</p>
            <h2 id="mission-title" className="text-headline font-semibold text-balance">
              Enterprise software and AI, applied to how you operate.
            </h2>
          </div>
          <div className="space-y-6 text-lead text-muted lg:col-span-6 lg:col-start-7">
            <p>
              Corvane helps organisations improve operations through enterprise software, intelligent automation,
              business intelligence, document AI and AI-powered systems.
            </p>
            <p>
              We work with mid-market and enterprise organisations in {settings.markets.join(" and the ")}. We combine
              our product portfolio with consulting and custom development so each solution fits the organisation using
              it.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="principles-title">
        <SectionHeading id="principles-title" eyebrow="How we work" title="Principles behind every engagement." />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[4px] bg-line md:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="reveal bg-mist p-8 sm:p-10">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="approach-title">
        <SectionHeading id="approach-title" eyebrow="Our approach" title="Five stages, one accountable team." />
        <ol className="mt-14 border-t border-line">
          {processSteps.map((s, i) => (
            <li key={s.title} className="reveal grid gap-3 border-b border-line py-7 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold text-accent-strong tabular-nums md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-semibold md:col-span-3">{s.title}</h3>
              <p className="text-muted md:col-span-8">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <FinalCTA />
    </>
  );
}
