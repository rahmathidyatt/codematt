# Testing Strategy

## Perintah

`pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test`, `pnpm build`, `pnpm test:e2e`.

## Unit

Valid metadata, invalid date/url/category, year mismatch, path traversal, duplicate slug, filename mismatch, malformed MDX, draft visibility, unknown slug. Build memvalidasi semua konten termasuk draft.

## Playwright

Home renders, navigation and project route, custom 404, mobile menu including Escape/focus return, theme persistence and system mode, no horizontal overflow at six requested widths. Tests run against a production build via next start.

## Batas tahap

Filter/search/command palette, Notes, OG dan analytics belum diimplementasikan Phase 1 sehingga pengujiannya masuk tahap terkait. Lighthouse >=95 adalah target Phase 5; jangan tulis angka tanpa laporan aktual. Chromium smoke bukan jaminan Safari/Firefox atau screen reader manual.

## Browser override untuk CI

Jika browser Playwright default tidak tersedia, `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` dapat menunjuk executable Chromium yang sudah terinstall. Nilai ini tidak disimpan ke repository. QA paket ini memakai Chromium 141 sebagai fallback; lihat PHASE_REPORT. Screenshot responsive disimpan otomatis di docs/previews.
