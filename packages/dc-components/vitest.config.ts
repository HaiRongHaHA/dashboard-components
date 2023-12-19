import * as path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

export const pkgRoot = path.resolve(__dirname, 'packages')
export const utilsRoot = path.resolve(pkgRoot, 'utils')

export default defineConfig({
  plugins: [Vue() as any, VueJsx() as any],
  optimizeDeps: {
    disabled: true
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    alias: [
      // {
      //   find: '@dc-components/utils',
      //   replacement: path.resolve(utilsRoot, 'index.ts')
      // }
    ]
  }
})
