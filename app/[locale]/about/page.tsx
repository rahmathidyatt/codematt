import Link from "next/link";
import { getLocale } from "@/lib/locale.server";
import { getProjects } from "@/lib/content/repository.server";
import { localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { dictionaries } from "@/config/messages";
import { site } from "@/config/site";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(
    l,
    dictionaries[l].about,
    dictionaries[l].aboutLead,
    "/about",
  );
}
export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  const t = dictionaries[locale];
  const projects = await getProjects(locale);
  return (
    <div className="container page">
      <p className="eyebrow">{t.aboutLabel}</p>
      <h1 className="page-title">{t.aboutTitle}</h1>
      <p className="page-lead">{t.aboutLead}</p>
      <div className="about-monogram" aria-hidden="true">
        <span>rh.</span>
        <p className="mono">
          RAHMAT HIDAYAT
          <br />
          CODEMATT / CODE + DATA
        </p>
      </div>
      <section className="section">
        <h2 className="section-title">{t.approachTitle}</h2>
        <div className="practice-grid">
          {[
            [t.approach1, t.approach1Text],
            [t.approach2, t.approach2Text],
            [t.approach3, t.approach3Text],
          ].map(([title, text], i) => (
            <article key={title}>
              <span className="mono muted">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-tools section-rule">
        <div>
          <h2>{t.toolsTitle}</h2>
          <ul className="tags">
            {[
              "Python",
              "Streamlit",
              "JavaScript",
              "TypeScript",
              "Next.js",
              "Google Colab",
              "Docker",
              "Git",
              "VS Code",
            ].map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{t.directionTitle}</h2>
          <p className="muted">{t.directionText}</p>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title">{t.journey}</h2>
        <p className="muted">{t.journeyText}</p>
        <ol className="project-timeline">
          {projects
            .filter((p) => p.featured)
            .map((p) => (
              <li key={p.slug}>
                <time className="mono" dateTime={p.date}>
                  {p.date}
                </time>
                <Link href={localizedPath(locale, `/work/${p.slug}`)}>
                  {p.title}
                </Link>
                <span className="muted">{p.stack.slice(0, 2).join(" / ")}</span>
              </li>
            ))}
        </ol>
      </section>
      <div className="hero-actions">
        {site.github && (
          <a className="button" href={site.github}>
            GitHub
          </a>
        )}
        {site.linkedin && (
          <a className="button" href={site.linkedin}>
            LinkedIn
          </a>
        )}
        {site.resume && (
          <a className="button" href={site.resume}>
            {t.resume}
          </a>
        )}
        <Link
          className="button primary"
          href={localizedPath(locale, "/contact")}
        >
          {t.cta}
        </Link>
      </div>
    </div>
  );
}
