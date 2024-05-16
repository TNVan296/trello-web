import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// xử lý khâu import với vite
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
