import type { Article, CaseStudy, SiteSettings } from "@/types/content";

/**
 * Global settings. Contact fields are `null` until management approves real
 * details. Null values are hidden on the site, never replaced with placeholders.
 */
export const siteSettings: SiteSettings = {
  companyName: "Corvane Consulting",
  tagline: "Business Systems. Intelligent Solutions.",
  description:
    "Corvane Consulting designs enterprise software and AI-powered systems that simplify operations, connect teams and support better decisions.",
  contactEmail: null,
  contactPhone: null,
  address: null,
  social: [],
  markets: ["Pakistan", "GCC"],
};

/**
 * Case studies: publish ONLY with written client approval (`clientApproved`).
 * None have been approved yet.
 */
export const caseStudies: CaseStudy[] = [];

/** Articles: none written or approved yet. */
export const articles: Article[] = [];
