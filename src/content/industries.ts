import type { Industry } from "@/types/content";

/**
 * Industry content describes common operational priorities in each sector.
 * It deliberately makes NO claims of past projects or sector-specific
 * product capabilities. Add those only with verified evidence.
 */
export const industries: Industry[] = [
  {
    name: "Manufacturing",
    slug: "manufacturing",
    summary: "Operations with many moving parts across production, people and supply.",
    priorities: [
      "Visibility of production and operational performance",
      "Structured processes for approvals and quality checks",
      "Reducing paperwork across shop floor and back office",
    ],
    relatedSolutions: ["business-intelligence", "workflow-automation", "computer-vision"],
  },
  {
    name: "Retail & Distribution",
    slug: "retail-distribution",
    summary: "High-volume operations where speed and accuracy matter every day.",
    priorities: [
      "A consistent view of customers and sales activity",
      "Timely reporting across branches and channels",
      "Less manual handling of invoices and delivery documents",
    ],
    relatedSolutions: ["customer-sales-management", "business-intelligence", "intelligent-document-processing"],
  },
  {
    name: "Logistics",
    slug: "logistics",
    summary: "Document-heavy, time-sensitive operations across many locations.",
    priorities: [
      "Capturing data from shipping and delivery documents",
      "Tracking operational processes end to end",
      "Visibility of performance across sites and routes",
    ],
    relatedSolutions: ["intelligent-document-processing", "workflow-automation", "business-intelligence"],
  },
  {
    name: "Education",
    slug: "education",
    summary: "Institutions balancing academic, administrative and staff operations.",
    priorities: [
      "Organised staff records and HR administration",
      "Faster answers to recurring student and staff questions",
      "Digitising records and administrative documents",
    ],
    relatedSolutions: ["workforce-management", "ai-assistants-agents", "intelligent-document-processing"],
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    summary: "Organisations where administrative load competes with care.",
    priorities: [
      "Reducing manual data entry from forms and records",
      "Structured administrative workflows",
      "Workforce administration across shifts and departments",
    ],
    relatedSolutions: ["intelligent-document-processing", "workflow-automation", "workforce-management"],
  },
  {
    name: "Professional Services",
    slug: "professional-services",
    summary: "Knowledge-driven firms where time and client relationships are the business.",
    priorities: [
      "A clear view of client relationships and pipeline",
      "Making internal knowledge easy to find",
      "Consistent processes for approvals and delivery",
    ],
    relatedSolutions: ["customer-sales-management", "ai-assistants-agents", "workflow-automation"],
  },
];
