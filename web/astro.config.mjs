import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://chanmuzi.github.io',
  base: '/NLP-Paper-News',
  integrations: [tailwind()],
  output: 'static',
  trailingSlash: 'always',
});
