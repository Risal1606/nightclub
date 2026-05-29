// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import Link from "next/link";

type EventAsset = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type Event = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  location: string;
  heroAsset: EventAsset;
  asset: EventAsset;
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const month = date.toLocaleString("en-US", { month: "long", timeZone: "Europe/Copenhagen" });
  const day   = date.toLocaleString("en-US", { day: "numeric", timeZone: "Europe/Copenhagen" });
  return `${month} ${day}`;
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
    date: "2026-05-09T21:00:00+02:00",
    location: "Center Stage",
    heroAsset: { url: "/assets/content-img/event-thumb5.jpg", width: 570, height: 403, alt: "Neon night party crowd" },
    asset: { url: "/assets/content-img/event-thumb5.jpg", width: 570, height: 403, alt: "Neon night party crowd" },
  },
  {
    id: 5,
    slug: "disco-fever-saturday",
    title: "Disco Fever Saturday",
    excerpt: "A glitter-and-groove evening with themed visuals, disco classics, and a live saxophone set.",
    date: "2026-06-27T21:00:00+02:00",
    location: "Main Floor",
    heroAsset: { url: "/assets/content-img/event-thumb6.jpg", width: 570, height: 403, alt: "Disco fever singer on stage" },
    asset: { url: "/assets/content-img/event-thumb6.jpg", width: 570, height: 403, alt: "Disco fever singer on stage" },
  },
];

async function getFeaturedEvents(): Promise<{ events: Event[]; apiUrl: string }> {
  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${apiUrl}/events?isFeatured=true`, { cache: "no-store" });
    if (!res.ok) return { events: FALLBACK, apiUrl: "" };
    const events = await res.json();
    return { events: events.length > 0 ? events : FALLBACK, apiUrl: events.length > 0 ? apiUrl : "" };
  } catch {
    return { events: FALLBACK, apiUrl: "" };
  }
}

export default async function FeaturedEvents() {
  const { events, apiUrl } = await getFeaturedEvents();

  return (
    <section className="featured-events">
      <h2 className="section-title">Featured Events</h2>
      <div className="featured-grid">
        {events.map((event) => {
          const imgAsset = event.heroAsset ?? event.asset;
          const imgSrc = imgAsset.url.startsWith("/assets/") ? imgAsset.url : `${apiUrl}${imgAsset.url}`;

          return (
            <div key={event.id} className="featured-card">
              <Link href={`/events/${event.slug}`} className="featured-img-wrap" aria-label={event.title}>
                <img src={imgSrc} alt={imgAsset.alt} className="featured-img" />
                <div className="featured-img-overlay" aria-hidden="true">
                  <p className="featured-excerpt">{event.excerpt}</p>
                </div>
              </Link>
              <div className="featured-bar">
                <div className="featured-bar-info">
                  <span className="featured-name">{event.title}</span>
                  <span className="featured-meta">
                    {formatDate(event.date)} · {formatTime(event.date)}
                    {event.location ? ` · ${event.location}` : ""}
                  </span>
                </div>
                <Link href={`/book-table?eventId=${event.id}`} className="featured-book-btn">
                  Book Now
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
