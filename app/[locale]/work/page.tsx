import { Suspense } from "react";
import { getProjects } from "@/lib/content/repository.server";
import { getLocale } from "@/lib/locale.server";
import { pageMetadata } from "@/lib/metadata";
import { dictionaries } from "@/config/messages";
import { ProjectExplorer } from "@/components/project-explorer";
import { ProjectGrid } from "@/components/project-card";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(
    l,
    dictionaries[l].work,
    dictionaries[l].workLead,
    "/work",
  );
}
export default async function Work({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  const projects = await getProjects(locale);
  const t = dictionaries[locale];
  return (
    <div className="container page">
      <p className="eyebrow">{t.workLabel}</p>
      <h1 className="page-title">{t.workTitle}</h1>
      <p className="page-lead">{t.workLead}</p>
      <Suspense fallback={<ProjectGrid projects={projects} locale={locale} />}>
        <ProjectExplorer projects={projects} locale={locale} />
      </Suspense>
    </div>
  );
}
