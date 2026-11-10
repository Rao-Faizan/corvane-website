import { Blocks, Cog, Gauge, Layers, Sparkles } from "lucide-react";

import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";

/** Differentiators are statements of approach, not unverified performance claims. */
const reasons = [
  {
    icon: Layers,
    title: "Integrated business systems",
    text: "Our products are planned as one portfolio, so HR, sales, workflow and reporting can share data instead of creating new silos.",
  },
  {
    icon: Sparkles,
    title: "Practical AI adoption",
    text: "We start with focused use cases, ground AI in your own information and keep people in control of important decisions.",
  },
  {
    icon: Blocks,
    title: "Business-focused technology",
    text: "Technology choices follow business outcomes. We define what success looks like before we build.",
  },
  {
    icon: Cog,
    title: "Flexible implementation",
    text: "Products can be configured, extended or combined with custom development to fit the way you work.",
  },
  {
    icon: Gauge,
    title: "Operational efficiency",
    text: "We look for the repetitive, manual work that slows teams down and design systems to remove it.",
  },
];

export function WhyCorvane() {
  return (
    <Section tone="mist" labelledBy="why-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="why-title"
              eyebrow="Why Corvane"
              title="Technology that fits the business."
              description="Corvane combines enterprise software and applied AI with a consulting mindset. We understand the operation first and build second."
            />
          </div>
        </div>
        <ul className="lg:col-span-6 lg:col-start-7">
          {reasons.map(({ icon: Icon, title, text }) => (
            <li key={title} className="reveal flex gap-6 border-t border-line py-9 first:border-t-0 first:pt-0 lg:first:pt-2">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-accent-strong">
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
