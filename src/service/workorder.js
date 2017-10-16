import ajax from '../utils/fetch'

// 工单列表
export const orderlists = (params, pagestr) => {
  return ajax.post('/order/service/garage/page' + pagestr, params)
}

// 工单详情
export const workdetailmsg = params => {
  return ajax.get('/order/service/' + params + '/detail')
}

// 核算工单
export const calOrder = params => {
  return ajax.post('/order/service/calOrder', params)
}

// 变更工单
export const updateacc = params => {
  return ajax.post('/order/service/mergeOrder', params)
}

// 变更采购工单
export const updatcc = params => {
  return ajax.post('/order/service/purchase/mergeOrder', params)
}

// 保存工单
export const createorder = params => {
  return ajax.post('/order/service/createOrder', params)
}

// 工单状态更新为施工中
export const updatepayed = params => {
  return ajax.post('/order/service/' + params + '/updatePayed')
}

// 工单状态更新为已完成
export const updateFinish = (vid, params) => {
  return ajax.post('/order/service/' + vid + '/updateFinish', params)
}
