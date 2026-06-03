import Image from 'next/image';
import { SectionHeading } from '@/components/section-heading';
import { GALLERY_ITEMS } from '@/lib/business-content';

export function GallerySection() {
  return (
    <section id="gallery" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Gallery"
          title="The atmosphere"
          lead="A glimpse of the chair, the craft, and the finish — imagery to be refined with on-site photography."
        />

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item) => {
            const featured = 'featured' in item && item.featured;
            return (
            <li
              key={item.title}
              className={`relative overflow-hidden rounded-2xl bg-muted ${
                featured
                  ? 'aspect-[16/9] sm:col-span-2 lg:col-span-2'
                  : 'aspect-[4/5]'
              }`}
            >
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes={
                  featured
                    ? '(max-width: 1024px) 100vw, 66vw'
                    : '(max-width: 1024px) 100vw, 33vw'
                }
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,hsl(0_0%_3%/_0.85)_100%)]" />
              <p className="font-display text-foreground absolute bottom-4 left-4 text-lg">
                {item.title}
              </p>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
