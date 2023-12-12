import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { DcResolver } from './plugins'

export const projRoot = path.resolve(__dirname, '..')
export const pkgRoot = path.resolve(projRoot, 'packages')
export const dcRoot = path.resolve(pkgRoot, 'dc-components')
export const utilsRoot = path.resolve(pkgRoot, 'utils')

// https://vitejs.dev/config/
export default defineConfig({
  root: 'play',
  server: {
    host: '0.0.0.0',
    port: 8888,
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
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver(), DcResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver(), DcResolver()]
    }),
    viteMockServe({
      // mockPath的路径前面不能加'/'，写成/play/src/mock就不生效了
      mockPath: 'play/src/mock'
    })
  ]
})
