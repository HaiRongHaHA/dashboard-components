import { defineConfig } from 'vitepress'
import { sidebar, vite } from './configuration'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'dashboard-components',
  themeConfig: {
    docFooter: {
      prev: false,
      next: false
    },
    sidebar
  },
  vite
})
