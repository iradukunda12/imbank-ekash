import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const envFile = mode === 'production'
    ? 'environment.prod.ts'
    : mode === 'development'
      ? 'environment.dev.ts'
      : 'environment.dev.ts';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@environment': path.resolve(__dirname, `src/environment/${envFile}`),
        '@': path.resolve(__dirname, 'src'),
        '@app': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
    },
  };
})
