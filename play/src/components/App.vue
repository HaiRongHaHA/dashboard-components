<script lang="ts" setup>
import { DcTest, o } from 'dc-components'
import { utils } from 'dc-components/es/utils'
const obj = {
  a: 'a'
}
const { b } = {
  ...obj,
  b: 1
}
</script>

<template>
  <div>
    <DcTest />
    {{ o }}
    -------
    {{ utils }}
    -------
    {{ b }}
  </div>
</template>

<style lang="scss" scoped></style>
