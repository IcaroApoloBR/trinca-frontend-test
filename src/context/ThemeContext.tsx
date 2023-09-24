import React, { ReactNode, createContext, useState } from 'react';

type ThemeContextProps = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

type ChildrenProps = {
    children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextProps>({
    darkMode: false,
    toggleDarkMode: () => { }
});

export const ThemeProvider = ({ children }: ChildrenProps) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
};