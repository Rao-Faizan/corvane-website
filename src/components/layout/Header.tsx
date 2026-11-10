import { Suspense } from "react";

import { consultationCta, primaryNav } from "@/content/navigation";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import type { Product } from "@/types/content";

import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";
import { RoutedDesktopNav, RoutedMobileNavigation } from "./RoutedNav";

export type NavProduct = Pick<Product, "name" | "slug" | "category">;

export function Header({ products }: { products: NavProduct[] }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Logo />
        <Suspense fallback={<DesktopNav products={products} items={primaryNav} pathname={null} />}>
          <RoutedDesktopNav products={products} items={primaryNav} />
        </Suspense>
        <div className="flex items-center gap-3">
          <ButtonLink href={consultationCta.href} className="hidden min-h-11 px-5 text-sm xl:inline-flex" icon={false}>
            {consultationCta.label}
          </ButtonLink>
          <Suspense
            fallback={<MobileNavigation products={products} items={primaryNav} cta={consultationCta} pathname={null} />}
          >
            <RoutedMobileNavigation products={products} items={primaryNav} cta={consultationCta} />
          </Suspense>
        </div>
      </Container>
    </header>
  );
}
