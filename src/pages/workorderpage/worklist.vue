<template>
	<div class="order-box">
		<div class="order-title">
      <ul>
        <li class="search-box"><input type="text" placeholder="请输入车牌号码/联系方式" v-model="workorderid"></li>
        <li>
          <Select v-model="modelstatus" style="width:160px;margin:0 10px;"size='large' placeholder="请选择订单状态" >
            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <Select v-model="modelpaystatus" style="width:160px;margin:0 10px;"size='large' placeholder="请选择支付方式" >
            <Option v-for="item in paystatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <Row>
              <Col span="12">
                  <DatePicker v-model="dateRange" type="daterange" confirm placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
              </Col>
          </Row>
        </li>
        <li><span class="search-btn" @click="searchOrderlist">查找</span></li>
      </ul>
    </div>

    <div class="order-table">
        <table  cellpadding="0" cellspacing="0">
          <div class="tablebox" v-if="tablebg">
             <img src="../../assets/images/itemimg.png" >
          </div>
          <div class="tablebox" v-if="tablebg2">
             <span >当前无搜索结果</span>
            <!----------<span>当前无所搜索结果</span>------------>
          </div>
          <tbody>
          <tr>
            <th>工单编号</th>
            <th>车牌号码</th>
            <th>车主姓名</th>
            <th>联系方式</th>
            <th>实收金额</th>
            <th>订单状态</th>
            <th>支付方式</th>
            <th>创建时间</th>
          </tr>
          <tr v-for="(work, item) in worklist" :key="item">
            <td><a v-goto="'工单详情'" data-key="id" :data-value="work.id">{{work.id}}</a></td>
            <td>{{work.carCode}}</td>
            <td>{{work.userName}}</td>
            <td>{{work.userPhone}}</td>
            <td>{{work.totalAmount | money}}</td>
            <td>{{work.status | status}}</td>
            <td>{{work.payWay | paystatus}}</td>
            <td>{{work.createTime}}</td>
          </tr>

          </tbody>
        </table>
    </div>
    <div class="padge-box-right"><Page :total="pgacount" :current="changecurrent" @on-change="change" show-elevator></Page></div>
	</div>
</template>
<style scoped>
  .ivu-select-large .ivu-select-item {
    padding: 7px 16px 8px;
    font-size: 14px!important;
    width: 100%;
    text-align: center;
  }
  .order-box {
    width: 99% !important;
    height: auto !important;
    background: #ffffff;
    border-radius: 10px;
    padding-bottom: 20px;
    margin: 20px 0 !important;
  }
  .order-table table {
    width: 100%;
    font-size: 16px;
    border-collapse: collapse;
    margin-bottom: 20px;
    position: relative;
  }
  .tablebox{
    position:absolute;
    top:60px;
    left:0;
    width:100%;
    z-index:100;
    background:white;
    padding: 2% 0;
  }
  .bxttable table {
    position:relative;
  }
</style>
<script>
import moment from 'moment'
import {orderlists} from '@/service/workorder'
import {mapState} from 'vuex'
export default {
  data () {
    return {
        statusList: [
        {
          value: '',
          label: '全部订单'
        },
        {
          value: '4',
          label: '已完成'
        },
        {
          value: '3',
          label: '施工中'
        },
        {
          value: '2',
          label: '待支付'
        },
        {
          value: '1',
          label: '待确认'
        },
        {
          value: '0',
          label: '预约中'
        },
        {
          value: '-1',
          label: '已取消'
        }
      ],
      paystatus: [
        {
          value: '0',
          label: '线下'
        },
        {
          value: '1',
          label: '线上'
        }
      ],
      tablebg2: false,
      tablebg: true,
      modelstatus: '',
      modelpaystatus: '',
      worklist: [],
      pgsize: 10,
      pgacount: 10,
      changecurrent: 1,
      cc: 1,
      dateRange: [],
      workorderid: ''
    }
  },
  computed: {
    ...mapState(['tokenid'])
  },
  mounted () {
    this.getOrderlist()
  },
  methods: {
    getOrderlist () {
      let params = {}
      let pagestr = '?pageNum=' + this.changecurrent
      orderlists(JSON.stringify(params), pagestr).then((res) => {
        this.worklist = res.data.data.page
        this.pgacount = res.data.data.totalCount
        if (this.worklist[0]) {
          this.tablebg = false
        } else {
          this.tablebg = true
        }
      })
    },
    searchOrderlist () {
      let params = {
        likename: this.workorderid,
        status: this.modelstatus,
        payWay: this.modelpaystatus,
        startTime: this.dateRange[0] ? moment(this.dateRange[0]).format('YYYY-MM-DD') : null,
        endTime: this.dateRange[1] ? moment(this.dateRange[1]).format('YYYY-MM-DD') : null
      }
      let pagestr = '?pageNum=' + this.changecurrent
      orderlists(JSON.stringify(params), pagestr).then((res) => {
        this.worklist = res.data.data.page
        this.pgacount = res.data.data.totalCount
        if (this.worklist[0]) {
          this.tablebg2 = false
        } else {
          this.tablebg2 = true
        }
      })
    },
    change (page) {
      let params = {
        likename: this.workorderid,
        status: this.modelstatus,
        payWay: this.modelpaystatus,
        startTime: this.dateRange[0] ? moment(this.dateRange[0]).format('YYYY-MM-DD') : null,
        endTime: this.dateRange[1] ? moment(this.dateRange[1]).format('YYYY-MM-DD') : null
      }
      let pagestr = '?pageNum=' + page
      orderlists(JSON.stringify(params), pagestr).then((res) => {
        this.worklist = res.data.data.page
        this.pgacount = res.data.data.totalCount
      })
    }
  }
}
</script>
