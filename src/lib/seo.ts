import type { Metadata } from "next";

import { siteSettings } from "@/content/site";

/** Page-level openGraph replaces the inherited file-based image, so reference it explicitly. */
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "Corvane Consulting" };

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of appending the brand suffix */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}

/** Page-level metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, absoluteTitle, noIndex }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteSettings.companyName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: fullTitle,
      description,
      siteName: siteSettings.companyName,
      locale: "en",
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
