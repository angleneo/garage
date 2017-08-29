import ajax from '../utils/fetch'
// 开单接口

// 工单保存
export const createSave = params => {
  // let params = {token}
  return ajax.post('/user/garageInfo', params)
}



