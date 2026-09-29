import { FoundationPage } from "@/components/foundation-page";
import { getLocale } from "@/lib/locale.server";
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
    dictionaries[l].contact,
    dictionaries[l].contactLead,
    "/contact",
  );
}
export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  const t = dictionaries[locale];
  return (
    <FoundationPage
      locale={locale}
      eyebrow={t.contact}
      title={t.contactTitle}
      description={t.contactLead}
    >
      <div className="empty-state">
        {site.email ? (
          <a className="button primary" href={`mailto:${site.email}`}>
            {t.email}
          </a>
        ) : (
          <p>{t.noContact}</p>
        )}
        {site.github && (
          <p>
            <a className="text-link" href={site.github}>
              GitHub
            </a>
          </p>
        )}
        {site.linkedin && (
          <p>
            <a className="text-link" href={site.linkedin}>
              LinkedIn
            </a>
          </p>
        )}
      </div>
    </FoundationPage>
  );
}
