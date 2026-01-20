import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: localStorage.getItem('language') || 'fr', 
        fallbackLng: 'fr',
        resources: {
            en: { translation: en },
            fr: { translation: fr }
        }
    });

export default i18n;
