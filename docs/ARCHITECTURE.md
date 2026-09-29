# Architecture

## Keputusan

- Next.js App Router dengan Server Components secara default. Tidak ada backend/database pada Phase 1.
- Sumber: `content/projects/{id,en}/*.mdx` → parser + Zod → repository → typed model → UI.
- `lib/content/schema.ts` murni dan dapat diuji; `parser.ts` menangani frontmatter dan pesan error; `repository.ts` merupakan satu pintu akses file; `repository.server.ts` memberi server-only boundary dan cache.
- `getProjects(locale)` mengembalikan metadata publik, bukan path filesystem atau source mentah. `getProject(slug, locale)` mengembalikan model dan body MDX. Route hanya memakai fungsi repository. Slug dibandingkan dengan data yang tervalidasi, tidak digunakan untuk membuka path input pengguna.
- File name harus sama dengan slug, tidak boleh duplicate, tanggal harus valid dan year konsisten. Kesalahan metadata atau MDX menggagalkan validasi/build dengan nama file.
- MDX hanya dari repository tepercaya: MDX adalah kode executable. Jangan menerima upload MDX dari pengunjung/CMS tidak tepercaya. Draft tidak muncul dalam daftar publik.
- Tema menggunakan next-themes (script pra-hidrasi, preferensi tersimpan, system listener). Navigasi mobile memakai Base UI Dialog dengan focus management. Fase 1 tidak perlu Motion.
- Font Geist/Geist Mono berasal dari paket lokal, dimuat via next/font/local agar build tidak tergantung Google Fonts.
- Aset lokal dalam public/projects/<slug>; Zod memvalidasi struktur path dan alt. Belum ada screenshot asli, maka fondasi tidak menampilkan screenshot tiruan.
- URL publik berasal dari NEXT_PUBLIC_SITE_URL. Tanpa domain final gunakan localhost hanya untuk development; konfigurasi wajib sebelum production.

## Migrasi CMS

Pertahankan ProjectMeta dan interface repository. Tambah adapter CMS yang menghasilkan schema yang sama; page/components tidak berubah. Validasi payload CMS dengan Zod. Ganti MDX executable dengan renderer rich-text aman atau pipeline build hanya untuk penulis tepercaya. Tambahkan caching/revalidation dan authorization hanya saat kebutuhan CMS nyata.

## Struktur

app/ routes dan layout; components/ komponen UI; components/ui/ primitive milik proyek; config/ identitas, navigasi, now; content/ MDX dan template; lib/content/ schema/parser/repository; public/ aset; styles/ tokens dan CSS; tests/ unit dan e2e; docs/ keputusan dan panduan.

## Phase 2 — locale dan explorer

- Root layout berada di `app/[locale]/layout.tsx`, merender html lang=id/en dari parameter server.
- `proxy.ts` hanya mengalihkan URL tanpa prefix. Cookie codematt-locale divalidasi; default id. URL valid dengan prefix selalu diutamakan, termasuk ketika cookie berbeda. Path/query tetap; tidak memakai geolocation atau deteksi browser.
- Dictionary id/en memiliki key set bertipe sama. Navigasi/config tetap tersentralisasi.
- `readCatalog` membaca dan memvalidasi semua MDX; `validateTranslations` memeriksa konsistensi field nonbahasa; `selectLocale` memilih terjemahan/fallback. `contentLocale` diteruskan sebagai DTO agar UI memberi label fallback dan lang yang benar.
- Work menerima metadata, tanpa source MDX atau akses filesystem pada client. URL adalah sumber filter; form native di-enhance router.push. Back/Forward dan reload mempertahankan filter. Search dipicu tombol Cari/Enter, select diterapkan saat berubah. Tidak ada dependency search tambahan.
- Indeks dan case studies tetap SSG. Suspense fallback menampilkan daftar; controls explorer memerlukan JavaScript. Catch-all memberikan localized 404.
- Metadata canonical dan hreflang memakai NEXT_PUBLIC_SITE_URL, fallback VERCEL_URL, lalu localhost untuk development. Tetapkan domain final sebelum rilis.

Referensi: https://nextjs.org/docs/app/guides/internationalization
