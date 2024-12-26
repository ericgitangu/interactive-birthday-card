'use client';

import React, { useState, useEffect } from 'react';
import { useSnackbar } from '@/components/SnackbarProvider';
import { Box, Typography, TextField, Button } from '@mui/material';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const SignaturesPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchRandomImage = async () => {
            try {
                const images = await fetch(`/api/images?persona=${params.persona}`).then((res) => res.json());
                const randomImage = images[Math.floor(Math.random() * images.length)];
                setImage(randomImage);
            } catch {
                showSnackbar('Failed to load persona image.', 'error');
            }
        };

        fetchRandomImage();
    }, [params.persona, showSnackbar]);

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/signatures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cardId: params.persona, signature: name, comment }),
            });

            if (response.ok) {
                showSnackbar('Thank you for signing the card!', 'success');
                setName('');
                setComment('');
                router.push(`/${params.persona}`);
            } else {
                showSnackbar(`Thank you, but ${params.persona} has already received your wishes!`, 'error');
            }
        } catch {
            showSnackbar('Something went wrong. Please try again.', 'error');
        }
    };

    return (
        <Box sx={{
            textAlign: 'center',
            padding: 4,
            position: 'relative',
            minHeight: '100vh',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <video
                autoPlay
                muted
                loop
                style={{
                    position: 'fixed',
                    right: 0,
                    bottom: 0,
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    zIndex: -1,
                    objectFit: 'cover'
                }}
            >
                <source src="/happy_birthday.mp4" type="video/mp4" />
            </video>

            {image && (
                <Image
                    src={image}
                    alt={`${params.persona}'s image`}
                    style={{
                        borderRadius: '50%',
                        marginBottom: '20px',
                        border: '4px solid #ff6f61',
                        boxShadow: '0 0 20px rgba(255,111,97,0.3)'
                    }}
                    width={150}
                    height={150}
                />
            )}
            <Typography
                variant="h4"
                sx={{
                    marginBottom: 3,
                    fontWeight: 'bold',
                    color: '#ff8c42',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    fontFamily: '"Dancing Script", cursive',
                    letterSpacing: '0.05em'
                }}
            >
                Leave a Wish for {params.persona}
            </Typography>
            <TextField
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{
                    marginBottom: 2,
                    '& .MuiInputBase-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px'
                    }
                }}
            />
            <TextField
                label="Your Wish"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                multiline
                rows={4}
                fullWidth
                sx={{
                    marginBottom: 3,
                    '& .MuiInputBase-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px'
                    }
                }}
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    backgroundColor: '#ff6f61',
                    padding: '12px 36px',
                    fontSize: '1.1rem',
                    borderRadius: '6px',
                    boxShadow: '0 4px 12px rgba(255,111,97,0.3)',
                    '&:hover': {
                        backgroundColor: '#ff5547'
                    }
                }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default SignaturesPage;
