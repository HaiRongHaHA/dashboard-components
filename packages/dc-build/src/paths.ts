import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const compRoot = resolve(pkgRoot, 'components')
export const themeRoot = resolve(pkgRoot, 'theme')
export const hookRoot = resolve(pkgRoot, 'hooks')
export const directiveRoot = resolve(pkgRoot, 'directives')
export const dcRoot = resolve(pkgRoot, 'dc-components')
export const utilRoot = resolve(pkgRoot, 'utils')
export const buildRoot = resolve(projRoot, 'build')

// Docs
export const docsDirName = 'docs'
export const docRoot = resolve(projRoot, docsDirName)
export const vpRoot = resolve(docRoot, '.vitepress')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/dc-components` */
export const dcOutput = resolve(buildOutput, 'dc-components')

export const dcPackage = resolve(projRoot, 'package.json')
