import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: 'anburocky3/vue-quill2',
        replacement: path.resolve(__dirname, '../packages/vue-quill2/src'),
      },
    ],
  },
})
