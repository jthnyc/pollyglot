import { useEffect, useState } from 'react';
import { textConstants } from '../constants';
import { useAppContext } from '../context/AppContext'; 
import { ToneAbbreviation, FlagAbbreviation } from '../constants';

export function useTranslation(selectedTone: ToneAbbreviation, selectedLang: FlagAbbreviation, textToTranslate: string, hasTranslated: boolean) {
    const [ translationJSON, setTranslationJSON ] = useState(null);
    const [ hasError, setHasError ] = useState(false);
    const [ hasCompletedRequest, setHasCompletedRequest ] = useState(false);
    const { setState, refresh } = useAppContext();
   
    useEffect(() => {
        const fetchTranslation = async () => {
            try {
                const response = await fetch("/gpt", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tone: selectedTone, prompt: textToTranslate, language: selectedLang }),
                });
                if (!response.ok) {
                    throw new Error("Translation fetch failed");
                }
                const data = await response.json();
                setTranslationJSON(data);
                setHasCompletedRequest(true);
                setState((prevState) => ({
                    ...prevState,
                    tone: selectedTone,
                    language: selectedLang,
                    textToTranslate: textToTranslate,
                    inputSectionTitle: textConstants.translatedInputTitle,
                    translationSectionTitle: `${selectedLang} ${textConstants.initialTranslationTitle}`,
                    ctaText: textConstants.refreshCTAText
                }))
            } catch (error) {
                console.error(error);
                setHasError(true);
            }
        };

        if (hasTranslated && textToTranslate) {
            setHasError(false);
            fetchTranslation();
        } else if (!hasTranslated && hasCompletedRequest) {
            setHasCompletedRequest(false);
            setHasError(false);
            refresh();
        }
    }, [ hasTranslated ])

    return { translationJSON, hasError}
}