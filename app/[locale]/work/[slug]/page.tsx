import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getProjects, getProject } from "@/lib/content/repository.server";
import { getLocale } from "@/lib/locale.server";
import { isLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { dictionaries, categoryLabels, statusLabels } from "@/config/messages";
import { ProjectCard } from "@/components/project-card";
type Params = Promise<{ locale: string; slug: string }>;
export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) return [];
  return (await getProjects(params.locale)).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Params }) {
  const locale = await getLocale(params);
  const p = await getProject((await params).slug, locale);
  if (!p) return { title: dictionaries[locale].notFoundTitle };
  return pageMetadata(
    locale,
    p.meta.title,
    p.meta.description ?? p.meta.summary,
    `/work/${p.meta.slug}`,
  );
}
export default async function ProjectPage({ params }: { params: Params }) {
  const locale = await getLocale(params);
  const project = await getProject((await params).slug, locale);
  if (!project) notFound();
  const { meta, contentLocale } = project;
  const t = dictionaries[locale];
  const { default: Content } = await evaluate(project.body, { ...runtime });
  const related = (await getProjects(locale))
    .filter((p) => p.slug !== meta.slug)
    .sort(
      (a, b) =>
        Number(b.category === meta.category) -
          Number(a.category === meta.category) || a.order - b.order,
    )
    .slice(0, 2);
  return (
    <article className="container page case-study">
      <Link className="text-link" href={localizedPath(locale, "/work")}>
        {t.backWork}
      </Link>
      <p className="eyebrow case-label">
        {categoryLabels[locale][meta.category]} / {meta.year}
      </p>
      <div lang={contentLocale}>
        <h1 className="page-title">
          {meta.title}
          <span className="accent">.</span>
        </h1>
        <p className="page-lead">{meta.summary}</p>
      </div>
      {contentLocale !== locale && (
        <p className="translation-note" role="note">
          {t.fallback}
        </p>
      )}
      <dl className="project-facts">
        <div>
          <dt>{t.stack}</dt>
          <dd>{meta.stack.join(" / ")}</dd>
        </div>
        <div>
          <dt>{t.status}</dt>
          <dd>{statusLabels[locale][meta.status]}</dd>
        </div>
        {meta.role && (
          <div>
            <dt>{t.role}</dt>
            <dd lang={contentLocale}>{meta.role}</dd>
          </div>
        )}
        <div>
          <dt>{t.entryDate}</dt>
          <dd>
            <time dateTime={meta.date}>
              {new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
                dateStyle: "long",
                timeZone: "UTC",
              }).format(new Date(meta.date))}
            </time>
          </dd>
        </div>
      </dl>
      {meta.cover && (
        <Image
          className="case-cover"
          src={meta.cover.src}
          alt={meta.cover.alt}
          width={meta.cover.width}
          height={meta.cover.height}
          sizes="(max-width:800px) 100vw, 1200px"
        />
      )}
      <div className="case-body">
        <div className="prose" lang={contentLocale}>
          <Content />
        </div>
        <aside className="case-sidebar">
          <p className="eyebrow">{t.technology}</p>
          <ul className="tags">
            {meta.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="muted">{categoryLabels[locale][meta.category]}</p>
        </aside>
      </div>
      <div className="project-links">
        {[
          [t.demo, meta.demo],
          [t.repository, meta.github],
          [t.notebook, meta.notebook],
          [t.article, meta.article],
        ].map(([label, url]) =>
          url ? (
            <a
              className="button"
              href={url}
              key={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
              <span className="sr-only"> ({t.newTab})</span>
            </a>
          ) : null,
        )}
      </div>
      <section className="related-work">
        <h2>{t.related}</h2>
        <div className="work-grid">
          {related.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} compact />
          ))}
        </div>
      </section>
    </article>
  );
}
