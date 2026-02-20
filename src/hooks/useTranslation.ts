import { useEffect, useState } from 'react';
import { languageMap, textConstants } from '../constants';
import { useAppContext } from '../context/AppContext'; 
import { ToneAbbreviation, FlagAbbreviation } from '../constants';

// Type for the translation response
type TranslationData = {
    content: string;
    audio: {
        data: string;
    } | null;
} | null;

export function useTranslation(selectedTone: ToneAbbreviation, selectedLang: FlagAbbreviation, textToTranslate: string, shouldTranslate: boolean) {
    const [ translationJSON, setTranslationJSON ] = useState<TranslationData>(null);
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
                // Step 1: Translate the text
                const translationResponse = await fetch("/gpt", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        action: 'translate',
                        text: textToTranslate,
                        targetLanguage: languageMap[selectedLang],
                        tone: selectedTone
                    }),
                    signal
                });

                if (!translationResponse.ok) {
                    throw new Error("Translation fetch failed");
                }

                const translationData = await translationResponse.json();
                const translatedText = translationData.translation;

                // Step 2: Generate audio for the translation
                const audioResponse = await fetch("/gpt", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        action: 'textToSpeech',
                        text: translatedText,
                        targetLanguage: languageMap[selectedLang]
                    }),
                    signal
                });

                let audioData = null;
                if (audioResponse.ok) {
                    const audioResult = await audioResponse.json();
                    audioData = audioResult.audio;
                }

                // Combine results in the format your useAudioAndTranscript hook expects
                const combinedData = {
                    content: translatedText,
                    audio: audioData ? {
                        data: audioData.split(',')[1] // Remove the "data:audio/mp3;base64," prefix
                    } : null
                };

                setTranslationJSON(combinedData);
                setState((prevState) => ({
                    ...prevState,
                    tone: selectedTone,
                    language: selectedLang,
                    textToTranslate: textToTranslate,
                    inputSectionTitle: textConstants.translatedInputTitle,
                    translationSectionTitle: `${languageMap[selectedLang]} ${textConstants.completedTranslationTitle}`,
                    ctaText: textConstants.refreshCTAText
                }));

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