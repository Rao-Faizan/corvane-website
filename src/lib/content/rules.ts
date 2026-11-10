import type { Article, CaseStudy, Product } from "@/types/content";

/**
 * Publication rules. Pure functions so they can be unit-tested and are the
 * single place deciding what may appear publicly.
 */

export function isProductPublic(product: Product): boolean {
  return product.isPublished && product.readiness !== "not-approved";
}

/** A case study needs BOTH editorial publication and written client approval. */
export function isCaseStudyPublic(study: CaseStudy): boolean {
  return study.isPublished && study.clientApproved;
}

export function isArticlePublic(article: Article): boolean {
  return article.isPublished;
}
