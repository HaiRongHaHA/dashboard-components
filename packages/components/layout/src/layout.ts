import { buildProps } from '@dc-components/utils'

import type { ExtractPropTypes } from 'vue'
import type Layout from './layout.vue'

export const layoutProps = buildProps({})

export type LayoutProps = ExtractPropTypes<typeof layoutProps>

export type LayoutInstance = InstanceType<typeof Layout>
