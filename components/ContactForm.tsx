"use client";

import Link from "next/link";
import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setState("loading");
    setMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: { "content-type": "application/json" }
    });

    const data = (await response.json()) as { message: string };
    setMessage(data.message);
    setState(response.ok ? "success" : "error");
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
