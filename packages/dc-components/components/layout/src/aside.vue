<script lang="ts" setup>
import Menu from './menu'
const menu = [
  {
    id: 1100,
    name: '列表管理',
    parentId: 0,
    icon: 'Document',
    routeName: 'LiveManage',
    type: 0,
    permFlag: '',
    children: [
      {
        id: 1138,
        name: '列表页面',
        parentId: 1100,
        routeName: 'List',
        type: 0,
        permFlag: ''
      },
      {
        id: 1139,
        name: '表单页面',
        parentId: 1100,
        routeName: 'Form',
        type: 0,
        permFlag: ''
      }
    ]
  }
  // {
  //   id: 1140,
  //   name: '新增-按钮',
  //   parentId: 1100,
  //   routeName: '',
  //   type: 1,
  //   permFlag: 'list:add'
  // }
]
</script>

<template>
  <ElAside width="auto" class="dc-layout__aside">
    <ElScrollbar>
      <Menu :menu="menu" index="id" />
    </ElScrollbar>
  </ElAside>
</template>

<style lang="scss" scoped></style>
