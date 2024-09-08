import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '~/locales/en/english.json';
import vi from '~/locales/vi/vietnamese.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: 'vi',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
