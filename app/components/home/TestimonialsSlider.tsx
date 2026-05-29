// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

"use client";

import Image from "next/image";
import { useState } from "react";

export type Testimonial = {
  id: number;
  name: string;
  content: string;
  asset: { url: string; width: number; height: number; alt: string };
  facebook?: string;
  twitter?: string;
};

type Props = { testimonials: Testimonial[]; apiUrl: string };

export default function TestimonialsSlider({ testimonials, apiUrl }: Props) {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];
  const imgSrc = t.asset.url.startsWith("/assets/") ? t.asset.url : `${apiUrl}${t.asset.url}`;

  return (
    <div className="test-inner">
      <Image src={imgSrc} alt={t.name} width={108} height={118} className="test-img" />
      <h3 className="test-name">{t.name.toUpperCase()}</h3>
      <p className="test-quote">{t.content}</p>

      <div className="test-social">
        {t.facebook && (
          <a href={t.facebook} className="test-social-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
        )}
        {t.twitter && (
          <a href={t.twitter} className="test-social-btn" aria-label="Twitter/X" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          </a>
        )}
      </div>

      <div className="test-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`test-dot${i === idx ? " test-dot-active" : ""}`}
            aria-label={`Show testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
