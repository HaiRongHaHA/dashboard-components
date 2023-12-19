import { copyFile } from 'fs/promises'
import path from 'path'
import { dcOutput, projRoot } from '../paths'

export const copyFiles = () =>
  Promise.all([
    copyFile(
      path.resolve(projRoot, 'package.json'),
      path.resolve(dcOutput, 'package.json')
    ),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(dcOutput, 'README.md')
    ),
    copyFile(
      path.resolve(projRoot, 'global.d.ts'),
      path.resolve(dcOutput, 'global.d.ts')
    )
  ])
