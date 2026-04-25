import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const BUILD_TIMESTAMP = Date.now().toString()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'cache-bust-config-js',
      transformIndexHtml(html) {
        return html.replace(/__BUILD_TIMESTAMP__/g, BUILD_TIMESTAMP)
      },
    },
  ],
  base: '/12-assp/',
  build: {
    outDir: '12-assp',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== 'true',
    fs: {
      deny: ['ai-agents-super/**'],
    },
  },
  optimizeDeps: {
    entries: ['index.html', 'src/**/*.{ts,tsx}'],
  },
})