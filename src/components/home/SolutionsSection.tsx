import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Product, Solution } from "@/types/content";

interface SolutionsSectionProps {
  solutions: Solution[];
  products: Pick<Product, "name" | "slug">[];
}

/** Editorial index list: number · title · summary · related products. */
export function SolutionsSection({ solutions, products }: SolutionsSectionProps) {
  const productName = new Map(products.map((p) => [p.slug, p.name]));
  return (
    <Section tone="ink" labelledBy="solutions-title" className="grid-lines">
      <SectionHeading
        id="solutions-title"
        eyebrow="Business solutions"
        title="Start from the problem, not the product."
        description="We organise our work around the operational challenges organisations bring to us."
        align="split"
      />
      <ol className="mt-16 border-t border-ink-line lg:mt-24">
        {solutions.map((s, i) => {
          const related = s.relatedProducts.filter((slug) => productName.has(slug));
          return (
            <li key={s.slug} className="reveal group relative border-b border-ink-line">
              <div className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8 lg:py-10">
                <span className="text-sm text-ink-muted tabular-nums md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-title font-semibold md:col-span-4">
                  <Link href={`/solutions#${s.slug}`} className="after:absolute after:inset-0">
                    {s.title}
                  </Link>
                </h3>
                <p className="text-ink-muted md:col-span-4">{s.summary}</p>
                <div className="flex items-center justify-between gap-4 md:col-span-3">
                  <p className="text-sm text-white/70">
                    {related.map((slug) => productName.get(slug)).join(" · ")}
                  </p>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
