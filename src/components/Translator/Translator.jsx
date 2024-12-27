import { useEffect, useState } from 'react';
import './Translator.css';
import { TextArea, OptionsList, PrimaryHeader, TranslateCTA } from './index';
import { toneMap, languageMap, textConstants } from '../../constants';

function Translator() {
    const [ selectedTone, setSelectedTone ] = useState(textConstants.initialTone);
    const [ selectedLang, setSelectedLang ] = useState(textConstants.initialLang);
    const [ textToTranslate, setTextToTranslate ] = useState('');
    const [ translatedText, setTranslatedText ] = useState('');
    const [ inputSectionTitle, setInputSectionTitle ] = useState(textConstants.initialInputTitle);
    const [ translationSectionTitle, setTranslationSectionTitle ] = useState(textConstants.initialTranslationTitle);
    const [ ctaText, setCTAText ] = useState(textConstants.initialCTAText);
    const [ isTranslationHidden, setIsTranslationHidden ] = useState(true);
    const [ hasTranslated, setHasTranslated ] = useState(false);
    const [ hasError, setHasError ] = useState(false);
    const [ translationJSON, setTranslationJSON ] = useState(null);
    const [ audioSrc, setAudioSrc ] = useState(null);

    useEffect(() => {
        setTranslationSectionTitle(`${selectedLang} Polly says`);
    }, [ selectedLang ])

    useEffect(() => {
        if (hasError) {
            setInputSectionTitle(textConstants.errorInputTitle);
        } else {
            setInputSectionTitle(textConstants.initialInputTitle)
        }
    }, [ hasError ])

    useEffect(() => {
        console.log('hasTranslated: ', hasTranslated);
        const fetchTranslation = async () => {
            try {
                const response = await fetch('/gpt', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify({
                        "tone": selectedTone,
                        "prompt": textToTranslate,
                        "language": selectedLang
                    })
                });
                if (!response.ok) {
                    console.error("Translation fetch failed: ", response);
                }
                const translationJSON = await response.json();
                console.log('translationJSON: ', translationJSON)
                return translationJSON;
            } catch (error) {
                console.error('Translation fetch ERROR: ', error)
            }
        }

        if (hasTranslated) {
            if (!textToTranslate) {
                setHasError(true);
            } else {
                setHasError(false);
                setIsTranslationHidden(false);
                setInputSectionTitle(textConstants.translatedInputTitle);
                setCTAText(textConstants.refreshCTAText);
                const translationJSON = fetchTranslation();
                translationJSON && translationJSON.then(translation => {
                    setTranslationJSON(translation);
                })
            }
        } else {
            setIsTranslationHidden(true);
            setInputSectionTitle(textConstants.initialInputTitle);
            setCTAText(textConstants.initialCTAText);
        }

    }, [ hasTranslated, textToTranslate ])

    useEffect(() => {
        const handleTranslationData = (translation) => {
            setTranslatedText(translation.audio.transcript);
            const binaryArray = convertToBinary(translation.audio.data);
            handleAudio(binaryArray)
        }
        const convertToBinary = (rawAudioData) => {
            let raw = window.atob(rawAudioData);
            let rawLength = raw.length;
            let array = new Uint8Array(new ArrayBuffer(rawLength));
            for (let i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }
            return array;
        }
        const handleAudio = (binaryArray) => {
            const audioBlob = new Blob([binaryArray], { 'type': 'audio/mpeg;' });
            const audioURL = window.URL.createObjectURL(audioBlob);
            setAudioSrc(audioURL);
        }
        if (translationJSON) {
            handleTranslationData(translationJSON);
        }
    }, [ translationJSON ])

    return (
        <div className="content">
            <div className="translator">
                <div className="translation-input">
                    <PrimaryHeader headerText={inputSectionTitle} hasError={hasError} />
                    {/* <h3 className="translation-input__title">How do you say...</h3>
                    <h3 className="translation-input__title-secondary hidden">Original text</h3>
                    <h3 className="translation-input__title hidden error">Please enter text below</h3> */}
                    <TextArea isReadOnly={false} textContent={textToTranslate} callback={setTextToTranslate} />
                </div>
                <div className={`${isTranslationHidden ? '' : 'hidden'}`}>
                    <OptionsList type="tone" headerText={textConstants.toneOptionsHeader} optionsObj={toneMap} initChoice={selectedTone} hasIcon={false} callback={setSelectedTone} />
                    <OptionsList type="language" headerText={textConstants.langOptionsHeader} optionsObj={languageMap} initChoice={selectedLang} hasIcon={true} callback={setSelectedLang} />
                </div>
                <div className={`translation ${isTranslationHidden ? 'hidden' : ''}`}>
                    <PrimaryHeader headerText={translationSectionTitle} />
                    <TextArea isReadOnly={true} textContent={translatedText} />
                    <audio src={audioSrc} className="translation__audio" controls type="audio/mpeg"></audio>
                </div>
                <TranslateCTA buttonText={ctaText} callback={() => setHasTranslated(!hasTranslated)} disabled={textToTranslate === ''} />
            </div>
        </div>
    )
}

export default Translator;