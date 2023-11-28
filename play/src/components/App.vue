<script lang="ts" setup>
import { DcTest, o } from 'dc-components'
import { utils } from 'dc-components/es/utils'
</script>

<template>
  <div>
    <DcTest />
    {{ o }}
    -------
    {{ utils }}
  </div>
</template>

<style lang="scss" scoped></style>
