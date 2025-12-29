'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon size={20} className="text-gray-600 dark:text-gray-300" />
            ) : (
                <Sun size={20} className="text-yellow-500" />
            )}
        </button>
    );
}
