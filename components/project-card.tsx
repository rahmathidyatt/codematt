import Image from "next/image";
import Link from "next/link";
import type { LocalizedProjectMeta } from "@/lib/content/schema";
import { categoryLabels, dictionaries, statusLabels } from "@/config/messages";
import { localizedPath, type Locale } from "@/lib/i18n";
export function ProjectCard({
  project,
  locale,
  compact = false,
}: {
  project: LocalizedProjectMeta;
  locale: Locale;
  compact?: boolean;
}) {
  const t = dictionaries[locale];
  const href = localizedPath(locale, `/work/${project.slug}`);
  return (
    <article
      className={`project-card ${compact ? "compact-card" : ""}`}
      data-project={project.slug}
      data-category={project.category}
      lang={project.contentLocale}
    >
      {!compact &&
        (project.cover ? (
          <Image
            className="project-cover"
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width:800px) 100vw, 50vw"
          />
        ) : (
          <div
            className={`project-typeset category-${project.category}`}
            aria-hidden="true"
          >
            <span className="mono">
              {categoryLabels[locale][project.category]} / {project.year}
            </span>
            <span className="project-display">
              {project.title}
              <span className="accent">.</span>
            </span>
            <span className="mono">
              CODEMATT / {project.stack.slice(0, 2).join(" + ")}
            </span>
          </div>
        ))}
      <div className="project-card-content">
        <div className="eyebrow" lang={locale}>
          {categoryLabels[locale][project.category]}{" "}
          <span>· {project.year}</span>
        </div>
        <h3>
          <Link href={href}>{project.title}</Link>
        </h3>
        <p>{project.summary}</p>
        <div className="project-state" lang={locale}>
          {statusLabels[locale][project.status]}
          {project.featured && <span> · {t.featured}</span>}
        </div>
        {project.contentLocale !== locale && (
          <p className="translation-note" lang={locale}>
            {t.fallback}
          </p>
        )}
        <ul className="tags" aria-label={t.technology}>
          {project.stack.slice(0, 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link className="text-link" lang={locale} href={href}>
          {t.readProject}
        </Link>
      </div>
    </article>
  );
}
export function ProjectGrid({
  projects,
  locale,
}: {
  projects: LocalizedProjectMeta[];
  locale: Locale;
}) {
  return (
    <section>
      <h2 className="sr-only">{dictionaries[locale].workLabel}</h2>
      <div className="work-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </section>
  );
}
