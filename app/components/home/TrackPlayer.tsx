// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Volume2 } from "lucide-react";

const TRACKS = [
  { title: "Black Box Funky",    src: "/assets/media/black-box-funky.mp3",   image: "/assets/content-img/track1.jpg"     },
  { title: "Euphoria",           src: "/assets/media/euphoria.mp3",           image: "/assets/content-img/track2.jpg"     },
  { title: "You Belong With Me", src: "/assets/media/fashion-red-tape.mp3",  image: "/assets/content-img/track_thumb.jpg"},
  { title: "Fashion Red Tape",   src: "/assets/media/black-box-funky.mp3",   image: "/assets/content-img/track4.jpg"     },
  { title: "Night Vibes",        src: "/assets/media/euphoria.mp3",           image: "/assets/content-img/track5.jpg"     },
];

function fmt(s: number) {
  if (!s || isNaN(s)) return "00:00";
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export default function TrackPlayer() {
  const audioRef      = useRef<HTMLAudioElement>(null);
  const isPlayingRef  = useRef(false);
  const shuffleRef    = useRef(false);

  const [idx, setIdx]         = useState(2);
  const [playing, setPlaying] = useState(false);
  const [time, setTime]       = useState(0);
  const [dur, setDur]         = useState(0);
  const [vol, setVol]         = useState(0.8);
  const [shuf, setShuf]       = useState(false);

  isPlayingRef.current = playing;
  shuffleRef.current   = shuf;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src    = TRACKS[0].src;
    a.volume = vol;

    const onTime   = () => setTime(a.currentTime);
    const onMeta   = () => setDur(a.duration);
    const onPlay   = () => setPlaying(true);
    const onPause  = () => setPlaying(false);
    const onEnded  = () =>
      setIdx((i) => shuffleRef.current
        ? Math.floor(Math.random() * TRACKS.length)
        : (i + 1) % TRACKS.length);

    a.addEventListener("timeupdate",      onTime);
    a.addEventListener("loadedmetadata",  onMeta);
    a.addEventListener("play",            onPlay);
    a.addEventListener("pause",           onPause);
    a.addEventListener("ended",           onEnded);
    return () => {
      a.removeEventListener("timeupdate",     onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("play",           onPlay);
      a.removeEventListener("pause",          onPause);
      a.removeEventListener("ended",          onEnded);
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src = TRACKS[idx].src;
    a.load();
    setTime(0);
    setDur(0);
    if (isPlayingRef.current) a.play().catch(() => setPlaying(false));
  }, [idx]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = vol;
  }, [vol]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    playing ? a.pause() : a.play().catch(() => {});
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Number(e.target.value);
    setTime(Number(e.target.value));
  };

  const prev = () => setIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  const next = () => setIdx((i) => (i + 1) % TRACKS.length);

  const pick = (i: number) => {
    if (i === idx) { togglePlay(); return; }
    isPlayingRef.current = true;
    setPlaying(true);
    setIdx(i);
  };

  const pct  = dur ? (time / dur) * 100 : 0;
  const bar  = (p: number) =>
    `linear-gradient(to right,var(--color-pink) ${p}%,oklch(25% 0.01 280) ${p}%)`;
  const track = TRACKS[idx];

  return (
    <section className="tp-section">
      <h2 className="section-title">Night Club Track</h2>
      <audio ref={audioRef} preload="metadata" />

      <div className="tp-inner">
        <div className="tp-player">
          <Image
            src={track.image}
            alt={track.title}
            width={270}
            height={270}
            className="tp-cover"
          />

          <div className="tp-controls">
            <p className="tp-title">{track.title.toUpperCase()}</p>

            <input
              type="range" min={0} max={dur || 0} step={0.1} value={time}
              onChange={seek} className="tp-slider"
              style={{ background: bar(pct) }}
            />

            <div className="tp-row">
              <span className="tp-time">{fmt(time)} / {fmt(dur)}</span>

              <div className="tp-btns">
                <button className="tp-btn" onClick={prev}><SkipBack  size={18} /></button>
                <button className="tp-btn tp-play" onClick={togglePlay}>
                  {playing ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button className="tp-btn" onClick={next}><SkipForward size={18} /></button>
                <button className={`tp-btn${shuf ? " tp-active" : ""}`} onClick={() => setShuf((s) => !s)}>
                  <Shuffle size={18} />
                </button>
              </div>

              <div className="tp-vol">
                <Volume2 size={18} />
                <input
                  type="range" min={0} max={1} step={0.01} value={vol}
                  onChange={(e) => setVol(Number(e.target.value))}
                  className="tp-slider tp-vol-slider"
                  style={{ background: bar(vol * 100) }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="tp-carousel-outer">
          <button className="tp-arrow" onClick={prev}>&#9664;</button>
          <div className="tp-carousel">
            {TRACKS.map((t, i) => (
              <button key={i} onClick={() => pick(i)}
                className={`tp-thumb${i === idx ? " tp-thumb-active" : ""}`}>
                <div className="tp-thumb-inner">
                  <Image src={t.image} alt={t.title} fill className="tp-thumb-img" sizes="200px" />
                </div>
                {i === idx && (
                  <div className="tp-thumb-overlay">
                    <div className="tp-thumb-play">
                      {playing ? <Pause size={18} /> : <Play size={18} />}
                    </div>
                    <span className="tp-thumb-label">
                      {t.title.length > 12 ? t.title.slice(0, 12) + "…" : t.title}
                    </span>
                    <div className="tp-thumb-corner" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <button className="tp-arrow" onClick={next}>&#9654;</button>
        </div>
      </div>
    </section>
  );
}
