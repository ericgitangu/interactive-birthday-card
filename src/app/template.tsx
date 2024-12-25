'use client';

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from '@/components/SnackbarProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import { MicrophoneProvider } from '@/context/MicrophoneContext';
import Footer from '@/components/Footer';

const queryClient = new QueryClient();

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    <SnackbarProvider>
                        <div className="relative">
                            <MicrophoneProvider>
                                {children}
                            </MicrophoneProvider>
                            <Footer />
                        </div>
                    </SnackbarProvider>
                </SessionProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
} 