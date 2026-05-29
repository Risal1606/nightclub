// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateClient = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.comment.trim()) e.comment = "Please enter a message.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientErrs = validateClient();
    if (Object.keys(clientErrs).length > 0) { setErrors(clientErrs); return; }
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        else setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Could not connect. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-success">
        <div className="contact-success-icon">✓</div>
        <h2 className="contact-success-title">Message Sent</h2>
        <p className="contact-success-text">Thank you, <strong>{form.name}</strong>. We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-field">
        <input
          className={`contact-input${errors.name ? " contact-input--error" : ""}`}
          type="text" name="name" value={form.name}
          onChange={handleChange} placeholder="Your Name"
        />
        {errors.name && <span className="contact-field-error">{errors.name}</span>}
      </div>

      <div className="contact-field">
        <input
          className={`contact-input${errors.email ? " contact-input--error" : ""}`}
          type="email" name="email" value={form.email}
          onChange={handleChange} placeholder="Your Email"
        />
        {errors.email && <span className="contact-field-error">{errors.email}</span>}
      </div>

      <div className="contact-field">
        <textarea
          className={`contact-input contact-textarea${errors.comment ? " contact-input--error" : ""}`}
          name="comment" value={form.comment}
          onChange={handleChange} placeholder="Your Message" rows={8}
        />
        {errors.comment && <span className="contact-field-error">{errors.comment}</span>}
      </div>

      {serverError && <p className="contact-error">{serverError}</p>}

      <div className="contact-submit-row">
        <button className="contact-submit-btn" type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}
