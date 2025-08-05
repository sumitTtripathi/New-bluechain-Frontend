// import i18n from "i18next";
// import Backend from "i18next-xhr-backend";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

// // Service for multi-language support
// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     backend: {
//       loadPath: "/Languages/{{lng}}.json",
//     },
//     fallbackLng: "english",
//     debug: false,
//     react: {
//       useSuspense: false,
//     },
//   });

// export default i18n;


import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// i18n initialization
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/Languages/{{lng}}.json",  // JSONs should be in public/Languages/
    },
    fallbackLng: "en",                      // Must match JSON file name, not 'english'
    debug: false,
    react: {
      useSuspense: false,
    },
  });

export default i18n;
