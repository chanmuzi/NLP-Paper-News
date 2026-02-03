import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://chanmuzi.github.io',
  base: '/temp-news-moltbot',
  integrations: [tailwind()],
  output: 'static',
  trailingSlash: 'always',
});
