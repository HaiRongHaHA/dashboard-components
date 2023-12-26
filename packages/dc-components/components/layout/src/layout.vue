<script lang="ts" setup>
import Header from './header.vue'
import Aside from './aside.vue'
</script>
<template>
  <div class="dc-layout">
    <Header />
    <Aside />
    <ElMain class="dc-layout__main">
      <RouterView />
    </ElMain>
  </div>
</template>
