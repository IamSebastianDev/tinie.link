/** @format */

import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
    server: {
        proxy: {
            '/api/v1/': 'http://localhost:3000',
        },
    },
    root: './src/pages/',
    build: {
        emptyOutDir: true,
        outDir: resolve(import.meta.dirname, './dist'),
        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, './src/pages/index.html'),
                'not-found': resolve(import.meta.dirname, './src/pages/not-found/index.html'),
            },
        },
    },
});
