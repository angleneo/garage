<template>
	<div class="edit-order">
    <div class="vehicle-detail">
      <ul>
        <li> <span class="search-box"><input type="text" placeholder="请输入供应商名称" ></span></li>
        <li> <span class="search-btn">查找</span></li>
        <li> <span class="search-btn" v-goto="'添加供应商'">添加供应商</span></li>
        <li><span class="search-btn">最近交易的供应商</span></li>
      </ul>
    </div>
    <!---------------以上搜索---------------------->
    <!-------------------工项列表---------------->
    <div class="order-box">
    <div class="order-table">
      <table  cellpadding="0" cellspacing="0">
        <tbody>
        <tr>
          <th>序号</th>
          <th colspan='2'>供应商名称</th>
          <th>联系人</th>
          <th>联系方式</th>
          <th>结算方式</th>
          <th>最后一次交易时间</th>
        </tr>
        <tr v-for="(car, item) in carlist">
          <td>{{item+1}}</td>
          <td>{{car.license}}</td>
          <td></td>
          <td>{{car.username}}</td>
          <td>{{car.userphone}}</td>
          <td>{{car.lastcome}}</td>
          <td>{{car.lasttimer}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!----------------分页---------------------->
    <div class="padge-box-right"><Page :total="100" show-elevator></Page></div>
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
  background:url('../../assets/images/search-icon.png') center right no-repeat;
  }
</style>
  <script>
  export default {
    data () {
      return {
        value: '',
        btnmsg: '点击修改',
        carlist: [
          {license: '空调滤清器', username: '张扬', userphone: '12332332415', lastcome: '现结', lasttimer: '2017.07.20'},
          {license: '空调滤清器', username: '张扬', userphone: '12332332415', lastcome: '现结', lasttimer: '2017.07.20'},
          {license: '空调滤清器', username: '张扬', userphone: '12332332415', lastcome: '现结', lasttimer: '2017.07.20'},
          {license: '空调滤清器', username: '张扬', userphone: '12332332415', lastcome: '现结', lasttimer: '2017.07.20'}
        ],
        model1: ''
      }
    },
    methods: {
    }
  }
</script>
