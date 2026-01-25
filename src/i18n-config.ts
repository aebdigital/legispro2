export const i18n = {
    defaultLocale: 'sk',
    locales: ['en', 'de', 'fr', 'sk'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
