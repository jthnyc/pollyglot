import { createContext, useContext, useState, PropsWithChildren} from 'react';
import { languageMap, languageToAbbr } from '../constants';

export type TranslationContextState = {
  language: string;
  audience?: string;
  goal?: string;
  tone: string;
  dialect?: string;
};

type TranslationContextValue = {
  selectedContext: TranslationContextState;
  dialectList: string[];
  updateContext: (key: keyof TranslationContextState, value: string) => void;
  bulkUpdateContext: (updates: Partial<TranslationContextState>) => void;
  initializeDialects: (language: string) => void;
};

export const TranslationContext = createContext<TranslationContextValue | undefined>(undefined);

export const TranslationProvider = ({ children }: PropsWithChildren<{}>) => {
  const defaultContext: TranslationContextState = {
    language: "Chinese",
    tone: "Friendly",
  };

  const [ selectedContext, setSelectedContext ] = useState<TranslationContextState>(defaultContext);
  const [ dialectList, setDialectList ] = useState<string[]>([]);

  const updateContext = (key: keyof TranslationContextState, value: string) => {
    setSelectedContext(prev => ({ ...prev, [key]: value }))
  }

  const bulkUpdateContext = (updates: Partial<TranslationContextState>) => {
    setSelectedContext(prev => ({ ...prev, ...updates }));
  };

  const initializeDialects = (newLang: string) => {
      const langAbbr = languageToAbbr[newLang];
      if (langAbbr) {
          const dialects = languageMap[langAbbr].dialects;
          setDialectList(dialects);     
          setSelectedContext(prev => ({
            ...prev,
            language: newLang,
            dialect: dialects[0]
          }))      
      }
  }

  return (
    <TranslationContext.Provider value={{ selectedContext, dialectList, initializeDialects, updateContext, bulkUpdateContext }}>
      { children }
    </TranslationContext.Provider>
  )
}

export const useTranslationContext = (): TranslationContextValue => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslationContext must be used within a TranslationProvider");
  }
  return context;
}
