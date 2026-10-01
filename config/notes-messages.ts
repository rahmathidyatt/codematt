import type { Locale } from "@/lib/i18n";
const id = {
  title: "Catatan dari proses membangun.",
  lead: "Panduan singkat tentang kode, data, dan cara kerja di balik proyek.",
  read: "Baca catatan",
  minutes: "menit baca",
  toc: "Dalam catatan ini",
  back: "← Semua catatan",
  previous: "Sebelumnya",
  next: "Berikutnya",
  progress: "Progres membaca",
  updated: "Diperbarui",
  search: "Cari catatan",
  all: "Semua topik",
  topic: "Topik",
  empty: "Belum ada catatan yang cocok.",
  reset: "Hapus filter",
  fallback:
    "Catatan ini tersedia dalam bahasa Indonesia; terjemahan Inggris belum tersedia.",
  analytics: "Statistik kunjungan",
  allow: "Izinkan statistik",
  disable: "Nonaktifkan statistik",
  privacy:
    "Opsional: izinkan Vercel Analytics mencatat kunjungan halaman. Kata pencarian tidak dikirim.",
  enabled: "Statistik diizinkan",
  disabled: "Statistik nonaktif",
};
export const notesMessages: Record<Locale, { [K in keyof typeof id]: string }> =
  {
    id,
    en: {
      title: "Notes from the building process.",
      lead: "Short guides to code, data, and the work behind the projects.",
      read: "Read note",
      minutes: "min read",
      toc: "On this page",
      back: "← All notes",
      previous: "Previous",
      next: "Next",
      progress: "Reading progress",
      updated: "Updated",
      search: "Search notes",
      all: "All topics",
      topic: "Topic",
      empty: "No matching notes yet.",
      reset: "Clear filters",
      fallback:
        "This note is available in Indonesian; the English translation is not available yet.",
      analytics: "Visit statistics",
      allow: "Allow analytics",
      disable: "Disable analytics",
      privacy:
        "Optional: allow Vercel Analytics to record page visits. Search terms are not sent.",
      enabled: "Analytics allowed",
      disabled: "Analytics disabled",
    },
  };
