import Link from "next/link";

import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import type { Product } from "@/types/content";

import { ProductVisual } from "./ProductVisual";

export function ProductHero({ product }: { product: Product }) {
  return (
    <section aria-labelledby="product-title" className="bg-ink pt-32 pb-16 text-white sm:pt-40 lg:pb-24">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-ink-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/products" className="link-underline hover:text-white">
                Products
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-white">
              {product.name}
            </li>
          </ol>
        </nav>
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">{product.category}</p>
            <h1 id="product-title" className="text-display font-semibold">
              {product.name}
            </h1>
            <p className="mt-6 text-title font-medium text-white/90">{product.tagline}</p>
            <p className="mt-6 max-w-xl text-lead text-ink-muted">{product.description}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#request-demo" variant="inverse">
                Request a Demo
              </ButtonLink>
              <ButtonLink href={`/contact?type=general&product=${product.slug}`} variant="ghost-inverse">
                Ask a Question
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-[6px] border border-ink-line">
              <ProductVisual kind={product.visual} tone="dark" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
