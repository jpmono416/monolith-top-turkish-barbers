import { GalleryColumnCarousel } from '@/components/gallery-column-carousel';
import { SectionHeading } from '@/components/section-heading';
import { GALLERY_COLUMNS } from '@/lib/business-content';

export function GallerySection() {
  return (
    <section id="gallery" className="section-shell">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading title="Gallery" />

        <div className="section-content">
          <ul className="gallery-grid">
          {GALLERY_COLUMNS.map((images, columnIndex) => (
            <li key={columnIndex} className={`min-w-0 ${columnIndex > 0 ? 'max-lg:hidden' : ''}`}>
              <GalleryColumnCarousel images={images} columnIndex={columnIndex} />
            </li>
          ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
