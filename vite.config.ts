import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
//@ts-ignore
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Use path.resolve for absolute paths
      '@': path.resolve(__dirname, './src'),
      '@user': path.resolve(__dirname, './src/pages/user'),
      '@admin': path.resolve(__dirname, './src/pages/admin'),
    },
  },
});