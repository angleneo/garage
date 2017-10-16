<template>
	<div class="settlement">
		<section class="withdrawals">
			<ul>
				<li>账户余额: <span>{{moneyinfo.notSettleSum}}</span></li>
				<li>提现中金额: <span>{{moneyinfo.settlingSum}}</span></li>
				<li>可提现金额: <span>{{moneyinfo.settledSum}}</span>  </li>
				<li><button class="search-btn" @click="settlemoney">提现</button></li>
				<div class="clearfix"></div>
			</ul>
		</section>

		<section class="tablsettle">
			<div class="tabbtn">
				<ul>
					<li :class="{activetab: tab1}" @click="showtabl1">入账流水</li>
					<li :class="{activetab: tab2}" @click="showtabl2">提现处理中</li>
					<li :class="{activetab: tab3}" @click="showtabl3">提现完成</li>
				</ul>
			</div>
     <div class="table1" v-show="tableshow[0]">
			<table  cellpadding="0"  cellspacing="0">
				<tr>
					<th>入账时间</th>
					<th>工单单号/交易流水号</th>
					<th>工单车牌</th>
					<th>付款方姓名</th>
					<th>付款联系方式</th>
					<th>入账金额</th>
					<th>入账状态</th>
				</tr>
        <tr v-for="money1 in table1">
          <td>{{money1.createTime}}</td>
          <td>
            <div>{{money1.id}}</div>
            <div>交易流水：{{money1.servicePayment.serialNumber}}</div></td>
          <td>{{money1.carCode}}</td>
          <td>{{money1.servicePayment.payer}}</td>
          <td>{{money1.userPhone}}</td>
          <td>{{money1.totalAmount}}元</td>
          <td>{{money1.status}}</td>
        </tr>
			</table>
       <div class="padge-box-right"><Page :total="tototalcount1" @on-change="change1" show-elevator></Page></div>
    </div>

      <div class="table2 " v-show="tableshow[1]" >
      <table  cellpadding="0"  cellspacing="0">
        <tr>
          <th>入账时间</th>
          <th>提现单号</th>
          <th>提现金额</th>
          <th> 提现状态</th>
        </tr>
        <tr v-for="money2 in table2">
          <td>{{money2.createTime}}</td>
          <td>
            {{money2.id}}</td>
          <td>{{money2.totalAmount}}元</td>
          <td>{{money2.status}}</td>
        </tr>
      </table>
      <div class="padge-box-right"><Page :total="totalcount2" @on-change="change2" show-elevator></Page></div>
      </div>
      <div class="table3" v-show="tableshow[2]">
        <table  cellpadding="0"  cellspacing="0">
          <tr>
            <th>入账时间</th>
            <th>提现处理时间</th>
            <th>提现单号</th>
            <th>提现金额</th>
            <th>提现状态</th>
          </tr>
          <tr v-for="money3 in table3">
            <td>
                {{money3.createTime}}
            </td>
            <td>
                {{money3.endTime}}
            </td>
            <td>{{money3.id}}</td>
            <td>{{money3.totalAmount}}元</td>
            <td>{{money3.status}}</td>
          </tr>
        </table>
        <div class="padge-box-right"><Page :total="totalcount3" @on-change="change3" show-elevator></Page></div>
      </div>
		</section>
	</div>
