import ajax from '../utils/fetch'
// 首页接口

// 修理厂信息栏
export const getToken = params => {
  // let params = {token}
  return ajax.post('/user/garageInfo', params)
}

// 历史单日最高业绩
export const historyPerformance = params => {
  // let  params = {token}
  return ajax.post('/order/service/maxTotal', params)
}

// 当日业绩 
export const todayTotal = params => {
  // let params = {token}
  return ajax.post('/service/todayTotal', params)
}

// 日营业额图表 
export const todayTotal = params => {
  // let params = {endTime, token, type}
  return ajax.post('/order/service/groupTotalByDay', params)
}

// 月营业额图表
export const todMonthTotal = params => {
  // let params = {endTime, token, type}
  return ajax.post('/order/service/groupTotalByMonth', params)
}

// 最近工单
export const recentList = params => {
  // let params = {token}
  return ajax.post('/order/service/recent/list', params)
}


