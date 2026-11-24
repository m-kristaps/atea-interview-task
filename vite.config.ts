/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            // lets any scss file write @use 'tools' as *; without ../../../ paths
            scss: { loadPaths: [fileURLToPath(new URL('./src/styles', import.meta.url))] },
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
        css: false,
        // negative UTC offset so date off-by-one bugs actually show up in tests
        env: { TZ: 'America/New_York' },
    },
});
