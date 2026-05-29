// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Event = { id: number; title: string; date: string; doorsOpen?: string };
type Reservation = { id: number; eventId: number; table: string };

const DEMO_OCCUPIED = ["2", "5", "11"];

const TABLES: { id: number; type: "small" | "medium" | "large" }[] = [
  { id: 1,  type: "small"  }, { id: 2,  type: "small"  }, { id: 3,  type: "medium" }, { id: 4,  type: "small"  }, { id: 5,  type: "large"  },
  { id: 6,  type: "small"  }, { id: 7,  type: "small"  }, { id: 8,  type: "medium" }, { id: 9,  type: "small"  }, { id: 10, type: "large"  },
  { id: 11, type: "small"  }, { id: 12, type: "small"  }, { id: 13, type: "medium" }, { id: 14, type: "small"  }, { id: 15, type: "large"  },
];

const TABLE_IMAGES: Record<"small" | "medium" | "large", string> = {
  small:  "/assets/table/table_1.png",
  medium: "/assets/table/table_2.png",
  large:  "/assets/table/table_3.png",
};

function formatEventDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "Europe/Copenhagen",
  });
}

function TableIcon({
  id, type, selected, occupied, onClick,
}: {
  id: number; type: "small" | "medium" | "large"; selected: boolean; occupied: boolean; onClick: () => void;
}) {
  return (
    <button
      className={`table-icon${selected ? " table-icon--selected" : ""}${occupied ? " table-icon--occupied" : ""}`}
      onClick={onClick}
      disabled={occupied}
      title={occupied ? `Table ${id} is already reserved` : `Select table ${id}`}
      type="button"
    >
      <div className="table-img-wrap">
        <img
          src={TABLE_IMAGES[type]}
          alt={`Table ${id}`}
          className="table-img"
          style={{ width: type === "small" ? 248 : type === "medium" ? 230 : 220, height: "auto", display: "block" }}
        />
        <span className="table-num">{id}</span>
      </div>
    </button>
  );
}

type Props = { events: Event[]; apiUrl: string; defaultEventId: string };

export default function BookTableClient({ events, apiUrl, defaultEventId }: Props) {
  const [occupiedTables, setOccupiedTables] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refreshOccupied, setRefreshOccupied] = useState(0);

  const [form, setForm] = useState({
    name: "", email: "", table: "", guests: "",
    eventId: defaultEventId, phone: "", comment: "",
  });

  useEffect(() => {
    if (!form.eventId) { setOccupiedTables([]); return; }
    fetch(`${apiUrl}/reservations?eventId=${form.eventId}`)
      .then(r => r.json())
      .then((res: Reservation[]) => setOccupiedTables(res.map(r => String(r.table))))
      .catch(() => setOccupiedTables([]));
  }, [form.eventId, apiUrl, refreshOccupied]);

  const selectedEvent = events.find(e => String(e.id) === form.eventId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const selectTable = (id: number) => {
    setForm(prev => ({ ...prev, table: String(id) }));
    if (errors.table) setErrors(prev => ({ ...prev, table: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.table) e.table = "Please select a table.";
    if (!form.guests || Number(form.guests) < 1) e.guests = "Please enter number of guests.";
    if (!form.phone.trim()) e.phone = "Please enter your contact number.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setError("");
    try {
      const date = selectedEvent?.doorsOpen ?? selectedEvent?.date ?? new Date().toISOString();
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          table: form.table,
          guests: form.guests,
          date,
          phone: form.phone,
          eventId: form.eventId ? Number(form.eventId) : null,
          comment: form.comment || undefined,
        }),
      });
      const resData = await res.json();
      if (!res.ok) {
        if (resData.errors) { setErrors(resData.errors); return; }
        setError(resData.error ?? "Something went wrong. Please try again.");
        setRefreshOccupied((n) => n + 1);
        return;
      }
      setSubmittedName(form.name);
      setSubmitted(true);
    } catch {
      setError("Could not connect. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="book-wrap"
      style={{ backgroundImage: "url('/assets/bg/pattern_small.jpg')", backgroundRepeat: "repeat", backgroundSize: "30px 30px" }}
    >
      {submitted ? (
        <div className="book-success">
          <div className="book-success-icon">✓</div>
          <h2 className="book-success-title">Booking Confirmed</h2>
          <p className="book-success-text">
            Thank you, <strong>{submittedName}</strong>. We&apos;ve received your reservation and will be in touch shortly.
          </p>
          <Link href="/events" className="book-success-btn">Back to Events</Link>
        </div>
      ) : (
        <div className="book-inner">
          <div className="table-map">
            {TABLES.map(t => (
              <TableIcon
                key={t.id}
                id={t.id}
                type={t.type}
                selected={form.table === String(t.id)}
                occupied={occupiedTables.includes(String(t.id)) || DEMO_OCCUPIED.includes(String(t.id))}
                onClick={() => selectTable(t.id)}
              />
            ))}
          </div>
          {errors.table && <p className="book-map-error">{errors.table}</p>}

          <form className="book-form" onSubmit={handleSubmit} noValidate>
            <h2 className="book-form-title">Book a Table</h2>

            <div className="book-fields">
              <div className="book-field">
                <input className={`book-input${errors.name ? " book-input--error" : ""}`} type="text" name="name"
                  value={form.name} onChange={handleChange} placeholder="Your Name" />
                {errors.name && <span className="book-field-error">{errors.name}</span>}
              </div>

              <div className="book-field">
                <input className={`book-input${errors.email ? " book-input--error" : ""}`} type="email" name="email"
                  value={form.email} onChange={handleChange} placeholder="Your Email" />
                {errors.email && <span className="book-field-error">{errors.email}</span>}
              </div>

              <div className="book-field">
                <input className={`book-input${errors.table ? " book-input--error" : ""}`} type="text" name="table"
                  value={form.table ? `Table ${form.table}` : ""} readOnly placeholder="Select a table above" />
                {errors.table && <span className="book-field-error">{errors.table}</span>}
              </div>

              <div className="book-field">
                <input className={`book-input${errors.guests ? " book-input--error" : ""}`} type="number" name="guests"
                  value={form.guests} onChange={handleChange} placeholder="Number of Guests" min="1" max="20" />
                {errors.guests && <span className="book-field-error">{errors.guests}</span>}
              </div>

              <div className="book-field">
                <select className="book-input book-select" name="eventId" value={form.eventId} onChange={handleChange}>
                  <option value="">Choose Night</option>
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} — {formatEventDate(ev.date)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="book-field">
                <input className={`book-input${errors.phone ? " book-input--error" : ""}`} type="tel" name="phone"
                  value={form.phone} onChange={handleChange} placeholder="Your Contact Number" />
                {errors.phone && <span className="book-field-error">{errors.phone}</span>}
              </div>

              <div className="book-field book-field-full">
                <textarea className="book-input book-textarea" name="comment"
                  value={form.comment} onChange={handleChange}
                  placeholder="Your Comment" rows={7} />
              </div>
            </div>

            {error && <p className="book-error">{error}</p>}

            <div className="book-submit-row">
              <button className="book-submit-btn" type="submit" disabled={loading}>
                {loading ? "Sending…" : "Reserve"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
