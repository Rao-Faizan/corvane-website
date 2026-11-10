import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FinalCTA } from "@/components/home/FinalCTA";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { getProducts, getSolutions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "Business solutions from Corvane: workforce management, customer and sales management, business intelligence, workflow automation, document processing, AI assistants and computer vision.",
  path: "/solutions",
});

export default async function SolutionsPage() {
  const [solutions, products] = await Promise.all([getSolutions(), getProducts()]);
  const productBySlug = new Map(products.map((p) => [p.slug, p]));

  return (
    <>
      <PageHero
        eyebrow="Business solutions"
        title="Solutions shaped around real operational problems."
        description="We start with the challenge in front of you, then combine products, integration and custom development to solve it."
      >
        <nav aria-label="Solutions on this page">
          <ul className="flex flex-wrap gap-2">
            {solutions.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="bg-paper">
        {solutions.map((s, i) => {
          const related = s.relatedProducts.map((slug) => productBySlug.get(slug)).filter((p) => p !== undefined);
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className="scroll-mt-24 border-b border-line py-20 sm:py-24"
            >
              <Container className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span className="text-sm font-semibold text-accent-strong tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`${s.slug}-title`} className="mt-4 text-headline font-semibold text-balance">
                    {s.title}
                  </h2>
                  <p className="mt-6 text-lead text-muted">{s.summary}</p>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <h3 className="text-sm font-semibold tracking-[0.14em] text-muted uppercase">The problem</h3>
                  <p className="mt-4 text-xl font-medium text-pretty">{s.problem}</p>
                  <h3 className="mt-12 text-sm font-semibold tracking-[0.14em] text-muted uppercase">Our approach</h3>
                  <ol className="mt-4 border-t border-line">
                    {s.approach.map((step, j) => (
                      <li key={step} className="flex gap-5 border-b border-line py-4">
                        <span className="text-sm text-muted tabular-nums">{j + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  {related.length > 0 && (
                    <>
                      <h3 className="mt-12 text-sm font-semibold tracking-[0.14em] text-muted uppercase">
                        Related products
                      </h3>
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {related.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/products/${p.slug}`}
                              className="group flex items-center justify-between rounded-[4px] bg-mist px-5 py-4 transition-colors hover:bg-ink hover:text-white"
                            >
                              <span>
                                <span className="block font-semibold">{p.name}</span>
                                <span className="block text-sm opacity-70">{p.category}</span>
                              </span>
                              <ArrowUpRight aria-hidden className="size-4" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </Container>
            </section>
          );
        })}
      </div>
      <FinalCTA ctaLabel="Discuss Your Project" />
    </>
  );
}
