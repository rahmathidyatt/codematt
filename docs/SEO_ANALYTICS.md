# SEO, pratinjau tautan, dan analytics

## Domain final

Saat siap dipublikasikan, atur environment hosting dan lakukan build ulang:

```dotenv
NEXT_PUBLIC_SITE_URL=https://domain-asli-kamu.com
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

Ganti domain contoh dengan alamat yang benar. Root origin dipakai untuk canonical, alternate bahasa, sitemap, structured data dan gambar OG. Metadata tidak menjamin peringkat mesin pencari.

Pada localhost atau jika URL publik HTTPS belum disetel, robots/meta menggunakan noindex. Vercel Preview juga noindex. Setelah domain HTTPS diisi dan deployment bukan Preview, indeks diizinkan. Sitemap mencantumkan halaman statis, proyek publik dan artikel published dalam kedua bahasa; tanggal konten digunakan untuk lastModified, bukan waktu server berjalan.

## Pratinjau tautan

Endpoint `/og` menghasilkan PNG 1200×630 melalui Next ImageResponse. Metadata setiap proyek/artikel memakai judul kontennya sendiri:

- `/og?locale=id`
- `/og?locale=id&kind=work&slug=code-reader`
- `/og?locale=en&kind=notes&slug=menyiapkan-case-study`

Slug tidak dikenal atau draft menghasilkan 404. Halaman umum memakai kartu merek. Tidak ada screenshot produk palsu. Metadata mencakup Open Graph, Twitter card, canonical, hreflang, WebSite/Person, CreativeWork untuk proyek dan BlogPosting untuk Notes. JSON-LD di-escape agar teks konten tidak bisa menutup tag script.

Layanan sosial dapat menyimpan cache pratinjau. Perubahan judul tidak selalu langsung terlihat di aplikasi sosial setelah deployment; endpoint gambar memakai cache satu jam.

## Analytics opsional

Integrasi memakai `@vercel/analytics` 2.0.1. Bawaan **nonaktif**: tidak ada pemuatan skrip analytics atau tombol persetujuan. Untuk mengaktifkan:

1. Aktifkan Web Analytics pada dashboard proyek Vercel milikmu.
2. Atur `NEXT_PUBLIC_ENABLE_ANALYTICS=true` di environment hosting dan build ulang.
3. Footer menampilkan penjelasan serta tombol izin. Skrip baru dimuat setelah pengunjung memilih mengizinkan.
4. Pengunjung dapat menonaktifkan lagi melalui footer. Halaman dimuat ulang untuk menghentikan skrip yang sudah terpasang. Pilihan disimpan di localStorage browser tersebut.

`beforeSend` memeriksa izin pada setiap event, menghormati Do Not Track dan membuang query/hash dari URL. Tidak ada event pencarian custom. Ini pilihan penggunaan fitur, bukan klaim sertifikasi kepatuhan privasi. Jika localStorage tidak tersedia, analytics tetap nonaktif.

Pengujian lokal memeriksa izin, pencabutan dan penyaringan URL memakai skrip tiruan tanpa mengirim data ke Vercel. Penerimaan data pada dashboard Vercel baru dapat diverifikasi setelah akun/hosting dikonfigurasi; belum dilakukan dalam paket ini.

Referensi implementasi:

- https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- https://vercel.com/docs/analytics/package
- https://vercel.com/docs/analytics/quickstart
