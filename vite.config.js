import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {

        /** If you set esmExternals to true, this plugins assumes that
          all external dependencies are ES modules */

        commonjsOptions: {
           esmExternals: true
        },
     }
});
