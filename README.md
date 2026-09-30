# codematt — Personal Portfolio & Digital Lab

Fondasi portfolio Rahmat Hidayat untuk aplikasi web, data, ML dan eksperimen. **Paket ini melanjutkan hingga Phase 3**, bukan seluruh roadmap. UI tersedia dalam bahasa Indonesia dan Inggris; panduan berbahasa Indonesia.

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

Next.js App Router + React, strict TypeScript, Tailwind CSS 4, Base UI primitive dengan pola komponen milik proyek seperti shadcn, MDX, Zod, next-themes, Geist lokal. Tidak ada database atau CMS. Detail versi dan keputusan kompatibilitas: [DEPENDENCIES](docs/DEPENDENCIES.md). Motion digunakan secara terbatas untuk pergantian panel Lab dengan dukungan reduced motion.

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

## Yang tersedia pada Phase 2

- **Indonesia / English**, default Indonesia; tombol EN/ID mempertahankan halaman dan query. Pilihan disimpan melalui cookie preferensi.
- URL `/id` dan `/en`; URL lama seperti `/work/code-reader` dialihkan otomatis dengan path dan query tetap utuh.
- Home lengkap: proyek pilihan, bidang kerja, proyek dalam pengembangan, profil, now, catatan (empty state), dan kontak.
- Work explorer: pencarian, kategori, teknologi, tahun, urutan terbaru/pilihan/tahun; state dapat dibagikan lewat URL.
- Tujuh case study tersedia dalam dua bahasa, serta related projects dan status pekerjaan.
- About dengan pendekatan, alat kerja, dan jejak dokumentasi proyek.
- Lab menampilkan proyek yang sedang dikerjakan. Navigasi, tema, footer, error, 404, judul, deskripsi dan alternate-language metadata diterjemahkan.

Command palette, Lab interaktif dan komponen galeri tersedia pada Phase 3; Notes engine, OG dinamis, sitemap, structured data lengkap dan analytics masuk Phase 4. Kontak publik belum diberikan; tidak ada alamat atau akun sosial yang dikarang.

## Struktur

```text
app/[locale]/        Layout dan routes untuk id/en
components/          Komponen UI dan shared shell
components/ui/       Primitive Base UI milik proyek
config/              Identitas, navigasi dan now
content/projects/id/ Konten utama bahasa Indonesia
content/projects/en/ Terjemahan Inggris opsional
content/templates/   Template siap duplikasi
lib/content/         Schema, parser, repository
public/projects/     Gambar per slug
styles/              Tokens dan responsive CSS
tests/               Unit dan Playwright
docs/                Blueprint dan panduan
```

## Tambah proyek dua bahasa

1. Salin `content/templates/web-project.mdx` ke `content/projects/id/nama-proyek.mdx`.
2. Ubah slug menjadi `nama-proyek`, isi metadata dan konten dalam bahasa Indonesia.
3. `status: draft` menyembunyikan proyek. Ubah ke published, prototype atau in-progress jika siap.
4. Opsional: salin file ke `content/projects/en/nama-proyek.mdx`, lalu terjemahkan judul, ringkasan, deskripsi, peran, alt gambar dan isi. Pertahankan field nonbahasa; lihat CONTENT_GUIDE.
5. Isi `featured: true` agar masuk Selected Work (maksimal tiga); `order` kecil lebih dahulu pada mode pilihan.
6. Simpan gambar asli di `public/projects/nama-proyek/`.
7. Jalankan validasi, commit dan push. Home, Work, filter teknologi/tahun dan route diperbarui otomatis.

English yang belum tersedia menggunakan konten Indonesia dengan penanda bahasa yang jelas. Tidak memerlukan API penerjemah atau biaya langganan. Command search tersedia pada Phase 3; sitemap menyusul Phase 4.

## Tambah note

Engine Notes belum aktif pada Phase 2. Draft dapat disiapkan memakai `content/templates/note-template.mdx` dan disimpan di `content/notes/`. File ini **belum dirender atau diindeks** hingga Phase 4. Jangan berharap Notes terbit otomatis sebelum engine tersebut selesai.

## Gambar

Gunakan WebP/AVIF bila cocok, lebar sekitar 1600px untuk cover. Isi `src`, `alt`, `width`, `height`; ukuran gambar mencegah layout shift. Jangan upload data internal atau gambar mentah berukuran besar. Tanpa cover, komponen menampilkan judul typographic, bukan screenshot tiruan.

## Ubah profil

`config/site.ts`: nama, deskripsi dan optional email/github/linkedin/resume. `config/now.ts`: currently building/learning dalam id/en. `config/messages.ts`: seluruh label antarmuka. `styles/globals.css`: tokens light/dark.

## Deployment

Target **Vercel melalui private GitHub**. Ikuti [DEPLOYMENT](docs/DEPLOYMENT.md). Paket belum dipush atau dideploy ke akun Anda. Prefix bahasa memakai Next proxy; gunakan deployment Next.js Vercel, bukan static export tanpa server. Salin `.env.example` ke `.env.local` dan isi domain final saat diperlukan.

## Troubleshooting

- `pnpm` tidak dikenali: install pnpm, lalu buka ulang terminal.
- Module tidak ditemukan: jalankan `pnpm install --frozen-lockfile` di folder package.json.
- `Invalid project ...`: baca nama file dan field pada error. Nama file harus sama dengan slug.
- Proyek tidak muncul: cek status draft dan featured. Hanya tiga featured teratas muncul di Home.
- Port 3000 terpakai: hentikan server lain milik proyek, atau gunakan `pnpm dev --port 3001`.
- Browser Playwright belum ada: `pnpm exec playwright install chromium`.
- Perubahan dependency: update lockfile dengan `pnpm install`, bukan mengedit lockfile manual.
- Build tidak memerlukan Google Fonts; font dimuat dari paket lokal Geist.

## Memperbarui dari Phase 1

Ikuti [UPDATE_PHASE_2](docs/UPDATE_PHASE_2.md). Gunakan folder hasil ekstrak baru agar route Phase 1 yang telah dipindah tidak tertinggal. Jangan menyalin node_modules atau .next dari folder lama.

## Langkah berikutnya

**Phase 3 — Experience:** command palette Cmd/Ctrl+K untuk proyek/navigasi, interaksi khas yang ringan, gallery dengan screenshot asli, dan penyempurnaan Lab. Sistem bahasa tetap dipakai pada setiap fitur baru.

## Update terbaru — Phase 3

Panduan menjalankan dan memperbarui: [UPDATE_PHASE_3](docs/UPDATE_PHASE_3.md). Laporan implementasi dan pengujian: [PHASE_3_REPORT](docs/PHASE_3_REPORT.md). Screenshot asli untuk galeri: [GALLERY_GUIDE](docs/GALLERY_GUIDE.md).
