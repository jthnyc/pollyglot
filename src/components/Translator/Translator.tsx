import { useEffect, useState } from 'react';
import './Translator.css';
import { TextArea, OptionsList, PrimaryHeader, TranslateCTA } from '.';
import { toneMap, languageMap, textConstants } from '../../constants';
import { useTranslation, useAudioAndTranscript, useAudioRecording } from '../../hooks';
import { useAppContext } from '../../context/AppContext';

function Translator() {
    const { state, refresh } = useAppContext();
    const [ selectedTone, setSelectedTone ] = useState(state.tone);
    const [ selectedLang, setSelectedLang ] = useState(state.language);
    const [ inputTextToTranslate, setTextToTranslate ] = useState(state.textToTranslate);
    const [ shouldTranslate, setShouldTranslate ] = useState(false);

    const { translationJSON } = useTranslation(selectedTone, selectedLang, inputTextToTranslate, shouldTranslate);
    const { audioSrc, setAudioSrc, translationTranscript, setTranslationTranscript } = useAudioAndTranscript(translationJSON);
    const { isRecording, isTranscribing, error: recordingError, startRecording, stopRecording } = useAudioRecording();

    // state object is what changes, therefore syncing local state with context by tracking full object instead of inner properties
    useEffect(() => {
        setSelectedTone(state.tone);
        setSelectedLang(state.language);
    }, [ state.tone, state.language])

    const handleMicrophoneClick = async () => {
        if (isRecording) {
            // Stop recording and transcribe
            try {
                const transcription = await stopRecording();
                setTextToTranslate(transcription);
            } catch (err) {
                console.error('Failed to transcribe:', err);
            }
        } else {
            // Start recording
            startRecording();
        }
    };

    return (
        <div className="content">
            <div className="translator">
                <div className="translation-input">
                    <PrimaryHeader headerText={state.inputSectionTitle} />
                    
                    {/* Microphone Button */}
                    {/* <div className="audio-controls">
                        <button
                            className={`mic-button ${isRecording ? 'recording' : ''}`}
                            onClick={handleMicrophoneClick}
                            disabled={isTranscribing || shouldTranslate}
                            title={isRecording ? 'Click to stop recording' : 'Click to start recording'}
                        >
                            {isTranscribing ? (
                                <>⏳ Transcribing...</>
                            ) : isRecording ? (
                                <>⏹️ Stop Recording</>
                            ) : (
                                <>🎤 Record Audio</>
                            )}
                        </button>
                        {isRecording && <span className="recording-indicator">Recording...</span>}
                        {recordingError && <span className="error-text">{recordingError}</span>}
                    </div> */}

                    <TextArea 
                        isReadOnly={false} 
                        textContent={inputTextToTranslate} 
                        callback={setTextToTranslate} 
                    />
                </div>
                <div className="translator__scrollable">
                    {!shouldTranslate ? (
                            <div className="translation-options">
                                <OptionsList 
                                    type="tone" 
                                    headerText={textConstants.toneOptionsHeader} 
                                    optionsObj={toneMap} 
                                    initChoice={selectedTone} 
                                    hasIcon={false} 
                                    callback={setSelectedTone} 
                                />
                                <OptionsList 
                                    type="language" 
                                    headerText={textConstants.langOptionsHeader} 
                                    optionsObj={languageMap} 
                                    initChoice={selectedLang} 
                                    hasIcon={true} 
                                    callback={setSelectedLang} 
                                />
                            </div>
                        ) : (
                            <div className="translation">
                                <PrimaryHeader headerText={state.translationSectionTitle} />
                                <TextArea 
                                    isReadOnly={true} 
                                    textContent={translationTranscript} 
                                    callback={{}} 
                                />
                                {audioSrc && (
                                    <div className="audio-player">
                                        <audio 
                                            src={audioSrc} 
                                            className="translation__audio" 
                                            controls
                                        />
                                    </div>
                                )}
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
                    disabled={inputTextToTranslate === ''} 
                />
            </div>
        </div>
    )
}

export default Translator;