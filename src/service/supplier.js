import ajax from '../utils/fetch'

// 供应商列表
export const supplierlist = (params, pagestr) => {
  return ajax.post('/user/supplier/list' + pagestr, params)
}

// 供应商详情
export const details = params => {
  return ajax.get('/user/supplier/' + params)
}

// 供应商编辑
export const supplierupdate = params => {
  return ajax.post('/user/supplier/edited', params)
}

// 供应商添加
export const suppliercreate = params => {
  return ajax.post('/user/supplier/create', params)
}

