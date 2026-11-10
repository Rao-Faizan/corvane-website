import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "@/components/shared/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Corvane Consulting collects and uses personal information submitted through this website.",
  path: "/privacy-policy",
});

/*
 * DRAFT — REQUIRES LEGAL REVIEW BEFORE LAUNCH.
 * Written to describe what this website actually does today (contact form only,
 * no analytics or advertising cookies). Legal entity name, registered address,
 * governing law and retention periods must be confirmed by management/legal.
 */
const sections: LegalSection[] = [
  {
    heading: "Information we collect",
    body: [
      "When you submit the contact or demo request form, we collect the details you provide: your name, work email address, company, phone number (optional), country, the product you are interested in, the type of inquiry and your message.",
      "Like most websites, our hosting infrastructure may record technical information such as IP address, browser type and the pages requested. This is used for security and to keep the site running reliably.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use the information you submit only to respond to your inquiry, arrange a conversation or demonstration you have requested, and keep a record of our correspondence with you.",
      "We do not sell your personal information, and we do not use it for third-party advertising.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "This website does not currently use advertising or analytics cookies. If that changes, we will update this policy and, where required, ask for your consent first.",
    ],
  },
  {
    heading: "Service providers",
    body: [
      "We use trusted service providers to host this website and deliver form submissions by email. They process information only on our behalf and for these purposes.",
    ],
  },
  {
    heading: "How long we keep information",
    body: [
      "We keep inquiry information for as long as needed to respond to you and manage any resulting business relationship, and then delete or anonymise it unless we are required to keep it for legal reasons.",
    ],
  },
  {
    heading: "Your choices and rights",
    body: [
      "You can ask us to access, correct or delete the personal information you have submitted. Contact us through the contact page and we will respond to your request.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: ["We may update this policy from time to time. The date at the top of this page shows when it was last changed."],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="11 November 2026"
      intro="This policy explains what personal information Corvane Consulting collects through this website, how we use it and the choices you have."
      sections={sections}
    />
  );
}
