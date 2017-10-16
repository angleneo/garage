export default [
  {
    name: 'money',
    fil: (value) => {
      if (!value) return '0.00'
      value = parseFloat(value).toFixed(2)
      return value
    }
  },
  {
    name: 'money1',
    fil: (value) => {
      if (!value) return '0.00'
      this.arr = []
      this.arr = value.split('.')
      if (this.arr.length === 1) {
        value = value + '.00'
      }
      if (this.arr.length === 2) {
        if (this.arr[1].length === 1) {
          value = value + '0'
        }
      }
      return value
    }
  },
  {
    name: 'status',
    fil: (value) => {
      if (value !== 0 && !value) return '未知状态'
      value = parseInt(value)
      if (value === -1) return '已取消'
      if (value === 0) return '预约中'
      if (value === 1) return '待确认'
      if (value === 2) return '待支付'
      if (value === 3) return '施工中'
      if (value === 4) return '已完成'
    }
  },
  {
    name: 'statementType',
    fil: (value) => {
      if (value !== 0 && !value) return '未知状态'
      value = parseInt(value)
      if (value === 0) return '现结'
      if (value === 1) return '月结'
    }
  },
  {
    name: 'paystatus',
    fil: (value) => {
      if (value !== 0 && !value) return ' '
      value = parseInt(value)
      if (value === 0) return '线下'
      if (value === 1) return '线上'
    }
  },
  {
    name: 'purchastatus',
    fil: (value) => {
      if (value !== 0 && !value) return '未知状态'
      value = parseInt(value)
      if (value === 0) return '草稿'
      if (value === 1) return '正在审批'
      if (value === 2) return '审批通过'
      if (value === 3) return '审批拒绝'
      if (value === 4) return '待发货'
      if (value === 5) return '未完成'
      if (value === 6) return '已完成'
      if (value === 7) return '已关闭'
      if (value === 9) return '冻结'
    }
  },
  {
    name: 'receivestatus',
    fil: (value) => {
      if (value !== 0 && !value) return '未知状态'
      value = parseInt(value)
      if (value === 1) return '部分收货'
      if (value === 2) return '全部收货'
      if (value === 0) return '未收货'
    }
  }
]

