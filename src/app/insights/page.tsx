import type { Metadata } from "next";
import Link from "next/link";

import { FinalCTA } from "@/components/home/FinalCTA";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { getArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description: "Articles and perspectives from Corvane on business systems, automation and practical AI adoption.",
  path: "/insights",
});

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export default async function InsightsPage() {
  const articles = await getArticles();
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Perspectives on systems, automation and AI."
        description="Practical thinking for leaders modernising how their organisations operate."
      />
      <Section>
        <h2 className="sr-only">All articles</h2>
        {articles.length > 0 ? (
          <ul className="border-t border-line">
            {articles.map((a) => (
              <li key={a.slug} className="reveal group relative grid gap-3 border-b border-line py-10 md:grid-cols-12 md:gap-8">
                <time dateTime={a.publishedAt} className="text-sm text-muted md:col-span-3">
                  {formatDate(a.publishedAt)}
                </time>
                <div className="md:col-span-8">
                  <h3 className="text-title font-semibold">
                    <Link href={`/insights/${a.slug}`} className="after:absolute after:inset-0">
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-muted">{a.excerpt}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Our first articles are on the way."
            description="We're preparing practical articles on business systems, workflow automation and AI adoption. Until then, our team is glad to talk through your questions directly."
            ctaLabel="Ask our team"
            ctaHref="/contact"
          />
        )}
      </Section>
      <FinalCTA />
    </>
  );
}
