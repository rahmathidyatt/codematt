import "server-only";
import { cache } from "react";
import { readProjects, publishedProjects } from "./repository";
const documents = cache(async () => publishedProjects(await readProjects()));
export async function getProjects() {
  return (await documents()).map((project) => project.meta);
}
export async function getProject(slug: string) {
  return (await documents()).find((project) => project.meta.slug === slug);
}
