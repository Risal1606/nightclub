// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type GalleryImage = { src: string; alt: string };

type Props = { images: GalleryImage[] };

export default function GalleryClient({ images }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean[]>(() => Array(images.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let observer: IntersectionObserver;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
                if (idx !== -1) {
                  setVisible((prev) => {
                    const next = [...prev];
                    next[idx] = true;
                    return next;
                  });
                  observer.unobserve(entry.target);
                }
              }
            });
          },
          { threshold: 0.1 }
        );
        itemRefs.current.forEach((el) => el && observer.observe(el));
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  const prev = useCallback(() =>
    setLightboxIdx((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), [images.length]);
  const next = useCallback(() =>
    setLightboxIdx((i) => (i !== null ? (i + 1) % images.length : null)), [images.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setLightboxIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, prev, next]);

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className={`gallery-item${i % 7 === 5 ? " gallery-item-wide" : ""}${visible[i] ? " gallery-item-visible" : ""}`}
            onClick={() => setLightboxIdx(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setLightboxIdx(i)}
            aria-label={`View image: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="gallery-img"
              onError={(e) => {
                const el = e.currentTarget.closest(".gallery-item") as HTMLElement | null;
                if (el) el.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>

      {lightboxIdx !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <button
            className="lightbox-prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIdx].src}
              alt={images[lightboxIdx].alt}
              className="lightbox-img"
            />
            <p className="lightbox-counter">{lightboxIdx + 1} / {images.length}</p>
          </div>
          <button
            className="lightbox-next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
