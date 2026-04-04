import { getCollection, type CollectionEntry } from 'astro:content';

import { defaultLocale, type Locale, locales } from '../i18n/config';

export type EntityCollection = 'characters' | 'powers' | 'events' | 'locations';

type LocalizedEntry<T extends EntityCollection> = CollectionEntry<T> & {
  slug: string;
};

function extractSlug(id: string, locale: Locale, collection: EntityCollection): string | null {
  const prefix = `${locale}/${collection}/`;
  if (!id.startsWith(prefix)) {
    return null;
  }

  const slug = id.slice(prefix.length);
  if (!slug || slug.endsWith('_template')) {
    return null;
  }

  return slug;
}

export async function getLocalizedEntries<T extends EntityCollection>(
  collection: T,
  locale: Locale
): Promise<Array<LocalizedEntry<T>>> {
  const entries = await getCollection(collection);

  const localized = entries
    .map((entry) => {
      const slug = extractSlug(entry.id, locale, collection);
      if (!slug) {
        return null;
      }

      return {
        ...entry,
        slug,
      };
    })
    .filter((entry): entry is LocalizedEntry<T> => entry !== null);

  if (collection === 'events') {
    localized.sort((a, b) => a.data.order - b.data.order);
  } else {
    localized.sort((a, b) => {
      const aName = 'name' in a.data ? a.data.name : '';
      const bName = 'name' in b.data ? b.data.name : '';
      return aName.localeCompare(bName, locale);
    });
  }

  return localized;
}

export async function getLocalizedEntryBySlug<T extends EntityCollection>(
  collection: T,
  locale: Locale,
  slug: string
): Promise<LocalizedEntry<T> | undefined> {
  const localized = await getLocalizedEntries(collection, locale);
  return localized.find((entry) => entry.slug === slug);
}

export function localizedPath(locale: Locale, path: string): string {
  const cleaned = path.startsWith('/') ? path.slice(1) : path;
  return cleaned ? `/${locale}/${cleaned}` : `/${locale}`;
}

export function getLocalePaths() {
  return locales.map((locale) => ({ params: { locale } }));
}

export function fallbackLocale(input: string | undefined): Locale {
  if (!input) {
    return defaultLocale;
  }

  return locales.includes(input as Locale) ? (input as Locale) : defaultLocale;
}
