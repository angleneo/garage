import ajax from '../utils/fetch'

// 采购单列表
export const purchaselist = (params, pagestr) => {
  return ajax.post('/order/purchase/page' + pagestr, params)
}

// 采购详情
export const purchasedetail = params => {
  return ajax.get('/order/purchase/' + params + '/map')
}

export const addpurchase = params => {
  return ajax.post('/order/purchase/ndow/create', params)
}

// 确认收货
export const receivepurch = params => {
  return ajax.post('/order/purchase/receive', params)
}

// 采购单构建
export const addcgd = params => {
  return ajax.post('/order/purchase/mergeOrder', params)
}

// 采购单调整
export const purchaseUpdate = params => {
  return ajax.post('/order/purchase/calOrder', params)
}

