# Phase 2 — keputusan sebelum implementasi

Bahasa Indonesia adalah default. Prefix /id dan /en menjadi sumber kebenaran locale. Proxy mengalihkan URL tanpa prefix (termasuk URL Phase 1) ke locale tersimpan atau id; query dipertahankan. Cookie hanya menyimpan preferensi bahasa, tidak ada akun atau data pribadi. Root layout berada dalam [locale] agar html lang benar pada render server. Konten tetap statically generated.

UI memakai dictionary TypeScript dengan key set yang sama. Terjemahan konten ditulis editorial di content/projects/id dan en. Metadata nonbahasa antarversi harus konsisten. Indonesia wajib, English opsional dengan fallback ID yang diberi penanda dan lang=id pada isi. Tidak menggunakan layanan terjemahan eksternal atau dependency baru. Pilihan bahasa mempertahankan pathname proyek dan query filter. MDX merupakan source tepercaya saja.

Work: pencarian judul/ringkasan/tag/stack; kategori, teknologi, tahun; sorting newest/featured/year; semua state ada pada URL dengan native form yang enhanced client-side. Data difilter client-side agar halaman tetap prerenderable. Suspense fallback tetap menampilkan indeks proyek.

Home: featured card utama + daftar compact, bidang kerja, eksperimen terakhir, profil, now, Notes empty state dan contact CTA. About menjelaskan pendekatan, tooling dan arah belajar tanpa pengalaman atau tautan fiktif. Tujuh ringkasan proyek memakai fakta yang telah diberikan pemilik, tanpa metrik baru atau screenshot palsu. Validasi publikasi konten berbeda dari validasi produk aslinya.

Metadata title/description terjemahan dan alternate language disiapkan; OG dinamis, sitemap lengkap, analytics, command palette dan engine Notes tetap Phase 3–4. Dependencies/lockfile Phase 1 dipertahankan.
