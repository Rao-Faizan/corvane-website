import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FinalCTA } from "@/components/home/FinalCTA";
import { ProductCTA } from "@/components/products/ProductCTA";
import { ProductFAQ } from "@/components/products/ProductFAQ";
import { FeatureGrid, ProductFeatures } from "@/components/products/ProductFeatures";
import { ProductHero } from "@/components/products/ProductHero";
import { ProductScreenshots } from "@/components/products/ProductScreenshots";
import { JsonLd } from "@/components/shared/JsonLd";
import { Section } from "@/components/shared/Section";
import { getProduct, getProducts, getSolutions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return pageMetadata({
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.description,
    path: `/products/${product.slug}`,
    absoluteTitle: Boolean(product.seoTitle),
  });
}

function ListSection({ id, eyebrow, title, items }: { id: string; eyebrow: string; title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <Section labelledBy={id} className="border-t border-line">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h2 id={id} className="text-headline font-semibold">
            {title}
          </h2>
        </div>
        <ul className="flex flex-wrap content-start gap-3 lg:col-span-8">
          {items.map((item) => (
            <li key={item} className="rounded-full border border-line px-5 py-2.5 font-medium">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const [product, products, solutions] = await Promise.all([getProduct(slug), getProducts(), getSolutions()]);
  if (!product) notFound();

  const relatedSolutions = solutions.filter((s) => s.relatedProducts.includes(product.slug));
  const productOptions = products.map(({ slug, name }) => ({ slug, name }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Products", item: absoluteUrl("/products") },
            { "@type": "ListItem", position: 2, name: product.name, item: absoluteUrl(`/products/${product.slug}`) },
          ],
        }}
      />
      <ProductHero product={product} />

      {/* Challenges + overview */}
      <Section labelledBy="challenge-title">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">The challenge</p>
            <h2 id="challenge-title" className="text-headline font-semibold text-balance">
              Where organisations get stuck.
            </h2>
            <ul className="mt-10 border-t border-line">
              {product.challenges.map((c) => (
                <li key={c} className="reveal border-b border-line py-5 text-lg">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow mb-6">Overview</p>
            <p className="text-title font-medium text-pretty">{product.overview}</p>
            {relatedSolutions.length > 0 && (
              <div className="mt-12">
                <p className="text-sm font-semibold">Part of these solutions</p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {relatedSolutions.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/solutions#${s.slug}`}
                        className="inline-flex rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>

      <ProductFeatures features={product.features} />
      <ProductScreenshots product={product} />

      {product.useCases.length > 0 && (
        <Section tone="mist" labelledBy="usecases-title">
          <p className="eyebrow mb-6">Use cases</p>
          <h2 id="usecases-title" className="max-w-3xl text-headline font-semibold text-balance">
            Where {product.name} can help.
          </h2>
          <div className="mt-14">
            <FeatureGrid items={product.useCases} />
          </div>
        </Section>
      )}

      <ListSection id="integrations-title" eyebrow="Integrations" title="Works with" items={product.integrations} />
      <ListSection id="deployment-title" eyebrow="Deployment" title="Deployment options" items={product.deployment} />

      <ProductFAQ items={product.faq} />
      <ProductCTA product={product} products={productOptions} />
      <FinalCTA
        title="Looking at the bigger picture?"
        description="Most organisations combine several systems. We'll help you plan how they fit together."
        ctaLabel="Talk to Our Team"
      />
    </>
  );
}
