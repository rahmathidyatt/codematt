# Development Rules

1. Implementasi bertahap; jalankan typecheck, lint, unit, build dan smoke pada tahap runnable.
2. Strict TypeScript; gunakan unknown di boundary, hindari any.
3. Metadata melalui repository, tidak hard-code pada page. Config identitas tidak boleh berisi link palsu.
4. Jangan tampilkan hasil yang belum terverifikasi atau angka dummy sebagai fakta.
5. Pin dependency langsung dan commit pnpm-lock.yaml. Upgrade dengan review peer dependencies dan test.
6. Client component hanya untuk interaksi. Jangan kirim fs atau source MDX ke client.
7. Tidak ada rahasia dalam git; .env.example hanya contoh non-secret.
8. Jangan memasang CMS, analytics, motion atau abstraction sebelum dipakai.
9. Native semantic HTML lebih dahulu, Base UI untuk dialog; shadcn-compatible ownership pada components/ui.
10. Komit kecil, misalnya docs: define foundation, feat: add content repository, feat: add shell, test: verify foundation. Pengguna melakukan commit ke repo miliknya sendiri.
