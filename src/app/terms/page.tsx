import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "@/components/shared/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms governing the use of the Corvane Consulting website.",
  path: "/terms",
});

/*
 * DRAFT — REQUIRES LEGAL REVIEW BEFORE LAUNCH.
 * Governing law / jurisdiction and the legal entity name are intentionally
 * omitted until confirmed by management.
 */
const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: [
      "These terms apply to your use of this website. By using the website, you agree to them. If you do not agree, please do not use the website.",
    ],
  },
  {
    heading: "Information on this website",
    body: [
      "The content on this website is provided for general information about Corvane Consulting and its products and services. It does not form an offer or a contract.",
      "Product descriptions summarise the business areas our products address. Specific capabilities, scope, pricing and delivery terms are confirmed only in a written proposal or agreement.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The Corvane name, logo, website design and content are owned by Corvane Consulting or used with permission. You may not copy, reproduce or reuse them without our prior written consent, except as allowed by law.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "You agree not to misuse the website, including by attempting to gain unauthorised access, disrupting its operation, or submitting false, unlawful or harmful content through its forms.",
    ],
  },
  {
    heading: "Links to other websites",
    body: [
      "Where this website links to other websites, those links are provided for convenience only. We are not responsible for the content or practices of other websites.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "We work to keep this website accurate and available, but we do not guarantee that it will always be complete, current or uninterrupted. To the extent permitted by law, we are not liable for losses arising from use of the website.",
    ],
  },
  {
    heading: "Privacy",
    body: ["Our Privacy Policy explains how we handle personal information submitted through this website."],
  },
  {
    heading: "Changes to these terms",
    body: ["We may update these terms from time to time. The date at the top of this page shows when they were last changed."],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      updated="11 November 2026"
      intro="Please read these terms carefully before using the Corvane Consulting website."
      sections={sections}
    />
  );
}
