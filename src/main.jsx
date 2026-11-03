import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import "./styles.css";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = url && key ? createClient(url, key) : null;

function App() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", attendance: "Attending" });
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus("");
    if (!supabase) {
      setStatus("The form is not connected yet. The organiser needs to add the Supabase settings first.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("wedding_rsvps").insert([{
      full_name: form.full_name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      attendance: form.attendance
    }]);
    setBusy(false);
    if (error) {
      setStatus(error.code === "23505"
        ? "This email has already been registered. Please contact the organiser if you need to change your response."
        : "Sorry, your registration could not be saved. Please try again.");
      return;
    }
    setForm({ full_name: "", email: "", phone: "", attendance: "Attending" });
    setStatus("Thank you! Your RSVP has been received.");
  }

  return <main className="page">
    <section className="card">
      <div className="ornament">✦</div>
      <p className="eyebrow">A CELEBRATION OF LOVE</p>
      <h1>Bush <span>weds</span> Venessa</h1>
      <p className="intro">We would be delighted to celebrate this special day with you.<br/>Please confirm your attendance below.</p>
      <div className="rule"><i /></div>
      <form onSubmit={submit}>
        <label>Full name <b>*</b>
          <input name="full_name" value={form.full_name} onChange={update} placeholder="Enter your full name" required maxLength="120" />
        </label>
        <label>Email address <b>*</b>
          <input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required maxLength="254" />
        </label>
        <label>Phone number <span className="optional">(optional)</span>
          <input name="phone" type="tel" value={form.phone} onChange={update} placeholder="Your phone number" maxLength="30" />
        </label>
        <label>Will you attend? <b>*</b>
          <select name="attendance" value={form.attendance} onChange={update} required>
            <option>Attending</option>
            <option>Not attending</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <button disabled={busy}>{busy ? "Submitting…" : "Confirm my RSVP"}</button>
      </form>
      {status && <p className={status.startsWith("Thank") ? "success" : "notice"} role="status">{status}</p>}
      <p className="footer">With love, Bush &amp; Venessa</p>
    </section>
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);
