import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import typescript from '@rollup/plugin-typescript'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), typescript({ tsconfig: './tsconfig.rollup.json' }),],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'schedule-x-vue',
      fileName: 'schedule-x-vue',
    },
    rollupOptions: {
      external: ['vue', '@schedule-x/calendar'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
