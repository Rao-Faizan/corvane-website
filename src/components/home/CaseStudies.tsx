import Link from "next/link";

import { EmptyState } from "@/components/shared/EmptyState";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { CaseStudy } from "@/types/content";

/** Shows ONLY approved case studies (filtered in lib/content); honest empty state otherwise. */
export function CaseStudies({ studies }: { studies: CaseStudy[] }) {
  return (
    <Section tone="mist" labelledBy="cases-title">
      <SectionHeading
        id="cases-title"
        eyebrow="Case studies"
        title="Work we can show."
        description="We publish client work only with the client's written approval."
        align="split"
      />
      <div className="mt-16 lg:mt-20">
        {studies.length > 0 ? (
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {studies.slice(0, 3).map((s) => (
              <CaseStudyCard key={s.slug} study={s} />
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Case studies are being prepared."
            description="Detailed client stories will appear here once they are approved for publication. We're happy to walk you through relevant experience in a conversation."
            ctaLabel="Talk to our team"
            ctaHref="/contact"
          />
        )}
      </div>
    </Section>
  );
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <li className="reveal group relative border-t border-ink pt-6">
      <p className="text-xs font-semibold tracking-[0.14em] text-accent-strong uppercase">{study.industry}</p>
      <h3 className="mt-3 text-title font-semibold">
        <Link href={`/case-studies/${study.slug}`} className="after:absolute after:inset-0">
          {study.title}
        </Link>
      </h3>
      <p className="mt-3 text-muted">{study.summary}</p>
    </li>
  );
}
