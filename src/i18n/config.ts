import en from './en.json';
import zh from './zh.json';

export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh';

export const dictionary = {
  zh,
  en,
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let current: unknown = dictionary[locale];

  for (const part of keys) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return key;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : key;
}
