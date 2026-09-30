# Memperbarui ke Phase 3

Paket ini berisi seluruh proyek sampai Phase 3. Tidak perlu menggabungkan file satu per satu.

1. Simpan folder Phase 2 sebagai cadangan. Ekstrak ZIP Phase 3 ke folder baru.
2. Di VS Code pilih **File → Open Folder**, lalu buka folder `codematt` hasil ekstrak (folder yang memiliki `package.json`).
3. Jika sebelumnya kamu mengubah konten atau konfigurasi sendiri, bandingkan dan pindahkan perubahan tersebut dari cadangan. Pertahankan `.env.local` milikmu jika ada. Jangan menyalin `node_modules`, `.next`, atau lockfile lama.
4. Buka **Terminal → New Terminal** di VS Code. Gunakan Node.js 24 dan pnpm 12.6.0 seperti Phase 2.
5. Jalankan:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

6. Buka http://localhost:3000. Bahasa awal Indonesia. Coba tombol pencarian di header atau Ctrl+K (Windows)/Cmd+K (Mac), lalu ketik Python atau nama proyek.
7. Buka `/id/lab`, pilih beberapa proyek dan periksa panel ringkasannya. Ganti ke English untuk memeriksa kedua bahasa.
8. Galeri baru muncul ketika metadata `gallery` berisi screenshot asli; petunjuknya ada di `docs/GALLERY_GUIDE.md`.

## Pemeriksaan sebelum push GitHub

Hentikan dev server dengan Ctrl+C, lalu jalankan:

```bash
pnpm verify
pnpm exec playwright install chromium
pnpm test:e2e
pnpm test:gallery
```

`test:e2e` memakai build dari `pnpm verify`. `test:gallery` membuat build terpisah dan menghapus halaman fixture setelah pengujian. Jangan menjalankan proses build lain bersamaan dengan `test:gallery`.

Jika repository GitHub ada di folder lama, buat branch baru pada repository itu dan pindahkan file sumber dari paket ini setelah membandingkan perubahan lokal. Pertahankan folder `.git`; jangan unggah `.env.local`, `node_modules`, atau `.next`. Commit dan push menggunakan akun GitHub milikmu.

## Langkah sesudah Phase 3

Siapkan screenshot asli per proyek, deskripsi gambar Indonesia/English, serta tautan demo/repository yang boleh dipublikasikan. Phase 4 akan mengerjakan engine Notes, pencarian artikel Notes, sitemap, OG dan structured data. Artikel Notes belum diindeks pada Phase 3; pencarian saat ini mencakup halaman navigasi dan proyek.
