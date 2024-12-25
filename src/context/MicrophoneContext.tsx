'use client';

import React, { createContext, useContext, useState } from 'react';

interface MicrophoneContextType {
    isListening: boolean;
    setIsListening: (value: boolean) => void;
    audioLevel: number;
    setAudioLevel: (value: number) => void;
}

const MicrophoneContext = createContext<MicrophoneContextType | undefined>(undefined);

export function MicrophoneProvider({ children }: { children: React.ReactNode }) {
    const [isListening, setIsListening] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);

    return (
        <MicrophoneContext.Provider value={{
            isListening,
            setIsListening,
            audioLevel,
            setAudioLevel
        }}>
            {children}
        </MicrophoneContext.Provider>
    );
}

export function useMicrophone() {
    const context = useContext(MicrophoneContext);
    if (!context) {
        throw new Error('useMicrophone must be used within a MicrophoneProvider');
    }
    return context;
}
