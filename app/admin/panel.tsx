"use client";

import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useMemo, useState } from "react";
import { capabilities, clients, projects, siteCopy } from "@/lib/content";

type AdminContent = {
  headline: string;
  intro: string;
  email: string;
  location: string;
  projects: { slug: string; title: string; visible: boolean; order: number; status: "draft" | "published" }[];
  clients: { name: string; visible: boolean }[];
};

const defaults: AdminContent = {
  headline: siteCopy.headline,
  intro: siteCopy.intro,
  email: siteCopy.email,
  location: siteCopy.location,
  projects: projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    visible: project.visible,
    order: project.order,
    status: "published"
  })),
  clients
};

export function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [previewSlug, setPreviewSlug] = useState(defaults.projects[0]?.slug ?? "");
  const [content, setContent] = useState<AdminContent>(() => {
    if (typeof window === "undefined") return defaults;
    const saved = window.localStorage.getItem("deflick-admin-content");
    if (!saved) return defaults;

    try {
      return { ...defaults, ...JSON.parse(saved) } as AdminContent;
    } catch {
      return defaults;
    }
  });

  const orderedProjects = useMemo(
    () => [...content.projects].sort((a, b) => a.order - b.order),
    [content.projects]
  );
  const previewProject = content.projects.find((project) => project.slug === previewSlug) ?? orderedProjects[0];

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({
        login: formData.get("login"),
        password: formData.get("password")
      }),
      headers: { "content-type": "application/json" }
    });

    if (response.ok) {
      setLoggedIn(true);
      setError("");
      return;
    }

    const data = (await response.json()) as { message?: string };
    setError(data.message ?? "Invalid login or password.");
  }

  function createProject(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    if (!title) return;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (content.projects.some((project) => project.slug === slug)) {
      setNotice(`Project already exists: ${title}`);
      return;
    }

    setNotice(`Draft created: ${title}`);
    setContent({
      ...content,
      projects: [
        ...content.projects,
        {
          slug,
          title,
          visible: false,
          order: content.projects.length + 1,
          status: "draft"
        }
      ]
    });
  }

  function save() {
    window.localStorage.setItem("deflick-admin-content", JSON.stringify(content, null, 2));
    setNotice("Saved locally in this browser.");
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "deflick-content.json";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Exported JSON content snapshot.");
  }

  if (!loggedIn) {
    return (
      <main className="adminLogin">
        <section>
          <Image src="/assets/deflick-logo.jpg" alt="DeFlick Production" width={360} height={220} priority />
          <p className="eyebrow">Admin / local preview</p>
          <h1>DeFlick admin sign in.</h1>
          <form onSubmit={login}>
            <label>
              Login
              <input name="login" autoComplete="username" />
            </label>
            <label>
              Password
              <input name="password" type="password" autoComplete="current-password" />
            </label>
            <button className="button buttonLight" type="submit">
              Sign in
            </button>
            {error ? <p className="formState error">{error}</p> : null}
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="adminShell">
      <header className="adminTop">
        <Link href="/" className="brandMark">
          <Image src="/assets/deflick-logo.jpg" alt="" width={96} height={60} />
          <span>DEFLICK ADMIN</span>
        </Link>
        <div>
          <button onClick={save} type="button">
            Save locally
          </button>
          <button onClick={exportJson} type="button">
            Export JSON
          </button>
        </div>
      </header>

      <section className="adminHero">
        <p className="eyebrow">Control room</p>
        <h1>Content, projects, clients and site readiness.</h1>
        <p>
          This is a safe local admin preview. Use it to stage copy and ordering before moving the
          content model into Payload CMS and PostgreSQL.
        </p>
        {notice ? <p className="formState">{notice}</p> : null}
      </section>

      <section className="adminGrid">
        <article className="adminPanel">
          <h2>Homepage</h2>
          <label>
            Headline
            <textarea
              value={content.headline}
              onChange={(event) => setContent({ ...content, headline: event.target.value })}
              rows={2}
            />
          </label>
          <label>
            Intro
            <textarea
              value={content.intro}
              onChange={(event) => setContent({ ...content, intro: event.target.value })}
              rows={4}
            />
          </label>
        </article>

        <article className="adminPanel">
          <h2>Contacts</h2>
          <label>
            Business email
            <input
              value={content.email}
              onChange={(event) => setContent({ ...content, email: event.target.value })}
            />
          </label>
          <label>
            Location
            <input
              value={content.location}
              onChange={(event) => setContent({ ...content, location: event.target.value })}
            />
          </label>
        </article>

        <article className="adminPanel wide">
          <h2>Projects</h2>
          <p>Create drafts, publish records, set manual ordering and control what appears on the public site. Full project fields are ready in the data model.</p>
          <form className="inlineForm" action={createProject}>
            <input name="title" placeholder="New project title" />
            <button type="submit">Create draft</button>
          </form>
          <div className="adminRows">
            {orderedProjects.map((project) => (
              <div className="adminRow" key={project.slug}>
                <label>
                  Visible
                  <input
                    checked={project.visible}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        projects: content.projects.map((item) =>
                          item.slug === project.slug ? { ...item, visible: event.target.checked } : item
                        )
                      })
                    }
                    type="checkbox"
                  />
                </label>
                <input
                  aria-label={`${project.title} order`}
                  value={project.order}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      projects: content.projects.map((item) =>
                        item.slug === project.slug ? { ...item, order: Number(event.target.value) } : item
                      )
                    })
                  }
                  type="number"
                />
                <input
                  aria-label={`${project.title} title`}
                  value={project.title}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      projects: content.projects.map((item) =>
                        item.slug === project.slug ? { ...item, title: event.target.value } : item
                      )
                    })
                  }
                />
                <select
                  aria-label={`${project.title} status`}
                  value={project.status}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      projects: content.projects.map((item) =>
                        item.slug === project.slug
                          ? { ...item, status: event.target.value as "draft" | "published" }
                          : item
                      )
                    })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <button onClick={() => setPreviewSlug(project.slug)} type="button">
                  Preview
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="adminPanel wide">
          <h2>Preview</h2>
          {previewProject ? (
            <div className="adminPreview">
              <span>{previewProject.status}</span>
              <h3>{previewProject.title}</h3>
              <p>Slug: /work/{previewProject.slug}</p>
              <p>Visible: {previewProject.visible ? "yes" : "no"}</p>
            </div>
          ) : null}
        </article>

        <article className="adminPanel wide">
          <h2>Clients and partners</h2>
          <div className="adminRows">
            {content.clients.map((client) => (
              <label className="adminRow" key={client.name}>
                <input
                  checked={client.visible}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      clients: content.clients.map((item) =>
                        item.name === client.name ? { ...item, visible: event.target.checked } : item
                      )
                    })
                  }
                  type="checkbox"
                />
                <span>{client.name}</span>
              </label>
            ))}
          </div>
        </article>

        <article className="adminPanel wide">
          <h2>Capabilities</h2>
          <div className="pillList">
            {capabilities.map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
