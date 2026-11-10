export const productSlugs = ["people", "sales", "insights", "workflow", "docs", "brain", "vision"];

export const routes = [
  "/",
  "/products",
  ...productSlugs.map((s) => `/products/${s}`),
  "/solutions",
  "/industries",
  "/case-studies",
  "/insights",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
];
