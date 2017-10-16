<template>
	<div class="edit-order">
    <div class="vehicle-detail">
      <ul>
        <li> <span class="search-box"><input type="text" placeholder="请输入供应商名称/联系人名称/联系电话" v-model="gysname"></span></li>
        <li> <span class="search-btn" @click="getsupplier()">查找</span></li>
        <li> <span class="search-btn" v-goto="'添加供应商'">添加供应商</span></li>
        <li><span class="search-btn" @click="getlastsupplier">最近交易的供应商</span></li>
      </ul>
    </div>
    <!---------------以上搜索---------------------->
    <!-------------------工项列表---------------->
    <div class="order-box" >
    <div class="order-table" style="padding-top:20px;">
      <table  cellpadding="0" cellspacing="0">
        <div class="tablebox" v-if="supplier.length==0 && initSearch">
          <img src="../../assets/images/supplier-bg-icon.png">
        </div>
        <div class="table-no" v-if="supplier.length==0 && (!initSearch)"><span>当前无搜索结果</span></div>
        <tbody>
        <tr>
          <th>序号</th>
          <th colspan='2'>供应商名称</th>
          <th>联系人</th>
          <th>联系方式</th>
          <th>结算方式</th>
          <th>最后一次交易时间</th>
        </tr>
        <tr v-for="(car, item) in  supplier" :key="item">
          <td>{{(item+1)+(page-1) * pgsize}}</td>
          <td><a v-goto="'供应商详情'" data-key="id" :data-value="car.id">{{car.name}}</a></td>
          <td></td>
          <td>{{car. contactName}}</td>
          <td>{{car.contactPhone}}</td>
          <td>{{car.statementType==0?'现结':'月结'}}</td>
          <td>{{car.lastTradeTime}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!----------------分页---------------------->
      <div class="padge-box-right"><Page :current="page" :total="totolnum"  show-elevator @on-change="change"></Page></div>
    </div>
  </div>
</template>
<style scoped>
  .vehicle-detail {
    text-align: left;
    background: #ffffff;
    line-height: 60px;
    border-radius: 10px;
    padding-left:40px;
  }
  .vehicle-detail li{
    padding:0 10px;
    float: left;
  }
  .padge-box-right {
    width: 100%;
    text-align: right;
    display: inline-block;
    padding-right: 3%;
  }
  .order-box {
    width: 100% !important;
    height: auto !important;
    background: #ffffff;
    border-radius: 10px;/*
    padding-bottom: 20px;*/
    margin: 20px 0 !important;
  }
  .order-table{
    display: inline-block;
    margin-top: 0px;
    width: 100%;
    float: left;
    background:#fff;
    padding-bottom: 20px;
  }
  .ivu-page-item-active {
    background-color: #ffc900;
    border-color: #ffc900;
  }
  .ivu-page-item:hover {
    border-color: #ffc900;
  }
  .search-btn{
    min-width:120px;
  }
  .search-box input{
    line-height: 31px;
    width: 280px;
  background:url('../../assets/images/search-icon.png') center right no-repeat;
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
  }
  .bxttable table {
    position:relative;
  }
  .table-no{
    padding: 2% 0;
    width:100%;
    z-index:100;
    top:60px;
    position: absolute;
    background:white;

  }
</style>
<script>
  import {supplierlist} from '@/service/supplier'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        supplier: [],
        totolnum: 10,
        pgsize: 10,
        modelstatus: '',
        datarange: '',
        lasttrade: '',
        gysname: '',
        page: 1,
        initSearch: false
      }
    },
    computed: {
      ...mapState(['tokenid'])
    },
    mounted () {
      this.getsupplier(true)
    },
    methods: {
      getsupplier (initSearch = false) {
        this.initSearch = initSearch
        this.page = 1
        let params = {likename: this.gysname, lasttrade: 0}
        let pagestr = '?pageNum=' + this.page
        supplierlist(JSON.stringify(params), pagestr).then((res) => {
          this.supplier = res.data.data.list
          this.totolnum = res.data.data.totalcount
        })
      },
      getlastsupplier () {
        this.page = 1
        let params = {likename: this.gysname, lasttrade: 1}
        let pagestr = '?pageNum=' + this.page
        supplierlist(JSON.stringify(params), pagestr).then((res) => {
          this.supplier = res.data.data.list
          this.totolnum = res.data.data.totalcount
        })
      },
      change (page) {
        let params = {likename: this.gysname, lasttrade: 1}
        let pagestr = '?pageNum=' + page
        this.page = page
        supplierlist(JSON.stringify(params), pagestr).then((res) => {
          this.supplier = res.data.data.list
          this.totolnum = res.data.data.totalcount
        })
      }
    }
  }
</script>
