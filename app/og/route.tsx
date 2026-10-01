import { ImageResponse } from "next/og";
import { getNote } from "@/lib/content/notes.server";
import { getProject } from "@/lib/content/repository.server";
import { isLocale } from "@/lib/i18n";
import { dictionaries } from "@/config/messages";
export async function GET(request: Request) {
  const search = new URL(request.url).searchParams;
  const raw = search.get("locale") ?? "id";
  if (!isLocale(raw)) return new Response("Not found", { status: 404 });
  const kind = search.get("kind");
  const slug = search.get("slug");
  let title: string = dictionaries[raw].intro;
  let label = "Portfolio / Digital Lab";
  if (kind === "notes" || kind === "work") {
    if (!slug || !/^[a-z0-9-]+$/.test(slug))
      return new Response("Not found", { status: 404 });
    const doc =
      kind === "notes" ? await getNote(slug, raw) : await getProject(slug, raw);
    if (!doc) return new Response("Not found", { status: 404 });
    title = doc.meta.title;
    label = kind === "notes" ? "Notes" : raw === "id" ? "Proyek" : "Work";
  }
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b1117",
        color: "#f1f5f5",
        padding: "64px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
          color: "#b7f7d4",
        }}
      >
        <span>codematt.</span>
        <span>
          {label} / {raw.toUpperCase()}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 85 ? 48 : 64,
          lineHeight: 1.12,
          letterSpacing: "-2px",
          maxWidth: 1050,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "#a6b4bd",
          borderTop: "1px solid #2e3d47",
          paddingTop: 24,
        }}
      >
        Rahmat Hidayat · Code, data &amp; curiosity
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    },
  );
}
