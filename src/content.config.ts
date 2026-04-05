import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const sharedReferences = z.object({
  characters: z.array(z.string()).default([]),
  organizations: z.array(z.string()).default([]),
  powers: z.array(z.string()).default([]),
  events: z.array(z.string()).default([]),
  locations: z.array(z.string()).default([]),
});

const characterRelationType = z.enum([
  'family',
  'friend',
  'ally',
  'colleague',
  'enemy',
  'leader',
  'teammate',
  'acquaintance',
]);

const characterRelationLink = z.object({
  targetId: z.string(),
  type: characterRelationType,
  direction: z.enum(['undirected', 'directed']).default('undirected'),
  note: z.string().optional(),
});

const organizationRelationType = z.enum([
  'friend',
  'ally',
  'colleague',
  'enemy',
  'leader',
  'teammate',
  'acquaintance',
]);

const organizationRelationLink = z.object({
  targetId: z.string(),
  type: organizationRelationType,
  direction: z.enum(['undirected', 'directed']).default('undirected'),
  note: z.string().optional(),
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
    organizationIds: z.array(z.string()).default([]),
    rank: z.string().optional(),
    tags: z.array(z.string()).default([]),
    related: sharedReferences
      .extend({
        characterLinks: z.array(characterRelationLink).default([]),
      })
      .default({
        characters: [],
        organizations: [],
        powers: [],
        events: [],
        locations: [],
        characterLinks: [],
      }),
  }),
});

const organizations = defineCollection({
  loader: glob({
    pattern: '{zh,en}/organizations/**/*.{md,mdx}',
    base: './src/content',
  }),
  schema: z.object({
    entityId: z.string(),
    locale: z.enum(['zh', 'en']),
    name: z.string(),
    aliases: z.array(z.string()).default([]),
    kind: z.string().optional(),
    tags: z.array(z.string()).default([]),
    related: sharedReferences
      .extend({
        organizationLinks: z.array(organizationRelationLink).default([]),
      })
      .default({
        characters: [],
        organizations: [],
        powers: [],
        events: [],
        locations: [],
        organizationLinks: [],
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
      organizations: [],
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
      organizations: [],
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
      organizations: [],
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
  organizations,
  powers,
  events,
  locations,
  docs,
};
