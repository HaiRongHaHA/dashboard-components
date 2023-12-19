import type { MockMethod } from 'vite-plugin-mock'

const mock: Array<MockMethod> = [
  {
    // 接口路径
    url: '/api/getPermision',

    // 接口方法
    method: 'get',

    // 返回数据
    response: () => {
      return {
        status: 200,
        message: 'success',
        data: [
          {
            id: 1100,
            name: '列表管理',
            parentId: 0,
            routeName: 'LiveManage',
            type: 0,
            permFlag: ''
          },
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
          },
          {
            id: 1140,
            name: '新增-按钮',
            parentId: 1100,
            routeName: '',
            type: 1,
            permFlag: 'list:add'
          }
        ]
      }
    }
  }
]

export default mock
