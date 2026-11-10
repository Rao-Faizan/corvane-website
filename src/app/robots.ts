import type { MetadataRoute } from "next";

import { absoluteUrl, isIndexingAllowed } from "@/lib/site-url";

/** Crawling is blocked unless NEXT_PUBLIC_ALLOW_INDEXING=true (production only). */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexingAllowed()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
