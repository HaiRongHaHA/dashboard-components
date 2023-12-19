import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

request.interceptors.response.use(
  (response) => response.data,
  (err) => Promise.reject(err)
)

export default request
