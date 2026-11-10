import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { FinalCTA } from "@/components/home/FinalCTA";
import { Container } from "@/components/shared/Container";
import { JsonLd } from "@/components/shared/JsonLd";
import { getArticle } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

/*
 * No articles are published yet. Cache Components forbids an empty
 * generateStaticParams, so params are resolved inside <Suspense> and unknown
 * slugs 404. Once at least one article is published, add:
 *
 *   import { getArticles } from "@/lib/content";
 *   export async function generateStaticParams() {
 *     return (await getArticles()).map((a) => ({ slug: a.slug }));
 *   }
 */

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found", robots: { index: false } };
  return pageMetadata({
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    path: `/insights/${article.slug}`,
  });
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

async function ArticleContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          author: { "@type": "Person", name: article.author },
          publisher: { "@type": "Organization", name: "Corvane Consulting" },
          mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
        }}
      />
      <header className="border-b border-line pt-36 pb-16 sm:pt-44">
        <Container className="max-w-4xl">
          <Link href="/insights" className="link-underline text-sm text-muted">
            ← All insights
          </Link>
          <h1 className="mt-10 text-headline font-semibold text-balance">{article.title}</h1>
          <p className="mt-6 text-lead text-muted">{article.excerpt}</p>
          <p className="mt-8 text-sm">
            <span className="font-semibold">{article.author}</span>
            <span className="text-muted">
              {" · "}
              <time dateTime={article.publishedAt}>{dateFormat.format(new Date(article.publishedAt))}</time>
            </span>
          </p>
        </Container>
      </header>
      <Container className="max-w-4xl space-y-6 py-16 text-lg leading-relaxed">
        {article.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Container>
    </article>
  );
}

export default function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  return (
    <>
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ArticleContent params={params} />
      </Suspense>
      <FinalCTA />
    </>
  );
}
