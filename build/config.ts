import path from 'path'
import { buildOutput, dcRoot } from './paths'
import type { OutputOptions } from 'rollup'

export const modulesOutputConfig: OutputOptions[] = [
  {
    format: 'esm',
    dir: path.resolve(buildOutput, 'es'),
    exports: undefined,
    preserveModules: true,
    preserveModulesRoot: dcRoot,
    sourcemap: true,
    entryFileNames: '[name].mjs'
  },
  {
    format: 'cjs',
    dir: path.resolve(buildOutput, 'lib'),
    exports: 'named',
    preserveModules: true, // 是否以原始目录结构作为输出的结构
    preserveModulesRoot: dcRoot, //确保输入的模块在指定的dir下（此处lib/）
    sourcemap: true,
    entryFileNames: '[name].js'
  }
]
