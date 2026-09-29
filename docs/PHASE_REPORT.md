> Arsip laporan Phase 0–1. Status terbaru ada di [PHASE_2_REPORT.md](PHASE_2_REPORT.md).

# Phase 0–1 report — 29 September 2026

## Phase 0

### COMPLETED

Workspace kosong selain brief; tidak ada source/aset pengguna yang ditimpa. Riset npm dist-tags, engines dan peer dependencies selesai. Arsitektur, content model, roadmap dan design system dibuat sebelum implementasi.

### FILES CREATED

MASTER_BLUEPRINT.md, ARCHITECTURE.md, DESIGN_SYSTEM.md, DEVELOPMENT_RULES.md, TESTING_STRATEGY.md, DEPLOYMENT.md, PROJECT_GUIDE.md, DEPENDENCIES.md, dependency-research.json dalam docs/.

### FILES MODIFIED

Tidak ada file pengguna yang diubah. Keputusan dependency diperbarui sesudah install mendeteksi ketidakcocokan plugin lint.

### DESIGN DECISIONS

Fondasi editorial navy/white/mint dengan Geist, metadata monospace, layout asimetris desktop dan single column mobile. Typography project cover dipakai karena belum ada screenshot produk asli.

### ARCHITECTURE DECISIONS

Next.js asli untuk Vercel; tanpa Vinext, backend atau CMS. Zod sebagai kontrak data; MDX tepercaya di filesystem dan adapter repository agar sumber dapat diganti kelak. Base UI sebagai fondasi primitive; CLI shadcn dan Motion tidak dipasang tanpa kebutuhan aktif.

### TESTS PERFORMED

Audit registry, engines dan peer ranges. Final `pnpm peers check`: tidak ada peer issue.

### KNOWN LIMITATIONS

Akun deployment/repository belum diberikan. Kontak publik dan screenshot produk belum tersedia.

### NEXT STEP

Phase 1 dilanjutkan dan hasilnya di bawah.

## Phase 1

### COMPLETED

Fondasi Next.js App Router, TypeScript strict, Tailwind CSS, fonts lokal, tokens light/dark, navigasi desktop/mobile, footer, theme persistence, MDX repository, schema, template, satu case study Code Reader, Home/Work dasar, static project route, halaman dasar pendukung, 404 dan error boundary.

### FILES CREATED

Daftar lengkap di bagian inventory. README dan sembilan dokumen utama tersedia, ditambah laporan dan evidence dependency. Template project umum/web/data-science/data-analysis/experiment dan draft note tersedia.

### FILES MODIFIED

Hanya file baru paket ini yang diperbaiki selama QA; tidak ada project pengguna sebelumnya yang dimodifikasi. Koreksi termasuk versi lint/TypeScript, export konfigurasi PostCSS, pilihan browser test, dan penanganan fallback route agar 404 tidak mencetak NoFallbackError.

### DESIGN DECISIONS

Tema awal System, preferensi tersimpan. Focus states jelas, menu mobile dialog dengan fokus kembali saat Escape, empty states jujur. Screenshot visual diperiksa: desktop dark dan mobile light; tersedia empat screenshot dalam docs/previews/.

### ARCHITECTURE DECISIONS

Routes memakai repository, tidak membaca filesystem langsung. Build memvalidasi frontmatter dan MDX semua proyek, termasuk draft. Draft tidak diterbitkan. Aset tervalidasi path/alt/dimensi dan keberadaannya. Semua dependency langsung dipin dan lockfile disertakan.

### TESTS PERFORMED

| Pemeriksaan                                | Hasil                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| Install pnpm 12.6.0 dengan frozen lockfile | Lulus                                                                          |
| Peer dependency check                      | Lulus                                                                          |
| Typecheck                                  | Lulus                                                                          |
| ESLint tanpa warning kode                  | Lulus                                                                          |
| Prettier check                             | Lulus                                                                          |
| Unit tests                                 | 11 lulus                                                                       |
| Production build                           | Lulus; Home dan semua route fondasi prerendered; Code Reader SSG               |
| Playwright smoke                           | 9 lulus                                                                        |
| Responsive                                 | 360, 390, 768, 1024, 1440, 1920 px pada tujuh route; tanpa overflow horizontal |
| Theme                                      | Light/Dark/System, reload persistence dan perubahan system lulus               |
| Menu mobile                                | Buka/tutup, Escape, fokus kembali, navigasi lulus                              |
| Route/404                                  | Navigasi Home → Work → Code Reader, MDX headings, unknown slug 404 lulus       |

