// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vite.dev/config/
// export default defineConfig({
//   base: '/kanban-test-app/',
//   build: {
//     outDir: 'build'
//   },
//   plugins: [react()],
// })

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/kanban-test-app/',
    build: {
      outDir: 'build'
    },
    plugins: [react()],
    server: {
      host: true
    },
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
    },
  };
});

