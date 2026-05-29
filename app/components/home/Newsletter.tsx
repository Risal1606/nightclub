// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSuccess(true);
      setEmail("");
    } catch {
      setError("Could not connect. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="nl-section">
      <h2 className="nl-title">Want The Latest Night Club News</h2>
      <p className="nl-sub">
        Subscribe to our newsletter and never miss an{" "}
        <span className="nl-pink">Event</span>
      </p>

      {success ? (
        <p className="nl-success">You&apos;re subscribed! We&apos;ll keep you updated on upcoming events.</p>
      ) : (
        <form className="nl-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            placeholder="Enter Your Email"
            className={`nl-input${error ? " nl-input--error" : ""}`}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            aria-label="Email address"
            required
          />
          <button type="submit" className="nl-btn" disabled={loading}>
            {loading ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      )}

      {error && <p className="nl-error">{error}</p>}
    </section>
  );
}
