// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import Link from "next/link";
import { notFound } from "next/navigation";
import CommentForm from "./CommentForm";

type EventAsset = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type ScheduleItem = {
  time: string;
  label: string;
};

type Event = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  content: string;
  date: string;
  doorsOpen?: string;
  asset: EventAsset;
  heroAsset?: EventAsset;
  location: string;
  category?: string;
  lineup?: string[];
  schedule?: ScheduleItem[];
  price?: string;
  ageLimit?: string;
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const weekday = date.toLocaleString("en-US", { weekday: "long", timeZone: "Europe/Copenhagen" });
  const month   = date.toLocaleString("en-US", { month: "long",   timeZone: "Europe/Copenhagen" });
  const day     = date.toLocaleString("en-US", { day: "numeric",  timeZone: "Europe/Copenhagen" });
  const year    = date.toLocaleString("en-US", { year: "numeric", timeZone: "Europe/Copenhagen" });
  return `${weekday}, ${month} ${day}, ${year}`;
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Copenhagen",
  });
}

const FALLBACK: Event[] = [
  {
    id: 1,
    slug: "neon-nights-grand-opening",
    title: "Neon Nights Grand Opening",
    excerpt: "A major opening night with house, live percussion, visuals, and a countdown show.",
    description: "Night Club opens its doors again with an evening of house, visuals, and live percussion on the main stage.",
    content: "Neon Nights Grand Opening marks the start of the new season at Night Club. The evening is designed as a complete club experience, with a warmer lounge mood in the first hours, a sharper visual identity on the main floor, and a line-up that gradually pushes the energy toward midnight.\n\nThe program opens with welcome drinks and a more melodic house set, giving both table guests and walk-ins time to settle into the room before the dance floor takes over. Later in the evening, the lighting shifts into a brighter neon universe with live percussion, short visual drops, and a countdown show that marks the relaunch of the club.\n\nThis is the night for guests who want to experience the venue from the beginning and feel how the new sound and lighting profile work together. The bar runs a short opening menu with citrus-driven cocktails, and the lounge is set up for groups who want a calmer start before the main stage fills the room.\n\nHigh demand is expected for table reservations on this night, so guests who want a fixed base throughout the evening should reserve in advance. Doors open early, but the main program builds from 22:00 and peaks around midnight.",
    date: "2026-05-09T21:00:00+02:00",
    doorsOpen: "2026-05-09T20:00:00+02:00",
    asset: { url: "/assets/content-img/event-thumb1.jpg", width: 570, height: 403, alt: "Singer performing under purple stage lights" },
    heroAsset: { url: "/assets/content-img/blog_full1.jpg", width: 970, height: 560, alt: "DJ scratching vinyl under red and pink stage lights" },
    location: "Center Stage",
    category: "House",
    lineup: ["Mika Vale", "Nora Lumen", "Live percussion by Elias B"],
    schedule: [
      { time: "21:00", label: "Doors and welcome drinks" },
      { time: "22:30", label: "Warm-up house set" },
      { time: "00:00", label: "Neon countdown show" },
    ],
    price: "150 DKK",
    ageLimit: "18+",
  },
];

type Comment = {
  id: number;
  eventId: number;
  name: string;
  content: string;
  date: string;
};

function formatCommentDate(dateStr: string) {
  const date = new Date(dateStr);
  const day   = date.toLocaleString("en-US", { day: "2-digit",  timeZone: "Europe/Copenhagen" });
  const month = date.toLocaleString("en-US", { month: "short", timeZone: "Europe/Copenhagen" }).toLowerCase();
  const year  = date.toLocaleString("en-US", { year: "numeric", timeZone: "Europe/Copenhagen" });
  return `${day} ${month} ${year}`;
}

