// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import BookTableClient from "./BookTableClient";

type Event = { id: number; title: string; date: string; doorsOpen?: string };

async function getEvents(apiUrl: string): Promise<Event[]> {
  try {
    const res = await fetch(`${apiUrl}/events`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function BookTablePage({
  searchParams,
}: {
  searchParams: Promise<{ eventId?: string }>;
}) {
  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  const { eventId } = await searchParams;
  const events = await getEvents(apiUrl);

  return (
    <>
      <section className="book-hero">
        <div className="book-hero-inner">
          <h1 className="book-hero-title">Book a Table</h1>
        </div>
      </section>
      <BookTableClient
        events={events}
        apiUrl={apiUrl}
        defaultEventId={eventId ?? String(events[0]?.id ?? "")}
      />
    </>
  );
}
