import { GalleryColumnCarousel } from '@/components/gallery-column-carousel';
import { GALLERY_COLUMNS } from '@/lib/business-content';

export function GallerySection() {
  return (
    <section id="gallery" className="section-shell">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-foreground text-3xl sm:text-4xl">Gallery</h2>
          <div className="gallery-section-divider" aria-hidden="true" />
        </div>

        <ul className="gallery-grid">
          {GALLERY_COLUMNS.map((images, columnIndex) => (
            <li key={columnIndex} className={`min-w-0 ${columnIndex > 0 ? 'max-lg:hidden' : ''}`}>
              <GalleryColumnCarousel images={images} columnIndex={columnIndex} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
