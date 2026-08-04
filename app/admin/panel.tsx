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
  const [previewSlug, setPreviewSlug] = useState(defaults.projects[0]?.slug ?? "");
  const [content, setContent] = useState<AdminContent>(() => {
    if (typeof window === "undefined") return defaults;
    const saved = window.localStorage.getItem("deflick-admin-content");
    return saved ? ({ ...defaults, ...JSON.parse(saved) } as AdminContent) : defaults;
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
    setError(data.message ?? "Неверный логин или пароль.");
  }

  function createProject(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    if (!title) return;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (content.projects.some((project) => project.slug === slug)) return;

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
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "deflick-content.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!loggedIn) {
    return (
      <main className="adminLogin">
        <section>
          <Image src="/assets/deflick-logo.jpg" alt="DeFlick Production" width={360} height={220} priority />
          <p className="eyebrow">Admin / local preview</p>
          <h1>Вход в панель DeFlick.</h1>
          <form onSubmit={login}>
            <label>
              Логин
              <input name="login" autoComplete="username" />
            </label>
            <label>
              Пароль
              <input name="password" type="password" autoComplete="current-password" />
            </label>
            <button className="button buttonLight" type="submit">
              Войти
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
            Сохранить локально
          </button>
          <button onClick={exportJson} type="button">
            Export JSON
          </button>
        </div>
      </header>

      <section className="adminHero">
        <p className="eyebrow">Панель управления</p>
        <h1>Контент, проекты, клиенты и заявка сайта.</h1>
        <p>
          Сейчас это безопасная локальная админка. Для настоящего серверного сохранения подключается
          Payload CMS + PostgreSQL на хостинге.
        </p>
      </section>

      <section className="adminGrid">
        <article className="adminPanel">
          <h2>Главная</h2>
          <label>
            Заголовок
            <textarea
              value={content.headline}
              onChange={(event) => setContent({ ...content, headline: event.target.value })}
              rows={2}
            />
          </label>
          <label>
            Описание
            <textarea
              value={content.intro}
              onChange={(event) => setContent({ ...content, intro: event.target.value })}
              rows={4}
            />
          </label>
        </article>

        <article className="adminPanel">
          <h2>Контакты</h2>
          <label>
            Business email
            <input
              value={content.email}
              onChange={(event) => setContent({ ...content, email: event.target.value })}
            />
          </label>
          <label>
            Локация
            <input
              value={content.location}
              onChange={(event) => setContent({ ...content, location: event.target.value })}
            />
          </label>
        </article>

        <article className="adminPanel wide">
          <h2>Проекты</h2>
          <p>Создание, черновик, публикация, ручной порядок и видимость. Полные поля проекта готовы в схеме данных.</p>
          <form className="inlineForm" action={createProject}>
            <input name="title" placeholder="Название нового проекта" />
            <button type="submit">Создать draft</button>
          </form>
          <div className="adminRows">
            {orderedProjects.map((project) => (
              <div className="adminRow" key={project.slug}>
                <label>
                  Показывать
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
          <h2>Клиенты и партнеры</h2>
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
