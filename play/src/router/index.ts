import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '/list',
        component: () => import('../views/List/index.vue')
      },
      {
        path: '/form',
        component: () => import('../views/Form/index.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router

router.beforeEach(async (to, from, next) => {
  try {
    // 获取动态路由权限
    // await Store.dispatch('permission/load', { to })

    next()
  } catch {
    next(false)
  }
})
