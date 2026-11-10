import { seoFields, slugField } from "./shared";

const required = (r: { required: () => unknown }) => r.required();

export const caseStudy = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: required },
    slugField("title"),
    { name: "client", title: "Client name (as approved for publication)", type: "string", validation: required },
    { name: "industry", title: "Industry", type: "string" },
    { name: "summary", title: "Summary", type: "text", rows: 3 },
    { name: "challenge", title: "Challenge", type: "text", rows: 5 },
    { name: "solution", title: "Solution", type: "text", rows: 5 },
    { name: "outcome", title: "Outcome (verified results only)", type: "text", rows: 5 },
    { name: "productsUsed", title: "Products used", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] },
    {
      name: "clientApproved",
      title: "Written client approval received",
      type: "boolean",
      initialValue: false,
      description: "The case study is NOT shown on the website unless this is checked.",
    },
    { name: "approvalReference", title: "Approval reference (internal)", type: "string" },
    { name: "isPublished", title: "Show on website", type: "boolean", initialValue: false },
    { name: "publishedAt", title: "Published date", type: "datetime", validation: required },
    ...seoFields,
  ],
  preview: { select: { title: "title", subtitle: "client" } },
};
