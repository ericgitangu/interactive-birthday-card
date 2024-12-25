'use client';

import { useEffect } from 'react';
import { useMicrophone } from '@/context/MicrophoneContext';

interface MicrophoneBlowDetectionProps {
    onBlow: () => void;
    threshold?: number;
}

const MicrophoneBlowDetection: React.FC<MicrophoneBlowDetectionProps> = ({
    onBlow,
    threshold = 0.2
}) => {
    const { setIsListening, setAudioLevel } = useMicrophone();

    useEffect(() => {
        let audioContext: AudioContext;
        let analyser: AnalyserNode;
        let microphone: MediaStreamAudioSourceNode;

        const processAudio = () => {
            if (!analyser) return;

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);

            const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
            const normalizedLevel = average / 255;
            setAudioLevel(normalizedLevel);

            if (average > threshold * 255) {
                onBlow();
            }
        };

        const startListening = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new AudioContext();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);

                setInterval(processAudio, 100);
                setIsListening(true);
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };

        startListening();

        return () => {
            if (audioContext) {
                audioContext.close();
            }
        };
    }, [onBlow, threshold, setIsListening, setAudioLevel]);

    return null;
};

export default MicrophoneBlowDetection;
