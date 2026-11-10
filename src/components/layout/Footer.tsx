import Link from "next/link";

import { companyNav, legalNav } from "@/content/navigation";
import { Container } from "@/components/shared/Container";
import type { Product, SiteSettings, Solution } from "@/types/content";

import { Logo } from "./Logo";

interface FooterProps {
  products: Pick<Product, "name" | "slug">[];
  solutions: Pick<Solution, "title" | "slug">[];
  settings: SiteSettings;
}

export function Footer({ products, solutions, settings }: FooterProps) {
  const columns = [
    { title: "Products", links: products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })) },
    { title: "Solutions", links: solutions.map((s) => ({ label: s.title, href: `/solutions#${s.slug}` })) },
    { title: "Company", links: companyNav },
  ];

  // Contact details render only once management has approved real values.
  const contact: { label: string; href: string }[] = [];
  if (settings.contactEmail) contact.push({ label: settings.contactEmail, href: `mailto:${settings.contactEmail}` });
  if (settings.contactPhone)
    contact.push({ label: settings.contactPhone, href: `tel:${settings.contactPhone.replace(/\s+/g, "")}` });

  return (
    <footer className="bg-ink text-white">
      <Container className="pt-20 pb-10 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-ink-muted">{settings.description}</p>
            <div className="mt-8 space-y-2 text-sm">
              <p className="font-semibold">Contact</p>
              {contact.map((c) => (
                <a key={c.href} href={c.href} className="link-underline block text-ink-muted hover:text-white">
                  {c.label}
                </a>
              ))}
              {settings.address && <p className="text-ink-muted">{settings.address}</p>}
              <Link href="/contact" className="link-underline inline-block text-accent">
                Send us a message
              </Link>
            </div>
            {settings.social.length > 0 && (
              <ul className="mt-6 flex gap-4 text-sm">
                {settings.social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-ink-muted hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold">{col.title}</p>
                <ul className="mt-5 space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-underline text-ink-muted hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ink-line pt-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {settings.companyName} · {settings.tagline}
          </p>
          <ul className="flex gap-6">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
