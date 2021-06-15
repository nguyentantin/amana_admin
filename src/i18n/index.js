import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './lang/en'
import ja from './lang/ja'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      ja: {
        translation: ja
      }
    },
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  })

/**
 * Translate by key.
 *
 * @param key
 * @param option
 * @returns {string}
 */
const trans = (key, option = {}) => i18n.t(key, option)

export {
  trans
}

export default i18n
