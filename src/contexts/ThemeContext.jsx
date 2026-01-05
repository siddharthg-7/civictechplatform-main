import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'medium'); // small, medium, large

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute('data-font-size', fontSize);
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    const toggleTheme = () => {
        setTheme((prev) => {
            if (prev === 'light') return 'dark';
            if (prev === 'dark') return 'high-contrast';
            return 'light';
        });
    };

    const setSpecificTheme = (newTheme) => setTheme(newTheme);

    const increaseFont = () => {
        setFontSize(prev => {
            if (prev === 'small') return 'medium';
            if (prev === 'medium') return 'large';
            return 'large';
        });
    };

    const decreaseFont = () => {
        setFontSize(prev => {
            if (prev === 'large') return 'medium';
            if (prev === 'medium') return 'small';
            return 'small';
        });
    };

    const resetFont = () => setFontSize('medium');

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme,
            setSpecificTheme,
            fontSize,
            increaseFont,
            decreaseFont,
            resetFont
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
