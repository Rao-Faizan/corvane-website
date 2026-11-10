import { Plus } from "lucide-react";

import type { FAQItem } from "@/types/content";

/** Native <details> disclosure: accessible and keyboard-friendly with zero JS. */
export function FAQList({ items }: { items: FAQItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus aria-hidden className="size-5 shrink-0 text-accent-strong transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="max-w-3xl pb-7 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ProductFAQ({ items }: { items: FAQItem[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="faq-title" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6">FAQ</p>
          <h2 id="faq-title" className="text-headline font-semibold">
            Questions, answered.
          </h2>
        </div>
        <div className="lg:col-span-8">
          <FAQList items={items} />
        </div>
      </div>
    </section>
  );
}
