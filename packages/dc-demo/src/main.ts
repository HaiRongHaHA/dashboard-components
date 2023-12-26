import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.scss'
import store from './store'

import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(router).use(store)
app.mount('#play')
