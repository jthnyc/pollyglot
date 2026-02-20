import { useState, useRef } from 'react';

export function useAudioRecording() {
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [error, setError] = useState<string>('');
    
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setError('');
        } catch (err) {
            console.error('Error accessing microphone:', err);
            setError('Unable to access microphone. Please check permissions.');
        }
    };

    const stopRecording = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (!mediaRecorderRef.current || !isRecording) {
                reject(new Error('No active recording'));
                return;
            }

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                
                // Stop all tracks
                if (mediaRecorderRef.current?.stream) {
                    mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
                }

                setIsRecording(false);
                setIsTranscribing(true);

                try {
                    const transcription = await transcribeAudio(audioBlob);
                    setIsTranscribing(false);
                    resolve(transcription);
                } catch (err) {
                    setIsTranscribing(false);
                    setError('Failed to transcribe audio. Please try again.');
                    reject(err);
                }
            };

            mediaRecorderRef.current.stop();
        });
    };

    const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
        try {
            // Convert blob to base64
            const base64Audio = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(audioBlob);
            });

            const response = await fetch('/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'transcribe',
                    audioData: base64Audio,
                }),
            });

            if (!response.ok) {
                throw new Error('Transcription failed');
            }

            const data = await response.json();
            return data.transcription;
        } catch (err) {
            console.error('Transcription error:', err);
            throw err;
        }
    };

    return {
        isRecording,
        isTranscribing,
        error,
        startRecording,
        stopRecording,
    };
}