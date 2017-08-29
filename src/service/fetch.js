import axios from 'axios'
import Qs from 'qs'

let ajax = axios.create({
  baseURL: 'http://dow-np-163.bakheet.cn',
  timeout: 100000,
  transformRequest: [function (data) {
    if (data instanceof FormData) {
      console.log(data)
      return data
    }
    console.log(data)
    return Qs.stringify(data)
  }]
})

// 拦截请求
ajax.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 拦截响应
ajax.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default ajax
