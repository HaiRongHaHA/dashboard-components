<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePermisionStore } from './store/permision'

const store = usePermisionStore()
const { permision } = storeToRefs(store)

const test = async () => {
  await store.getPermision()
  console.log(permision, 'usePermisionStore')
}

test()
</script>

<template>
  <DcLayout>
    {{ permision }}
    <RouterView />
  </DcLayout>
</template>

<style lang="scss" scoped></style>
