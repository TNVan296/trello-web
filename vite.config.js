import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// xử lý khâu import với vite
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  // base: './
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
