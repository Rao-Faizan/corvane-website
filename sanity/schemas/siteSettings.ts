/** Singleton: create exactly one document of this type. */
export const siteSettings = {
  name: "siteSettings",
  title: "Global Settings",
  type: "document",
  fields: [
    { name: "companyName", title: "Company name", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "description", title: "Company description", type: "text", rows: 3 },
    { name: "contactEmail", title: "Contact email (approved)", type: "string" },
    { name: "contactPhone", title: "Contact phone (approved)", type: "string" },
    { name: "address", title: "Office address (approved)", type: "text", rows: 2 },
    {
      name: "social",
      title: "Social links",
      type: "array",
      of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "href", type: "url" }] }],
    },
    { name: "markets", title: "Markets served", type: "array", of: [{ type: "string" }] },
  ],
};
