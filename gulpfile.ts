import { parallel, series } from 'gulp'
import {
  buildFullBundle,
  buildFullBundleMinify,
  buildModules,
  clean,
  copyFiles,
  copyTypesDefinitions,
  createOutput,
  defGlobalThisName,
  generateTypesDefinitions
} from './build/index'

defGlobalThisName()

export default series(
  clean,
  createOutput,
  parallel(
    buildFullBundle,
    buildFullBundleMinify,
    buildModules,
    generateTypesDefinitions
  ),
  copyTypesDefinitions,
  copyFiles
)
