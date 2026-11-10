import { products } from "@/content/products";
import { articles, caseStudies } from "@/content/site";
import { isSanityConfigured, sanityQuery } from "@/lib/cms/sanity";

import { isArticlePublic, isCaseStudyPublic, isProductPublic } from "./rules";

/**
 * Public slug index used by `src/proxy.ts` to return a real HTTP 404 for
 * unknown detail pages BEFORE streaming starts (with Cache Components, a
 * notFound() inside the page can only produce a soft 404).
 *
 * Mirrors the publication rules in ./rules.ts.
 */
export type Collection = "products" | "case-studies" | "insights";

const SLUGS_QUERY = `{
  "products": *[_type == "product" && isPublished == true && readiness != "not-approved"].slug.current,
  "case-studies": *[_type == "caseStudy" && isPublished == true && clientApproved == true].slug.current,
  "insights": *[_type == "article" && isPublished == true].slug.current
}`;

const TTL_MS = 60_000;
let cache: { at: number; value: Record<Collection, Set<string>> } | null = null;

function localSlugs(): Record<Collection, Set<string>> {
  return {
    products: new Set(products.filter(isProductPublic).map((p) => p.slug)),
    "case-studies": new Set(caseStudies.filter(isCaseStudyPublic).map((c) => c.slug)),
    insights: new Set(articles.filter(isArticlePublic).map((a) => a.slug)),
  };
}

/** Returns null when the source is unavailable — callers must then let the request through. */
export async function getPublicSlugs(now = Date.now()): Promise<Record<Collection, Set<string>> | null> {
  if (!isSanityConfigured()) return localSlugs();
  if (cache && now - cache.at < TTL_MS) return cache.value;
  try {
    const result = await sanityQuery<Record<Collection, string[]>>(SLUGS_QUERY);
    const value = {
      products: new Set(result.products ?? []),
      "case-studies": new Set(result["case-studies"] ?? []),
      insights: new Set(result.insights ?? []),
    };
    cache = { at: now, value };
    return value;
  } catch (error) {
    console.error("[proxy] slug lookup failed; allowing request through.", error);
    return cache?.value ?? null;
  }
}
