# Content Guide

## Langkah tepat

Duplikasi `content/templates/project-template.mdx` → `content/projects/my-project.mdx`. Ubah slug ke `my-project`. Lengkapi field wajib, isi body, ubah status draft setelah siap. Jalankan `pnpm test && pnpm build`. Commit dan push ke repo yang terhubung Vercel.

## Schema proyek

| Field                           | Wajib | Aturan                                                             |
| ------------------------------- | ----- | ------------------------------------------------------------------ |
| title                           | Ya    | Teks tidak kosong                                                  |
| slug                            | Ya    | Huruf kecil, angka, tanda hubung; sama dengan nama file tanpa .mdx |
| summary                         | Ya    | 1–240 karakter                                                     |
| date                            | Ya    | Tanggal string YYYY-MM-DD yang valid; gunakan tanda kutip          |
| year                            | Ya    | Angka tahun yang sama dengan date                                  |
| category                        | Ya    | Salah satu kategori di bawah                                       |
| stack                           | Ya    | Array tidak kosong                                                 |
| status                          | Ya    | draft, in-progress, prototype, published, archived                 |
| description                     | Tidak | Deskripsi SEO; fallback summary                                    |
| tags                            | Tidak | Array teks, default []                                             |
| featured                        | Tidak | Boolean, default false                                             |
| order                           | Tidak | Integer, default 100; lebih kecil tampil lebih awal                |
| cover                           | Tidak | Object src, alt, width, height                                     |
| gallery                         | Tidak | Array object gambar; default []; rendering gallery Phase 3         |
| github, demo, notebook, article | Tidak | URL HTTP(S) lengkap, hilangkan jika belum ada                      |
| role, duration                  | Tidak | Teks faktual; duration belum ditampilkan pada Phase 1              |
| repositoryVisibility            | Tidak | public, private, unlisted; default unlisted                        |

Kategori: `web-apps`, `data-science`, `data-analysis`, `machine-learning`, `automation`, `legacy-modernization`, `experiments`.

## Contoh

```yaml
title: My Project
slug: my-project
summary: A concise explanation of the problem this solves.
date: "2026-09-29"
year: 2026
category: web-apps
stack: [TypeScript, Next.js]
status: draft
featured: false
order: 100
repositoryVisibility: private
cover:
  src: /projects/my-project/cover.webp
  alt: Describe what the screenshot actually shows.
  width: 1600
  height: 900
```

Contoh cover di atas hanya schema; buat asetnya sebelum menambahkan field cover. Lokasi fisik `public/projects/my-project/cover.webp`. Nama file gambar hanya huruf, angka, underscore dan tanda hubung. Metadata gambar wajib memiliki alt dan dimensi positif. Folder gambar harus sama dengan slug. Missing asset menggagalkan validasi.

## Status dan urutan

Draft selalu disembunyikan, tetapi tetap divalidasi agar kesalahan tidak tersimpan diam-diam. Published berarti case study ditampilkan; bukan sertifikat produk lulus QA. In-progress/prototype/archived tetap boleh ditampilkan dengan label status. Urutan: order ascending, date descending, slug alfabetis. Home memakai dua featured teratas.

## Kesalahan umum

Tanggal YAML tanpa tanda kutip, year tidak cocok date, slug berisi spasi, filename berbeda slug, category tidak valid, URL javascript:, unknown frontmatter field, JSX belum ditutup, gambar hilang, dan title kosong akan ditolak. Pesan error menyebut nama file. Jangan memasukkan secret atau data pribadi ke MDX. MDX hanya boleh diedit penulis tepercaya karena dapat menjalankan JavaScript pada build/server.

## Note (direncanakan Phase 4)

Template note mencadangkan title/slug/summary/date/tags/status. Engine Notes dan validasi schema note belum tersedia dalam fondasi ini. Simpan sebagai draft sampai tahap tersebut.
