import { useEffect, useState } from 'react';
import { textConstants } from '../constants';
import { useAppContext } from '../context/AppContext'; 
import { TranslationContextState } from '../context/TranslationContext';

export function useTranslation(translationContext: TranslationContextState, textToTranslate: string, shouldTranslate: boolean) {
    const [ translationJSON, setTranslationJSON ] = useState(null);
    const [ hasError, setHasError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const { setState } = useAppContext();
   
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        console.log(`
                prompt: ${textToTranslate}, 
                language: ${translationContext.language},
                context: {
                    dialect: ${translationContext.dialect},
                    tone: ${translationContext.tone},
                    audience: ${translationContext.audience},
                    goal: ${translationContext.goal}
            `)

        const fetchTranslation = async () => {
            setIsLoading(true);
            setTranslationJSON(null);
            try {
                const response = await fetch("/gpt", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({  
                        prompt: textToTranslate, 
                        language: translationContext.language,
                        context: {
                            dialect: translationContext.dialect,
                            tone: translationContext.tone,
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
                    language: translationContext.language,
                    textToTranslate: textToTranslate,
                    inputSectionTitle: textConstants.translatedInputTitle,
                    translationSectionTitle: `${translationContext.language} ${textConstants.completedTranslationTitle}`,
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