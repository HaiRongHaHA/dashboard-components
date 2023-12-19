function kebabCase(str) {
  const hyphenateRE = /([^-])([A-Z])/g
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}

export const DcResolver = () => {
  return async (DcComponentName: string) => {
    if (!DcComponentName.startsWith('Dc')) return

    const componentName = kebabCase(DcComponentName.slice(2))
    const result = {
      name: DcComponentName,
      from: 'dc-components',
      sideEffects: [
        // 样式引入的核心在这里，直接引入组件的索引文件
        `dc-components/es/theme/${componentName}.scss`
      ]
    }

    return result
  }
}
