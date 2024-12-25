'use client';

import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

type SnackbarContextType = {
    showSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [snackbar, setSnackbar] = useState<{
        message: string;
        severity: 'success' | 'error' | 'info' | 'warning';
        open: boolean;
    }>({
        message: '',
        severity: 'info',
        open: false,
    });

    const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
        setSnackbar({ message, severity, open: true });
    };

    const handleClose = () => setSnackbar({ ...snackbar, open: false });

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar open={snackbar.open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) throw new Error('useSnackbar must be used within a SnackbarProvider');
    return context;
};
