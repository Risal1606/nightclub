// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [gone,   setGone]   = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1200);
    const t2 = setTimeout(() => {
      setGone(true);
      window.dispatchEvent(new Event("site-loaded"));
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          9999,
        backgroundColor: "#0a0a0f",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        opacity:         fading ? 0 : 1,
        transition:      "opacity 0.7s ease",
        pointerEvents:   fading ? "none" : "all",
      }}
    >
      <Image
        src="/assets/loader/madbars.gif"
        alt="Loading"
        width={80}
        height={80}
        unoptimized
        priority
        style={{ display: "block" }}
      />
    </div>
  );
}
