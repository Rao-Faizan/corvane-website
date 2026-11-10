import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Product } from "@/types/content";

import { ProductVisual } from "./ProductVisual";

type ProductCardProps = Pick<Product, "name" | "slug" | "category" | "tagline" | "description" | "visual">;

/** Whole card is one link target; the title carries the accessible name. */
export function ProductCard({ name, slug, category, tagline, description, visual }: ProductCardProps) {
  return (
    <article className="group reveal relative flex h-full flex-col border-t border-line pt-6">
      <div className="overflow-hidden rounded-[4px]">
        <ProductVisual
          kind={visual}
          className="transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold tracking-[0.14em] text-accent-strong uppercase">{category}</p>
      </div>
      <h3 className="mt-3 text-title font-semibold">
        <Link href={`/products/${slug}`} className="after:absolute after:inset-0">
          {name}
        </Link>
      </h3>
      <p className="mt-2 font-medium text-text">{tagline}</p>
      <p className="mt-3 text-muted">{description}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-ink">
        Explore product
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </article>
  );
}
