import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export const projRoot = path.resolve(__dirname, '..')
export const pkgRoot = path.resolve(projRoot, 'packages')
export const dcRoot = path.resolve(pkgRoot, 'dc-components')
export const utilsRoot = path.resolve(pkgRoot, 'utils')

// https://vitejs.dev/config/
export default defineConfig({
  root: 'play',
  server: {
    host: '0.0.0.0',
    proxy: {}
  },
  resolve: {
    alias: [
      {
        find: /^dc-components(\/(es|lib))?$/,
        replacement: path.resolve(dcRoot, 'index.ts')
      },
      {
        find: /^dc-components\/(es|lib)\/(.*)$/,
        replacement: `${pkgRoot}/$2`
      },
      {
        find: '@dc-components/utils',
        replacement: path.resolve(utilsRoot, 'index.ts')
      }
    ]
  },
  plugins: [vue() as any]
})
