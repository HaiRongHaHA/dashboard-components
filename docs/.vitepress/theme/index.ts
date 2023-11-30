import ElementPlus from 'element-plus'
import theme from 'vitepress/theme'

export default {
  ...theme,
  enhanceApp: ({ app }) => {
    app.use(ElementPlus)
  }
}
