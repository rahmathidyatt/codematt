"use client";
import { useState } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { experienceMessages } from "@/config/experience-messages";
import { categoryLabels, statusLabels } from "@/config/messages";
import type { LocalizedProjectMeta } from "@/lib/content/schema";
import { localizedPath, type Locale } from "@/lib/i18n";
export function LabWorkspace({
  projects,
  locale,
}: {
  projects: LocalizedProjectMeta[];
  locale: Locale;
}) {
  const [selected, setSelected] = useState(projects[0]?.slug);
  const reduced = useReducedMotion();
  const t = experienceMessages[locale];
  const project = projects.find((p) => p.slug === selected) ?? projects[0];
  if (!project) return null;
  return (
    <section className="experiment-desk" aria-labelledby="desk-title">
      <div className="desk-heading">
        <div>
          <p className="eyebrow">LAB / 01</p>
          <h2 id="desk-title">{t.workspace}</h2>
        </div>
        <p>{t.select}</p>
      </div>
      <div className="desk-grid">
        <div className="desk-switches" role="group" aria-label={t.workspace}>
          {projects.map((p, i) => (
            <button
              key={p.slug}
              aria-pressed={p.slug === project.slug}
              aria-controls="desk-preview"
              onClick={() => setSelected(p.slug)}
            >
              <span className="desk-number">0{i + 1}</span>
              <span lang={p.contentLocale}>{p.title}</span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <LazyMotion features={domAnimation}>
          <m.div
            id="desk-preview"
            className="desk-preview"
            key={project.slug}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
          >
            <p className="eyebrow">{statusLabels[locale][project.status]}</p>
            <h3 lang={project.contentLocale}>{project.title}</h3>
            <p lang={project.contentLocale}>{project.summary}</p>
            <p className="muted">{categoryLabels[locale][project.category]}</p>
            <ul className="tags" aria-label={t.stack}>
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <Link
              className="button primary"
              href={localizedPath(locale, `/work/${project.slug}`)}
            >
              {t.open} <span aria-hidden="true">↗</span>
            </Link>
          </m.div>
        </LazyMotion>
      </div>
      <p className="sr-only" role="status">
        {project.title}
      </p>
    </section>
  );
}
