import { orderField, seoFields, slugField, titleDescriptionItem } from "./shared";

export const product = {
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "verified", title: "Verified details" },
    { name: "governance", title: "Readiness & publishing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    { name: "name", title: "Name", type: "string", group: "content", validation: (r: { required: () => unknown }) => r.required() },
    { ...slugField("name"), group: "content" },
    { name: "tagline", title: "Tagline", type: "string", group: "content" },
    { name: "description", title: "Short description", type: "text", rows: 3, group: "content" },
    { name: "category", title: "Category", type: "string", group: "content" },
    {
      name: "visual",
      title: "Illustration",
      type: "string",
      group: "content",
      options: { list: ["people", "sales", "insights", "workflow", "docs", "brain", "vision"] },
    },
    { name: "challenges", title: "Business challenges", type: "array", of: [{ type: "string" }], group: "content" },
    { name: "overview", title: "Solution overview", type: "text", rows: 4, group: "content" },
    { name: "useCases", title: "Use cases", type: "array", of: [titleDescriptionItem], group: "content" },
    { name: "faq", title: "FAQ", type: "array", of: [{ type: "reference", to: [{ type: "faq" }] }], group: "content" },

    // Verified-only fields. Leave empty until verified (docs/PRODUCT_INVENTORY.md).
    {
      name: "features",
      title: "Verified features",
      type: "array",
      of: [titleDescriptionItem],
      group: "verified",
      description: "ONLY features verified in the running product. Section is hidden when empty.",
    },
    {
      name: "integrations",
      title: "Verified integrations",
      type: "array",
      of: [{ type: "string" }],
      group: "verified",
    },
    {
      name: "deployment",
      title: "Verified deployment options",
      type: "array",
      of: [{ type: "string" }],
      group: "verified",
    },
    {
      name: "screenshots",
      title: "Approved screenshots",
      type: "array",
      group: "verified",
      of: [
        {
          type: "image",
          fields: [
            { name: "alt", title: "Alt text", type: "string", validation: (r: { required: () => unknown }) => r.required() },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
    },
    { name: "demoVideo", title: "Demo video URL (embed or .mp4)", type: "url", group: "verified" },

    {
      name: "readiness",
      title: "Readiness (internal, never shown publicly)",
      type: "string",
      group: "governance",
      initialValue: "development-required",
      options: {
        list: [
          { title: "Production Ready", value: "production-ready" },
          { title: "Demo Ready", value: "demo-ready" },
          { title: "Development Required", value: "development-required" },
          { title: "Not Approved for Commercial Use (hidden)", value: "not-approved" },
        ],
        layout: "radio",
      },
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: "isPublished",
      title: "Show on website",
      type: "boolean",
      group: "governance",
      initialValue: false,
      description: "Requires management approval of ownership and commercialisation.",
    },
    { ...orderField, group: "governance" },
    ...seoFields.map((f) => ({ ...f, group: "seo" })),
  ],
  preview: { select: { title: "name", subtitle: "readiness" } },
};
