import path from 'path'
import { copyFile, mkdir } from 'fs/promises'
import { dest, series, src } from 'gulp'
import gulpSass from 'gulp-sass' // 编译sass
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import consola from 'consola'
import chalk from 'chalk'
import { dcOutput, themeRoot } from '../paths'

export const buildTheme = () => {
  const sass = gulpSass(dartSass)
  const noElPrefixFile = /(index|base)/
  return (
    // 读取/packages/theme下所有scss文件
    src(path.resolve(themeRoot, '*.scss'))
      // pipe流，sass同步编译（速度快异步编译两倍）
      .pipe(sass.sync())
      // sass编译后的文件流，再处理，自动添加css属性前缀
      .pipe(autoprefixer({ cascade: false }))
      .pipe(
        // 编译后+自动添加过前缀的文件流，cleanCSS压缩混淆，输出压缩前后文件大小
        cleanCSS({}, (details) => {
          consola.success(
            `${chalk.cyan(details.name)}: ${chalk.yellow(
              details.stats.originalSize / 1000
            )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
          )
        })
      )
      .pipe(
        // 将scss文件名，除index、base外添加组件库统一前缀
        rename((path) => {
          if (!noElPrefixFile.test(path.basename)) {
            path.basename = `dc-${path.basename}`
          }
        })
      )
      .pipe(dest(path.resolve(dcOutput, 'theme')))
  )
}

export const copyFullStyle = async () => {
  // 任务都是并行的，确保有dist/dc-components/dist目录，新建一下，否则copy的时候会报错
  await mkdir(path.resolve(dcOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(dcOutput, 'theme/index.css'),
    path.resolve(dcOutput, 'dist/index.css')
  )
}

export const buildStyle = series(buildTheme, copyFullStyle)
