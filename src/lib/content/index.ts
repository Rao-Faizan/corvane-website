import "server-only";
import { cacheLife, cacheTag } from "next/cache";

import { industries as localIndustries } from "@/content/industries";
import { products as localProducts } from "@/content/products";
import {
  articles as localArticles,
  caseStudies as localCaseStudies,
  siteSettings as localSettings,
} from "@/content/site";
import { solutions as localSolutions } from "@/content/solutions";
import { isSanityConfigured, sanityQuery } from "@/lib/cms/sanity";
import type { Article, CaseStudy, Industry, Product, SiteSettings, Solution } from "@/types/content";

import {
  ARTICLES_QUERY,
  CASE_STUDIES_QUERY,
  INDUSTRIES_QUERY,
  PRODUCTS_QUERY,
  SETTINGS_QUERY,
  SOLUTIONS_QUERY,
} from "./queries";
import { isArticlePublic, isCaseStudyPublic, isProductPublic } from "./rules";

/**
 * Content repository. Pages call ONLY these functions.
 * Source: Sanity when configured, otherwise the local typed content.
 * If Sanity is configured but unreachable, the error is logged and local
 * content is served so the site stays up.
 */
async function load<T>(query: string, fallback: T, tag: string): Promise<T> {
  "use cache";
  cacheLife("hours");
  cacheTag(tag);

  if (!isSanityConfigured()) return fallback;
  try {
    const result = await sanityQuery<T | null>(query);
    return result ?? fallback;
  } catch (error) {
    console.error(`[content] Sanity fetch failed for "${tag}", serving local content.`, error);
    return fallback;
  }
}

export async function getProducts(): Promise<Product[]> {
  const all = await load(PRODUCTS_QUERY, localProducts, "products");
  return all.filter(isProductPublic);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function getSolutions(): Promise<Solution[]> {
  return load(SOLUTIONS_QUERY, localSolutions, "solutions");
}

export async function getIndustries(): Promise<Industry[]> {
  return load(INDUSTRIES_QUERY, localIndustries, "industries");
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const all = await load(CASE_STUDIES_QUERY, localCaseStudies, "caseStudies");
  return all.filter(isCaseStudyPublic);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  return (await getCaseStudies()).find((c) => c.slug === slug);
}

export async function getArticles(): Promise<Article[]> {
  const all = await load(ARTICLES_QUERY, localArticles, "articles");
  return all.filter(isArticlePublic);
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  return (await getArticles()).find((a) => a.slug === slug);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return load(SETTINGS_QUERY, localSettings, "settings");
}
