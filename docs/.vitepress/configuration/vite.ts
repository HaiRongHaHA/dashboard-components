import * as path from 'path'

export const projRoot = path.resolve(__dirname, '..')
export const pkgRoot = path.resolve(projRoot, 'packages')
export const dcRoot = path.resolve(pkgRoot, 'dc-components')

export const vite = {
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
  }
}
