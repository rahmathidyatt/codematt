import { getNotes } from "@/lib/content/notes.server";
import { NoteCard } from "@/components/note-card";
import Link from "next/link";
import { getProjects } from "@/lib/content/repository.server";
import { getLocale } from "@/lib/locale.server";
import { localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { dictionaries } from "@/config/messages";
import { now } from "@/config/now";
import { ProjectCard } from "@/components/project-card";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(l, dictionaries[l].home, dictionaries[l].intro);
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  const t = dictionaries[locale];
  const projects = await getProjects(locale);
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const experiment = projects
    .filter((p) => ["in-progress", "prototype"].includes(p.status))
    .sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order)[0];
  const url = (path: string) => localizedPath(locale, path);
  return (
    <>
      <section className="container hero">
        <div className="hero-top">
          <p className="eyebrow">{t.identity}</p>
          <span className="mono muted">{t.volume}</span>
        </div>
        <div className="hero-grid">
          <div>
            <h1>
              {t.hero1}
              <br />
              {t.hero2}
              <br />
              <span className="accent">{t.hero3}</span>
              <br />
              {t.hero4}
            </h1>
            <p className="hero-description">{t.intro}</p>
            <div className="hero-actions">
              <Link className="button primary" href={url("/work")}>
                {t.exploreWork}
              </Link>
              <Link className="text-link" href={url("/about")}>
                {t.aboutMe}
              </Link>
            </div>
          </div>
          <aside className="index-panel" aria-label={t.practice}>
            <div className="panel-top">
              <span className="mono">{t.practice}</span>
              <span className="mono muted">01—04</span>
            </div>
            <ol>
              {[t.web, t.data, t.automation, t.experiments].map((item, i) => (
                <li key={item}>
                  <span className="mono">0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
            <div className="panel-note">
              <span className="mono">{t.simple}</span>
              <p>
                {t.principle1}
                <br />
                {t.principle2}
                <br />
                {t.principle3}
              </p>
            </div>
          </aside>
        </div>
        <div className="hero-bottom">
          <span>{t.heroBottom}</span>
          <span className="mono">{t.heroMeta}</span>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.selected}</p>
            <h2>{t.selectedTitle}</h2>
          </div>
          <Link className="text-link" href={url("/work")}>
            {t.allWork}
          </Link>
        </div>
        <div className="selected-grid">
          {featured[0] && <ProjectCard project={featured[0]} locale={locale} />}
          <div className="compact-stack">
            {featured.slice(1).map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
                compact
              />
            ))}
          </div>
        </div>
      </section>
      <section className="container section section-rule">
        <p className="eyebrow muted">{t.types}</p>
        <h2 className="section-title">{t.typesTitle}</h2>
        <div className="practice-grid">
          {[
            [t.web, t.webDesc, "web-apps"],
            [t.data, t.dataDesc, "data-science"],
            [t.automation, t.automationDesc, "automation"],
          ].map(([title, description, category], i) => (
            <article key={title}>
              <span className="mono muted">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link
                className="text-link"
                href={`${url("/work")}?category=${category}`}
              >
                {t.exploreWork}
              </Link>
            </article>
          ))}
        </div>
      </section>
      {experiment && (
        <section className="container section section-rule">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.experiment}</p>
              <h2>{t.experimentTitle}</h2>
            </div>
            <Link href={url("/lab")} className="text-link">
              {t.visitLab}
            </Link>
          </div>
          <ProjectCard project={experiment} locale={locale} compact />
        </section>
      )}
      <section className="container profile-section section-rule">
        <p className="eyebrow muted">{t.profileLabel}</p>
        <div>
          <h2 className="section-title">{t.profileTitle}</h2>
          <p className="page-lead">{t.profileText}</p>
          <Link className="text-link" href={url("/about")}>
            {t.aboutMe}
          </Link>
        </div>
      </section>
      <section className="container now-section">
        <p className="eyebrow">{t.nowLabel}</p>
        <div>
          <h2>{t.nowTitle}</h2>
          <p>{now.building[locale]}</p>
          <h3>{t.learning}</h3>
          <p>{now.learning[locale]}</p>
        </div>
        <p className="mono muted">
          {t.updated}
          <br />
          {now.updated}
        </p>
      </section>
      <section className="container section section-rule">
        <p className="eyebrow muted">{t.notesLabel}</p>
        <h2 className="section-title">{t.notesTitle}</h2>
        {(await getNotes(locale)).length ? (
          <div className="notes-grid">
            {(await getNotes(locale)).slice(0, 2).map((note) => (
              <NoteCard key={note.slug} note={note} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="muted">{t.notesEmpty}</p>
        )}
        <Link className="text-link" href={url("/notes")}>
          {t.viewNotes}
        </Link>
      </section>
      <section className="container contact-cta">
        <div>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
        </div>
        <Link className="button primary" href={url("/contact")}>
          {t.cta}
        </Link>
      </section>
    </>
  );
}
