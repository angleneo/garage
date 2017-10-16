<template>
  <div class="edit-order" >
    <div class="order-title">
      <ul>
        <li >
           <span class="search-box"><input type="text" placeholder="请输入供应商名称" v-model="gysname"></span>
        </li>
        <li>
          <Select v-model="model2" style="width:160px;margin:0 10px;"size='large'  placeholder="选择收货状态">
            <Option v-for="item in statuslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li>
          <Select v-model="model3" style="width:160px;margin:0 10px;"size='large'  placeholder="选择结算方式">
            <Option v-for="item in paylist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </li>
        <li><span class="search-btn" @click="searchonegys">查找</span></li>
        <li><span class="search-btn" v-goto="'新建采购单'">增加采购单</span></li>
      </ul>
    </div>
    <!------------------------------>
    <!-------------------工项列表---------------->
    <div class="order-box" style="margin: -10px auto !important; padding-top:20px;">
      <div class="order-table">
        <table  cellpadding="0" cellspacing="0">
          <div class="tablebox"  v-if="cgdlists.length==0 && (!initSearch)">
            <img src="../../assets/images/purchasing-icon.png">
          </div>
          <div class="table-no" v-if="cgdlists.length==0 && initSearch">
              <span >当前无搜索结果</span>
          </div>
          <tbody>
          <tr>
            <th>采购单编号/时间</th>
            <th>供应商名称</th>
            <th>采购金额合计</th>
            <th>结算方式</th>
            <th>采购单状态</th>
            <th>收货状态</th>
          </tr>
          <tr v-for="(cgd, item) in cgdlists" :key="item">
            <td style="text-indent:left;">
              <div><a v-goto="'采购单详情'" data-key="id" :data-value="cgd.id">{{cgd.id}}</a></div>
              <div>创建时间：{{cgd.createTime}}</div>
              <div>收货时间：{{cgd.arrivalTime}}</div>
            </td>
            <td>{{cgd.supplierCompanyName}}</td>
            <td>￥{{cgd.totalAmount | money}}</td>
            <td>{{cgd.payType | statementType}}</td>
            <td>{{cgd.status | purchastatus}}</td>
            <td>{{cgd.receiveStatus | receivestatus}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!----------------分页---------------------->
      <div class="padge-box-right"><Page :total="pgacount" @on-change="change" show-elevator></Page></div>
    </div>
  </div>
</template>
<style scoped>
  .p-time{
    text-align: left; text-indent: 26px;
  }
  .ivu-select-large .ivu-select-item {
    padding: 7px 16px 8px;
    font-size: 14px!important;
    width: 100%;
    text-align: center;
  }
  .order-table table th {
    background: #fdedb1;
    text-align: left;
    line-height: 60px;
    color: #333;
    width: 0;
    text-indent: 0;
  }
  .order-table td{
     text-align: left; 
     text-indent: 38px;
      padding-left:0;
  }
  .order-table div{ 
    line-height:32px;
    white-space: normal;
    /*width: 267px;*/ 
    text-align: left;
  }
  .edit-order {
    width: 99% !important;
    margin: 0 !important;
    margin-top: 20px !important;
    text-align: left;

  }
  .order-title{
    padding:10px ;
    text-align:left;
    line-height:40px;
    padding-left:40px;
    display: grid;
    background:#fff;
    border-radius:10px;
  }
  .order-title ul li{
    float: left;
    padding:0 10px;
    line-height: 36px;
  }
  .search-box {
    width: 300px;
    border-radius:5 px;
    border: @border-line01;
    height: 36px;
    line-height: 36px;
    position: relative;
    display: inline-block;
    padding-left: 10px;
    margin-right: 10px;
  }

  .search-box input{
    border:none;
    height:31px;
    width:280px;
    color:@color-gary;
    border-radius:@mb - 5;
  }
  .search-box img{
    position:absolute;
    right:10px;
    top:5px;
    z-index:999;
  }
  .order-box {
    width:100% !important;
    height: auto !important;
    background: #ffffff;
    border-radius: 10px;
    padding-bottom: 20px;
    margin: 20px 0 !important;
  }
  .order-table {
    display: inline-block;
    margin-top:0px!important;
    width: 100%;
    float: left;
  }
  .ivu-page-item-active {
    background-color: #ffc900;
    border-color: #ffc900;
  }
  .ivu-page-item:hover {
    border-color: #ffc900;
  }
  .order-table table a {
    text-decoration: underline;
    color: #f3a340;
    letter-spacing: 1.2px;
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
    padding: 2% 0;
    top:60px;
    left:0;
    width:100% !important;
    z-index:100;
    background:white;
    text-align: center !important;
  }
    .table-no{
    padding: 2% 0;
    width:100%;
    z-index:100;
    top:60px;
    position: absolute;
    background:white;
    text-align: center !important;
  }
</style>
<script>
import moment from 'moment'
import {purchaselist} from '@/service/purchas'
export default {
  data () {
    return {
      statuslist: [
        {
          value: '0',
          label: '未收货'
        },
        {
          value: '1',
          label: '部分收货'
        },
        {
          value: '2',
          label: '全部收货'
        }
      ],
      paylist: [
        {
          value: '0',
          label: '现结'
        },
        {
          value: '1',
          label: '月结'
        }
      ],
      gysname: '',
      model2: '',
      model3: '',
      pgacount: 10,
      cgdlists: [],
      initSearch: false
    }
  },
  mounted () {
    this.getPurchaselist()
  },
  methods: {
    getPurchaselist () {
      let pagestr = '?pageNum=' + 1
      let params = {supplierCompanyName: this.gysname, receiveStatus: this.model2, payType: this.model3}
      purchaselist(JSON.stringify(params), pagestr).then((res) => {
        this.cgdlists = res.data.data.page
        this.pgacount = res.data.data.totalCount
        if (this.cgdlists[0]) {
          this.tablebg = false
        } else {
          this.tablebg = true
        }
      })
    },
    receptTime (expectedArrivalTime, arriveTime) {
      if (arriveTime) {
        return arriveTime
      } else {
        return moment(expectedArrivalTime).format('YYYY-MM-DD')
      }
    },
    change (page) {
      let pagestr = '?pageNum=' + page
      let params = {supplierCompanyName: this.gysname, receiveStatus: this.model2, payType: this.model3}
      purchaselist(JSON.stringify(params), pagestr).then((res) => {
        this.cgdlists = res.data.data.page
        this.pgacount = res.data.data.totalCount
      })
    },
    searchonegys (initSearch = false) {
      this.initSearch = initSearch
      let pagestr = '?pageNum=' + 1
      let params = {supplierCompanyName: this.gysname, receiveStatus: this.model2, payType: this.model3}
      purchaselist(JSON.stringify(params), pagestr).then((res) => {
        this.cgdlists = res.data.data.page
        this.pgacount = res.data.data.totalCount
      })
    }
  }
}
</script>
