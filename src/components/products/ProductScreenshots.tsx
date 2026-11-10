import Image from "next/image";

import { Section } from "@/components/shared/Section";
import type { Product } from "@/types/content";

function VideoEmbed({ src, title }: { src: string; title: string }) {
  if (/\.(mp4|webm)(\?|$)/i.test(src)) {
    return <video controls preload="none" className="aspect-video w-full rounded-[4px] bg-ink" src={src} />;
  }
  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      allow="fullscreen; picture-in-picture"
      className="aspect-video w-full rounded-[4px] bg-ink"
    />
  );
}

/** Approved screenshots and demo video only. Hidden when neither exists. */
export function ProductScreenshots({ product }: { product: Product }) {
  const { screenshots, demoVideo, name } = product;
  if (screenshots.length === 0 && !demoVideo) return null;
  return (
    <Section tone="mist" labelledBy="screens-title">
      <p className="eyebrow mb-6">See it</p>
      <h2 id="screens-title" className="text-headline font-semibold">
        {name} in practice
      </h2>
      <div className="mt-14 grid gap-8">
        {demoVideo && <VideoEmbed src={demoVideo} title={`${name} demo video`} />}
        {screenshots.length > 0 && (
          <ul className="grid gap-8 md:grid-cols-2">
            {screenshots.map((s) => (
              <li key={s.src}>
                <figure>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full rounded-[4px] border border-line"
                  />
                  {s.caption && <figcaption className="mt-3 text-sm text-muted">{s.caption}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
