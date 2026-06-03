import { GALLERY_ITEMS } from '@/lib/business-content';

export function GallerySection() {
  return (
    <section id="gallery" className="border-border/40 border-t py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-primary text-sm font-medium uppercase tracking-[0.3em]">Gallery</p>
          <h2 className="font-display text-foreground mt-3 text-4xl sm:text-5xl">
            The atmosphere
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            A glimpse of the chair, the craft, and the finish — imagery to be refined with
            on-site photography.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, index) => (
            <li
              key={item.title}
              className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br ${item.accent} ${
                index === 0 ? 'col-span-2 row-span-1 aspect-[16/9] lg:col-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,hsl(0_0%_3%/_0.85)_100%)]" />
              <p className="font-display text-foreground absolute bottom-4 left-4 text-lg">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
