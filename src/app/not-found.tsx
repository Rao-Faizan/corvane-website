import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <section className="bg-paper pt-40 pb-32 sm:pt-48">
      <Container>
        <p className="eyebrow mb-8">404</p>
        <h1 className="max-w-4xl text-display font-semibold">This page isn&apos;t here.</h1>
        <p className="mt-6 max-w-xl text-lead text-muted">
          The page may have moved, or the link may be out of date. Here are some places to continue.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/products" variant="secondary">
            View products
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
