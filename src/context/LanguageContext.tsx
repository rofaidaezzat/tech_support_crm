import React, { createContext, useContext, useState, useEffect } from 'react';
import { locales } from '../locales';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to resolve nested keys like "settings.title"
const getTranslation = (obj: any, path: string): string => {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null) return path;
    current = current[part];
  }
  return typeof current === 'string' ? current : path;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read initial language from local storage, fallback to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    if (stored === 'en' || stored === 'ar') return stored;
    return 'en';
  });

  const changeLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    const dict = locales[language];
    return getTranslation(dict, key);
  };

  const isRtl = language === 'ar';
  const dir: 'rtl' | 'ltr' = isRtl ? 'rtl' : 'ltr';

  useEffect(() => {
    // 1. Set document direction
    document.documentElement.dir = dir;
    document.documentElement.lang = language;

    // 2. Load Tajawal Font dynamically if Arabic is chosen
    let fontLink = document.getElementById('tajawal-font-link') as HTMLLinkElement | null;
    if (language === 'ar') {
      if (!fontLink) {
        fontLink = document.createElement('link');
        fontLink.id = 'tajawal-font-link';
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap';
        document.head.appendChild(fontLink);
      }
      document.body.style.fontFamily = "'Tajawal', 'Inter', sans-serif";
    } else {
      document.body.style.fontFamily = "'Inter', sans-serif";
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isRtl, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
