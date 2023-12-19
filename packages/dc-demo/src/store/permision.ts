import { defineStore } from 'pinia'
import { getPermision } from '../apis/index'

interface permision {
  id: number
  name: string
  parentId: number
  type: number
  routeName?: string
  permFlag?: string
}

export const usePermisionStore = defineStore('permision', {
  state: () => ({ permision: [] as permision[] }),
  actions: {
    async getPermision() {
      const { data } = await getPermision()
      this.permision = data
    }
  }
})
