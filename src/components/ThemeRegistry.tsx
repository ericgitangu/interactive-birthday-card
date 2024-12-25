'use client';

import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, responsiveFontSizes } from '@mui/material';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    const muiTheme = responsiveFontSizes(createTheme({
        palette: {
            mode: theme,
            primary: {
                main: '#ff6f61',
            },
            background: {
                default: theme === 'dark' ? '#121212' : '#ffffff',
                paper: theme === 'dark' ? '#1e1e1e' : '#ffffff',
            },
        },
    }));

    const [{ cache, flush }] = useState(() => {
        const cache = createCache({
            key: 'mui',
            prepend: true,
        });
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) return null;
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key="emotion"
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{ __html: styles }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
} 