import { parallel, series } from 'gulp'
import {
  buildFullBundle,
  buildFullBundleMinify,
  buildHelper,
  buildModules,
  buildStyle,
  clean,
  copyFiles,
  copyTypesDefinitions,
  createOutput,
  defGlobalThisName,
  generateTypesDefinitions
} from './index'

defGlobalThisName()

export default series(
  clean,
  createOutput,
  parallel(
    buildFullBundle,
    buildFullBundleMinify,
    buildModules,
    generateTypesDefinitions,
    buildStyle,
    buildHelper
  ),
  copyTypesDefinitions,
  copyFiles
)
