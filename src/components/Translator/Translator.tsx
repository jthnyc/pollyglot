import { useEffect, useState } from 'react';
import './Translator.css';
import { TextArea, ContextForm, OptionsList, PrimaryHeader, TranslateCTA } from '.';
import { textConstants } from '../../constants';
import { useTranslation, useAudioAndTranscript } from '../../hooks';
import { useAppContext, TranslationContextState, useTranslationContext } from '../../context';

function Translator() {
    const { state, refresh } = useAppContext();
    const { selectedContext, dialectList, updateContext, bulkUpdateContext, initializeDialects } = useTranslationContext();
    const [ inputTextToTranslate, setTextToTranslate ] = useState(state.textToTranslate);
    const [ shouldTranslate, setShouldTranslate ] = useState(false);
    const { translationJSON } = useTranslation(selectedContext, inputTextToTranslate, shouldTranslate);
    const { audioSrc, setAudioSrc, translationTranscript, setTranslationTranscript } = useAudioAndTranscript(translationJSON);
    
    const handleContextChange = (updated: Partial<TranslationContextState>) => {
        const prevLang = selectedContext.language;
        bulkUpdateContext(updated);
        // only trigger dialect reselect if language changed
        if (updated.language && updated.language !== prevLang) {
            initializeDialects(updated.language);
        }
    }

    useEffect(() => {
        initializeDialects(selectedContext.language);
    }, [])

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
                                <ContextForm context={selectedContext} onChange={handleContextChange} />
                                <OptionsList
                                    type="dialect"
                                    headerText={textConstants.langOptionsHeader}
                                    options={dialectList}
                                    selectedOption={selectedContext.dialect ?? ''}
                                    hasIcon={false}
                                    callback={updateContext} />
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