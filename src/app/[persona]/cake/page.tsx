'use client';

import React from 'react';
import CakeWithCandles from '@/components/CakeWithCandles';
import { MicrophoneProvider } from '@/context/MicrophoneContext';
import { Typography } from '@mui/material';
import { useParams } from 'next/navigation';

const CakePage = () => {
    const params = useParams();
    const birthDates: Record<string, { year: number, month: number, day: number }> = {
        priscilla: { year: 1952, month: 12, day: 25 },
        grace: { year: 1997, month: 12, day: 25 },
    };

    const birthDate = birthDates[params.persona as string] || { year: 2000, month: 1, day: 1 };

    // Format the date nicely
    const formattedDate = new Date(
        birthDate.year,
        birthDate.month - 1,
        birthDate.day
    ).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <MicrophoneProvider>
            <Typography
                variant="h3"
                sx={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: "'Dancing Script', cursive",
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    zIndex: 10
                }}
            >
                {formattedDate}
            </Typography>
            <CakeWithCandles
                persona={params.persona as string}
                birthYear={birthDate.year}
            />
        </MicrophoneProvider>
    );
};

export default CakePage;
