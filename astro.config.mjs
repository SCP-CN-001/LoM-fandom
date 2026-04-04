// @ts-check
import { defineConfig } from 'astro/config';

import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://scp-cn-001.github.io',
  base: '/LoM-fandom',
  i18n: {
      locales: ['zh', 'en'],
      defaultLocale: 'zh',
      routing: {
          prefixDefaultLocale: true,
      },
	},

  integrations: [
    starlight({
      title: 'LoM Fandom Docs',
    }),
  ],
});