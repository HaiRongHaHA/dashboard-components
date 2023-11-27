import { parallel, series } from 'gulp'
import {
  buildFullBundle,
  buildFullBundleMinify,
  buildModules,
  clean,
  createOutput
} from './tasks/index'
import { defGlobalThisName } from './index'

defGlobalThisName()

export default series(
  clean,
  createOutput,
  parallel(buildFullBundle, buildFullBundleMinify, buildModules)
)
