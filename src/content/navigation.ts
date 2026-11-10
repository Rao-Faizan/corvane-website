export interface NavItem {
  label: string;
  href: string;
}

/** Primary navigation. Products are rendered as a dropdown from product data. */
export const primaryNav: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const consultationCta: NavItem = { label: "Book a Consultation", href: "/contact?type=enterprise" };

export const companyNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];
