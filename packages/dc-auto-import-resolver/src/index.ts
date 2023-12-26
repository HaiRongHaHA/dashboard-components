function kebabCase(str: string) {
  const hyphenateRE = /([^-])([A-Z])/g
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase()
}

export const DcResolver = () => {
  return async (name: string) => {
    if (!name.startsWith('Dc')) return

    const partialName = kebabCase(name.slice(2))
    const result = {
      name,
      from: '@rolldogking/dc-components',
      sideEffects: [
        // 样式引入的核心在这里，直接引入组件的索引文件
        `@rolldogking/dc-components/es/theme/${partialName}.scss`
      ]
    }

    return result
  }
}
