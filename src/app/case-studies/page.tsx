import type { Metadata } from "next";

import { CaseStudyCard } from "@/components/home/CaseStudies";
import { FinalCTA } from "@/components/home/FinalCTA";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { getCaseStudies } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description: "Client work from Corvane Consulting, published with each client's approval.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Work we can show."
        description="We publish client work only with the client's written approval."
      />
      <Section>
        <h2 className="sr-only">All case studies</h2>
        {studies.length > 0 ? (
          <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((s) => (
              <CaseStudyCard key={s.slug} study={s} />
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Case studies are being prepared."
            description="We're preparing detailed client stories for publication. In the meantime, we're happy to discuss relevant experience directly."
            ctaLabel="Talk to our team"
            ctaHref="/contact"
          />
        )}
      </Section>
      <FinalCTA />
    </>
  );
}
