"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

const PROJECT_TYPES = [
  "New product from scratch",
  "Redesign / revitalize",
  "Mobile application",
  "Cloud & infrastructure",
  "Intelligent assistance / AI",
  "Something else",
];

const inputCls =
  "w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-[15px] text-[#161412] placeholder:text-stone-400 outline-none transition-colors focus:border-[#161412]";
const labelCls =
  "mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-stone-600";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copyEmail}
      className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-6 py-3 text-[12px] font-semibold text-[#161412] transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-200 active:translate-y-0 active:scale-[0.98]"
    >
      <span className="material-symbols-outlined text-[16px]">content_copy</span>
      <span>{copied ? "Copied to Clipboard!" : "Copy Email Address"}</span>
    </button>
  );
}

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | "direct" | "email-app">(null);

  const openEmailApp = () => {
    const subject = encodeURIComponent(`Project inquiry from ${name.trim()} — ${type}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\nProject type: ${type}\n\n${message.trim()}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Please enter a valid email address.";
    if (message.trim().length < 10)
      errs.message = "A sentence or two about your project helps us prepare.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Try delivering directly to the studio inbox first (no backend needed).
    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          "project type": type,
          message: message.trim(),
          _subject: `Project inquiry from ${name.trim()} — ${type}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error("delivery failed");
      setSent("direct");
    } catch {
      // No network / blocked request: fall back to the visitor's email app
      // so the inquiry is never silently lost.
      openEmailApp();
      setSent("email-app");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="mb-6 w-full max-w-2xl rounded-2xl border border-emerald-700/25 bg-emerald-50/60 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-800">
          <span className="material-symbols-outlined text-2xl">check_circle</span>
        </div>
        <h3 className="font-display mb-1 text-[20px] font-semibold text-[#161412]">
          {sent === "direct" ? "Inquiry sent — thank you" : "Your email app should now be open"}
        </h3>
        <p className="mx-auto mb-4 max-w-md text-[14px] text-[#4F4A43]">
          {sent === "direct" ? (
            <>
              We&apos;ll reply to <span className="font-medium text-[#161412]">{email.trim()}</span> within
              24 hours. Prefer to write directly? Use{" "}
              <span className="font-medium text-[#161412]">{CONTACT_EMAIL}</span>.
            </>
          ) : (
            <>
              We pre-filled everything — just hit send. Prefer to write directly?
              Use <span className="font-medium text-[#161412]">{CONTACT_EMAIL}</span>.
            </>
          )}
        </p>
        <button
          onClick={() => setSent(null)}
          className="text-[13px] font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-900"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="mb-6 grid w-full max-w-2xl grid-cols-1 gap-4 rounded-2xl border border-stone-200/90 bg-[#F5F2EC]/60 p-6 text-left sm:grid-cols-2 md:p-8"
    >
      <div>
        <label htmlFor="inq-name" className={labelCls}>
          Your name
        </label>
        <input
          id="inq-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ava Rao"
          autoComplete="name"
          className={inputCls}
        />
        {errors.name && <p className="mt-1 text-[13px] text-red-700">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="inq-email" className={labelCls}>
          Email
        </label>
        <input
          id="inq-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ava@company.com"
          autoComplete="email"
          className={inputCls}
        />
        {errors.email && <p className="mt-1 text-[13px] text-red-700">{errors.email}</p>}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="inq-type" className={labelCls}>
          Project type
        </label>
        <select id="inq-type" value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
          {PROJECT_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="inq-message" className={labelCls}>
          About your project
        </label>
        <textarea
          id="inq-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you building, and what does success look like?"
          rows={4}
          className={`${inputCls} resize-y`}
        />
        {errors.message && <p className="mt-1 text-[13px] text-red-700">{errors.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#161412] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 active:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
        >
          <span>{sending ? "Sending…" : "Send Inquiry"}</span>
          <span className="material-symbols-outlined text-[18px]">
            {sending ? "hourglass_top" : "north_east"}
          </span>
        </button>
      </div>
    </form>
  );
}
