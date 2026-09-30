import { ProjectGallery } from "@/components/project-gallery";
import { getLocale } from "@/lib/locale.server";
export default async function GalleryFixture({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  const images = [
    {
      src: "/favicon.svg",
      alt: "Test fixture A — site icon",
      width: 64,
      height: 64,
    },
    {
      src: "/favicon.svg?fixture=2",
      alt: "Test fixture B — site icon",
      width: 64,
      height: 64,
    },
    {
      src: "/missing-test-image.png",
      alt: "Test fixture C — missing image",
      width: 64,
      height: 64,
    },
  ];
  return (
    <div className="container page">
      <h1>Gallery test fixture</h1>
      <ProjectGallery images={images} locale={locale} />
    </div>
  );
}
