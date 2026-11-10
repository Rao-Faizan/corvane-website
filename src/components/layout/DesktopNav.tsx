"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { NavItem } from "@/content/navigation";
import { cn } from "@/lib/utils";

import type { NavProduct } from "./Header";

export interface DesktopNavProps {
  products: NavProduct[];
  items: NavItem[];
  /** null while the current URL is still streaming in */
  pathname: string | null;
}

export function DesktopNav({ products, items, pathname }: DesktopNavProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on route change (routes stay mounted under <Activity>).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const isActive = (href: string) => !!pathname && (pathname === href || pathname.startsWith(`${href}/`));
  const linkClass = (active: boolean) =>
    cn(
      "rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
      active ? "text-ink" : "text-muted hover:text-ink",
    );

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        <li>
          <div
            ref={wrapperRef}
            className="relative"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
            }}
          >
            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
              className={cn(linkClass(isActive("/products")), "inline-flex items-center gap-1.5")}
            >
              Products
              <ChevronDown aria-hidden className={cn("size-4 transition-transform", open && "rotate-180")} />
            </button>
            <div
              id={menuId}
              hidden={!open}
              className="absolute top-[calc(100%+14px)] left-1/2 w-[560px] -translate-x-1/2 rounded-lg border border-line bg-white p-3 shadow-[0_24px_60px_-20px_rgb(16_24_39/0.25)]"
            >
              <ul className="grid grid-cols-2 gap-1">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="block rounded-md px-4 py-3 transition-colors hover:bg-mist focus-visible:bg-mist"
                    >
                      <span className="block text-[0.9375rem] font-semibold text-ink">{p.name}</span>
                      <span className="block text-sm text-muted">{p.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                className="mt-2 flex items-center justify-between rounded-md bg-mist px-4 py-3 text-sm font-semibold text-ink hover:bg-line"
              >
                View the full portfolio <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </li>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={linkClass(isActive(item.href))}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
