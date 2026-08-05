"use client";

import Link from "next/link";
import { useState } from "react";
import { siteCopy } from "@/lib/content";

type State = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: { "content-type": "application/json" }
      });

      const data = (await response.json()) as { message: string };
      setMessage(data.message);
      setState(response.ok ? "success" : "error");
    } catch {
      const name = String(formData.get("name") ?? "");
      const email = String(formData.get("email") ?? "");
      const project = String(formData.get("project") ?? "");
      const subject = encodeURIComponent("DeFlick project inquiry");
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject:\n${project}`);
      window.location.href = `mailto:${siteCopy.email}?subject=${subject}&body=${body}`;
      setMessage("Opening email client because the static preview cannot send server forms.");
      setState("success");
    }
  }

  return (
    <form className="contactForm" action={submit}>
      <label>
        Name
        <input name="name" required minLength={2} />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Project
        <textarea name="project" rows={5} required minLength={10} />
      </label>
      <label className="hp" aria-hidden="true">
        Company website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="button buttonLight" disabled={state === "loading"} type="submit">
        {state === "loading" ? "Sending" : "Send inquiry"}
      </button>
      {message ? <p className={`formState ${state}`}>{message}</p> : null}
      <p className="privacyNote">
        By sending, you agree that DeFlick can use this information to reply. See{" "}
        <Link href="/privacy">privacy</Link>.
      </p>
    </form>
  );
}
