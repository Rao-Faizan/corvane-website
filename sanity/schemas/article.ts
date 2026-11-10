import { seoFields, slugField } from "./shared";

const required = (r: { required: () => unknown }) => r.required();

export const article = {
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: required },
    slugField("title"),
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: required },
    { name: "author", title: "Author", type: "string", validation: required },
    { name: "publishedAt", title: "Published date", type: "datetime", validation: required },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [], marks: { decorators: [], annotations: [] } }],
      description: "Paragraphs. (Headings, lists and images can be added later together with a richer renderer.)",
    },
    { name: "isPublished", title: "Show on website", type: "boolean", initialValue: false },
    ...seoFields,
  ],
};
