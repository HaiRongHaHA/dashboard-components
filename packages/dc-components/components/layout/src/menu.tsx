import { defineComponent } from 'vue'
import { ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import { menuProps } from './layout'
import 'element-plus/theme-chalk/el-icon.css'
import 'element-plus/theme-chalk/el-menu.css'
import 'element-plus/theme-chalk/el-menu-item.css'

export default defineComponent({
  props: menuProps,
  setup(props) {
    const renderMenu = (menu: any[]) => {
      return menu.map((item: any) => {
        const Icon = (Icons as any)[item[props.icon]]
        const index = String(item[props.index])
        const name = item[props.name]

        const title = () => (
          <>
            <ElIcon>
              <Icon />
            </ElIcon>
            <span>{name}</span>
          </>
        )

        const hasChildren = item[props.children] && item[props.children].length

        if (hasChildren) {
          const slots = { title }
          return (
            <ElSubMenu index={index} v-slots={slots}>
              {renderMenu(item[props.children])}
            </ElSubMenu>
          )
        }
        return <ElMenuItem index={index}>{name}</ElMenuItem>
      })
    }
    return () => (
      <ElMenu default-active="2" router={false}>
        {renderMenu(props.menu!)}
      </ElMenu>
    )
  }
})
