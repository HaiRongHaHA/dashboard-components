import type { ExtractPropTypes } from 'vue'
import type Layout from './layout.vue'

export interface MenuItem {
  // 图标
  icon?: string
  // 名称
  name: string
  // 标识
  index: string
  // 子菜单
  children?: MenuItem[]
}
// Array as PropType<any[]>
export const menuProps = {
  menu: {
    type: Array,
    required: true
  },
  // 默认选中的菜单
  defaultActive: {
    type: String,
    default: ''
  },
  // 标题键名
  name: {
    type: String,
    default: 'name'
  },
  // 标识键名
  index: {
    type: String,
    default: 'index'
  },
  // 图标键名
  icon: {
    type: String,
    default: 'icon'
  },
  // 子菜单键名
  children: {
    type: String,
    default: 'children'
  }
}

export const layoutProps = {}

export type LayoutProps = ExtractPropTypes<typeof layoutProps>

export type LayoutInstance = InstanceType<typeof Layout>
