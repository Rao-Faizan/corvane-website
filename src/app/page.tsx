import type { Metadata } from "next";

import { CaseStudies } from "@/components/home/CaseStudies";
import { Credibility } from "@/components/home/Credibility";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProductPortfolio } from "@/components/home/ProductPortfolio";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { WhyCorvane } from "@/components/home/WhyCorvane";
import { JsonLd } from "@/components/shared/JsonLd";
import { getCaseStudies, getProducts, getSiteSettings, getSolutions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = pageMetadata({
  title: "Corvane Consulting — Business Systems. Intelligent Solutions.",
  description:
    "Enterprise software and AI solutions for mid-market and enterprise organisations in Pakistan and the GCC: HRMS, CRM, business intelligence, workflow, document AI, AI assistants and computer vision.",
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage() {
  const [products, solutions, studies, settings] = await Promise.all([
    getProducts(),
    getSolutions(),
    getCaseStudies(),
    getSiteSettings(),
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: settings.companyName,
          url: absoluteUrl("/"),
          logo: absoluteUrl("/icon.svg"),
          description: settings.description,
          slogan: settings.tagline,
          areaServed: settings.markets,
          ...(settings.contactEmail ? { email: settings.contactEmail } : {}),
          ...(settings.social.length ? { sameAs: settings.social.map((s) => s.href) } : {}),
        }}
      />
      <Hero />
      <Credibility />
      <ProductPortfolio products={products} />
      <SolutionsSection solutions={solutions} products={products} />
      <WhyCorvane />
      <ProcessSection />
      <CaseStudies studies={studies} />
      <FinalCTA />
    </>
  );
}