</template>
<style scoped lang="less">
.clearfix{
	content:'';
	clear:both;
	display:block;
}
.withdrawals{
	width:99%;
	height:70px;
	background:white;
	border-radius:5px;
	text-indent: 10px;
}
.withdrawals ul li{
	height:70px;
	line-height:65px;
	float:left;
	font-size:16px;
	margin:0 15px;
}
.withdrawals ul li span{
	color:#f3a340;
	margin:0 10px;
}
.tablsettle{
	width:99%;
	margin:10px 0;
	border-radius: 5px;
	background:white;
}
.tabbtn{
	width:100%;
	height:60px;
}
.tabbtn ul {
	margin-left:40px;
}
.tabbtn ul li{
	float:left;
	display:block;
	height:60px;
	width:150px;
	line-height:60px;
	border-radius:10px 10px 0 0;
  cursor: pointer;
}
.activetab{
	background:#fdedb1;
	font-size:18px;
  cursor: pointer;
}
.table1 table,.table2 table,.table3 table{
	width:100%;
  font-size:16px;
}
.table1 td,.table2 td,.table3 td{
  text-align: left;
  line-height: 80px;
  color: #333;
  text-indent: 20px;
  border-bottom: 1px solid #d1d2d1;
}
table div{ line-height: 20px;}
.table1 th,.table2 th,.table3 th{
  height:60px;
  background:#fdedb1;
  text-align: left;
  text-indent: 20px;
}
.table1 tr:hover,.table2 tr:hover,.table3 tr:hover{
  background:#fefae9;
}
.padge-box-right {
  width: 100%;
  text-align: right;
  display: inline-block;
  padding: 3%;
}
.ivu-page-item-active {
  background-color: #ffc900;
  border-color: #ffc900;
}
.ivu-page-item:hover {
  border-color: #ffc900;
}
</style>
<script>
import {usermoney, cansettle, withdrawals, settling, settled} from '@/service/home'
export default {
  data () {
    return {
      tabs: [
        {name: '入账流水'},
        {name: '提现处理中'},
        {name: '提现完成'}
      ],
      tableshow: [true, false, false],
      moneyinfo: '',
      table1: [],
      table2: [],
      table3: [],
      tototalcount1: 10,
      totalcount2: 10,
      totalcount3: 10,
      tab1: true,
      tab2: false,
      tab3: false
    }
  },
  mounted () {
    this.getUserMoney()
    this.getCansettle()
    this.getSettling()
    this.getSettled()
  },
  methods: {
    getUserMoney () {
      let params = {}
      usermoney(params).then((res) => {
        this.moneyinfo = res.data.data
      })
    },
    getCansettle () {
      let params = {}
      let pagestr = '?pageNum=' + 1
      cansettle(params, pagestr).then((res) => {
        console.log(res.data.data.page)
        this.table1 = res.data.data.page
        this.totalcount1 = res.data.data.totalCount
      })
    },
    getSettling () {
      let params = {}
      let pagestr = '?pageNum=' + 1
      settling(params, pagestr).then((res) => {
        this.table2 = res.data.data.page
        this.totalcount2 = res.data.data.totalCount
      })
    },
    getSettled () {
      let params = {}
      let pagestr = '?pageNum=' + 1
      settled(params, pagestr).then((res) => {
        this.table3 = res.data.data.page
        this.totalcount3 = res.data.data.totalCount
      })
    },
    settlemoney () {
      let params = {}
      withdrawals(JSON.stringify(params)).then((res) => {
        alert(res.data.desc)
      })
    },
    change1 (page) {
      let params = {}
      let pagestr = '?pageNum=' + page
      cansettle(params, pagestr).then((res) => {
        this.table1 = res.data.data.page
        this.totalcount1 = res.data.data.totalCount
      })
    },
    change2 (page) {
      let params = {}
      let pagestr = '?pageNum=' + page
      settling(params, pagestr).then((res) => {
        this.table2 = res.data.data.page
        this.totalcount2 = res.data.data.totalCount
      })
    },
    change3 (page) {
      let params = {}
      let pagestr = '?pageNum=' + page
      settled(params, pagestr).then((res) => {
        this.table3 = res.data.data.page
        this.totalcount3 = res.data.data.totalCount
      })
    },
    showtabl1 () {
      this.tab1 = true
      this.tab2 = false
      this.tab3 = false
      this.tableshow[0] = true
      this.tableshow[1] = false
      this.tableshow[2] = false
    },
    showtabl2 () {
      this.tab1 = false
      this.tab2 = true
      this.tab3 = false
      this.tableshow[0] = false
      this.tableshow[1] = true
      this.tableshow[2] = false
    },
    showtabl3 () {
      this.tab1 = false
      this.tab2 = false
      this.tab3 = true
      this.tableshow[0] = false
      this.tableshow[1] = false
      this.tableshow[2] = true
    }
  }
}
</script>
