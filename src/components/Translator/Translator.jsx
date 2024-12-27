import { useState } from 'react';
import './Translator.css';
import { TextArea, OptionsList, PrimaryHeader, TranslateCTA } from './';
import { toneMap, languageMap, textConstants } from '../../constants';
import { useTranslation, useAudioAndTranscript } from '../../hooks';
import { useAppContext } from '../../context/AppContext';

function Translator() {
    const { state: { tone, language, textToTranslate, inputSectionTitle, translationSectionTitle, isTranslationHidden, ctaText } } = useAppContext();
    const [ selectedTone, setSelectedTone ] = useState(tone);
    const [ selectedLang, setSelectedLang ] = useState(language);
    const [ inputTextToTranslate, setTextToTranslate ] = useState(textToTranslate);
    const [ hasTranslated, setHasTranslated ] = useState(false);

    const { translationJSON, hasError } = useTranslation(selectedTone, selectedLang, inputTextToTranslate, hasTranslated);
    const { audioSrc, translationTranscript } = useAudioAndTranscript(translationJSON);

    return (
        <div className="content">
            <div className="translator">
                <div className="translation-input">
                    <PrimaryHeader headerText={inputSectionTitle} hasError={hasError} />
                    <TextArea isReadOnly={false} textContent={inputTextToTranslate} callback={setTextToTranslate} />
                </div>
                <div className={`${isTranslationHidden ? '' : 'hidden'}`}>
                    <OptionsList type="tone" headerText={textConstants.toneOptionsHeader} optionsObj={toneMap} initChoice={selectedTone} hasIcon={false} callback={setSelectedTone} />
                    <OptionsList type="language" headerText={textConstants.langOptionsHeader} optionsObj={languageMap} initChoice={selectedLang} hasIcon={true} callback={setSelectedLang} />
                </div>
                <div className={`translation ${isTranslationHidden ? 'hidden' : ''}`}>
                    <PrimaryHeader headerText={translationSectionTitle} />
                    <TextArea isReadOnly={true} textContent={translationTranscript} />
                    <audio src={audioSrc} className="translation__audio" controls type="audio/mpeg"></audio>
                </div>
                <TranslateCTA
                    buttonText={ctaText}
                    callback={() => setHasTranslated(!hasTranslated)}
                    disabled={inputTextToTranslate === ''} />
            </div>
        </div>
    )
}

export default Translator;