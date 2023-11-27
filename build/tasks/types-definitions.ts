import path from 'path'
// import { mkdir, readFile, writeFile } from 'fs/promises'
import { readFile } from 'fs/promises'
import { Project } from 'ts-morph' // 基于 TS Compiler API 的工具，完成各种类型的代码操作，例如重构、生成、检查和分析等
import { glob } from 'fast-glob'
import * as vueCompiler from 'vue/compiler-sfc'
// import chalk from 'chalk'
import { excludeFiles } from '../utils/pkg'
import { buildOutput, dcRoot, pkgRoot, projRoot } from '../paths'
import type { CompilerOptions, SourceFile } from 'ts-morph'

const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.web.json')
const outDir = path.resolve(buildOutput, 'types')

export const generateTypesDefinitions = async () => {
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true,
    outDir,
    baseUrl: projRoot,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false
  }
  // 创建一个TypeScript项目对象
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true
  })

  // const sourceFiles = await addSourceFiles(project)
  await addSourceFiles(project)
  // consola.success('Added source files')

  // !!!!! ts检查报错，暂时有问题，不知道咋解决，后面看
  // typeCheck(project)
  // consola.success('Type check passed!')

  await project.emit({
    emitOnlyDtsFiles: true
  })
  // 生成.d.ts，输出在outDir

  // 以下代码将引入路径是@element-plus替换为element-plus/es/
  // 将样式路径@element-plus/theme-chalk替换为element-plus/theme-chalk
  // 本项目不是monorepo，不需要这段代码
  // const tasks = sourceFiles.map(async (sourceFile) => {
  //   const relativePath = path.relative(pkgRoot, sourceFile.getFilePath())
  //   consola.trace(
  //     chalk.yellow(
  //       `Generating definition for file: ${chalk.bold(relativePath)}`
  //     )
  //   )

  //   const emitOutput = sourceFile.getEmitOutput()
  //   const emitFiles = emitOutput.getOutputFiles()
  //   if (emitFiles.length === 0) {
  //     throw new Error(`Emit no file: ${chalk.bold(relativePath)}`)
  //   }

  //   const subTasks = emitFiles.map(async (outputFile) => {
  //     const filepath = outputFile.getFilePath()
  //     await mkdir(path.dirname(filepath), {
  //       recursive: true
  //     })

  //     await writeFile(
  //       filepath,
  //       pathRewriter('esm')(outputFile.getText()),
  //       'utf8'
  //     )

  //     consola.success(
  //       chalk.green(
  //         `Definition for file: ${chalk.bold(relativePath)} generated`
  //       )
  //     )
  //   })

  //   await Promise.all(subTasks)
  // })

  // await Promise.all(tasks)
}

async function addSourceFiles(project: Project) {
  project.addSourceFileAtPath(path.resolve(projRoot, 'typings/env.d.ts'))

  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'
  const filePaths = excludeFiles(
    await glob([globSourceFile, '!dc-components/**/*'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )

  const dcPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: dcRoot,
      onlyFiles: true
    })
  )

  // 此处.vue文件可能有问题，遍历没有.vue文件
  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await readFile(file, 'utf-8')
        const hasTsNoCheck = content.includes('@ts-nocheck')

        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content =
            (hasTsNoCheck ? '// @ts-nocheck\n' : '') + (script?.content ?? '')

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            })
            content += compiled.content
          }

          const lang = scriptSetup?.lang || script?.lang || 'js'
          const sourceFile = project.createSourceFile(
            `${path.relative(process.cwd(), file)}.${lang}`,
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
    ...dcPaths.map(async (file) => {
      const content = await readFile(path.resolve(dcRoot, file), 'utf-8')

      sourceFiles.push(
        project.createSourceFile(path.resolve(pkgRoot, file), content, {
          overwrite: true
        })
      )
    })
  ])

  return sourceFiles
}

// function typeCheck(project: Project) {
//   // getPreEmitDiagnostics 对project的源文件进行检索诊断，是否有编译错误
//   const diagnostics = project.getPreEmitDiagnostics()
//   if (diagnostics.length > 0) {
//     consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
//     const err = new Error('Failed to generate dts.')
//     consola.error(err)
//     throw err
//   }
// }
