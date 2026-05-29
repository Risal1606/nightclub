// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

"use client";

import { useState } from "react";

type Props = { eventId: number };

export default function CommentForm({ eventId }: Props) {
  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateClient = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.content.trim()) e.content = "Please write a comment before submitting.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientErrs = validateClient();
    if (Object.keys(clientErrs).length > 0) { setErrors(clientErrs); return; }
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, name: form.name, content: form.content }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        else setServerError(data.error ?? "Failed to submit comment. Please try again.");
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
      <p className="comment-thanks">
        Thank you for your comment — it has been submitted.
      </p>
    );
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit} noValidate>
      <h2 className="comment-form-title">Leave a Comment</h2>
      <div className="comment-form-row">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <input
            className={`comment-input${errors.name ? " comment-input--error" : ""}`}
            type="text" name="name" value={form.name}
            onChange={handleChange} placeholder="Your Name"
          />
          {errors.name && <span className="comment-field-error">{errors.name}</span>}
        </div>
        <input
          className="comment-input"
          type="email" name="email" value={form.email}
          onChange={handleChange} placeholder="Your Email (optional)"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <textarea
          className={`comment-input comment-textarea${errors.content ? " comment-input--error" : ""}`}
          name="content" value={form.content}
          onChange={handleChange} placeholder="Your Comment" rows={6}
        />
        {errors.content && <span className="comment-field-error">{errors.content}</span>}
      </div>
      {serverError && <p className="comment-field-error" style={{ marginTop: "0.5rem" }}>{serverError}</p>}
      <div className="comment-form-footer">
        <button className="comment-submit" type="submit" disabled={loading}>
          {loading ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}
