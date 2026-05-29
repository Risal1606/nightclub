// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const BG_IMAGES = [
  "/assets/bg/header_bg_1.jpg",
  "/assets/bg/header_bg_2.jpg",
];

let siteHasLoaded = false;

export default function Hero() {
  const bgRef = useRef(BG_IMAGES[Math.floor(Math.random() * BG_IMAGES.length)]);
  const [ready, setReady] = useState(siteHasLoaded);

  useEffect(() => {
    if (siteHasLoaded) return;
    const onLoaded = () => {
      siteHasLoaded = true;
      setReady(true);
    };
    window.addEventListener("site-loaded", onLoaded);
    return () => window.removeEventListener("site-loaded", onLoaded);
  }, []);

  return (
    <section className="hero" style={{ backgroundImage: `url(${bgRef.current})` }}>
      <div className="hero-overlay" />
      <div className={`hero-content${ready ? " hero-content-in" : ""}`}>
        <Image
          src="/assets/icon/Logo_main.svg"
          alt="Night Club Logo"
          width={500}
          height={180}
          className="hero-logo"
          priority
        />
        <div className="hero-divider" />
        <div className="hero-buttons">
          <Link href="/events" className="btn-outline">VIEW EVENTS</Link>
          <Link href="/book-table" className="btn-pink">BOOK TABLE</Link>
        </div>
      </div>
    </section>
  );
}
