import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { getPermision as getPermisionAPI } from '@/apis/index'

interface permision {
  id: number
  name: string
  parentId: number
  type: number
  routeName?: string
  permFlag?: string
}

export const usePermisionStore = defineStore('permision', () => {
  const state = reactive({
    permision: [] as permision[]
  })

  async function getPermision() {
    const { data } = await getPermisionAPI()
    state.permision = data
  }

  return {
    ...toRefs(state),
    getPermision
  }
})
