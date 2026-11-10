import { orderField, slugField } from "./shared";

export const industry = {
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    slugField("name"),
    { name: "summary", title: "Summary", type: "text", rows: 2 },
    {
      name: "priorities",
      title: "Common priorities",
      type: "array",
      of: [{ type: "string" }],
      description: "Operational priorities in the sector. Do not claim past projects here without evidence.",
    },
    { name: "relatedSolutions", title: "Related solutions", type: "array", of: [{ type: "reference", to: [{ type: "solution" }] }] },
    orderField,
  ],
};
