export type ToneAbbreviation = 'formal' | 'colloquial';
export const toneMap: Record<ToneAbbreviation, string> = {
    formal: "Formal",
    colloquial: "Colloquial",
  };

export type FlagAbbreviation = 'de' | 'es' | 'fr' | 'it' | 'jp' | 'kl' | 'sp' | 'ta' | 'tw';
export const languageMap: Record<FlagAbbreviation, string> = {
  fr: "French",
  sp: "Spanish",
  jp: "Japanese",
  de: "German",
  it: "Italian",
  tw: "Mandarin",
  ta: "Tagalog",
  kl: "Klingon",
  es: "Esperanto",
};

export type Abbreviation = ToneAbbreviation | FlagAbbreviation;
  
export const textConstants = {
  initialInputTitle: "How do you say...",
  translatedInputTitle: "Original Text",
  initialTranslationTitle: "Polly is thinking...",
  completedTranslationTitle: "Polly says",
  toneOptionsHeader: "Tone",
  langOptionsHeader: "Select Language",
  initialTone: "formal" as ToneAbbreviation,
  initialLang: "fr" as FlagAbbreviation,
  initialCTAText: "Translate",
  refreshCTAText: "Start Over",
};
  