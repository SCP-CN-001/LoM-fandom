import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const sharedReferences = z.object({
  characters: z.array(z.string()).default([]),
  powers: z.array(z.string()).default([]),
  events: z.array(z.string()).default([]),
  locations: z.array(z.string()).default([]),
});

const characters = defineCollection({
  loader: glob({
    pattern: '{zh,en}/characters/**/*.{md,mdx}',
    base: './src/content',
  }),
  schema: z.object({
    entityId: z.string(),
    locale: z.enum(['zh', 'en']),
    name: z.string(),
    aliases: z.array(z.string()).default([]),
    faction: z.string().optional(),
    rank: z.string().optional(),
    tags: z.array(z.string()).default([]),
    related: sharedReferences.default({
      characters: [],
      powers: [],
      events: [],
      locations: [],
    }),
  }),
});

const powers = defineCollection({
  loader: glob({
    pattern: '{zh,en}/powers/**/*.{md,mdx}',
    base: './src/content',
  }),
  schema: z.object({
    entityId: z.string(),
    locale: z.enum(['zh', 'en']),
    name: z.string(),
    system: z.string().optional(),
    tier: z.string().optional(),
    tags: z.array(z.string()).default([]),
    related: sharedReferences.default({
      characters: [],
      powers: [],
      events: [],
      locations: [],
    }),
  }),
});

const events = defineCollection({
  loader: glob({
    pattern: '{zh,en}/events/**/*.{md,mdx}',
    base: './src/content',
  }),
  schema: z.object({
    entityId: z.string(),
    locale: z.enum(['zh', 'en']),
    title: z.string(),
    order: z.number(),
    dateLabel: z.string(),
    tags: z.array(z.string()).default([]),
    related: sharedReferences.default({
      characters: [],
      powers: [],
      events: [],
      locations: [],
    }),
  }),
});

const locations = defineCollection({
  loader: glob({
    pattern: '{zh,en}/locations/**/*.{md,mdx}',
    base: './src/content',
  }),
  schema: z.object({
    entityId: z.string(),
    locale: z.enum(['zh', 'en']),
    name: z.string(),
    region: z.string().optional(),
    mapX: z.number().min(0).max(100).optional(),
    mapY: z.number().min(0).max(100).optional(),
    tags: z.array(z.string()).default([]),
    related: sharedReferences.default({
      characters: [],
      powers: [],
      events: [],
      locations: [],
    }),
  }),
});

const docs = defineCollection({
  loader: glob({
    pattern: 'docs/**/*.{md,mdx}',
    base: './src/content',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  characters,
  powers,
  events,
  locations,
  docs,
};
