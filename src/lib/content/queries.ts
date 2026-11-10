/**
 * GROQ projections that produce exactly the shapes in `src/types/content.ts`.
 * Keep in sync with `sanity/schemas/*`.
 */

const productProjection = `{
  name, "slug": slug.current, tagline, description, category, readiness, isPublished, visual,
  "challenges": coalesce(challenges, []), overview,
  "features": coalesce(features[]{title, description}, []),
  "useCases": coalesce(useCases[]{title, description}, []),
  "integrations": coalesce(integrations, []),
  "screenshots": coalesce(screenshots[]{
    "src": asset->url, alt, caption,
    "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height
  }, []),
  "demoVideo": demoVideo,
  "deployment": coalesce(deployment, []),
  "faq": coalesce(faq[]->{question, answer}, []),
  seoTitle, seoDescription
}`;

export const PRODUCTS_QUERY = `*[_type == "product"] | order(orderRank asc, name asc) ${productProjection}`;

export const SOLUTIONS_QUERY = `*[_type == "solution"] | order(orderRank asc, title asc) {
  title, "slug": slug.current, summary, problem,
  "approach": coalesce(approach, []),
  "relatedProducts": coalesce(relatedProducts[]->slug.current, [])
}`;

export const INDUSTRIES_QUERY = `*[_type == "industry"] | order(orderRank asc, name asc) {
  name, "slug": slug.current, summary,
  "priorities": coalesce(priorities, []),
  "relatedSolutions": coalesce(relatedSolutions[]->slug.current, [])
}`;

export const CASE_STUDIES_QUERY = `*[_type == "caseStudy"] | order(publishedAt desc) {
  title, "slug": slug.current, client, industry, summary, challenge, solution, outcome,
  "productsUsed": coalesce(productsUsed[]->slug.current, []),
  clientApproved, isPublished, publishedAt, seoTitle, seoDescription
}`;

export const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  title, "slug": slug.current, excerpt, author, publishedAt, isPublished, seoTitle, seoDescription,
  "body": coalesce(body[_type == "block"]{"text": pt::text(@)}.text, [])
}`;

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  companyName, tagline, description, contactEmail, contactPhone, address,
  "social": coalesce(social[]{label, href}, []),
  "markets": coalesce(markets, [])
}`;
