import { createApp } from 'vue'
import type { DefineComponent } from 'vue'

// 根据location.pathname自动渲染对应.vue文件
// 不用vue-router了，调试组件的项目，没有必要加router
;(async () => {
  interface ModuleType {
    default: DefineComponent
  }
  // 获取components下所有.vue文件的default方法（懒加载，动态导入的）
  const apps = import.meta.glob<ModuleType>('./components/*.vue', {
    import: 'default'
  })
  const name = location.pathname.replace(/^\//, '') || 'App' // 默认取App组件
  const file = apps[`./components/${name}.vue`] // 根据pathname获取对应组件文件
  // 获取文件、挂载
  const App = await file()
  const app = createApp(App)
  app.mount('#play')
})()
