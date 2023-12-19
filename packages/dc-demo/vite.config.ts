import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
// import { hookRoot } from '@rolldogking/dc-build'
import { DcResolver } from './plugins'
// console.log('hookRoot', hookRoot)

const projRoot = path.resolve(__dirname, '..')
// const pkgRoot = path.resolve(projRoot, 'packages')
const dcRoot = path.resolve(projRoot, 'dc-components')

// https://vitejs.dev/config/
export default defineConfig({
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
        replacement: `${dcRoot}/$2`
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
      // mockPath的路径前面不能加'/'
      mockPath: 'src/mock'
    })
  ]
})
