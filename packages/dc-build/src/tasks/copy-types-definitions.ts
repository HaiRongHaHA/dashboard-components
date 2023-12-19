import path from 'path'
import { copy } from 'fs-extra'
import { parallel } from 'gulp'
import { buildOutput, dcOutput } from '../paths'
import type { TaskFunction } from 'gulp'

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'packages')
  return parallel(
    () => copy(src, path.resolve(dcOutput, 'es')),
    () => copy(src, path.resolve(dcOutput, 'lib'))
  )(done)
}