Browser QA menggunakan Playwright 1.63.0 dengan Chromium headless 141 (build 1194) melalui PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH. Unduhan Chromium 153 default tidak valid di lingkungan pengerjaan; fallback 141 berhasil dan seluruh assertion dijalankan. Tidak ada path mesin ini ditanam dalam source; override browser bersifat opsional melalui env. Jalankan browser default di laptop untuk validasi versi terbaru. Tidak ada klaim lintas-browser/Safari/Firefox atau skor Lighthouse.

### KNOWN LIMITATIONS

- Ini fondasi Phase 1, bukan seluruh website selesai.
- Search/filter/sort URL, command palette, interaksi khas, gallery, engine Notes, OG dinamis, sitemap, structured data lengkap dan analytics belum aktif.
- Case study Code Reader adalah konten contoh berbasis brief, dengan status verifikasi tertulis; tanpa metrik atau link yang dikarang.
- ESLint 9.39.5 dipakai karena plugin Next lint belum menerima ESLint 10. Paket dev ini mengeluarkan deprecation notice saat instalasi; upgrade setelah kompatibilitas tersedia.
- Node runtime pengujian 24.19.0; rekomendasi install patch LTS 24.x terbaru. pnpm 12.6.0 frozen install diverifikasi.
- Belum ada push GitHub/deploy Vercel. Lighthouse >=95 tetap target Phase 5.

### NEXT STEP

Buka paket di VS Code dan jalankan sesuai README. Tahap pengembangan berikutnya **Phase 2 — Core Portfolio**: explorer dengan search/category/stack/sort via URL, pengisian proyek faktual, Home lengkap, About final. Reuse fondasi ini, tidak mulai ulang.

## Source inventory

- `.env.example`
- `.gitignore`
- `.nvmrc`
- `.prettierignore`
- `README.md`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/error.tsx`
- `app/lab/page.tsx`
- `app/layout.tsx`
- `app/not-found.tsx`
- `app/notes/page.tsx`
- `app/page.tsx`
- `app/work/[slug]/page.tsx`
- `app/work/page.tsx`
- `components/footer.tsx`
- `components/foundation-page.tsx`
- `components/navigation.tsx`
- `components/project-card.tsx`
- `components/theme-provider.tsx`
- `components/theme-toggle.tsx`
- `components/ui/dialog.tsx`
- `config/now.ts`
- `config/site.ts`
- `content/notes/.gitkeep`
- `content/projects/code-reader.mdx`
- `content/templates/data-analysis.mdx`
- `content/templates/data-science.mdx`
- `content/templates/experiment.mdx`
- `content/templates/note-template.mdx`
- `content/templates/project-template.mdx`
- `content/templates/web-project.mdx`
- `docs/ARCHITECTURE.md`
- `docs/CONTENT_GUIDE.md`
- `docs/DEPENDENCIES.md`
- `docs/DEPLOYMENT.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/DEVELOPMENT_RULES.md`
- `docs/MASTER_BLUEPRINT.md`
- `docs/PROJECT_GUIDE.md`
- `docs/TESTING_STRATEGY.md`
- `docs/dependency-research.json`
- `docs/previews/home-1440-dark.png`
- `docs/previews/home-1440-light.png`
- `docs/previews/home-390-dark.png`
- `docs/previews/home-390-light.png`
- `eslint.config.mjs`
- `lib/content/parser.ts`
- `lib/content/repository.server.ts`
- `lib/content/repository.ts`
- `lib/content/schema.ts`
- `next-env.d.ts`
- `next.config.ts`
- `package.json`
- `playwright.config.ts`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `postcss.config.mjs`
- `public/favicon.svg`
- `public/projects/.gitkeep`
- `styles/globals.css`
- `tests/e2e/foundation.spec.ts`
- `tests/unit/content.test.ts`
- `tsconfig.json`
- `vitest.config.ts`
