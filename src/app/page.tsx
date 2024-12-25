"use client";

import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import { Button, TextField, Typography } from "@mui/material";
import ThemeRegistry from "@/components/ThemeRegistry";
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "next-auth/react";
const HomePage = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play();
        }
    }, []);

    return (
        <ThemeRegistry>
            <React.Fragment>
                <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
                    <Head>
                        <title>Interactive Birthday Cards</title>
                        <meta property="og:title" content="Create Interactive Birthday Cards" />
                        <meta
                            property="og:description"
                            content="Create and share personalized, interactive birthday cards with your loved ones. Add signatures, wishes, and make their day special!"
                        />
                        <meta
                            property="og:image"
                            content="https://deveric-birthdays.vercel.app/_next/static/media/logo.png"
                        />
                        <meta property="og:url" content="https://deveric-birthdays.vercel.app" />
                        <meta property="og:type" content="website" />
                        <meta name="twitter:card" content="summary_large_image" />
                    </Head>

                    {/* Overlay Text */}
                    <div className="relative z-20 p-5 text-center text-white">
                        <Typography
                            variant="h2"
                            className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in"
                        >
                            🎉 Happy Birthday! 🎉
                        </Typography>
                        <Typography variant="body1" className="text-lg md:text-2xl mb-6">
                            Celebrate your loved ones with a personalized, interactive birthday card.
                        </Typography>
                        <Typography variant="body1" className="text-lg md:text-2xl mb-6">
                            Share your wishes, collect signatures, and make the day unforgettable.
                        </Typography>
                    </div>

                    {/* Get Started Button */}
                    <div className="absolute bottom-12 w-full flex flex-col items-center gap-4 z-20">
                        <TextField
                            variant="outlined"
                            label="Birthday Girl's First Name"
                            placeholder="Priscilla"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            sx={{
                                width: '300px',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                borderRadius: '4px'
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                signIn("google", {
                                    callbackUrl: name ? `/${name.toLowerCase()}` : "/"
                                });
                            }}
                            disabled={name.length < 3}
                            className="px-6 py-3 text-lg"
                            sx={{
                                width: '300px',
                                display: 'flex',
                                gap: 2,
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                color: '#757575',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#e0e0e0',
                                    color: '#9e9e9e'
                                }
                            }}
                            startIcon={<GoogleIcon />}
                        >
                            View Birthday Card
                        </Button>
                    </div>

                    {/* Background Video */}
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
                    >
                        <source
                            src="/birthdays.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>

                    {/* Overlay */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
                </div>
            </React.Fragment>
        </ThemeRegistry>
    );
};

export default HomePage;
