export const translations = {
  id: {
    navigation: {
      home: "Beranda",
      work: "Karya",
      lab: "Lab",
      about: "Tentang",
      notes: "Catatan",
      contact: "Kontak",
    },
    footer:
      "Membangun sesuatu yang berguna dengan kode, data, dan rasa ingin tahu.",
  },

  en: {
    navigation: {
      home: "Home",
      work: "Work",
      lab: "Lab",
      about: "About",
      notes: "Notes",
      contact: "Contact",
    },
    footer:
      "Building useful things with code, data, and curiosity.",
  },
} as const;

export type Locale = keyof typeof translations;