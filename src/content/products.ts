import type { FAQItem, Product } from "@/types/content";

/**
 * Local product content.
 *
 * VERIFICATION STATUS (2026-11-11): no product software was available for
 * inspection. Every product is `development-required`, so:
 *   - `features`, `integrations`, `deployment`, `screenshots` stay EMPTY;
 *     the matching page sections are hidden automatically.
 *   - Copy describes the business area each product family addresses,
 *     never verified functionality.
 * Update only with evidence recorded in docs/PRODUCT_INVENTORY.md.
 */

const sharedFaq: FAQItem[] = [
  {
    question: "How do we see the product in action?",
    answer:
      "Request a walkthrough with the form on this page. We'll arrange a session with our team around your workflows and requirements, rather than a generic tour.",
  },
  {
    question: "Can it be adapted to how our organisation works?",
    answer:
      "Every engagement starts with a discovery phase in which we map your processes. Configuration and any custom development are scoped and agreed with you before work begins.",
  },
  {
    question: "Do you work with organisations in Pakistan and the GCC?",
    answer:
      "Yes. Corvane works with mid-market and enterprise organisations in Pakistan and the GCC.",
  },
];

export const products: Product[] = [
  {
    name: "Corvane People",
    slug: "people",
    tagline: "Workforce administration, organised.",
    description:
      "A human resource management system for organising employee records, workforce administration and HR processes in one place.",
    category: "HRMS",
    readiness: "development-required",
    isPublished: true,
    visual: "people",
    challenges: [
      "Employee information spread across spreadsheets, email and paper files",
      "Manual, repetitive HR administration that consumes team capacity",
      "Limited visibility of workforce data for planning and decisions",
    ],
    overview:
      "Corvane People is the workforce management family of the Corvane portfolio. It is intended to bring employee records and core HR processes together, so HR teams spend less time on administration and more on people.",
    features: [],
    useCases: [
      {
        title: "Centralising employee records",
        description: "Replacing scattered spreadsheets with a single, structured source of employee information.",
      },
      {
        title: "Standardising HR processes",
        description: "Turning recurring HR requests and approvals into consistent, trackable processes.",
      },
      {
        title: "Workforce reporting",
        description: "Giving leadership a clearer view of headcount and workforce trends.",
      },
    ],
    integrations: [],
    screenshots: [],
    deployment: [],
    faq: sharedFaq,
    seoTitle: "Corvane People — HR Management System",
    seoDescription:
      "Corvane People is an HR management system for organising employee records and HR processes. Request a walkthrough.",
  },
  {
    name: "Corvane Sales",
    slug: "sales",
    tagline: "Every customer relationship, in view.",
    description:
      "A customer relationship management system for tracking leads, opportunities and customer interactions across sales teams.",
    category: "CRM",
    readiness: "development-required",
    isPublished: true,
    visual: "sales",
    challenges: [
      "Leads and customer conversations tracked in personal notes and inboxes",
      "Little visibility of pipeline health and forecast accuracy",
      "Customer knowledge lost when team members change roles",
    ],
    overview:
      "Corvane Sales is the customer and sales management family of the Corvane portfolio. It is intended to give sales teams a shared, structured record of leads, opportunities and customer activity.",
    features: [],
    useCases: [
      {
        title: "Pipeline management",
        description: "Following opportunities from first contact to close in a shared, structured pipeline.",
      },
      {
        title: "Customer history",
        description: "Keeping interactions and account context available to the whole team.",
      },
      {
        title: "Sales reporting",
        description: "Giving sales leaders consistent visibility of activity and pipeline.",
      },
    ],
    integrations: [],
    screenshots: [],
    deployment: [],
    faq: sharedFaq,
    seoTitle: "Corvane Sales — CRM for Growing Sales Teams",
    seoDescription:
      "Corvane Sales is a CRM for managing leads, opportunities and customer relationships. Request a walkthrough.",
  },
  {
    name: "Corvane Insights",
    slug: "insights",
    tagline: "Decisions grounded in your own data.",
    description:
      "Business intelligence dashboards that turn operational data into clear, decision-ready reporting.",
    category: "Business Intelligence",
    readiness: "development-required",
    isPublished: true,
    visual: "insights",
    challenges: [
      "Reports assembled by hand from several systems, often days late",
      "Different departments working from different numbers",
      "Leadership lacking a timely view of operational performance",
    ],
    overview:
      "Corvane Insights is the business intelligence family of the Corvane portfolio. It is intended to consolidate operational data into dashboards that leadership and teams can rely on.",
    features: [],
    useCases: [
      {
        title: "Executive dashboards",
        description: "A consolidated view of the indicators leadership reviews most often.",
      },
      {
        title: "Operational reporting",
        description: "Replacing manual spreadsheet reporting with consistent, repeatable dashboards.",
      },
      {
        title: "Departmental performance",
        description: "Giving each team visibility of the measures they are accountable for.",
      },
    ],
    integrations: [],
    screenshots: [],
    deployment: [],
    faq: sharedFaq,
    seoTitle: "Corvane Insights — Business Intelligence Dashboards",
    seoDescription:
      "Corvane Insights turns operational data into decision-ready dashboards. Request a walkthrough.",
  },
  {
    name: "Corvane Workflow",
    slug: "workflow",
    tagline: "Processes that move on their own.",
    description:
      "A workflow and management system for structuring approvals, tasks and recurring business processes.",
    category: "Workflow Management",
    readiness: "development-required",
    isPublished: true,
    visual: "workflow",
    challenges: [
      "Approvals stalled in inboxes with no visibility of where they sit",
      "Processes that depend on individuals remembering the next step",
      "No audit trail of who did what, and when",
    ],
    overview:
      "Corvane Workflow is the workflow automation family of the Corvane portfolio. It is intended to turn recurring business processes into structured, trackable flows.",
    features: [],
    useCases: [
      {
        title: "Approval processes",
        description: "Routing requests to the right approvers with visibility of status.",
      },
      {
        title: "Task coordination",
        description: "Assigning and tracking work across teams and departments.",
      },
      {
        title: "Process standardisation",
        description: "Making sure recurring processes run the same way every time.",
      },
    ],
    integrations: [],
    screenshots: [],
    deployment: [],
    faq: sharedFaq,
    seoTitle: "Corvane Workflow — Workflow & Process Management",
    seoDescription:
      "Corvane Workflow structures approvals, tasks and recurring business processes. Request a walkthrough.",
  },
  {
    name: "Corvane Docs",
    slug: "docs",
    tagline: "From documents to usable data.",
    description:
      "Document AI and OCR for extracting information from business documents and reducing manual data entry.",
    category: "Document AI",
    readiness: "development-required",
    isPublished: true,
    visual: "docs",
    challenges: [
      "Teams re-typing data from invoices, forms and scanned documents",
      "Errors introduced through manual data entry",
      "Paper and PDF archives that cannot be searched",
    ],
    overview:
      "Corvane Docs is the intelligent document processing family of the Corvane portfolio. It applies OCR and document AI to capture information from business documents so teams can work with it digitally.",
    features: [],
    useCases: [
      {
        title: "Document data capture",
        description: "Extracting key fields from recurring business documents.",
      },
      {
        title: "Digitising archives",
        description: "Converting scanned and paper records into searchable text.",
      },
      {
        title: "Reducing manual entry",
        description: "Cutting the time teams spend copying information between documents and systems.",
      },
    ],
    integrations: [],
    screenshots: [],
    deployment: [],
    faq: sharedFaq,
    seoTitle: "Corvane Docs — OCR & Document AI",
    seoDescription:
      "Corvane Docs applies OCR and document AI to capture data from business documents. Request a walkthrough.",
  },
  {
    name: "Corvane Brain",
    slug: "brain",
    tagline: "AI assistants that work with your knowledge.",
    description:
      "AI chatbots and agents designed to answer questions and support tasks using an organisation's own information.",
    category: "AI Assistants & Agents",
    readiness: "development-required",
    isPublished: true,
    visual: "brain",
    challenges: [
      "Staff and customers waiting for answers that already exist in documents",
      "Repetitive questions consuming expert time",
      "Uncertainty about how to adopt AI safely and practically",
    ],
    overview:
      "Corvane Brain is the AI assistants and agents family of the Corvane portfolio. It is intended to put an organisation's own knowledge to work through conversational assistants and task-focused agents.",
    features: [],
    useCases: [
      {
        title: "Internal knowledge assistant",
        description: "Helping employees find answers in policies, manuals and internal documentation.",
      },
      {
        title: "Customer support assistant",
        description: "Handling common customer questions and routing complex ones to people.",
      },
      {
        title: "Task-focused agents",
        description: "Supporting defined, repeatable tasks under human oversight.",
      },
    ],
    integrations: [],
    screenshots: [],
    deployment: [],
    faq: sharedFaq,
    seoTitle: "Corvane Brain — AI Chatbots & Agents",
    seoDescription:
      "Corvane Brain delivers AI assistants and agents grounded in your organisation's own knowledge. Request a walkthrough.",
  },
  {
    name: "Corvane Vision",
    slug: "vision",
    tagline: "Operational awareness from visual data.",
    description:
      "Computer vision applications that analyse images and video to support monitoring and operational processes.",
    category: "Computer Vision",
    readiness: "development-required",
    isPublished: true,
    visual: "vision",
    challenges: [
      "Hours of camera footage that nobody has time to review",
      "Visual inspections that are manual, slow and inconsistent",
      "Operational events noticed too late to act on",
    ],
    overview:
      "Corvane Vision is the computer vision family of the Corvane portfolio. It is intended to analyse images and video so that operational teams can act on what cameras already see.",
    features: [],
    useCases: [
      {
        title: "Visual monitoring",
        description: "Analysing camera feeds to surface events that need attention.",
      },
      {
        title: "Inspection support",
        description: "Assisting visual checks to make them faster and more consistent.",
      },
      {
        title: "Operational analytics",
        description: "Turning visual activity into data for operational reporting.",
      },
    ],
    integrations: [],
    screenshots: [],
    deployment: [],
    faq: sharedFaq,
    seoTitle: "Corvane Vision — Computer Vision Solutions",
    seoDescription:
      "Corvane Vision applies computer vision to images and video for monitoring and operations. Request a walkthrough.",
  },
];
