import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getProjects, getProject } from "@/lib/content/repository.server";
import { categoryLabels } from "@/lib/content/schema";
export async function generateStaticParams() {
  return (await getProjects()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = await getProject((await params).slug);
  return project
    ? {
        title: project.meta.title,
        description: project.meta.description ?? project.meta.summary,
      }
    : { title: "Project not found" };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = await getProject((await params).slug);
  if (!project) notFound();
  const { default: Content } = await evaluate(project.body, { ...runtime });
  const { meta } = project;
  return (
    <article className="container page case-study">
      <Link className="text-link" href="/work">
        Back to work
      </Link>
      <p className="eyebrow case-label">
        {categoryLabels[meta.category]} / {meta.year}
      </p>
      <h1 className="page-title">
        {meta.title}
        <span className="accent">.</span>
      </h1>
      <p className="page-lead">{meta.summary}</p>
      <dl className="project-facts">
        <div>
          <dt>Stack</dt>
          <dd>{meta.stack.join(" / ")}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{meta.status.replaceAll("-", " ")}</dd>
        </div>
        {meta.role && (
          <div>
            <dt>Role</dt>
            <dd>{meta.role}</dd>
          </div>
        )}
        <div>
          <dt>Case study date</dt>
          <dd>{meta.date}</dd>
        </div>
      </dl>
      <div className="prose">
        <Content />
      </div>
      <div className="project-links">
        {(
          [
            ["Live demo", meta.demo],
            ["Repository", meta.github],
            ["Notebook", meta.notebook],
            ["Article", meta.article],
          ] as const
        ).map(([label, url]) =>
          url ? (
            <a
              className="button"
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          ) : null,
        )}
      </div>
    </article>
  );
}
