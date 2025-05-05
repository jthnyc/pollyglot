import { useEffect, useState } from 'react';
import './Translator.css';
import { TextArea, ContextForm, OptionsList, PrimaryHeader, TranslateCTA } from '.';
import { languageMap, textConstants } from '../../constants';
import { useTranslation, useAudioAndTranscript } from '../../hooks';
import { useAppContext } from '../../context/AppContext';
import { TranslationContext, defaultContext} from '../../context/TranslationContext';

function Translator() {
    const { state, refresh } = useAppContext();
    const [ selectedContext, setSelectedContext ] = useState<TranslationContext>(defaultContext);
    const [ selectedLang, setSelectedLang ] = useState(state.language);
    const [ inputTextToTranslate, setTextToTranslate ] = useState(state.textToTranslate);
    const [ shouldTranslate, setShouldTranslate ] = useState(false);

    const { translationJSON } = useTranslation(selectedContext, selectedLang, inputTextToTranslate, shouldTranslate);
    const { audioSrc, setAudioSrc, translationTranscript, setTranslationTranscript } = useAudioAndTranscript(translationJSON);

    // state object is what changes, therefore syncing local state with context by tracking full object instead of inner properties
    useEffect(() => {
        setSelectedLang(state.language);
    }, [ state.language])

    return (
        <div className="content">
            <div className="translator">
                <div className="translation-input">
                    <PrimaryHeader headerText={state.inputSectionTitle} />
                    <TextArea isReadOnly={false} textContent={inputTextToTranslate} callback={setTextToTranslate} />
                </div>
                <div className="translator__scrollable">
                    {!shouldTranslate ? (
                            <div className="translation-options">
                                <ContextForm context={selectedContext} onChange={setSelectedContext} />
                                <OptionsList type="language" headerText={textConstants.langOptionsHeader} optionsObj={languageMap} initChoice={selectedLang} hasIcon={true} callback={setSelectedLang} />
                            </div>
                        ) : (
                            <div className="translation">
                                <PrimaryHeader headerText={state.translationSectionTitle} />
                                <TextArea isReadOnly={true} textContent={translationTranscript} callback={{}} />
                                {audioSrc && <audio src={audioSrc} className="translation__audio" controls></audio>}
                            </div>
                        )
                    }
                </div>
                <TranslateCTA
                    buttonText={state.ctaText}
                    callback={() => {
                        setAudioSrc('');
                        setTranslationTranscript('');
                        setShouldTranslate(!shouldTranslate);
                        refresh();
                    }}
                    disabled={inputTextToTranslate === ''} />
            </div>
        </div>
    )
}

export default Translator;