import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Layout from '../src/layout.vue'

const AXIOM = 'hello world'

describe('Layout.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Layout>{AXIOM}</Layout>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
