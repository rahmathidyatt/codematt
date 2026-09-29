# Design System

## Tesis visual

Editorial technical notebook: typography besar, garis pemisah halus, metadata monospace, margin lapang, aksen mint terbatas. Konten dan tipografi menjadi visual utama; tanpa ilustrasi generik atau screenshot palsu.

## Tokens

Dark: background #0b1117, surface #121b23, text #f1f5f5, muted #a6b4bd, line #2e3d47, accent #b7f7d4.
Light: background #f6f8f7, surface #ffffff, text #102029, muted #52616a, line #d1dcda, accent #11583d, accent surface #b7f7d4.
Font: Geist sans; Geist Mono hanya label dan metadata. Body 16–18px, metadata 12–14px, heading fluid clamp. Max-width 1248px, gutter fluid 20–64px. Spacing dasar 4px; section 64–112px. Radius 8–16px; tombol pill seperlunya, tanpa bayangan berlebihan.

## Interaksi

Fase 1: focus ring jelas, underline link, hover transisi singkat; dekorasi garis/grid statis. Interaksi khas direncanakan dynamic project preview Phase 3, tidak dimasukkan prematur.

## Aksesibilitas

Satu h1/halaman, landmark semantic, skip link, menu dialog berjudul, current navigation, target klik >=44px, prefers-reduced-motion. Tema awal mengikuti system. Dropdown tema selalu berlabel. Jangan mengandalkan warna/hover untuk informasi.

## Responsive

Test 360, 390, 768, 1024, 1440, 1920 px. Grid turun dari 2 kolom ke 1, hero display mengecil, nav mobile sebelum ruang desktop sempit, long words boleh wrap. Tidak ada scroll hijacking.
