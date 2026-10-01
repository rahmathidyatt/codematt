import { FoundationPage } from "@/components/foundation-page";
import { NotesExplorer } from "@/components/notes-explorer";
import { getNotes } from "@/lib/content/notes.server";
import { getLocale } from "@/lib/locale.server";
import { pageMetadata } from "@/lib/metadata";
import { notesMessages } from "@/config/notes-messages";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  const t = notesMessages[locale];
  return pageMetadata(locale, "Notes", t.lead, "/notes");
}
export default async function Notes({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  const t = notesMessages[locale];
  return (
    <FoundationPage
      locale={locale}
      eyebrow="NOTES"
      title={t.title}
      description={t.lead}
    >
      <NotesExplorer locale={locale} notes={await getNotes(locale)} />
    </FoundationPage>
  );
}
