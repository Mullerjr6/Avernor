import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const appRoot = fileURLToPath(new URL('.', import.meta.url))
const repositoryRoot = fileURLToPath(new URL('..', import.meta.url))

export default defineConfig({
  root: appRoot,
  plugins: [react()],
  publicDir: false,
  server: {
    host: '0.0.0.0',
    port: 4174,
    fs: { allow: [repositoryRoot] },
  },
  preview: { host: '0.0.0.0', port: 4174 },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
})
