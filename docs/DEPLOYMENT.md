# Deployment — Vercel + private GitHub

1. Install Node.js 24 LTS dan pnpm sesuai packageManager dalam package.json.
2. Jalankan `pnpm install --frozen-lockfile`, lalu `pnpm verify` dan `pnpm test:e2e` (install browser test sekali dengan `pnpm exec playwright install chromium`).
3. Buat private GitHub repository milik Anda. Dari terminal VS Code di folder codematt: `git init`, `git add .`, `git commit -m "feat: codematt foundation"`, `git branch -M main`. Tambahkan remote URL milik Anda dengan `git remote add origin <URL_REPO_ANDA>`, lalu `git push -u origin main`.
4. Di Vercel, import repository tersebut. Pilih Next.js, Node 24.x, install `pnpm install --frozen-lockfile`, build `pnpm build`. Root directory tempat package.json berada.
5. Set NEXT_PUBLIC_SITE_URL ke URL HTTPS yang benar. Tambahkan domain milik Anda setelah tersedia. Jangan commit token.
6. Setiap commit/push menghasilkan deployment melalui integrasi GitHub setelah integrasi dibuat. Akses private repository bergantung pada izin akun/organisasi Vercel–GitHub Anda.

Deployment eksternal belum dilakukan pada paket Phase 2 ini; tidak tersedia identitas repo atau akses Vercel. Review kontak, link proyek, screenshot, dan domain sebelum publikasi final.
