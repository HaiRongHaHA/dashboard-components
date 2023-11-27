import { dcPackage } from '../paths'
import { getPackageManifest } from '../utils/pkg'
import type { TaskFunction } from 'gulp'

export const buildHelper: TaskFunction = (done) => {
  const { name, version } = getPackageManifest(dcPackage)
  console.log('buildHelper执行了', name, version)

  done()
}
