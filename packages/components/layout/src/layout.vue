<script lang="ts" setup>
import { Document, Location, Setting } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <ElContainer class="dc-layout">
    <ElButton>22</ElButton>
    <ElAside width="auto">
      <h5>logo home</h5>
      <ElScrollbar>
        <ElMenu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <ElSubMenu index="1">
            <template #title>
              <ElIcon><Location /></ElIcon>
              <span>Navigator One</span>
            </template>
            <ElSubMenu index="1-4">
              <template #title>item four</template>
              <ElMenuItem index="1-4-1">item one</ElMenuItem>

              <ElSubMenu index="1-5">
                <template #title>item four</template>
                <ElMenuItem index="1-5-1">item one</ElMenuItem>
              </ElSubMenu>
            </ElSubMenu>
          </ElSubMenu>
          <ElMenuItem index="3" disabled>
            <ElIcon><Document /></ElIcon>
            <span>Navigator Three</span>
          </ElMenuItem>
          <ElMenuItem index="4">
            <ElIcon><Setting /></ElIcon>
            <span>Navigator Four</span>
          </ElMenuItem>
        </ElMenu>
      </ElScrollbar>
    </ElAside>
    <ElContainer>
      <ElHeader>Header</ElHeader>
      <ElMain>
        <slot />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
