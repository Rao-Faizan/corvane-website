import type { Metadata } from "next";
import { Suspense } from "react";

import { ContactForm } from "@/components/forms/ContactForm";
import { ContactFormFromParams } from "@/components/forms/ContactFormFromParams";
import { Container } from "@/components/shared/Container";
import { getProducts, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Corvane Consulting about enterprise software, AI solutions, product demos or partnerships.",
  path: "/contact",
});

const nextSteps = [
  { title: "We review your message", text: "Your inquiry goes to the right person on our team." },
  { title: "We reply to your email", text: "We'll come back with questions or a proposed time to talk." },
  { title: "A focused conversation", text: "A short call to understand your goals and where we can help." },
];

export default async function ContactPage() {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);
  const options = products.map(({ slug, name }) => ({ slug, name }));

  return (
    <section aria-labelledby="contact-title" className="bg-paper pt-36 pb-24 sm:pt-44 lg:pb-32">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-8">Contact</p>
          <h1 id="contact-title" className="text-headline font-semibold text-balance">
            Let&apos;s talk about your business.
          </h1>
          <p className="mt-6 text-lead text-muted">
            Tell us what you&apos;re working on, whether it&apos;s a product demo, an enterprise solution or a
            partnership.
          </p>

          <ol className="mt-12 border-t border-line">
            {nextSteps.map((s, i) => (
              <li key={s.title} className="flex gap-5 border-b border-line py-5">
                <span className="text-sm font-semibold text-accent-strong tabular-nums">0{i + 1}</span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          {(settings.contactEmail || settings.contactPhone || settings.address) && (
            <dl className="mt-10 space-y-4 text-sm">
              {settings.contactEmail && (
                <div>
                  <dt className="font-semibold">Email</dt>
                  <dd>
                    <a href={`mailto:${settings.contactEmail}`} className="link-underline text-accent-strong">
                      {settings.contactEmail}
                    </a>
                  </dd>
                </div>
              )}
              {settings.contactPhone && (
                <div>
                  <dt className="font-semibold">Phone</dt>
                  <dd>
                    <a href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`} className="link-underline text-accent-strong">
                      {settings.contactPhone}
                    </a>
                  </dd>
                </div>
              )}
              {settings.address && (
                <div>
                  <dt className="font-semibold">Office</dt>
                  <dd className="text-muted">{settings.address}</dd>
                </div>
              )}
            </dl>
          )}
        </div>

        <div id="form" className="sm:rounded-[4px] sm:border sm:border-line sm:bg-paper sm:p-10 lg:col-span-7">
          <h2 className="sr-only">Contact form</h2>
          <Suspense fallback={<ContactForm products={options} />}>
            <ContactFormFromParams products={options} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
