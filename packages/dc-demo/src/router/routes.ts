import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout/index.vue'

export const r = [
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List/index.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/Form/index.vue')
  }
]

export default [
  {
    path: '/',
    component: Layout,
    children: r
  },
  {
    path: '/full-screen',
    name: 'FullScreen',
    component: () => import('../views/FullScreen/index.vue')
  }
] as RouteRecordRaw[]
