import ajax from '../utils/fetch'

// 配件列表
export const acclists = (params, pagestr) => {
  return ajax.post('/item/company/product/page' + pagestr, params)
}

// 配件详情
export const workdetailmsg = params => {
  return ajax.get('/order/service/' + params)
}

// 配件批量修改
export const accUpdateList = params => {
  return ajax.post('/item/product/updateList', params)
}

// 添加配件
export const addonepj = params => {
  return ajax.post('/item/product/supplier/create', params)
}

