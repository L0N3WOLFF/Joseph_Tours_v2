
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This is crucial for GitHub Pages deployment. It tells Vite where the
  // assets will be located on the production server.
  base: '/Joseph_Tours_v1/',
})
