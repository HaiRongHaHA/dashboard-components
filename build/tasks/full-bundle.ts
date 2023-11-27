import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import consola from 'consola'
import { dcOutput, dcRoot } from '../paths'
import { target } from '../build-info'
import {
  formatBundleFilename,
  generateExternal,
  writeBundles
} from '../utils/rollup'
import { PKG_BRAND_NAME, PKG_CAMELCASE_NAME } from '../constants'
import type { Plugin } from 'rollup'

const version = '0.0.0-dev.1'
const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`

async function buildFull(minify: boolean) {
  consola.info('Start building bundle...')
  const plugins: Plugin[] = [
    vue({
      isProduction: true
    }),
    vueJsx(),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts']
    }),
    commonjs(),
    esbuild({
      exclude: [],
      sourceMap: minify,
      target,
      loaders: {
        // 通过'@vitejs/plugin-vue'编译后.vue文件已经是普通ts代码了，但后缀还是.vue，这里将vue文件看作普通ts代码
        '.vue': 'ts'
      },
      define: {
        // 全局标识符
        'process.env.NODE_ENV': JSON.stringify('production')
      },
      treeShaking: true
    })
  ]

  if (minify) {
    plugins.push(
      // 压缩代码插件
      minifyPlugin({
        target,
        sourceMap: true
      })
    )
  }

  const build = await rollup({
    input: path.resolve(dcRoot, 'index.ts'),
    plugins,
    // 在代码中引入的第三方库使用，不想被打包一起进我们的代码里，用external排除掉
    external: await generateExternal({ full: true }),
    treeshake: true
  })

  await writeBundles(build, [
    {
      format: 'umd', // 通用模块定义规范，同时支持 amd，cjs 和 iife
      file: path.resolve(
        dcOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'js')
      ),
      exports: 'named', // 命名导出，用户可以解构的导入你的包
      name: PKG_CAMELCASE_NAME, // 打包后的全局变量名
      globals: {
        // 指定外部依赖
        vue: 'Vue'
      },
      sourcemap: minify,
      banner // 包的标识（打包后的文件里头部注释，文案格式一般是包名+版本号）
    },
    {
      format: 'esm', //  ES 模块文件
      file: path.resolve(
        dcOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'mjs')
      ),
      sourcemap: minify,
      banner
    }
  ])

  await build.close()
  consola.success('bundle built!')
}

export const buildFullBundle = () => buildFull(false)

export const buildFullBundleMinify = () => buildFull(true)
