# codematt — Personal Portfolio & Digital Lab

Fondasi portfolio Rahmat Hidayat untuk aplikasi web, data, ML dan eksperimen. **Paket ini menyelesaikan Phase 0–1**, bukan seluruh roadmap. UI berbahasa Inggris, panduan berbahasa Indonesia.

## Mulai di VS Code (Windows)

1. Ekstrak ZIP. Buka folder **codematt** yang berisi `package.json` melalui File → Open Folder.
2. Install **Node.js 24 LTS**. Tutup/buka VS Code setelah install agar PATH terbaca.
3. Buka Terminal → New Terminal. Terminal VS Code sudah cukup, tidak perlu membuka CMD terpisah.
4. Jalankan:

```powershell
node -v
npm install -g pnpm@12.6.0
pnpm install --frozen-lockfile
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000). Biarkan terminal berjalan. Tekan Ctrl+C untuk berhenti. Jika PowerShell menolak script `pnpm.ps1`, gunakan `pnpm.cmd` tanpa mengubah kebijakan keamanan sistem.

Untuk menjalankan lagi pada hari berikutnya cukup buka folder yang sama dan `pnpm dev`. `pnpm install` diperlukan lagi bila dependency berubah.

## Stack

Next.js App Router + React, strict TypeScript, Tailwind CSS 4, Base UI primitive dengan pola komponen milik proyek seperti shadcn, MDX, Zod, next-themes, Geist lokal. Tidak ada database atau CMS. Detail versi dan keputusan kompatibilitas: [DEPENDENCIES](docs/DEPENDENCIES.md). Motion ditunda sampai interaksi Phase 3; tidak dipasang tanpa penggunaan.

## Pemeriksaan dan production

```sh
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
pnpm start
```

`pnpm test:e2e` menyalakan server production sendiri. Jalankan build lebih dulu, dan hentikan server development pada port 3000 sebelum tes. `pnpm verify` menjalankan typecheck, lint, unit test, build.

## Yang tersedia

- Home fondasi dengan featured project otomatis.
- Indeks Work dan halaman `/work/[slug]` dari MDX.
- Navigasi desktop/mobile, Light/Dark/System tersimpan, footer, halaman 404 dan error.
- Halaman dasar Lab, About, Notes (empty state), Contact (belum ada alamat publik).
- Validasi konten dan template; responsive smoke test.

Search, URL filters, command palette, gallery, Notes engine, advanced SEO, OG dinamis, sitemap, analytics dan Lighthouse audit masuk tahap berikutnya. Kontak, akun sosial dan hasil penelitian tidak dikarang.

## Struktur

```text
app/                 Layout dan routes
components/          Komponen UI dan shared shell
components/ui/       Primitive Base UI milik proyek
config/              Identitas, navigasi dan now
content/projects/    Satu MDX per proyek
content/templates/   Template siap duplikasi
lib/content/         Schema, parser, repository
public/projects/     Gambar per slug
styles/              Tokens dan responsive CSS
tests/               Unit dan Playwright
docs/                Blueprint dan panduan
```

## Tambah proyek

1. Salin `content/templates/web-project.mdx` ke `content/projects/nama-proyek.mdx`.
2. Ubah slug menjadi `nama-proyek`, isi metadata dan konten faktual.
3. `status: draft` menyembunyikan konten. Ubah menjadi published, prototype atau in-progress bila siap tampil.
4. Isi `featured: true` agar masuk area Selected Work (maksimal dua), `order` lebih kecil muncul lebih awal.
5. Simpan gambar di `public/projects/nama-proyek/`.
6. Jalankan validasi, commit dan push. Home, Work dan route otomatis diperbarui. Sitemap dan global search baru menyusul Phase 3–4.

Lihat [CONTENT_GUIDE](docs/CONTENT_GUIDE.md) untuk field dan contoh lengkap.

## Tambah note

Engine Notes belum aktif pada Phase 1. Draft dapat disiapkan memakai `content/templates/note-template.mdx` dan disimpan di `content/notes/`. File ini **belum dirender atau diindeks** hingga Phase 4. Jangan berharap Notes terbit otomatis sebelum engine tersebut selesai.

## Gambar

Gunakan WebP/AVIF bila cocok, lebar sekitar 1600px untuk cover. Isi `src`, `alt`, `width`, `height`; ukuran gambar mencegah layout shift. Jangan upload data internal atau gambar mentah berukuran besar. Tanpa cover, komponen menampilkan judul typographic, bukan screenshot tiruan.

## Ubah profil

`config/site.ts`: nama, deskripsi dan optional email/github/linkedin/resume. `config/now.ts`: currently building/learning. `styles/globals.css`: tokens light/dark.

## Deployment

Target **Vercel melalui private GitHub**. Ikuti [DEPLOYMENT](docs/DEPLOYMENT.md). Paket belum dipush atau dideploy ke akun Anda. Salin `.env.example` ke `.env.local` dan isi domain final saat diperlukan.

## Troubleshooting

- `pnpm` tidak dikenali: install pnpm, lalu buka ulang terminal.
- Module tidak ditemukan: jalankan `pnpm install --frozen-lockfile` di folder package.json.
- `Invalid project ...`: baca nama file dan field pada error. Nama file harus sama dengan slug.
- Proyek tidak muncul: cek status draft dan featured. Hanya dua featured teratas muncul di Home.
- Port 3000 terpakai: hentikan server lain milik proyek, atau gunakan `pnpm dev --port 3001`.
- Browser Playwright belum ada: `pnpm exec playwright install chromium`.
- Perubahan dependency: update lockfile dengan `pnpm install`, bukan mengedit lockfile manual.
- Build tidak memerlukan Google Fonts; font dimuat dari paket lokal Geist.

## Langkah berikutnya

**Phase 2 — Core Portfolio:** isi case study faktual proyek utama, explorer search/filter/sort di URL, Home lengkap dan About final. Setelah itu Phase 3 untuk command palette dan pengalaman Lab.
