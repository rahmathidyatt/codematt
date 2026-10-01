# Phase 4 — Notes & SEO

## COMPLETED

- Notes MDX bilingual dengan schema ketat, draft/published, pemeriksaan nama file dan konsistensi terjemahan, fallback Indonesia yang ditandai, daftar artikel, pencarian dan filter topik.
- Halaman artikel dengan daftar isi otomatis dari AST heading, anchor unik, waktu baca, progres gulir badan artikel, serta navigasi sebelumnya/berikutnya.
- Dua panduan awal tersedia dalam Indonesia/English: menyiapkan case study dan mengelola konten dua bahasa. Keduanya merupakan tulisan panduan, bukan hasil eksperimen fiktif.
- Beranda menampilkan Notes terbaru; command palette mengindeks metadata artikel published.
- Canonical/hreflang, Open Graph/Twitter metadata, PNG OG dinamis 1200×630, sitemap, robots dan structured data WebSite/Person/CreativeWork/BlogPosting.
- Analytics Vercel opsional, nonaktif secara bawaan. Ketika pemilik mengaktifkan fitur, pengunjung tetap harus mengizinkan. Izin bisa dicabut; query/hash URL dibuang sebelum pengiriman.

## FILES CREATED / MODIFIED

Baru: modul `lib/content/note-*` dan `notes*`, `lib/site-url.ts`, komponen Notes/reading progress/JSON-LD/analytics, kamus Notes, route detail Notes, sitemap/robots/OG, empat file artikel (dua bahasa), tests Phase 4 dan analytics, panduan NOTES_GUIDE/SEO_ANALYTICS/UPDATE_PHASE_4.

Diubah: root locale layout, halaman Notes/Home/detail proyek, Footer, search index/kamus, metadata, proxy, styles, template Notes, dependency/lockfile, fixture test configuration dan dokumentasi roadmap. Screenshot ada di `docs/previews/phase4-*`.

## DESIGN / ARCHITECTURE

Konten tetap berbasis file tepercaya di repository, tanpa database, CMS atau layanan penerjemah. Parsing/validasi dilakukan sebelum publikasi. Draf disaring oleh repository publik yang sama untuk halaman, command search, sitemap dan OG. Perubahan konten memerlukan build ulang.

TOC menggunakan plugin remark yang sama saat parsing dan rendering sehingga anchor konsisten. Waktu baca adalah perkiraan, bukan pengukuran perilaku. Fitur reading progress tidak mengirim data.

Root layout tetap di `app/[locale]/layout.tsx`; tidak ditambahkan `app/layout.tsx`. Panduan pembaruan menegaskan penggunaan folder baru untuk menghindari layout lama tertinggal.

## TESTS

- 37 unit test lulus: termasuk validasi Notes, tanggal, draft/fallback, konsistensi terjemahan, heading unik, indeks pencarian, origin dan escaping JSON-LD.
- 30 pengujian browser utama lulus: regresi Phase 2–3, listing/filter Notes, detail/TOC/progres, perpindahan bahasa, command search artikel, metadata, sitemap/robots/OG/404 dan tampilan 360/1440 px untuk Notes.
- 4 pengujian fixture terisolasi lulus: galeri dua bahasa serta izin/pencabutan analytics dan penghapusan query/hash. Skrip analytics diganti stub pada test; tidak ada data analitik nyata yang dikirim.
- Build produksi, TypeScript, ESLint dan instalasi frozen-lockfile lulus. Screenshot Notes desktop/mobile dan kartu OG diperiksa visual.

Dua tes utama sempat terganggu karena folder hasil tes dibersihkan oleh suite fixture yang berjalan bersamaan. Output fixture telah dipisahkan, dan kedua tes tersebut lulus saat diulang. Cache Turbopack lama sempat rusak setelah pemulihan sesi; pembersihan `.next` dan build ulang berhasil.

Browser pengujian memakai Chromium headless shell 1194 melalui override executable karena unduhan browser bawaan sebelumnya bermasalah. Audit lintas browser, perangkat fisik, screen reader dan Lighthouse menyeluruh adalah pekerjaan Phase 5. Tidak diklaim skor Lighthouse tertentu.

## LIMITATIONS

Paket belum dihosting. Domain final perlu disetel untuk pengindeksan; localhost/Preview tidak diindeks. Penerimaan analytics pada dashboard Vercel belum diuji karena layanan belum dikonfigurasi di akun pemilik. Analytics tetap off pada paket standar.

Screenshot proyek dan tautan publik yang belum diberikan tetap tidak dibuat-buat. Tidak ada editor artikel online atau jadwal terbit otomatis. MDX hanya untuk konten tepercaya yang dikelola pemilik.

## NEXT STEP

Jalankan UPDATE_PHASE_4.md. Tinjau fitur dan kirim revisi tampilan/konten yang diinginkan. Setelah revisi diterapkan, Phase 5 meliputi audit akhir dan persiapan publikasi sesuai persetujuan pemilik.
