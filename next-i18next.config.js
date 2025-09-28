/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en', 'fr'],
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: './public/locales',
  ns: ['common', 'home', 'assessments', 'careers', 'auth'],
  defaultNS: 'common',
  fallbackLng: {
    default: ['ar'],
    'en': ['ar'],
    'fr': ['ar']
  },
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false,
  },
}
