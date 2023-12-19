import request from '../utils/request'

export const getPermision = (params?) => request.get('/getPermision', params)
