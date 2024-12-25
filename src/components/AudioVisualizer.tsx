'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useMicrophone } from '@/context/MicrophoneContext';
import { useSnackbar } from '@/components/SnackbarProvider';

const AudioVisualizer = () => {
    const { showSnackbar } = useSnackbar();
    const microphone = useMicrophone();

    try {
        const { audioLevel, isListening } = microphone;
        const bars = 5;

        console.log('AudioVisualizer rendered:', { audioLevel, isListening });

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    position: 'relative',
                    zIndex: 10,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: 2,
                    borderRadius: 2,
                    minWidth: '200px',
                }}
            >
                <Typography color="white" sx={{ fontSize: '0.8rem' }}>
                    Listening: {isListening ? 'Yes' : 'No'} | Level: {audioLevel.toFixed(2)}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 0.5,
                        height: 40,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    {Array.from({ length: bars }).map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 6,
                                height: `${Math.max(10, Math.min(100, (audioLevel * (index + 1) * 20)))}%`,
                                backgroundColor: '#ffffff',
                                borderRadius: 1,
                                transition: 'height 0.1s ease-in-out',
                                opacity: isListening ? 1 : 0.3
                            }}
                        />
                    ))}
                </Box>
            </Box>
        );
    } catch (error) {
        console.error('AudioVisualizer error:', error);
        showSnackbar('Error initializing audio visualizer', 'error');
        return null;
    }
};

export default AudioVisualizer; 