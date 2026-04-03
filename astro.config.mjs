// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://arnemuench.de',
    base: '/',
    compressHTML: false,
    vite: {
        define: {
            BUILD_TIME: JSON.stringify(Date.now())
        }
    }
});