# Memperbarui dari Phase 3 ke Phase 4

Paket ZIP berisi seluruh proyek. Simpan folder lama sebagai cadangan, ekstrak paket ke folder baru, lalu buka folder `codematt` yang berisi `package.json` melalui **File → Open Folder** di VS Code.

Jika kamu mengubah profil/konten sendiri, bandingkan dan pindahkan perubahan tersebut ke paket baru. Pertahankan environment pribadimu bila diperlukan. Jangan menyalin node_modules, .next, atau lockfile lama.

## Penting: layout bahasa

Root layout yang benar adalah `app/[locale]/layout.tsx`. **Jangan menambahkan atau membawa kembali `app/layout.tsx` dari versi lama.** Dua layout dengan html/body menyebabkan error `<html> cannot be a child of <body>`. Semua halaman biasa berada di `app/[locale]/`; file sitemap/robots dan endpoint OG berada di root app dan tidak memerlukan root layout tambahan.

## Jalankan dari terminal VS Code

Gunakan Node.js 24 dan pnpm 12.6.0 seperti paket sebelumnya:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Buka http://localhost:3000/id/notes. Pilih artikel, coba daftar isi, progres membaca dan perpindahan bahasa. Ctrl/Cmd+K sekarang mencari artikel selain proyek dan navigasi. Beranda menampilkan dua Notes terbaru.

## Periksa sebelum push

Hentikan server dengan Ctrl+C lalu jalankan:

```bash
pnpm verify
pnpm exec playwright install chromium
pnpm test:e2e
pnpm test:gallery
```

`test:gallery` kini juga memeriksa analytics opt-in pada build terisolasi di port 3001. Skrip mengaktifkan analytics khusus fixture, mengganti skrip jaringan dengan stub pada browser test, lalu menghapus route/build sementara. Jangan menjalankan build lain bersamaan dengan perintah tersebut.

Jika build menampilkan cache Turbopack rusak, hentikan server, hapus folder `.next` melalui Explorer VS Code, lalu build lagi. Folder itu hasil build, bukan sumber kode.

## Menjelang final

Setelah Phase 4 dicoba, kumpulkan revisi desain, urutan konten, profil, screenshot proyek, dan tulisan. Revisi tersebut dikerjakan sebelum audit akhir Phase 5. Panduan menulis: `NOTES_GUIDE.md`. Domain/analytics: `SEO_ANALYTICS.md`. Paket ini belum dipublikasikan ke hosting.
