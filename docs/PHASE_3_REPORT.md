# Phase 3 — Experience

## COMPLETED

- Command palette: tombol pencarian di header, Ctrl/Cmd+K, pencarian judul/ringkasan/tag/teknologi, navigasi panah dan Enter, Escape, empty state serta pengembalian fokus.
- Lab: meja eksperimen dengan pemilihan proyek, panel ringkasan, status, teknologi dan tautan detail.
- Galeri: thumbnail, modal pembesaran, caption, kontrol sebelumnya/berikutnya, keyboard, fallback gambar gagal dimuat dan fokus kembali ke pemicu.
- Seluruh fitur baru dalam Indonesia/English; preferensi bahasa dan tema Phase 2 tetap digunakan.
- Motion hanya pada perpindahan panel Lab; transform/opacity singkat, tidak ada autoplay, parallax atau animasi halaman global. Reduced motion mematikan animasi panel.

## FILES CREATED / MODIFIED

Baru: `components/command-palette.tsx`, `components/lab-workspace.tsx`, `components/project-gallery.tsx`, `config/experience-messages.ts`, `lib/search.ts`, unit dan browser tests Phase 3, fixture gallery, `scripts/test-gallery.mjs`, `playwright.gallery.config.ts`, panduan update/galeri dan report ini.

Diubah: root locale layout, Navigation, halaman Lab dan detail proyek, styles, dependency/lockfile, konfigurasi build/test, README. Screenshot pratinjau ada di `docs/previews/phase3-*`.

## DESIGN / ARCHITECTURE

Metadata indeks dibuat di server dari katalog publik. Tidak ada isi MDX mentah, draft, request API penerjemahan atau pencarian eksternal yang dikirim ke command palette. Pencarian berlangsung lokal di browser. Notes hanya tersedia sebagai tujuan navigasi sampai engine Notes selesai pada Phase 4.

Lab menampilkan status nyata dari metadata proyek. Galeri memanfaatkan field gallery yang sudah divalidasi sejak Phase 2. Tidak dibuat screenshot produk atau capaian proyek fiktif.

Dependency baru: Motion 13.4.6; peer React 18/19 kompatibel dengan proyek. Referensi: https://motion.dev/docs/react-accessibility dan https://motion.dev/docs/react-use-reduced-motion. Versi dicek dari npm saat implementasi. Gunakan versi terkunci dalam paket; tidak perlu memperbarui dependency lain.

## TESTS

26 unit test lulus. Build produksi dan lint lulus. Pengujian browser mencakup 21 skenario utama serta 2 skenario galeri terisolasi, termasuk bahasa, tema, rute, query, pencarian, keyboard, mobile, reduced motion dan error gambar. Responsivitas halaman diperiksa pada lebar 360, 390, 768, 1024, 1440 dan 1920 px. Pratinjau Lab/mobile dan dialog pencarian telah diperiksa secara visual.

Browser pengujian lingkungan ini menggunakan Chromium headless shell 1194 melalui variabel PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH karena unduhan browser bawaan sebelumnya gagal. Pada laptop gunakan `pnpm exec playwright install chromium`. Belum diuji dengan perangkat fisik iOS/Safari atau screen reader manusia.

## LIMITATIONS

Screenshot asli proyek belum diberikan sehingga galeri produksi tetap tersembunyi pada proyek tanpa gambar. Fungsionalitas galeri diuji menggunakan fixture yang terpisah dari konten publik. Kontak/link proyek tidak dikarang. Belum dipublikasikan ke hosting.

## NEXT STEP

Jalankan sesuai `UPDATE_PHASE_3.md`, tambahkan aset asli bila tersedia, lalu lanjut Phase 4: engine Notes, indeks artikel, sitemap, OG dan structured data.
