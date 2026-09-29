import Image from "next/image";
import Link from "next/link";
import { categoryLabels, type ProjectMeta } from "@/lib/content/schema";
export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <article className="project-card">
      {project.cover ? (
        <Image
          className="project-cover"
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      ) : (
        <div className="project-typeset" aria-hidden="true">
          <span className="mono">
            {categoryLabels[project.category]} / {project.year}
          </span>
          <span className="project-display">
            {project.title}
            <span className="accent">.</span>
          </span>
          <span className="mono">CODEMATT / SELECTED WORK</span>
        </div>
      )}
      <div className="project-card-content">
        <div className="eyebrow">
          {categoryLabels[project.category]} <span>· {project.year}</span>
        </div>
        <h3>
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{project.summary}</p>
        <ul className="tags" aria-label="Technology">
          {project.stack.slice(0, 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link className="text-link" href={`/work/${project.slug}`}>
          Read project
        </Link>
      </div>
    </article>
  );
}
