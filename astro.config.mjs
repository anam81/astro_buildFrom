// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://arnemuench.de',
    integrations: [sitemap()],
    compressHTML: false,
    trailingSlash: 'never',
    vite: {
        define: {
            BUILD_TIME: JSON.stringify(Date.now())
        }
    }
});