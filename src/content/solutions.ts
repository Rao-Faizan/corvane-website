import type { Solution } from "@/types/content";

export const solutions: Solution[] = [
  {
    title: "Workforce Management",
    slug: "workforce-management",
    summary: "Bring employee records and HR processes into one organised system.",
    problem:
      "As organisations grow, HR administration spreads across spreadsheets, email and paper, so it becomes slow, error-prone and hard to oversee.",
    approach: [
      "Map current HR processes and data sources",
      "Define a single structure for employee information",
      "Standardise recurring requests and approvals",
      "Give leadership reliable workforce reporting",
    ],
    relatedProducts: ["people", "workflow"],
  },
  {
    title: "Customer & Sales Management",
    slug: "customer-sales-management",
    summary: "Give sales teams a shared, structured view of every customer relationship.",
    problem:
      "When leads and customer conversations live in personal notes and inboxes, pipeline visibility suffers and knowledge leaves with people.",
    approach: [
      "Review how leads are captured and followed up today",
      "Design a pipeline that reflects your sales process",
      "Centralise customer history and activity",
      "Establish consistent sales reporting",
    ],
    relatedProducts: ["sales", "insights"],
  },
  {
    title: "Business Intelligence",
    slug: "business-intelligence",
    summary: "Turn operational data into reporting leadership can rely on.",
    problem:
      "Manual reports pulled from several systems arrive late, disagree with each other and leave decisions waiting.",
    approach: [
      "Identify the decisions reporting needs to support",
      "Connect and consolidate the relevant data sources",
      "Agree shared definitions for key measures",
      "Deliver dashboards for leadership and teams",
    ],
    relatedProducts: ["insights"],
  },
  {
    title: "Workflow Automation",
    slug: "workflow-automation",
    summary: "Turn recurring processes into structured, trackable flows.",
    problem:
      "Approvals stall, steps are missed and nobody can see where a request is. That's the cost of processes that run on memory and email.",
    approach: [
      "Document the process as it really runs",
      "Remove unnecessary steps before automating",
      "Automate routing, notifications and approvals",
      "Measure cycle times and improve continuously",
    ],
    relatedProducts: ["workflow", "people"],
  },
  {
    title: "Intelligent Document Processing",
    slug: "intelligent-document-processing",
    summary: "Capture information from business documents without re-typing it.",
    problem:
      "Teams spend hours copying data from invoices, forms and scanned files into systems, and every copy is a chance for error.",
    approach: [
      "Identify high-volume document types",
      "Define the fields that matter to the business",
      "Apply OCR and document AI with human review where needed",
      "Route captured data into downstream processes",
    ],
    relatedProducts: ["docs", "workflow"],
  },
  {
    title: "AI Assistants & Agents",
    slug: "ai-assistants-agents",
    summary: "Practical AI that works with your organisation's own knowledge.",
    problem:
      "Answers that already exist in documents take too long to find, and AI adoption stalls on questions of accuracy, safety and fit.",
    approach: [
      "Start with a focused, high-value use case",
      "Ground the assistant in approved organisational knowledge",
      "Keep people in the loop for sensitive decisions",
      "Expand based on measured usefulness",
    ],
    relatedProducts: ["brain", "docs"],
  },
  {
    title: "Computer Vision",
    slug: "computer-vision",
    summary: "Act on what your cameras already see.",
    problem:
      "Visual monitoring and inspection rely on people watching screens or checking items by hand. That is slow, inconsistent and hard to scale.",
    approach: [
      "Define the visual events or checks that matter",
      "Assess existing cameras and image sources",
      "Build and validate vision models on representative data",
      "Integrate alerts and analytics into operations",
    ],
    relatedProducts: ["vision", "insights"],
  },
];
