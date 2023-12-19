import { parallel, series } from 'gulp'
import {
  buildFullBundle,
  buildFullBundleMinify,
  buildModules,
  buildStyle,
  clean,
  copyFiles,
  copyTypesDefinitions,
  createOutput,
  defGlobalThisName,
  generateTypesDefinitions
} from './src/index'

defGlobalThisName()

export default series(
  clean,
  createOutput,
  parallel(
    buildFullBundle,
    buildFullBundleMinify,
    buildModules,
    generateTypesDefinitions,
    buildStyle
  ),
  copyTypesDefinitions,
  copyFiles
)
