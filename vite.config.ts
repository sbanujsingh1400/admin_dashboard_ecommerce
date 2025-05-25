import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
//@ts-ignore
import path from 'path';
//@ts-ignore
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      // Use path.resolve for absolute paths
      '@': path.resolve(__dirname, './src'),
      '@user': path.resolve(__dirname, './src/pages/user'),
      '@admin': path.resolve(__dirname, './src/pages/admin'),
    },
  },
});