'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Always default to light mode
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Only use saved theme if explicitly set, otherwise keep light
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
        // Removed dark mode system preference check - always light by default
    }, []);

    useEffect(() => {
        if (mounted) {
            const root = document.documentElement;
            root.classList.remove('dark', 'light');
            root.classList.add(theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
