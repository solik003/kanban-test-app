import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: 'kanban-test-app',
  build: {
    outDir: 'build'
  },
  plugins: [react()],
})
