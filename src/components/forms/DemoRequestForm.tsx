import { ContactForm } from "./ContactForm";

interface DemoRequestFormProps {
  products: { slug: string; name: string }[];
  productSlug?: string;
}

/** Demo request: the contact flow fixed to "Product Demo", with the product preselected. */
export function DemoRequestForm({ products, productSlug }: DemoRequestFormProps) {
  return <ContactForm variant="demo" products={products} defaultProduct={productSlug} defaultInquiryType="demo" />;
}