async function getComments(eventId: number, apiUrl: string): Promise<Comment[]> {
  try {
    const res = await fetch(`${apiUrl}/comments?eventId=${eventId}`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getEvent(slug: string): Promise<{ event: Event | null; apiUrl: string }> {
  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${apiUrl}/events?slug=${slug}`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const events: Event[] = await res.json();
    if (events.length === 0) {
      const fallback = FALLBACK.find((e) => e.slug === slug) ?? null;
      return { event: fallback, apiUrl: "" };
    }
    return { event: events[0], apiUrl };
  } catch {
    const fallback = FALLBACK.find((e) => e.slug === slug) ?? null;
    return { event: fallback, apiUrl: "" };
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { event, apiUrl } = await getEvent(slug);

  if (!event) notFound();

  const comments = await getComments(event.id, apiUrl);

  const imgSrc = (url: string) =>
    url.startsWith("/assets/") ? url : `${apiUrl}${url}`;

  const mainImg = event.heroAsset ?? event.asset;
  const heroBg = apiUrl
    ? `${apiUrl}/file-bucket/footerbg.jpg`
    : "/assets/bg/footerbg.jpg";

  return (
    <>
      <section className="event-detail-hero" style={{ backgroundImage: `url('${heroBg}')` }}>
        <div className="event-detail-hero-inner">
          <p className="event-detail-breadcrumb">
            <Link href="/events">Events</Link>
            <span> / </span>
            <span>{event.title}</span>
          </p>
          <h1 className="event-detail-hero-title">{event.title}</h1>
        </div>
      </section>

      <div className="event-detail-wrap" style={{ backgroundImage: "url('/assets/bg/pattern_small.jpg')", backgroundRepeat: "repeat", backgroundSize: "30px 30px" }}>
        <div className="event-detail-banner-wrap">
          <img
            src={imgSrc(mainImg.url)}
            alt={mainImg.alt}
            className="event-detail-banner-img"
          />
        </div>

        <div className="event-detail-body">

          <div className="event-detail-content">

            <h2 className="event-detail-section-title">About This Event</h2>
            {event.content
              ? event.content.split("\n\n").map((para, i) => (
                  <p key={i} className="event-detail-para">{para}</p>
                ))
              : <p className="event-detail-para">{event.description}</p>
            }

            {event.lineup && event.lineup.length > 0 && (
              <div className="event-detail-block">
                <h2 className="event-detail-section-title">Lineup</h2>
                <ul className="event-detail-lineup-list">
                  {event.lineup.map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                </ul>
              </div>
            )}

            {event.schedule && event.schedule.length > 0 && (
              <div className="event-detail-block">
                <h2 className="event-detail-section-title">Schedule</h2>
                <div className="event-detail-schedule-list">
                  {event.schedule.map((item, i) => (
                    <div key={i} className="event-detail-schedule-item">
                      <span className="event-detail-schedule-time">{item.time}</span>
                      <span className="event-detail-schedule-label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="event-detail-sidebar">
            <div className="event-detail-info-card">
              <h2 className="event-detail-info-title">Event Details</h2>

              <div className="event-detail-info-row">
                <span className="event-detail-info-label">Date</span>
                <span className="event-detail-info-value">{formatDate(event.date)}</span>
              </div>

              {event.doorsOpen && (
                <div className="event-detail-info-row">
                  <span className="event-detail-info-label">Doors Open</span>
                  <span className="event-detail-info-value">{formatTime(event.doorsOpen)}</span>
                </div>
              )}

              <div className="event-detail-info-row">
                <span className="event-detail-info-label">Start Time</span>
                <span className="event-detail-info-value">{formatTime(event.date)}</span>
              </div>

              <div className="event-detail-info-row">
                <span className="event-detail-info-label">Location</span>
                <span className="event-detail-info-value">{event.location}</span>
              </div>

              {event.category && (
                <div className="event-detail-info-row">
                  <span className="event-detail-info-label">Category</span>
                  <span className="event-detail-info-value">{event.category}</span>
                </div>
              )}

              {event.price && (
                <div className="event-detail-info-row">
                  <span className="event-detail-info-label">Price</span>
                  <span className="event-detail-info-value">{event.price}</span>
                </div>
              )}

              {event.ageLimit && (
                <div className="event-detail-info-row">
                  <span className="event-detail-info-label">Age Limit</span>
                  <span className="event-detail-info-value">{event.ageLimit}</span>
                </div>
              )}

              <Link href="/book-table" className="event-detail-book-btn">
                Book Now
              </Link>
            </div>
          </aside>

        </div>

        <div className="event-comments-wrap">
          <h2 className="event-comments-heading">
            {comments.length} Comment{comments.length !== 1 ? "s" : ""}
          </h2>

          {comments.length === 0 && (
            <p className="event-comments-empty">No comments yet — be the first.</p>
          )}

          {comments.map((c) => (
            <div key={c.id} className="event-comment">
              <div className="event-comment-meta">
                <span className="event-comment-name">{c.name}</span>
                <span className="event-comment-dash"> - </span>
                <span className="event-comment-label">Posted </span>
                <span className="event-comment-date">{formatCommentDate(c.date)}</span>
              </div>
              <p className="event-comment-body">{c.content}</p>
            </div>
          ))}

          <CommentForm eventId={event.id} />
        </div>

      </div>
    </>
  );
}
