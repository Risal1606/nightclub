// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

"use client";

import { useState, useRef } from "react";

const VIDEOS = [
  { src: "/assets/media/video-dj-crowd1.mp4",  poster: "/assets/content-img/video_poster.jpg" },
  { src: "/assets/media/video-dj-crowd-2.mp4", poster: "/assets/content-img/video_poster.jpg" },
  { src: "/assets/media/video-crowd.mp4",       poster: "/assets/content-img/video_poster.jpg" },
];

export default function LatestVideo() {
  const [idx, setIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const go = (next: number) => {
    setIdx(next);
    if (videoRef.current) videoRef.current.load();
  };

  const prev = () => go((idx - 1 + VIDEOS.length) % VIDEOS.length);
  const next = () => go((idx + 1) % VIDEOS.length);

  return (
    <section className="lv-section">
      <h2 className="section-title">Latest Video</h2>
      <div className="lv-wrap">
        <video
          ref={videoRef}
          key={VIDEOS[idx].src}
          className="lv-video"
          poster={VIDEOS[idx].poster}
          controls
          preload="metadata"
        >
          <source src={VIDEOS[idx].src} type="video/mp4" />
        </video>
      </div>
      <div className="lv-arrows">
        <button className="lv-arrow" onClick={prev} aria-label="Previous video">&#9664;</button>
        <button className="lv-arrow" onClick={next} aria-label="Next video">&#9654;</button>
      </div>
    </section>
  );
}
