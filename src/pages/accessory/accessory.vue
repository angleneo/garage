<template>
	<div class="edit-order">
    <div class="vehicle-detail">
      <ul>
        <li> <span class="search-box"><input type="text" v-validate="'required|email'" name="email" placeholder="请输入配件名称"> <img src="../../assets/images/search-icon.png" alt="" class="img-pa"></span><span v-show="errors.has('email')"  style="color:red;">{{ errors.first('email') }}</span></li>
        <li>      <Select v-model="model1" style="width:300px" size="large">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select></li>

        <li> <span class="search-btn">查找</span></li>
        <li> <span class="search-btn" v-goto="'添加配件'">添加配件</span></li>
        <li><span class="search-btn" @click="changestatus">{{btnmsg}}</span></li>
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
          <th>配件名称</th>
          <th>配件品牌</th>
          <th>规格型号</th>
          <th>配件分组</th>
          <th>库存数量</th>
          <th>成本价格</th>
          <th>销售价格</th>
        </tr>
        <tr v-for="(car, item) in carlist">
          <td>{{item+1}}</td>
          <td>{{car.license}}</td>
          <td>{{car.username}}</td>
          <td>{{car.userphone}}</td>
          <td>{{car.lastcome}}</td>
          <td> <input type="text" v-model="car.kilometre" :disabled="disabled" class="searchinput"></td>
          <td><input type="text" v-model="car.brand" :disabled="disabled" class="searchinput"></td>
          <td><input type="text" v-model="car.carseries" :disabled="disabled" class="searchinput"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <!----------------分页---------------------->
    <div class="padge-box-right"><Page :total="100" show-elevator></Page></div>
    </div>
  </div>
</template>
<style>
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
  .searchinput{
    width:100px;
    height:35px;
    border:1px solid lightgray;
    text-indent:5px;
  }
</style>
  <script>
  export default {
    data () {
      return {
        value: '',
        btnmsg: '点击修改',
        carlist: [
          {license: '空调滤清器', username: '百希特', userphone: 'BFAC-VW04', lastcome: '常规保养', kilometre: '0', brand: '0', carseries: '0'},
          {license: '空调滤清器', username: '百希特', userphone: 'BFAC-VW04', lastcome: '常规保养', kilometre: '0', brand: '0', carseries: '0'},
          {license: '空调滤清器', username: '百希特', userphone: 'BFAC-VW04', lastcome: '常规保养', kilometre: '0', brand: '0', carseries: '0'},
          {license: '空调滤清器', username: '百希特', userphone: 'BFAC-VW04', lastcome: '常规保养', kilometre: '0', brand: '0', carseries: '0'}
        ],
        cityList: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
        model1: '',
        disabled: true
      }
    },
    methods: {
      changestatus () {
        if (this.btnmsg === '点击修改') {
          this.btnmsg = '保存修改'
          this.disabled = false
        } else {
          this.btnmsg = '点击修改'
          this.disabled = true
        }
      }
    }
  }
</script>
