'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const ROTATE_MS = 5000;

type GalleryColumnCarouselProps = {
  images: readonly string[];
  columnIndex: number;
};

export function GalleryColumnCarousel({ images, columnIndex }: GalleryColumnCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      return;
    }

    const startDelay = columnIndex * 700;
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % images.length);
      }, ROTATE_MS);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [columnIndex, images.length]);

  return (
    <div className="flex w-full flex-col items-center gap-2.5">
      <div className="gallery-frame w-full">
        <span className="gallery-frame-corner gallery-frame-corner-tl" aria-hidden="true" />
        <span className="gallery-frame-corner gallery-frame-corner-tr" aria-hidden="true" />
        <span className="gallery-frame-corner gallery-frame-corner-bl" aria-hidden="true" />
        <span className="gallery-frame-corner gallery-frame-corner-br" aria-hidden="true" />

        <div className="gallery-frame-inner relative aspect-[4/5] w-full">
          {images.map((src, index) => (
            <Image
              key={`${columnIndex}-${index}`}
              src={src}
              alt=""
              fill
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 639px) 272px, (max-width: 1023px) 272px, 224px"
              priority={columnIndex === 0 && index === 0}
            />
          ))}
        </div>
      </div>

      <div
        className="flex items-center justify-center gap-1.5"
        role="tablist"
        aria-label={`Gallery column ${columnIndex + 1} slides`}
      >
        {images.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                isActive ? 'w-5 bg-primary' : 'w-2 bg-muted-foreground/35 hover:bg-primary/60'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
