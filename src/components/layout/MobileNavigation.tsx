"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { NavItem } from "@/content/navigation";

import type { NavProduct } from "./Header";

export interface MobileNavigationProps {
  products: NavProduct[];
  items: NavItem[];
  cta: NavItem;
  /** null while the current URL is still streaming in */
  pathname: string | null;
}

export function MobileNavigation({ products, items, cta, pathname }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Native <dialog> provides focus containment, Escape handling and an inert background.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink"
      >
        <Menu aria-hidden className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-white backdrop:bg-ink/60"
      >
        <div className="flex min-h-full flex-col px-5 pb-10 sm:px-8">
          <div className="flex h-[72px] shrink-0 items-center justify-between">
            <span className="text-[1.1875rem] font-bold tracking-[-0.03em]">Corvane</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-6">
            <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Products</p>
            <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {products.map((p) => (
                <li key={p.slug} className="border-b border-white/10">
                  <Link href={`/products/${p.slug}`} className="flex items-baseline justify-between gap-4 py-3.5">
                    <span className="text-lg font-semibold">{p.name}</span>
                    <span className="text-xs text-ink-muted">{p.category}</span>
                  </Link>
                </li>
              ))}
              <li className="border-b border-white/10">
                <Link href="/products" className="block py-3.5 text-lg font-semibold text-accent">
                  All products
                </Link>
              </li>
            </ul>

            <ul className="mt-10">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block py-2 text-[2rem] leading-tight font-semibold tracking-[-0.03em]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href={cta.href}
            className="mt-12 inline-flex min-h-13 items-center justify-center rounded-full bg-white px-6 font-semibold text-ink"
          >
            {cta.label}
          </Link>
        </div>
      </dialog>
    </div>
  );
}
