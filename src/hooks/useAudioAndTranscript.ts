import { useState, useEffect } from "react";

export function useAudioAndTranscript(translationJSON: any) {
  const [ audioSrc, setAudioSrc ] = useState('');
  const [ translationTranscript, setTranslationTranscript ] = useState('')

  useEffect(() => {
    if (translationJSON) {
      // Get transcript from the main content field
      if (translationJSON.content) {
        setTranslationTranscript(translationJSON.content);
      }
      
      // Get audio from the audio field
      if (translationJSON.audio && translationJSON.audio.data) {
        const { data } = translationJSON.audio;
        const binaryArray = window.atob(data).split("").map((char) => char.charCodeAt(0));
        const audioBlob = new Blob([new Uint8Array(binaryArray)], { type: "audio/mpeg" });
        setAudioSrc(URL.createObjectURL(audioBlob));
      }
    }
  }, [ translationJSON ]);

  return { audioSrc, setAudioSrc, translationTranscript, setTranslationTranscript };
}