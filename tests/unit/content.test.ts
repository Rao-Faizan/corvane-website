import { describe, expect, it } from "vitest";

import { industries } from "@/content/industries";
import { companyNav, consultationCta, legalNav, primaryNav } from "@/content/navigation";
import { products } from "@/content/products";
import { articles, caseStudies, siteSettings } from "@/content/site";
import { solutions } from "@/content/solutions";
import { isArticlePublic, isCaseStudyPublic, isProductPublic } from "@/lib/content/rules";
import type { Article, CaseStudy } from "@/types/content";

const unique = (values: string[]) => new Set(values).size === values.length;

describe("publication rules", () => {
  const base = products[0]!;
  it("hides unpublished and not-approved products", () => {
    expect(isProductPublic({ ...base, isPublished: false })).toBe(false);
    expect(isProductPublic({ ...base, readiness: "not-approved" })).toBe(false);
    expect(isProductPublic({ ...base, isPublished: true, readiness: "demo-ready" })).toBe(true);
  });
  it("requires written client approval for case studies", () => {
    const study = { isPublished: true, clientApproved: false } as CaseStudy;
    expect(isCaseStudyPublic(study)).toBe(false);
    expect(isCaseStudyPublic({ ...study, clientApproved: true })).toBe(true);
  });
  it("respects article publication", () => {
    expect(isArticlePublic({ isPublished: false } as Article)).toBe(false);
  });
});

describe("content integrity", () => {
  it("has unique slugs", () => {
    expect(unique(products.map((p) => p.slug))).toBe(true);
    expect(unique(solutions.map((s) => s.slug))).toBe(true);
    expect(unique(industries.map((i) => i.slug))).toBe(true);
  });

  it("solutions only reference existing products", () => {
    const slugs = new Set(products.map((p) => p.slug));
    for (const s of solutions) for (const ref of s.relatedProducts) expect(slugs.has(ref), `${s.slug} -> ${ref}`).toBe(true);
  });

  it("industries only reference existing solutions", () => {
    const slugs = new Set(solutions.map((s) => s.slug));
    for (const i of industries)
      for (const ref of i.relatedSolutions) expect(slugs.has(ref), `${i.slug} -> ${ref}`).toBe(true);
  });

  // Guardrail from the brief: never advertise unverified capabilities.
  it("unverified products carry no feature, integration, deployment, screenshot or video claims", () => {
    for (const p of products.filter((x) => x.readiness === "development-required")) {
      expect(p.features, p.slug).toHaveLength(0);
      expect(p.integrations, p.slug).toHaveLength(0);
      expect(p.deployment, p.slug).toHaveLength(0);
      expect(p.screenshots, p.slug).toHaveLength(0);
      expect(p.demoVideo, p.slug).toBeUndefined();
    }
  });

  it("publishes no case study without client approval", () => {
    for (const c of caseStudies) if (c.isPublished) expect(c.clientApproved, c.slug).toBe(true);
  });

  it("never ships placeholder contact details", () => {
    const values = [siteSettings.contactEmail, siteSettings.contactPhone, siteSettings.address].filter(Boolean).join(" ");
    expect(values).not.toMatch(/example\.|lorem|xxx|123-456|placeholder/i);
  });

  it("navigation targets are known routes", () => {
    const routes = new Set([
      "/",
      "/products",
      "/solutions",
      "/industries",
      "/case-studies",
      "/insights",
      "/about",
      "/contact",
      "/privacy-policy",
      "/terms",
    ]);
    for (const item of [...primaryNav, ...companyNav, ...legalNav, consultationCta]) {
      expect(routes.has(item.href.split("?")[0]!), item.href).toBe(true);
    }
  });

  it("articles have valid dates", () => {
    for (const a of articles) expect(Number.isNaN(Date.parse(a.publishedAt))).toBe(false);
  });
});
