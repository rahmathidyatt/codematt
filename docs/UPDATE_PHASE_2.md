# Update Phase 1 ke Phase 2 — Windows / VS Code

## Cara aman untuk menjalankan paket terbaru

1. Hentikan server lama dengan Ctrl+C di terminal VS Code.
2. Simpan folder lama sebagai cadangan, misalnya `codematt-phase1-backup`. Jangan menghapusnya jika Anda sudah melakukan perubahan sendiri.
3. Ekstrak ZIP versi terbaru ke folder terpisah. Buka folder `codematt` hasil ekstrak yang berisi package.json.
4. Di Terminal → New Terminal, jalankan:

```powershell
node -v
pnpm -v
pnpm install --frozen-lockfile
pnpm dev
```

Gunakan Node 24.x dan pnpm 12.6.0. Jika pnpm belum sesuai, `npm install -g pnpm@12.6.0`. Jika PowerShell menolak pnpm.ps1, gunakan pnpm.cmd.

5. Buka http://localhost:3000. Pengunjung baru masuk ke /id. Klik EN untuk English dan ID untuk Indonesia. Coba menu Proyek, filter kategori, dan Baca proyek.
6. Saat menguji, buka incognito untuk memeriksa default Indonesia tanpa cookie bahasa sebelumnya.

## Jika sudah punya perubahan pribadi

Bandingkan `config/site.ts`, `config/now.ts`, aset public/projects, dan MDX sebelum memindahkan perubahan. Konten lama `content/projects/<slug>.mdx` perlu dipindah ke id atau en sesuai bahasanya; setiap terjemahan English wajib punya sumber Indonesia.

Route lama app/work, app/about dan lainnya sudah dipindah ke app/[locale]. **Jangan sekadar menimpa file baru di atas folder lama**, karena file route lama bisa tertinggal. Gunakan folder hasil ekstrak bersih terlebih dahulu. node_modules/.next dari paket sebelumnya tidak perlu disalin.

## Setelah berjalan

Lanjutkan Phase 3: command palette, interaksi Lab, gallery dan motion ringan. Sebelum publikasi final, lengkapi email/GitHub/LinkedIn yang benar serta screenshot dan hasil evaluasi asli melalui konten/config.
