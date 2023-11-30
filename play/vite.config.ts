import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dcRoot, pkgRoot } from '../build/paths'

// export const projRoot = path.resolve(__dirname, '..')
// export const pkgRoot = path.resolve(projRoot, 'packages')
// export const dcRoot = path.resolve(pkgRoot, 'dc-components')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
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
      }
    ]
  },
  plugins: [vue()]
})
