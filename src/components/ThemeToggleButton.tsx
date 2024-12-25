'use client';

import React from 'react';
import { useTheme } from '@context/ThemeContext';
import { Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggleButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="fixed top-4 right-4 flex items-center space-x-2">
            {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
            <Switch checked={theme === 'dark'} onChange={toggleTheme} />
        </div>
    );
};

export default ThemeToggleButton;
