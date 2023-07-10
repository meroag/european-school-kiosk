import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from "../locales/en.json"
import kaJson from "../locales/ka.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enJson
      },
      ka: {
        translation: kaJson
      },
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
});

export default i18n