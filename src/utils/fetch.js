import axios from 'axios'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import {baseUrl} from '../config/env'
Vue.use(VueCookie)

let ajax = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 100000,
  transformRequest: [function (data) {
    if (data instanceof FormData) {
      console.log(data)
      return data
    }
    console.log(data)
    return data
  }]
})

// 拦截请求
ajax.interceptors.request.use((config) => {
  config.headers.token = Vue.cookie.get('login')
  return config
}, error => {
  return Promise.reject(error)
})

// 拦截响应
ajax.interceptors.response.use(response => {
  return response
}, error => {
  return error.response
})

export default ajax
