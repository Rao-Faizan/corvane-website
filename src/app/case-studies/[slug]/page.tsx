import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { FinalCTA } from "@/components/home/FinalCTA";
import { Container } from "@/components/shared/Container";
import { getCaseStudy, getProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

/*
 * No approved case studies exist yet. Cache Components forbids an empty
 * generateStaticParams, so this route resolves params inside <Suspense> and
 * 404s unknown slugs. Once at least one case study is published, add:
 *
 *   import { getCaseStudies } from "@/lib/content";
 *   export async function generateStaticParams() {
 *     return (await getCaseStudies()).map((s) => ({ slug: s.slug }));
 *   }
 */

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Case study not found", robots: { index: false } };
  return pageMetadata({
    title: study.seoTitle ?? study.title,
    description: study.seoDescription ?? study.summary,
    path: `/case-studies/${study.slug}`,
  });
}

async function CaseStudyContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [study, products] = await Promise.all([getCaseStudy(slug), getProducts()]);
  if (!study) notFound();
  const used = products.filter((p) => study.productsUsed.includes(p.slug));

  return (
    <article>
      <header className="border-b border-line pt-36 pb-16 sm:pt-44">
        <Container>
          <Link href="/case-studies" className="link-underline text-sm text-muted">
            ← All case studies
          </Link>
          <p className="eyebrow mt-10 mb-6">{study.industry}</p>
          <h1 className="max-w-5xl text-headline font-semibold text-balance">{study.title}</h1>
          <p className="mt-6 max-w-3xl text-lead text-muted">{study.summary}</p>
          <p className="mt-6 text-sm font-semibold">{study.client}</p>
        </Container>
      </header>
      <Container className="grid gap-14 py-20 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          {[
            ["The challenge", study.challenge],
            ["The solution", study.solution],
            ["The outcome", study.outcome],
          ].map(([heading, text]) => (
            <section key={heading}>
              <h2 className="text-title font-semibold">{heading}</h2>
              <p className="mt-4 text-lg text-muted">{text}</p>
            </section>
          ))}
        </div>
        {used.length > 0 && (
          <aside className="lg:col-span-3 lg:col-start-10">
            <p className="text-sm font-semibold">Products used</p>
            <ul className="mt-4 space-y-2">
              {used.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="link-underline text-accent-strong">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </Container>
    </article>
  );
}

export default function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  return (
    <>
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <CaseStudyContent params={params} />
      </Suspense>
      <FinalCTA />
    </>
  );
}

