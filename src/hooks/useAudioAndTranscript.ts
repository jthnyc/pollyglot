import { useState, useEffect } from "react";

export function useAudioAndTranscript(translationJSON: any) {
  const [ audioSrc, setAudioSrc ] = useState('');
  const [ translationTranscript, setTranslationTranscript ] = useState('')

  useEffect(() => {
    if (translationJSON && translationJSON.audio) {
      const { data, transcript } = translationJSON.audio;
      const binaryArray = window.atob(data).split("").map((char) => char.charCodeAt(0));
      const audioBlob = new Blob([new Uint8Array(binaryArray)], { type: "audio/mpeg" });
      setAudioSrc(URL.createObjectURL(audioBlob));
      setTranslationTranscript(transcript);
    }
  }, [ translationJSON ]);

  return { audioSrc, setAudioSrc, translationTranscript, setTranslationTranscript };
}
