'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface DynamicFramesProps {
    persona: string;
}

const DynamicFrames: React.FC<DynamicFramesProps> = ({ persona }) => {
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`/api/images?persona=${persona}`);
                const data = await response.json();
                console.log('Received images:', data);
                if (data.length > 0) {
                    console.log('First image URL:', data[0]);
                }
                setImages(data.filter((img: string) => img && img.trim() !== ''));
            } catch (error) {
                console.error('Failed to fetch images:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [persona]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 4,
                padding: 4,
                textAlign: 'center',
                minHeight: '100vh',
                overflowY: 'hidden', // Disable vertical scrolling
                overflowX: 'auto', // Enable horizontal scrolling
                backgroundColor: '#f9f9f9', // Subtle background color
            }}
        >
            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', marginBottom: 4 }}>
                <Link href={`/${persona}/signatures`} passHref>
                    <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                        Sign {persona?.charAt(0)?.toUpperCase() + persona?.slice(1)}&#39;s Birthday Card
                    </Button>
                </Link>
                <Link href={`/${persona}`} passHref>
                    <Button variant="outlined" color="secondary" sx={{ textTransform: 'none' }}>
                        Back to Celebrations
                    </Button>
                </Link>
            </Box>

            {/* Typography */}
            <Typography
                variant="h5"
                sx={{
                    marginBottom: 4,
                    fontFamily: "'Dancing Script', cursive",
                    color: '#333',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                }}
            >
                Memories with {persona.charAt(0).toUpperCase() + persona.slice(1)}
            </Typography>

            {/* Loading Indicator */}
            {isLoading && (
                <CircularProgress color="primary" sx={{ marginBottom: 2 }} />
            )}

            {/* Horizontal Scrollable Dynamic Frames */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    overflowX: 'auto', // Enable horizontal scrolling
                    width: '100%',
                    paddingBottom: 2,
                    '&::-webkit-scrollbar': {
                        height: 8,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#cccccc',
                        borderRadius: 4,
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f9f9f9',
                    },
                }}
            >
                {images.length > 0 ? (
                    images.map((img, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                position: 'relative',
                                flex: '0 0 auto',
                                width: 200,
                                height: 200,
                                overflow: 'hidden',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                '@media (max-width: 600px)': {
                                    width: '100vw',
                                    height: 'calc(100vh - 200px)',
                                    borderRadius: 0,
                                    '& img': {
                                        borderRadius: 0,
                                    },
                                },
                            }}
                        >
                            <Image
                                src={img}
                                alt={`Memory ${idx + 1}`}
                                layout="fill"
                                objectFit="cover"
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="/placeholder.jpg"
                                style={{ borderRadius: '8px' }}
                            />
                        </Box>
                    ))
                ) : !isLoading ? (
                    <Typography variant="body1" sx={{ color: '#666' }}>
                        No images available.
                    </Typography>
                ) : null}
            </Box>
        </Box>
    );
};

export default DynamicFrames;
