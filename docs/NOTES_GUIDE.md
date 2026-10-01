# Menulis dan menerbitkan Notes

Artikel memakai MDX lokal. File di repository dianggap kode tepercaya: jangan memasukkan MDX dari upload pengunjung atau sumber tak dikenal langsung ke folder konten. Tidak ada editor online, database, atau API terjemahan pada tahap ini.

## Membuat artikel

1. Salin `content/templates/note-template.mdx` ke `content/notes/id/catatan-pertama.mdx`.
2. Isi title, summary, date (format YYYY-MM-DD dengan tanda kutip), tags, dan isi artikel. Filename harus sama dengan slug.
3. Gunakan `##` untuk judul bagian dan `###` untuk subbagian. Keduanya menjadi daftar isi otomatis, termasuk judul yang mengandung penekanan atau inline code. Judul berulang mendapat ID unik.
4. Biarkan `status: draft` selama menulis. Saat siap, ubah menjadi `published`. Draf tidak mempunyai halaman publik, tidak masuk listing, pencarian cepat, OG artikel, atau sitemap. Status bukan fitur penjadwalan: published dengan tanggal masa depan tetap terbit.
5. Untuk terjemahan, buat file bernama sama di `content/notes/en/`. Terjemahkan title, summary, tags dan isi. Slug, date, updated (jika ada) dan status harus identik. Versi Inggris tanpa sumber Indonesia ditolak.
6. Jika versi Inggris belum ada, halaman EN menampilkan artikel Indonesia dengan penanda bahasa. Ini fallback, bukan terjemahan otomatis.
7. Jalankan `pnpm verify`, lalu lihat halaman `/id/notes/catatan-pertama` dan `/en/notes/catatan-pertama`.
8. Commit dan push saat siap. Hosting yang terhubung ke repository harus melakukan build ulang agar konten baru masuk.

## Metadata minimal

```yaml
---
title: Catatan pertama
slug: catatan-pertama
summary: Ringkasan singkat yang menjelaskan isi artikel.
date: "2026-09-30"
tags: [Website]
status: draft
---
```

Field opsional `updated` berisi tanggal pembaruan, tidak boleh sebelum date. Field metadata yang tidak dikenal ditolak agar typo terlihat saat build. Artikel diurutkan tanggal terbaru, lalu slug sebagai penentu urutan saat tanggal sama. Sebelumnya/Berikutnya mengikuti urutan daftar tersebut, tanpa berputar dari akhir ke awal.

Waktu baca memakai perkiraan 200 kata/menit dan minimum satu menit, dengan blok kode dikecualikan. Progres mengikuti posisi gulir badan artikel, bukan waktu yang benar-benar dihabiskan pembaca. Filter Notes bekerja lokal; filter Work tetap tersimpan pada URL seperti Phase 2.

Dua catatan awal merupakan panduan penggunaan portofolio. Kamu dapat merevisi atau mengubah statusnya menjadi draft pada kedua bahasa; tidak ada klaim hasil eksperimen atau riwayat pribadi tambahan.
