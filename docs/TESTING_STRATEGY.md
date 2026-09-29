# Testing Strategy — Phase 2

`pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test`, `pnpm build`, `pnpm test:e2e`.

Unit tests mencakup schema/MDX, duplikasi, draft, semua file konten, orphan translation, perbedaan metadata, fallback Indonesia, filter gabungan, normalisasi query, sort stabil, dictionary parity dan pergantian path bahasa.

Playwright mencakup default Indonesia, preferensi kembali ke root, pergantian bahasa pada detail dan filter, atribut html lang, metadata alternate, URL lama, query search/category/stack/year/sort, empty/reset, Back/reload, fokus filter, tema, menu mobile, 404 dan overflow pada kedua bahasa di lebar 360/390/768/1024/1440/1920.

Browser default diinstall sekali dengan `pnpm exec playwright install chromium`. Override opsional `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` dapat menunjuk executable Chromium di CI. Tidak ada path mesin khusus dalam source. QA pengerjaan menggunakan Chromium 141 alternatif karena unduhan default CDN bermasalah. Screenshot terdapat di docs/previews/phase2-*.

Tuntutan Lighthouse >=95, Safari/Firefox, audit screen reader manual serta fitur Phase 3–4 belum dinyatakan lulus pada tahap ini. Hasil aktual dicatat di PHASE_2_REPORT.md.
