import ajax from '../utils/fetch'
import Vue from 'vue'
// 查询用户权限,登录接口
export const getToken = params => {
  return ajax.post('/user/login', params)
}

// 注销接口
export const delToken = params => {
  Vue.cookie.delete('login')
  return ajax.post('/user/logout', params)
}

