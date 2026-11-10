/**
 * Sanity Studio schema definitions for the Corvane website.
 *
 * These are plain schema objects (no `sanity` package needed in the website).
 * In a Sanity Studio project (`npm create sanity@latest`), copy this folder and:
 *
 *   import { schemaTypes } from "./schemas";
 *   export default defineConfig({ ..., schema: { types: schemaTypes } });
 *
 * Field names MUST stay in sync with src/lib/content/queries.ts and
 * src/types/content.ts. Drafts vs published is handled natively by Sanity;
 * the website reads the `published` perspective only.
 */
import { article } from "./article";
import { caseStudy } from "./caseStudy";
import { faq } from "./faq";
import { industry } from "./industry";
import { product } from "./product";
import { siteSettings } from "./siteSettings";
import { solution } from "./solution";

export const schemaTypes = [product, solution, industry, caseStudy, article, faq, siteSettings];
