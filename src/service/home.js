import ajax from '../utils/fetch'
// 首页接口

// 修理厂信息栏
export const getGarageInfo = params => {
  // let params = {token}
  return ajax.get('/user/garageInfo', params)
}

// 历史单日最高业绩
export const historyPerformance = params => {
  // let  params = {token}
  return ajax.get('/order/service/maxTotal', params)
}

// 当日业绩
export const todayTotal = params => {
  // let params = {token}
  return ajax.get('/order/service/todayTotal', params)
}

// 日营业额图表
export const todayTotalchart = params => {
  // let params = {endTime, token, type}
  return ajax.get('/order/service/groupTotalByDay', params)
}

// 月营业额图表
export const todMonthTotal = params => {
  // let params = {endTime, token, type}
  return ajax.get('/order/service/groupTotalByMonth', params)
}

// 最近工单
export const recentList = params => {
  // let params = {token}
  return ajax.get('/order/service/recent/list', params)
}

// 客户评价
export const evaluation = params => {
  return ajax.post('/user/feedback/page', params)
}

// 结算账户余额
export const usermoney = params => {
  return ajax.get('/order/statement/statistics', params)
}

// 提现
export const withdrawals = params => {
  return ajax.get('/order/statement/settleNow', params)
}

// 入账流水
export const cansettle = (params, pagestr) => {
  return ajax.get('/order/service/canSettleList' + pagestr, params)
}

// 提现处理中列表
export const settling = (params, pagestr) => {
  return ajax.get('/order/statement/settlingList' + pagestr, params)
}

// 提现完成列表
export const settled = (params, pagestr) => {
  return ajax.get('/order/statement/settledList' + pagestr, params)
}

// 门店信息
export const information = params => {
  return ajax.get('/user/garage/detail', params)
}

// 修改门店信息
export const garagedite = params => {
  return ajax.post('/user/garage/edit', params)
}

