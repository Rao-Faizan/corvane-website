import { orderField, slugField } from "./shared";

export const solution = {
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    slugField("title"),
    { name: "summary", title: "Summary", type: "text", rows: 2 },
    { name: "problem", title: "Business problem", type: "text", rows: 3 },
    { name: "approach", title: "Approach steps", type: "array", of: [{ type: "string" }] },
    { name: "relatedProducts", title: "Related products", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] },
    orderField,
  ],
};
