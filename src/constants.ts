export type ToneAbbreviation = 'formal' | 'friendly' | 'slang';
export const toneMap: Record<ToneAbbreviation, string> = {
    formal: "Formal",
    friendly: "Friendly",
    slang: "Slang"
  };

export type FlagAbbreviation = 'de' | 'es' | 'fr' | 'it' | 'jp' | 'kl' | 'kr' | 'sp' | 'ta' | 'tw';
export const languageMap: Record<FlagAbbreviation, string> = {
  fr: "French",
  sp: "Spanish",
  jp: "Japanese",
  kr: 'Korean',
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

export const locationToLanguageMap: Record<string, keyof typeof languageMap> = {
  Japan: 'jp',
  Canada: 'fr',
  France: 'fr',
  Switcherland: 'fr',
  Germany: 'de',
  Italy: 'it',
  Spain: 'sp',
  Philippines: 'ta',
  Taiwan: 'tw',
  Korea: 'kr'
}