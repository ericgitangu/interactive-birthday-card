'use client';

import React from 'react';
import SwiperNavigation from '@/components/SwiperNavigation';
import { MicrophoneProvider } from '@/context/MicrophoneContext';
import { SnackbarProvider } from '@/components/SnackbarProvider';

function PersonaLayout({ children }: { children: React.ReactNode }) {
    return (
        <SnackbarProvider   >
            <MicrophoneProvider>
                <SwiperNavigation>
                    {children}
                </SwiperNavigation>
            </MicrophoneProvider>
        </SnackbarProvider>
    );
}

export default PersonaLayout;
