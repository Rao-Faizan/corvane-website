import { DemoRequestForm } from "@/components/forms/DemoRequestForm";
import { Container } from "@/components/shared/Container";

interface ProductCTAProps {
  product: { slug: string; name: string };
  products: { slug: string; name: string }[];
}

export function ProductCTA({ product, products }: ProductCTAProps) {
  return (
    <section id="request-demo" aria-labelledby="demo-title" className="scroll-mt-20 bg-mist py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6">Request a demo</p>
          <h2 id="demo-title" className="text-headline font-semibold text-balance">
            See {product.name} with your own workflows.
          </h2>
          <p className="mt-6 text-muted">
            Tell us about your organisation and what you&apos;d like to see. We&apos;ll arrange a walkthrough with our team.
          </p>
        </div>
        <div className="rounded-[4px] bg-paper p-6 sm:p-10 lg:col-span-8">
          <DemoRequestForm products={products} productSlug={product.slug} />
        </div>
      </Container>
    </section>
  );
}
