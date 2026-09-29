import type { Metadata } from "next";
import { getProjects } from "@/lib/content/repository.server";
import { ProjectCard } from "@/components/project-card";
export const metadata: Metadata = { title: "Work" };
export default async function Work() {
  const projects = await getProjects();
  return (
    <div className="container page">
      <p className="eyebrow">THE PROJECT INDEX</p>
      <h1 className="page-title">
        Work, in the open<span className="accent">.</span>
      </h1>
      <p className="page-lead">
        Applications, practical tools, and the thinking behind them.
      </p>
      <div className="work-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {projects.length === 0 && (
          <p>No projects published yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
}
