'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import MicrophoneBlowDetection from '@/components/MicrophoneBlowDetection';
import Image from 'next/image';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
// import AudioVisualizer from '@/components/AudioVisualizer';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '@/components/SnackbarProvider';

interface Candle {
    x: number;
    y: number;
    extinguished: boolean;
}

interface CakeWithCandlesProps {
    persona: Promise<string> | string;
    birthYear: number;
}

const CakeWithCandles: React.FC<CakeWithCandlesProps> = ({ persona: personaProp, birthYear }) => {
    const persona = typeof personaProp === 'string' ? personaProp : use(personaProp);
    const theme = useTheme();
    const router = useRouter();
    const { showSnackbar } = useSnackbar();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const [candles, setCandles] = useState<Candle[]>([]);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Helper to calculate random position for candles
    const generateCandlePositions = useCallback((count: number, spread: number): Candle[] => {
        return Array.from({ length: count }, () => {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.sqrt(Math.random()) * spread;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            return { x, y, extinguished: false };
        });
    }, []);

    // Calculate candle size dynamically
    const calculateCandleSize = useCallback(() => {
        if (isMobile) return { flame: 24, candleWidth: 6, candleHeight: 30 };
        if (isTablet) return { flame: 28, candleWidth: 8, candleHeight: 40 };
        return { flame: 36, candleWidth: 10, candleHeight: 50 };
    }, [isMobile, isTablet]);

    // Generate candles based on age
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        const candleCount = Math.min(age, 100); // Limit to 100 candles for UX
        const spread = Math.min(containerSize.width, containerSize.height) * 0.4;

        setCandles(generateCandlePositions(candleCount, spread));
    }, [birthYear, containerSize, generateCandlePositions]);

    // Update container size on resize
    useEffect(() => {
        const updateContainerSize = () => {
            const container = document.getElementById('cake-container');
            if (container) {
                setContainerSize({
                    width: container.offsetWidth,
                    height: container.offsetHeight,
                });
            }
        };

        updateContainerSize();
        window.addEventListener('resize', updateContainerSize);
        return () => window.removeEventListener('resize', updateContainerSize);
    }, []);

    const candleSize = calculateCandleSize();

    // Handle blowing out candles
    const handleBlow = useCallback(() => {
        if (isRedirecting) return; // Prevent multiple redirects

        setCandles((prev) => {
            const updatedCandles = prev.map((candle) => ({
                ...candle,
                extinguished: candle.extinguished || Math.random() > 0.3,
            }));

            if (updatedCandles.every((candle) => candle.extinguished)) {
                setIsRedirecting(true);
                showSnackbar('May your wishes come true!', 'success');
                launchConfetti();

                setTimeout(() => {
                    router.push(`/${persona}/frames`);
                }, 2000); // Allow time for confetti animation
            }

            return updatedCandles;
        });
    }, [isRedirecting, persona, router, showSnackbar]);

    // Launch confetti animation
    const launchConfetti = () => {
        const duration = 2000;
        const end = Date.now() + duration;

        const interval = setInterval(() => {
            if (Date.now() > end) {
                clearInterval(interval);
                return;
            }
            confetti({
                particleCount: 50,
                spread: 60,
                startVelocity: 30,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                colors: ['#ff6f61', '#ffcc00', '#66ccff', '#ff99cc'],
            });
        }, 200);
    };

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
            <Image
                src="/logo.png"
                alt="Background"
                fill
                style={{
                    objectFit: 'cover',
                    opacity: 0.8,
                    zIndex: -1,
                }}
            />
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        marginBottom: { xs: 2, sm: 3, md: 4 },
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        fontFamily: "'Dancing Script', cursive",
                        color: '#ffffff',
                        textShadow: '2px 2px #ffa07a',
                    }}
                >
                    {`Happy Birthday, ${persona.charAt(0).toUpperCase() + persona.slice(1)}!`}
                </Typography>

                <Box
                    id="cake-container"
                    sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: { xs: '300px', sm: '400px', md: '500px' },
                        aspectRatio: '1',
                        margin: '0 auto',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <Image
                        src="/images/cake.png"
                        alt="Birthday Cake"
                        fill
                        style={{
                            objectFit: 'contain',
                            padding: '8%',
                        }}
                        priority
                    />
                    {candles.map((candle, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: `translate(calc(-50% + ${candle.x}px), calc(-50% + ${candle.y}px))`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {!candle.extinguished ? (
                                <LocalFireDepartmentIcon
                                    sx={{
                                        fontSize: `${candleSize.flame}px`,
                                        color: '#ff6b00',
                                        animation: 'flicker 1s infinite',
                                        filter: 'drop-shadow(0 0 2px #ff6b00)',
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: '#ccc',
                                        animation: 'smoke 1.5s infinite',
                                    }}
                                />
                            )}
                            <Box
                                sx={{
                                    width: `${candleSize.candleWidth}px`,
                                    height: `${candleSize.candleHeight}px`,
                                    backgroundColor: candle.extinguished ? '#ccc' : '#f2c94c',
                                    borderRadius: '3px',
                                    marginTop: '2px',
                                }}
                            />
                        </Box>
                    ))}
                </Box>
                {/* <AudioVisualizer /> */}
                <MicrophoneBlowDetection onBlow={handleBlow} />
            </Box>
        </Box>
    );
};

export default CakeWithCandles;
