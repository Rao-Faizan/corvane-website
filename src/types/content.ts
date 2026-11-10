/**
 * Domain types for all website content.
 * The same shapes are produced by the local content files and by the
 * Sanity GROQ projections in `src/lib/content/sanity-queries.ts`.
 */

/** Internal only — never rendered publicly. See docs/PRODUCT_INVENTORY.md */
export type ProductReadiness =
  | "production-ready"
  | "demo-ready"
  | "development-required"
  | "not-approved";

export type ProductVisualKind =
  | "people"
  | "sales"
  | "insights"
  | "workflow"
  | "docs"
  | "brain"
  | "vision";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Product {
  name: string;
  slug: string;
  /** Short line used under the product name */
  tagline: string;
  /** One or two sentences: the business area the product addresses */
  description: string;
  category: string;
  readiness: ProductReadiness;
  isPublished: boolean;
  visual: ProductVisualKind;
  /** Market problems in this area — not product claims */
  challenges: string[];
  /** Scope statement — what the product family is intended to cover */
  overview: string;
  /** Verified features only. Empty array hides the section. */
  features: Feature[];
  /** Scenarios to discuss with prospects */
  useCases: Feature[];
  /** Verified integrations only. Empty array hides the section. */
  integrations: string[];
  screenshots: Screenshot[];
  /** URL of an approved demo video (YouTube/Vimeo embed or mp4). */
  demoVideo?: string;
  /** Verified deployment options only. Empty array hides the section. */
  deployment: string[];
  faq: FAQItem[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Solution {
  title: string;
  slug: string;
  summary: string;
  /** Business problem framing */
  problem: string;
  /** How Corvane approaches it */
  approach: string[];
  /** Slugs of related products */
  relatedProducts: string[];
}

export interface Industry {
  name: string;
  slug: string;
  summary: string;
  /** Common operational priorities in the industry — not claims of past work */
  priorities: string[];
  /** Slugs of relevant solutions */
  relatedSolutions: string[];
}

export interface CaseStudy {
  title: string;
  slug: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  productsUsed: string[];
  /** Must be true — set only after written client approval. */
  clientApproved: boolean;
  isPublished: boolean;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  /** Plain paragraphs. Rich text arrives via Sanity portable text → paragraphs. */
  body: string[];
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  description: string;
  /** null until management approves — hidden when null */
  contactEmail: string | null;
  contactPhone: string | null;
  address: string | null;
  social: { label: string; href: string }[];
  markets: string[];
}
