export type ToneAbbreviation = 'formal' | 'friendly' | 'slang' | 'romantic' | 'humorous' | 'empathetic';
export const toneMap: Record<ToneAbbreviation, string> = {
    formal: "Formal",
    friendly: "Friendly",
    slang: "Slang",
    romantic: "Romantic",
    humorous: "Humorous",
    empathetic: "Empathetic"
};

export type FlagAbbreviation = 
  // Original languages
  | 'de' | 'es' | 'fr' | 'it' | 'jp' | 'sp' | 'ta' | 'tw'
  // New real languages
  | 'kr' | 'pt' | 'gr' | 'hu' | 'ru' | 'sa' | 'in'
  // Fantasy languages
  | 'kl' | 'qu' | 'val';

export const languageMap: Record<FlagAbbreviation, string> = {
  // Original languages
  fr: "French",
  sp: "Spanish",
  jp: "Japanese",
  de: "German",
  it: "Italian",
  tw: "Mandarin",
  ta: "Tagalog",
  
  // New real languages
  kr: "Korean",
  pt: "Portuguese",
  gr: "Greek",
  hu: "Hungarian",
  ru: "Russian",
  sa: "Arabic",
  in: "Hindi",
  
  // Fantasy/Constructed languages
  kl: "Klingon",
  qu: "Quenya (Elvish)",
  es: "Esperanto",
  val: "High Valyrian"
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

// Reverse mapping: language name → abbreviation
export const languageToAbbr: Record<string, FlagAbbreviation> = {
  'French': 'fr',
  'Spanish': 'sp',
  'Japanese': 'jp',
  'German': 'de',
  'Italian': 'it',
  'Mandarin': 'tw',
  'Tagalog': 'ta',
  'Korean': 'kr',
  'Portuguese': 'pt',
  'Greek': 'gr',
  'Hungarian': 'hu',
  'Russian': 'ru',
  'Arabic': 'sa',
  'Hindi': 'in',
  'Klingon': 'kl',
  'Quenya (Elvish)': 'qu',
  'Esperanto': 'es',
  'High Valyrian': 'val'
};

export type TranslationContextState = {
  language: string;
  audience?: string;
  goal?: string;
  tone: string;
  dialect?: string;
};

type DropdownOption = {
  contextKey: keyof TranslationContextState;
  hasDefaultValue: boolean;
  options: string[];
};

export const dropdownOptionsMap: Record<string, DropdownOption> = {
  Audience: {
    contextKey: 'audience',
    hasDefaultValue: true,
    options: ['General', 'Children', 'Academic', 'Professional', 'Elderly'],
  },
  Goal: {
    contextKey: 'goal',
    hasDefaultValue: true,
    options: ['Casual Chat', 'Business', 'Travel', 'Education', 'Creative'],
  },
};