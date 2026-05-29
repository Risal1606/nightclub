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
  date: string;
  excerpt: string;
  description: string;
  location: string;
  asset: EventAsset;
  heroAsset?: EventAsset;
};

const PER_PAGE = 3;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const month = date.toLocaleString("en-US", { month: "long", timeZone: "Europe/Copenhagen" });
  const day   = date.toLocaleString("en-US", { day: "numeric", timeZone: "Europe/Copenhagen" });
  const time  = date.toLocaleString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Copenhagen",
  });
  return `${month} ${day} · ${time}`;
}

const FALLBACK: Event[] = [
  {
    id: 1, slug: "neon-nights-grand-opening", title: "Neon Nights Grand Opening",
    date: "2026-05-09T21:00:00+02:00", location: "Center Stage",
    excerpt: "A major opening night with house, live percussion, visuals, and a countdown show.",
    description: "Night Club opens its doors again with an evening of house, visuals, and live percussion on the main stage. Guests can expect welcome drinks from 21:00, an upgraded lighting setup, and a program that builds toward a big countdown show at midnight.",
    asset: { url: "/assets/content-img/event-thumb1.jpg", width: 570, height: 403, alt: "Neon night party" },
  },
  {
    id: 2, slug: "retro-rewind-80s-90s", title: "Retro Rewind: 80s & 90s",
    date: "2026-05-16T21:00:00+02:00", location: "Center Stage",
    excerpt: "A colorful throwback night with pop, disco, and old school R&B.",
    description: "A full evening dedicated to classic floorfillers from the 80s and 90s. The DJ team mixes pop, disco, and old school R&B while the bar serves signature cocktails inspired by the biggest club hits of the era.",
    asset: { url: "/assets/content-img/event-thumb2.jpg", width: 570, height: 403, alt: "Retro night" },
  },
  {
    id: 3, slug: "bass-drop-dubstep-edition", title: "Bass Drop: Dubstep Edition",
    date: "2026-05-22T21:00:00+02:00", location: "Center Stage",
    excerpt: "A heavy Friday with dubstep, bass music, guest DJs, and a stage show.",
    description: "Friday's program pushes tempo and sub-bass all the way up with guest DJs, an MC host, and a crowd that comes for heavy drops and a dark club atmosphere. The night is aimed at guests who want to get close to the stage and feel the sound physically.",
    asset: { url: "/assets/content-img/event-thumb3.jpg", width: 570, height: 403, alt: "Bass drop event" },
  },
  {
    id: 4, slug: "techno-bunker-underground", title: "Techno Bunker Underground",
    date: "2026-05-30T21:00:00+02:00", location: "Basement Room",
    excerpt: "An uncompromising techno concept with local selectors, strobes, and smoke bursts.",
    description: "The basement room is transformed into a raw techno universe with strobe lights, smoke bursts, and a line-up of local selectors. The focus is on long mixes, hypnotic grooves, and a more uncompromising late-night experience.",
    asset: { url: "/assets/content-img/event-thumb4.jpg", width: 570, height: 403, alt: "Techno bunker" },
  },
  {
    id: 5, slug: "disco-fever-saturday", title: "Disco Fever Saturday",
    date: "2026-06-27T21:00:00+02:00", location: "Center Stage",
    excerpt: "A Saturday night of glitter, grooves, and feel-good energy.",
    description: "Saturday's disco concept brings glitter, grooves, and classic sing-alongs together in one long dance floor set. Guests enter a more festive dress-code universe with mirror balls above the bar.",
    asset: { url: "/assets/content-img/event-thumb5.jpg", width: 570, height: 403, alt: "Disco fever" },
  },
  {
    id: 6, slug: "house-party-vibes", title: "House Party Vibes",
    date: "2026-06-13T21:00:00+02:00", location: "Center Stage",
    excerpt: "A relaxed house night with warm beats, vocal samples, and an open dance floor.",
    description: "House Party Vibes is the more relaxed club night, where warm house beats, vocal samples, and an open dance floor set the tone. The program is put together for guests who want to start late, stay long, and move freely.",
    asset: { url: "/assets/content-img/event-thumb6.jpg", width: 570, height: 403, alt: "House party" },
  },
];

async function getEvents(page: number): Promise<{ events: Event[]; total: number; apiUrl: string }> {
  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${apiUrl}/events`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const all: Event[] = await res.json();
    const start = (page - 1) * PER_PAGE;
    return { events: all.slice(start, start + PER_PAGE), total: all.length, apiUrl };
  } catch {
    const start = (page - 1) * PER_PAGE;
    return { events: FALLBACK.slice(start, start + PER_PAGE), total: FALLBACK.length, apiUrl: "" };
  }
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, Number(pageStr) || 1);
  const { events, total, apiUrl } = await getEvents(page);
  const totalPages = Math.ceil(total / PER_PAGE);

  const heroBg = apiUrl
    ? `${apiUrl}/file-bucket/footerbg.jpg`
    : "/assets/bg/footerbg.jpg";

  return (
    <>
      <section className="events-hero" style={{ backgroundImage: `url('${heroBg}')` }}>
        <h1 className="events-hero-title">Events</h1>
      </section>

      <div className="events-divider" />

      <div className="events-list">
        {events.map((event, i) => {
          const isReversed = i % 2 === 1;
          const imgUrl = event.heroAsset?.url ?? event.asset.url;
          const imgSrc = imgUrl.startsWith("/assets/")
            ? imgUrl
            : `${apiUrl}${imgUrl}`;

          return (
            <div key={event.id} className={`event-row${isReversed ? " event-row-reverse" : ""}`}>
              <div className="event-img-wrap">
                <img src={imgSrc} alt={event.heroAsset?.alt ?? event.asset.alt} className="event-img" />
              </div>
              <div className="event-content">
                <h2 className="event-title">{event.title}</h2>
                <div className="event-meta">
                  <span className="event-date">{formatDate(event.date)}</span>
                  <span className="event-sep">|</span>
                  <span className="event-location">{event.location}</span>
                </div>
                <p className="event-desc">{event.description}</p>
                <Link href={`/events/${event.slug}`} className="event-read-more">
                  Read More
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="events-pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/events?page=${p}`}
              className={`events-page-btn${p === page ? " events-page-active" : ""}`}
            >
              {p}
            </Link>
          ))}
          {page < totalPages && (
            <Link href={`/events?page=${page + 1}`} className="events-page-next">
              næste &gt;
            </Link>
          )}
        </div>
      )}
    </>
  );
}
