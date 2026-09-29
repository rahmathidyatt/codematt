# Phase 2 — Core Portfolio + Indonesia / English

## COMPLETED

- UI dan konten dua bahasa. Indonesia default; English tersedia melalui tombol EN. Tombol ID kembali ke Indonesia.
- Pilihan bahasa bertahan satu tahun melalui cookie preferensi pada browser yang sama. URL eksplisit /id atau /en selalu diutamakan.
- Pergantian bahasa mempertahankan proyek, query dan filter. Istilah pencarian tidak diterjemahkan otomatis.
- URL tanpa prefix, termasuk URL Phase 1, dialihkan ke bahasa tersimpan/default tanpa kehilangan path/query.
- Home lengkap dengan featured editorial besar/compact, bidang kerja, proyek aktif, profil, now, Notes empty state, contact CTA.
- Work explorer dengan search judul/ringkasan/tag/stack, kategori, teknologi, tahun, sort newest/featured/year, jumlah hasil, empty/reset, URL sharing dan riwayat browser.
- Tujuh proyek dalam 14 MDX: Code Reader, AI Tools Sentiment Analysis, Floor Time Scheduler, Data Lab, Brighton HUB Dashboard, Lazada Review Sentiment Analysis, CodeIgniter Legacy Modernization.
- Case study dengan peran, status, teknologi, tanggal dokumentasi, isi MDX dan related projects. Hanya tautan yang diisi dalam konten yang ditampilkan.
- About berisi pendekatan, tooling dan jejak dokumentasi proyek; tidak memuat pengalaman kerja atau pencapaian fiktif.
- Lab menampilkan proyek dalam pengembangan. Notes dan Contact menampilkan empty state yang jujur.
- title/description/canonical/hreflang dan html lang mengikuti bahasa; sitemap/OG dinamis tetap Phase 4.

## FILES CREATED

`proxy.ts`; `lib/i18n.ts`; `lib/locale.server.ts`; `lib/metadata.ts`; `lib/content/explorer.ts`; `config/messages.ts`; `components/language-switch.tsx`; `components/project-explorer.tsx`; `app/[locale]/[...missing]/page.tsx`; tujuh MDX ID dan tujuh MDX EN; `tests/unit/phase2.test.ts`; dokumentasi keputusan/update/laporan Phase 2; delapan screenshot Home/Work ID/EN desktop/mobile.

## FILES MODIFIED / MOVED

- Layout dan seluruh routes dipindahkan dari app/ ke app/[locale]/. File lama tidak boleh tertinggal saat update.
- Schema DTO, parser dan repository kini membawa contentLocale, memvalidasi semua terjemahan, memeriksa kesamaan metadata, serta memberi fallback ID.
- Navigation, footer, theme, project cards dan foundation page menggunakan locale/dictionary.
- Home, Work, detail, About, Lab, Notes, Contact, 404/error disesuaikan; global CSS ditambah aturan bilingual/responsive/explorer.
- now config memakai id/en; package version 0.2.0. Dependency tidak diubah.
- README, Content Guide, Architecture, Design System, Blueprint, Project Guide, Testing Strategy, Deployment dan template diperbarui. PHASE_REPORT.md tetap menjadi arsip tahap sebelumnya.

## DESIGN DECISIONS

Identitas navy/off-white/mint dan Geist dipertahankan. Bahasa Indonesia memakai ukuran hero yang sesuai panjang teks. Variasi kartu besar/standard/compact menjaga ritme editorial. Native select memakai label terlihat dan fokus keyboard tidak hilang saat filter berubah. Cover berbasis tipografi dipakai tanpa menyamar sebagai screenshot produk.

## ARCHITECTURE DECISIONS

- Routing locale mengikuti pola App Router resmi: https://nextjs.org/docs/app/guides/internationalization.
- Tidak menambah library i18n karena dua locale dengan dictionary typed dan prefix route cukup untuk kebutuhan saat ini.
- MDX ID adalah sumber wajib; English opsional, dengan fallback dan penanda bahasa. Metadata shared harus konsisten.
- Repository tetap menjadi satu pintu; halaman tidak membaca file langsung. UI tidak menerima source MDX.
- Work state disimpan pada URL. Search memakai submit/Enter; select diterapkan langsung; browser Back/Forward dipertahankan.
- Halaman konten tetap SSG. Proxy hanya untuk redirect locale; catch-all untuk 404. Diperlukan runtime Next.js pada Vercel, bukan static export tanpa proxy.

## TESTS PERFORMED

| Pemeriksaan               | Hasil                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------ |
| Typecheck                 | Lulus                                                                                |
| ESLint tanpa warning kode | Lulus                                                                                |
| Unit tests                | 20 lulus                                                                             |
| Production build          | Lulus; menghasilkan kedua bahasa dan 14 route proyek                                 |
| Playwright                | 13 lulus                                                                             |
| Locale dan preferensi     | Default id, switch EN/ID, html lang, cookie, path proyek dan query lulus             |
| Work                      | Search, category+stack+year+sort, reset, empty, Back dan reload lulus                |
| Focus/filter              | Fokus select tetap setelah filter berubah                                            |
| Mobile/tema/404           | Lulus pada kedua bahasa                                                              |
| Responsive                | Tujuh route × dua bahasa × 360/390/768/1024/1440/1920 px, tanpa overflow horizontal  |
| Visual                    | Screenshot Home ID desktop dan Work ID mobile diperiksa; delapan screenshot tersedia |

Runtime pengujian Node 24.19.0; Playwright 1.63.0 dengan Chromium headless 141 sebagai alternatif. Browser alternatif dipilih karena CDN default mengembalikan unduhan tidak valid; source menerima executable override melalui env, tidak mengandung path mesin ini. Tes UI memang dijalankan, bukan hanya disiapkan. Cache build lama sempat korup; menghapus output .next lalu membangun ulang menyelesaikannya tanpa perubahan dependency.

## KNOWN LIMITATIONS

- Terjemahan editorial, bukan mesin penerjemah otomatis saat pengunjung menekan tombol. Proyek baru dapat ditulis ID dahulu; English menyusul tanpa menghalangi publikasi.
- Notes engine, command palette, gallery/motion lanjutan, OG dinamis, sitemap, structured data lengkap, analytics dan Lighthouse audit belum termasuk tahap ini.
- Kata kunci tetap literal saat bahasa diganti; hasil dapat berbeda karena teks konten berubah bahasa.
- Explorer controls memerlukan JavaScript; fallback prerender tetap menampilkan indeks proyek.
- Ringkasan proyek menggunakan informasi pemilik, bukan audit ulang kode proyek aslinya. Screenshot produk, notebook evaluasi, metrik final, repo, dan kontak belum diisi tanpa verifikasi.
- Tautan Code Reader yang pernah diberikan tidak dapat dibuka oleh alat pemeriksaan dalam sesi ini; tidak dimasukkan sebagai live demo terverifikasi.
- ESLint 9 deprecation notice tetap merupakan keterbatasan tooling dari Phase 1; peer compatibility dipertahankan. Tidak ada klaim Lighthouse atau uji Safari/Firefox.
- Belum push GitHub atau deploy Vercel.

## NEXT STEP

Gunakan docs/UPDATE_PHASE_2.md untuk menjalankan paket baru di VS Code. Setelah itu Phase 3: command palette bilingual, interaksi khas ringan, gallery dari screenshot asli, dan pengalaman Lab yang lebih lengkap. Domain, email/akun sosial yang benar serta aset proyek dapat diisi lewat config/MDX tanpa mengubah page component.
