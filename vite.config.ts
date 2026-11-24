import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const version = process.env.VITE_BUILD_SHA || process.env.RENDER_GIT_COMMIT || 'local'

export default defineConfig({
  plugins: [react(), {
    name: 'version-manifest',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify({ version }) })
    },
  }],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
