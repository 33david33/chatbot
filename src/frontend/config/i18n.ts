import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

/**
 *  Translation setup
 * */
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'de'],
    fallbackLng: 'en',
    detection: {
      order: [
        'cookie',
        'htmlTag',
        'querystring',
        'localStorage',
        'sessionStorage',
        'navigator',
        'path',
        'subdomain',
      ],
      caches: ['cookie'],
    },
    backend: {
      allowMultiLoading: true,
      // If allowMultiLoading is false, lngs and namespaces will have only one element each,
      // If allowMultiLoading is true, lngs and namespaces can have multiple elements
      loadPath:
        process.env.NODE_ENV === 'production'
          ? '../../public/assets/locales/{{lng}}/{{ns}}.json'
          : '../../../frontend/public/assets/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      // wait: true,
      useSuspense: true,
    },
  });

export default i18n;
