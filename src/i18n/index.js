// src/i18n/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import hi from "./hi.json";
import ta from "./ta.json";
import kn from "./kn.json";
import pa from "./pa.json";
import gu from "./gu.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      ta: { translation: ta },
      kn: { translation: kn },
      pa: { translation: pa },
      gu: { translation: gu }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
