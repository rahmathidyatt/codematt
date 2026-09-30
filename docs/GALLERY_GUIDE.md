# Galeri proyek

Simpan screenshot asli di `public/projects/<slug>/`. Gunakan nama file tanpa spasi dan format webp, avif, png, jpg, jpeg, atau svg. Contoh path untuk proyek Code Reader: `public/projects/code-reader/reader-desktop.webp`.

Tambahkan ke frontmatter MDX proyek pada `content/projects/id/`:

```yaml
gallery:
  - src: /projects/code-reader/reader-desktop.webp
    alt: Tampilan pembaca dokumen di desktop
    width: 1440
    height: 900
```

Angka width dan height harus sesuai ukuran gambar asli. Contoh tersebut hanya format metadata; file gambar belum disediakan. Pada versi `content/projects/en/`, gunakan path yang sama dan terjemahkan alt menjadi deskripsi bahasa Inggris. Hindari informasi pribadi atau internal kantor dalam screenshot publik.

Klik thumbnail untuk memperbesar. Gunakan Sebelumnya/Berikutnya atau panah keyboard untuk berpindah gambar. Escape menutup galeri dan mengembalikan fokus ke thumbnail. Galeri disembunyikan ketika daftar kosong. Jika gambar gagal dimuat, pesan yang sesuai bahasa akan muncul. Tidak ada autoplay.

`pnpm test:gallery` menguji komponen melalui halaman sementara dengan ikon situs sebagai fixture, termasuk kegagalan pemuatan gambar. Fixture bukan screenshot proyek, tidak masuk katalog, dan tidak disertakan sebagai route dalam build produksi biasa.
