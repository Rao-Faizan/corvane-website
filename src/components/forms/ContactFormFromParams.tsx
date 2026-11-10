"use client";

import { useSearchParams } from "next/navigation";

import { isInquiryType } from "@/lib/inquiry/schema";

import { ContactForm, type ContactFormProps } from "./ContactForm";

/**
 * Reads ?type= and ?product= so CTAs across the site can preselect the form,
 * e.g. /contact?type=demo&product=people. Must render inside <Suspense>.
 */
export function ContactFormFromParams({ products }: Pick<ContactFormProps, "products">) {
  const params = useSearchParams();
  const type = params.get("type");
  const product = params.get("product") ?? "";
  return (
    <ContactForm
      key={`${type}-${product}`}
      products={products}
      defaultInquiryType={isInquiryType(type) ? type : product ? "demo" : "general"}
      defaultProduct={product}
    />
  );
}
