"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, projects } from "@/lib/content";

export function ProjectGrid() {
  const [category, setCategory] = useState("ALL");
  const filtered = useMemo(
    () => projects.filter((project) => project.visible && (category === "ALL" || project.category === category)),
    [category]
  );

  return (
    <section className="workGrid" aria-label="Selected work">
      <div className="filters" role="tablist" aria-label="Filter work">
        {categories.map((item) => (
          <button
            aria-pressed={category === item}
            className={category === item ? "active" : ""}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="projectGrid">
        {filtered.map((project) => (
          <Link className="projectCard" href={`/work/${project.slug}`} key={project.slug}>
            <Image src={project.cover} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="projectOverlay">
              <span>
                {project.year} / {project.category}
              </span>
              <h2>{project.title}</h2>
              <p>OPEN</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
