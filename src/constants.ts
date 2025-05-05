export type LanguageAbbreviation = 'ch' | 'sp' | 'en' | 'fr' | 'ar' | 'ta' | 'jp' | 'de' | 'kr' | 'it';
// removed | 'kl' | 'es' | 'el';
export type Abbreviation = LanguageAbbreviation;

type DialectOption = string;

export type DialogDefinition = {
  label: string;
  dialects: DialectOption[];
};

export const languageMap: Record<LanguageAbbreviation, DialogDefinition> = {
  ch: {
    label: "Chinese",
    dialects: [
      "China (Simplified)",
      "Taiwan (Traditional)",
      "Singapore",
      "Hong Kong (Cantonese region)"
    ]
  },
  sp: {
    label: "Spanish",
    dialects: [
      "Spain (Castilian)",
      "Mexico",
      "Argentina (Rioplatense)",
      "Colombia",
      "Chile",
      "Caribbean (Cuba, DR, PR)"
    ]
  },
  en: {
    label: "English",
    dialects: [
      "United States (American English)",
      "United Kingdom (British English)",
      "Canada",
      "Australia",
      "New Zealand",
      "India",
      "Philippines",
      "South Africa",
      "Nigeria"
    ]
  },
  fr: {
    label: "French",
    dialects: [
      "France (Standard French)",
      "Canada (Québécois)",
      "Belgium",
      "Switzerland (Romandy)",
      "West Africa"
    ]
  },
  ar: {
    label: "Arabic",
    dialects: [
      "Modern Standard Arabic (MSA)",
      "Egyptian Arabic",
      "Levantine Arabic (Syria, Lebanon, Palestine, Jordan)",
      "Gulf Arabic (Saudi Arabia, UAE, Qatar)",
      "Maghrebi Arabic (Morocco, Algeria, Tunisia)",
      "Iraqi Arabic",
      "Sudanese Arabic",
      "Yemeni Arabic"
    ]
  },
  ta: {
    label: "Tagalog",
    dialects: [
      "Manila (Standard Tagalog)",
      "Cebuano / Visayan",
      "Taglish (Tagalog + English)"
    ]
  },
  jp: {
    label: "Japanese",
    dialects: [
      "Tokyo (Standard)",
      "Kansai (Osaka/Kyoto)",
      "Kyushu",
      "Tohoku"
    ]
  },
  de: {
    label: "German",
    dialects: [
      "Germany (Standard)",
      "Austria",
      "Switzerland (Swiss German)"
    ]
  },
  kr: {
    label: "Korean",
    dialects: [
      "Seoul (Standard)",
      "Gyeongsang (Busan/Daegu)",
      "Jeolla (Gwangju)",
      "Chungcheong",
      "Jeju (Island Dialect)"
    ]
  },
  it: {
    label: "Italian",
    dialects: [
      "Florence/Rome (Standard)",
      "Northern (Milan, Turin)",
      "Southern (Naples, Sicily)",
      "Sardinian",
      "Venetian"
    ]
  },
  // kl: {
  //   label: "Klingon",
  //   dialects: [
  //     "Standard Klingon"
  //   ]
  // },
  // es: {
  //   label: "Esperanto",
  //   dialects: [
  //     "Universal (Formal)",
  //     "Universal (Casual)"
  //   ]
  // },
  // el: {
  //   label: "Elvish (LOTR)",
  //   dialects: [
  //     "Quenya (High Elvish)",
  //     "Sindarin (Grey Elvish)"
  //   ]
  // }
};
  
export const textConstants = {
  initialInputTitle: "How do you say...",
  translatedInputTitle: "Original Text",
  initialTranslationTitle: "Polly is thinking...",
  completedTranslationTitle: "Polly says",
  toneOptionsHeader: "Tone",
  langOptionsHeader: "Select a Dialect",
  initialLang: "ch" as LanguageAbbreviation,
  initialCTAText: "Translate",
  refreshCTAText: "Start Over",
};

// export const locationToLanguageMap: Record<string, keyof typeof languageMap> = {
//   Japan: 'jp',
//   Canada: 'fr',
//   France: 'fr',
//   Switcherland: 'fr',
//   Germany: 'de',
//   Italy: 'it',
//   Spain: 'sp',
//   Philippines: 'ta',
//   Taiwan: 'tw',
//   Korea: 'kr'
// }

export const languageToAbbr: Record<string, LanguageAbbreviation> = {
  Chinese: 'ch',
  Spanish: 'sp',
  English: 'en',
  French: 'fr',
  Arabic: 'ar',
  Tagalog: 'ta',
  Japanese: 'jp',
  German: 'de',
  Korean: 'kr',
  Italian: 'it'
}
