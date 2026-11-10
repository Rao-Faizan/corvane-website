/** Reusable field groups shared across document types. */

export const slugField = (source = "title") => ({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source, maxLength: 96 },
  validation: (rule: { required: () => unknown }) => rule.required(),
});

export const seoFields = [
  {
    name: "seoTitle",
    title: "SEO title",
    type: "string",
    description: "Optional. Overrides the page title in search results (max ~60 characters).",
  },
  {
    name: "seoDescription",
    title: "SEO description",
    type: "text",
    rows: 3,
    description: "Optional. Search result description (max ~160 characters).",
  },
];

export const orderField = {
  name: "orderRank",
  title: "Sort order",
  type: "number",
  description: "Lower numbers appear first.",
};

export const titleDescriptionItem = {
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 3 },
  ],
};
