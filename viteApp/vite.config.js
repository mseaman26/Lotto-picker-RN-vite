import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'react-native$': 'react-native-web', // Alias for React Native,
            "@": path.resolve(__dirname, "../expoapp/app"),
        },
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            // Ensure Vite handles all dependencies and shared modules
            external: [], // Empty this unless you're explicitly externalizing packages
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // your backend API address
                changeOrigin: true,              // changes the origin of the host header to the target URL
            },
        },
    },
});
