import { FoundationPage } from "@/components/foundation-page";
import { getLocale } from "@/lib/locale.server";
import { pageMetadata } from "@/lib/metadata";
import { dictionaries } from "@/config/messages";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(
    l,
    dictionaries[l].notes,
    dictionaries[l].notesLead,
    "/notes",
  );
}
export default async function Notes({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  const t = dictionaries[locale];
  return (
    <FoundationPage
      locale={locale}
      eyebrow={t.notesLabel}
      title={t.notesPageTitle}
      description={t.notesLead}
    >
      <div className="empty-state">
        <p>{t.notesEmpty}</p>
      </div>
    </FoundationPage>
  );
}
