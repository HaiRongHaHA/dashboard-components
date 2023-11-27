import path from 'path'
import { rollup } from 'rollup'
import glob from 'fast-glob' // 快速批量导入、读取文件
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import consola from 'consola'
import { excludeFiles } from '../utils/pkg'
import { dcOutput, dcRoot, pkgRoot } from '../paths'
import { generateExternal, writeBundles } from '../utils/rollup'
import { target } from '../build-info'
export const buildModules = async () => {
  consola.info('Start building bundle modules...')
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot, // packages下所有的js,ts,vue文件
      absolute: true,
      onlyFiles: true
    })
  )
  const build = await rollup({
    input,
    plugins: [
      vue({
        isProduction: false
      }),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        exclude: [],
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
    ],
    // 在代码中引入的第三方库使用，不想被打包一起进我们的代码里，用external排除掉
    external: await generateExternal({ full: false }),
    treeshake: true
  })
  await writeBundles(build, [
    {
      format: 'esm',
      dir: path.resolve(dcOutput, 'es'),
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: dcRoot,
      sourcemap: true,
      entryFileNames: '[name].mjs'
    },
    {
      format: 'cjs',
      dir: path.resolve(dcOutput, 'lib'),
      exports: 'named',
      preserveModules: true, // 是否以原始目录结构作为输出的结构，此处输入目录为/packages/*
      preserveModulesRoot: dcRoot, //原始目录结构的根，此处/packages/dc-components
      sourcemap: true,
      entryFileNames: '[name].js'
    }
  ])

  await build.close()
  consola.success('bundle modules built!')
}
