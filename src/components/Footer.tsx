'use client';

import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
    const { theme } = useTheme();

    return (
        <div className={`absolute bottom-4 left-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <a
                href="https://developer.ericgitangu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
            >
                © 2024 Eric Gitangu
            </a>
        </div>
    );
};

export default Footer;
