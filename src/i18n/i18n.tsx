import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import authEn from "./locales/en/auth.json";
import collectionEn from "./locales/en/collection.json";
import commonEn from "./locales/en/common.json";
import dailyLessonEn from "./locales/en/daily-lesson.json";
import errorEn from "./locales/en/error.json";
import gamificationEn from "./locales/en/gamification.json";
import landingPageEn from "./locales/en/landing-page.json";
import metadataEn from "./locales/en/metadata.json";
import milestoneEn from "./locales/en/milestone.json";
import practiceEn from "./locales/en/practice.json";
import profileEn from "./locales/en/profile.json";
import questionEn from "./locales/en/question.json";
import shopEn from "./locales/en/shop.json";
import simulatedTestEn from "./locales/en/simulated-test.json";
import subscriptionEn from "./locales/en/subscription.json";
import successEn from "./locales/en/success.json";
import tooltipEn from "./locales/en/tooltip.json";
import authVi from "./locales/vi/auth.json";
import collectionVi from "./locales/vi/collection.json";
import commonVi from "./locales/vi/common.json";
import dailyLessonVi from "./locales/vi/daily-lesson.json";
import errorVi from "./locales/vi/error.json";
import gamificationVi from "./locales/vi/gamification.json";
import landingPageVi from "./locales/vi/landing-page.json";
import metadataVi from "./locales/vi/metadata.json";
import milestoneVi from "./locales/vi/milestone.json";
import practiceVi from "./locales/vi/practice.json";
import profileVi from "./locales/vi/profile.json";
import questionVi from "./locales/vi/question.json";
import shopVi from "./locales/vi/shop.json";
import simulatedTestVi from "./locales/vi/simulated-test.json";
import subscriptionVi from "./locales/vi/subscription.json";
import successVi from "./locales/vi/success.json";
import tooltipVi from "./locales/vi/tooltip.json";

const resources = {
  en: {
    metadata: metadataEn,
    common: commonEn,

    auth: authEn,

    practice: practiceEn,

    profile: profileEn,
    gamification: gamificationEn,
    subscription: subscriptionEn,

    simulatedTest: simulatedTestEn,
    collection: collectionEn,

    error: errorEn,
    success: successEn,
    shop: shopEn,
    tooltip: tooltipEn,
    question: questionEn,
    dailyLesson: dailyLessonEn,
    milestone: milestoneEn,
    landingPage: landingPageEn,
  },
  vi: {
    metadata: metadataVi,
    common: commonVi,

    auth: authVi,

    practice: practiceVi,

    profile: profileVi,
    gamification: gamificationVi,
    subscription: subscriptionVi,

    simulatedTest: simulatedTestVi,
    collection: collectionVi,

    error: errorVi,
    success: successVi,
    shop: shopVi,
    tooltip: tooltipVi,
    question: questionVi,
    dailyLesson: dailyLessonVi,
    milestone: milestoneVi,
    landingPage: landingPageVi,
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
  caches: ["cookie", "localStorage"],
  excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: "lapinlearn.edu.vn",

  // optional htmlTag with lang attribute, the default is:
  htmlTag: typeof document !== "undefined" ? document.documentElement : null,

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
