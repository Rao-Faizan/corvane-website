import type { MetadataRoute } from "next";

import { getArticles, getCaseStudies, getProducts } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/products", priority: 0.9 },
  { path: "/solutions", priority: 0.9 },
  { path: "/industries", priority: 0.7 },
  { path: "/case-studies", priority: 0.6 },
  { path: "/insights", priority: 0.6 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

/** Only published, public content is listed (filtering lives in lib/content). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, studies, articles] = await Promise.all([getProducts(), getCaseStudies(), getArticles()]);
  return [
    ...staticRoutes.map((r) => ({ url: absoluteUrl(r.path), priority: r.priority })),
    ...products.map((p) => ({ url: absoluteUrl(`/products/${p.slug}`), priority: 0.8 })),
    ...studies.map((s) => ({ url: absoluteUrl(`/case-studies/${s.slug}`), lastModified: s.publishedAt, priority: 0.6 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/insights/${a.slug}`), lastModified: a.publishedAt, priority: 0.5 })),
  ];
}
