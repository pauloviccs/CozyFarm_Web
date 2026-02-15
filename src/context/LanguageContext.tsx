"use client";

import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('pt'); // Default to PT-BR

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
    };

    const t = (path: string): string => {
        const keys = path.split('.');
        let current: unknown = translations[language];

        for (const key of keys) {
            if (current === null || typeof current !== 'object' || !(key in (current as object))) {
                console.warn(`Translation missing for key: ${path} in language: ${language}`);
                return path;
            }
            current = (current as Record<string, unknown>)[key];
        }

        return typeof current === 'string' ? current : path;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
