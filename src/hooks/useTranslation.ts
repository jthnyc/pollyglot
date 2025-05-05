import { useEffect, useState } from 'react';
import { languageMap, textConstants } from '../constants';
import { useAppContext } from '../context/AppContext'; 
import { TranslationContext } from '../context/TranslationContext';
import { FlagAbbreviation } from '../constants';

export function useTranslation(translationContext: TranslationContext, selectedLang: FlagAbbreviation, textToTranslate: string, shouldTranslate: boolean) {
    const [ translationJSON, setTranslationJSON ] = useState(null);
    const [ hasError, setHasError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const { setState } = useAppContext();
   
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchTranslation = async () => {
            setIsLoading(true);
            setTranslationJSON(null);
            try {
                const response = await fetch("/gpt", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        tone: translationContext.tone, 
                        prompt: textToTranslate, 
                        language: languageMap[selectedLang],
                        context: {
                            location: translationContext.location,
                            audience: translationContext.audience,
                            goal: translationContext.goal
                        }
                    }),
                    signal
                });
                if (!response.ok) {
                    throw new Error("Translation fetch failed");
                }
                const data = await response.json();
                setTranslationJSON(data);
                setState((prevState) => ({
                    ...prevState,
                    tone: translationContext.tone,
                    language: selectedLang,
                    textToTranslate: textToTranslate,
                    inputSectionTitle: textConstants.translatedInputTitle,
                    translationSectionTitle: `${languageMap[selectedLang]} ${textConstants.completedTranslationTitle}`,
                    ctaText: textConstants.refreshCTAText
                }))
            } catch (error: any) {
                if (error.name === "AbortError") {
                    console.log("Translation request was cancelled.")
                } else {
                    console.error(error);
                    setHasError(true);
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (shouldTranslate && textToTranslate) {
            setHasError(false);
            fetchTranslation();
        }

        return () => controller.abort();
    }, [ shouldTranslate ])

    return { translationJSON, hasError, isLoading }
}