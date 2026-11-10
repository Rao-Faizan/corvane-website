import type { Metadata } from "next";
import Link from "next/link";

import { FinalCTA } from "@/components/home/FinalCTA";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { getIndustries, getSolutions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "How Corvane's business systems and AI solutions apply to manufacturing, retail and distribution, logistics, education, healthcare and professional services.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const [industries, solutions] = await Promise.all([getIndustries(), getSolutions()]);
  const solutionBySlug = new Map(solutions.map((s) => [s.slug, s]));

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Different sectors. Common operational challenges."
        description="These are the operational priorities we most often discuss with organisations in each sector, and the solution areas that address them."
      />
      <Section>
        <h2 className="sr-only">Industries</h2>
        <ul className="grid gap-px overflow-hidden rounded-[4px] bg-line md:grid-cols-2">
          {industries.map((ind) => (
            <li key={ind.slug} id={ind.slug} className="reveal scroll-mt-24 bg-paper p-8 sm:p-10 lg:p-12">
              <h3 className="text-title font-semibold">{ind.name}</h3>
              <p className="mt-3 text-muted">{ind.summary}</p>
              <p className="mt-8 text-sm font-semibold">Common priorities</p>
              <ul className="mt-3 space-y-2.5">
                {ind.priorities.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm font-semibold">Relevant solutions</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ind.relatedSolutions
                  .map((slug) => solutionBySlug.get(slug))
                  .filter((s) => s !== undefined)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/solutions#${s.slug}`}
                        className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-ink"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>
      <FinalCTA
        title="Your sector has its own realities."
        description="Talk to us about the processes and constraints specific to your organisation."
        ctaLabel="Talk to Our Team"
      />
    </>
  );
}
