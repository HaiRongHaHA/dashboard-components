import request from '@/utils/request'

export const getPermision = (params?: any) => request.get('/getPermision', params)
