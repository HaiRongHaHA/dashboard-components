import { dcPackage } from '../paths'
import { getPackageDependencies } from './pkg'
import type { OutputOptions, RollupBuild } from 'rollup'

// 获取不打包的第三方库
export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(dcPackage)

  return (id: string) => {
    const packages: string[] = [...peerDependencies]

    // ????
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }

    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}

// rollup实例，执行.write方法写入磁盘
export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}
