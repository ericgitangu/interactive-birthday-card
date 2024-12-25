'use client';

import { useTheme } from '@/context/ThemeContext';
import { Box } from '@mui/material';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: theme === 'dark' ? '#121212' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#000000',
            transition: 'background-color 0.3s ease, color 0.3s ease'
        }}>
            {children}
        </Box>
    );
} 