import { useEffect, useState } from 'react';
import './Translator.css';
import { TextArea, OptionsList, PrimaryHeader, TranslateCTA } from '.';
import { toneMap, languageMap, textConstants } from '../../constants';
import { useTranslation, useAudioAndTranscript } from '../../hooks';
import { useAppContext } from '../../context/AppContext';

function Translator() {
    const { state } = useAppContext();
    const [ selectedTone, setSelectedTone ] = useState(state.tone);
    const [ selectedLang, setSelectedLang ] = useState(state.language);
    const [ inputTextToTranslate, setTextToTranslate ] = useState(state.textToTranslate);
    const [ isTranslationHidden, setIsTranslationHidden ] = useState(true);
    const [ hasTranslated, setHasTranslated ] = useState(false);

    const { translationJSON } = useTranslation(selectedTone, selectedLang, inputTextToTranslate, hasTranslated);
    const { audioSrc, translationTranscript } = useAudioAndTranscript(translationJSON);

    // state object is what changes, therefore syncing local state with context by tracking full object instead of inner properties
    useEffect(() => {
        setSelectedTone(state.tone);
        setSelectedLang(state.language);
    }, [ state.tone, state.language])
    
    useEffect(() => {
        if (hasTranslated) {
            setIsTranslationHidden(false);
        } else {
            setIsTranslationHidden(true);
        }
    }, [ hasTranslated ])

    return (
        <div className="content">
            <div className="translator">
                <div className="translation-input">
                    <PrimaryHeader headerText={state.inputSectionTitle} />
                    <TextArea isReadOnly={false} textContent={inputTextToTranslate} callback={setTextToTranslate} />
                </div>
                <div className={`${isTranslationHidden ? '' : 'hidden'}`}>
                    <OptionsList type="tone" headerText={textConstants.toneOptionsHeader} optionsObj={toneMap} initChoice={selectedTone} hasIcon={false} callback={setSelectedTone} />
                    <OptionsList type="language" headerText={textConstants.langOptionsHeader} optionsObj={languageMap} initChoice={selectedLang} hasIcon={true} callback={setSelectedLang} />
                </div>
                <div className={`translation ${isTranslationHidden ? 'hidden' : ''}`}>
                    <PrimaryHeader headerText={state.translationSectionTitle} />
                    <TextArea isReadOnly={true} textContent={translationTranscript} callback={{}} />
                    {audioSrc && <audio src={audioSrc} className="translation__audio" controls></audio>}
                </div>
                <TranslateCTA
                    buttonText={state.ctaText}
                    callback={() => setHasTranslated(!hasTranslated)}
                    disabled={inputTextToTranslate === ''} />
            </div>
        </div>
    )
}

export default Translator;