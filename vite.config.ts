import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import typescript from '@rollup/plugin-typescript'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), typescript({ tsconfig: './tsconfig.rollup.json' })],
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
  // Comment in when developing locally, given that the schedule-x monorepo is located next to this repo. Point the dependecies to the changes I make in the schedule-x repo.
  // resolve: {
  //   alias: {
  //     '@schedule-x/calendar': path.resolve(
  //       __dirname,
  //       '../schedule-x/packages/calendar'
  //     ),
  //     '@schedule-x/drag-and-drop': path.resolve(
  //       __dirname,
  //       '../schedule-x/packages/drag-and-drop'
  //     ),
  //     '@schedule-x/event-modal': path.resolve(
  //       __dirname,
  //       '../schedule-x/packages/event-modal'
  //     ),
  //     '@schedule-x/theme-default': path.resolve(
  //       __dirname,
  //       '../schedule-x/packages/theme-default'
  //     ),
  //   },
  // },
})
