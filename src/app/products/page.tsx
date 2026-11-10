import type { Metadata } from "next";

import { FinalCTA } from "@/components/home/FinalCTA";
import { CustomSystemsCard } from "@/components/home/ProductPortfolio";
import { ProductCard } from "@/components/products/ProductCard";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { getProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "The Corvane product portfolio: HRMS, CRM, business intelligence, workflow management, document AI, AI assistants and computer vision.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <PageHero
        eyebrow="Product portfolio"
        title="Business systems that work as one."
        description="Each Corvane product family addresses a core area of the business. Together they form a connected foundation for operations and decisions."
      />
      <Section>
        <h2 className="sr-only">All products</h2>
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} {...p} />
          ))}
          <CustomSystemsCard />
        </div>
      </Section>
      <FinalCTA
        title="Not sure where to start?"
        description="Tell us about the problem you're solving. We'll recommend the right combination of products and services."
        ctaLabel="Talk to Our Team"
      />
    </>
  );
}
