import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },

    build: {
        manifest: true,
        outDir: 'public/build',
        rollupOptions: {
            output: {
                // optional, ensures relative paths in manifest
                assetFileNames: 'assets/[name].[hash].[ext]',
            },
        },
    },
});
