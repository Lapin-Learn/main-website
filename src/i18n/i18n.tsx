import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import authEn from "./locales/en/auth.json";
import collectionEn from "./locales/en/collection.json";
import commonEn from "./locales/en/common.json";
import errorEn from "./locales/en/error.json";
import gamificationEn from "./locales/en/gamification.json";
import itemEn from "./locales/en/item.json";
import practiceEn from "./locales/en/practice.json";
import profileEn from "./locales/en/profile.json";
import simulatedTestEn from "./locales/en/simulated-test.json";
import successEn from "./locales/en/success.json";
import authVi from "./locales/vi/auth.json";
import collectionVi from "./locales/vi/collection.json";
import commonVi from "./locales/vi/common.json";
import errorVi from "./locales/vi/error.json";
import gamificationVi from "./locales/vi/gamification.json";
import itemVi from "./locales/vi/item.json";
import practiceVi from "./locales/vi/practice.json";
import profileVi from "./locales/vi/profile.json";
import simulatedTestVi from "./locales/vi/simulated-test.json";
import successVi from "./locales/vi/success.json";

const resources = {
  en: {
    common: commonEn,

    auth: authEn,

    practice: practiceEn,

    profile: profileEn,
    gamification: gamificationEn,

    simulatedTest: simulatedTestEn,
    collection: collectionEn,

    error: errorEn,
    success: successEn,
    item: itemEn,
  },
  vi: {
    common: commonVi,

    auth: authVi,

    practice: practiceVi,

    profile: profileVi,
    gamification: gamificationVi,

    simulatedTest: simulatedTestVi,
    collection: collectionVi,

    error: errorVi,
    success: successVi,
    item: itemVi,
  },
};

const languageDetectorOptions = {
  // order and from where user language should be detected
  order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag", "path", "subdomain"],

  // keys or params to lookup language from
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ["localStorage", "cookie"],
  excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: "myDomain",

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // only detect languages that are in the whitelist
  checkWhitelist: true,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["vi", "en"],
    detection: languageDetectorOptions,
    fallbackLng: "vi",
    debug: true,
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
      format: function (value, format) {
        if (format === "capitalize") return value.charAt(0).toUpperCase() + value.slice(1);
        if (format === "uppercase") return value.toUpperCase();
        if (format === "lowercase") return value.toLowerCase();
        return value;
      },
    },
    resources,
  });

export default i18n;
