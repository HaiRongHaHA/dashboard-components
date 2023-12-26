import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { usePermisionStore } from '@/store/permision'

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router

router.beforeEach(async (to, from, next) => {
  try {
    const store = usePermisionStore()

    // 获取权限
    await store.getPermision()
    console.log(store.permision, 'permision', routes)

    next()
  } catch {
    next(false)
  }
})
