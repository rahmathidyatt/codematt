import { FoundationPage } from "@/components/foundation-page";
import { ProjectGrid } from "@/components/project-card";
import { getLocale } from "@/lib/locale.server";
import { getProjects } from "@/lib/content/repository.server";
import { pageMetadata } from "@/lib/metadata";
import { dictionaries } from "@/config/messages";
import { now } from "@/config/now";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(l, dictionaries[l].lab, dictionaries[l].labLead, "/lab");
}
export default async function Lab({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  const t = dictionaries[locale];
  const projects = (await getProjects(locale)).filter((p) =>
    ["in-progress", "prototype"].includes(p.status),
  );
  return (
    <FoundationPage
      locale={locale}
      eyebrow={t.labLabel}
      title={t.labTitle}
      description={t.labLead}
    >
      <div className="lab-grid">
        <section>
          <h2>{t.building}</h2>
          <p>{now.building[locale]}</p>
        </section>
        <section>
          <h2>{t.learning}</h2>
          <p>{now.learning[locale]}</p>
        </section>
      </div>
      <div className="section">
        {projects.length ? (
          <ProjectGrid projects={projects} locale={locale} />
        ) : (
          <p>{t.noLab}</p>
        )}
      </div>
    </FoundationPage>
  );
}
