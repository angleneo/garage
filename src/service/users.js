import ajax from '../utils/fetch'
// 查询用户权限,登录接口
export const getToken = params => {
  return ajax.post('/user/login', params)
}

