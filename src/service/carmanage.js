import ajax from '../utils/fetch'
// 车辆管理接口

// 车辆列表
export const carlists = (params, pagestr) => {
  return ajax.get('/user/car/list' + pagestr + params)
}

// 车辆列表
export const carlistall = (params, pagestr) => {
  return ajax.get('/user/car/listAll' + pagestr + params)
}

// 车辆详情
export const cardetail = params => {
  return ajax.get('/user/car/' + params)
}

// 车辆编辑
export const carupdate = (params) => {
  return ajax.post('/user/car/update', params)
}

// 添加车辆
export const addcar = params => {
  return ajax.post('/user/car/create', params)
}

// 车辆选择树形结构
export const cartree = params => {
  return ajax.get('/item/carBrand/map', params)
}

// 选择车型
export const carline = params => {
  return ajax.post('/item/carModel/modelName/list', params)
}

// 选择排量
export const cardisplacement = params => {
  return ajax.post('/item/carModel/displacement/list', params)
}

// 查询年款
export const carproduction = params => {
  return ajax.post('/item/carModel/productionYear/list', params)
}

