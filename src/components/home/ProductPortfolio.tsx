import { ProductCard } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Product } from "@/types/content";

/** "Other custom software systems" from the portfolio: a service, not a product claim. */
export function CustomSystemsCard() {
  return (
    <article className="reveal relative flex flex-col justify-between gap-10 rounded-[4px] bg-ink p-8 text-white lg:col-span-2 lg:p-12">
      <div>
        <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Custom systems</p>
        <h3 className="mt-4 max-w-lg text-headline font-semibold text-balance">Something the portfolio doesn&apos;t cover?</h3>
        <p className="mt-5 max-w-lg text-ink-muted">
          We also design and build custom business software around processes that are specific to your organisation.
        </p>
      </div>
      <div>
        <ButtonLink href="/contact?type=enterprise" variant="inverse">
          Discuss a custom system
        </ButtonLink>
      </div>
    </article>
  );
}

export function ProductPortfolio({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <Section id="products" labelledBy="products-title">
      <SectionHeading
        id="products-title"
        eyebrow="Product portfolio"
        title="One family of business systems."
        description="Seven product families, each covering an area of the business and designed to work together."
        align="split"
      />
      <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} {...p} />
        ))}
        <CustomSystemsCard />
      </div>
      <div className="mt-16 flex justify-start">
        <ButtonLink href="/products" variant="secondary">
          View all products
        </ButtonLink>
      </div>
    </Section>
  );
}
