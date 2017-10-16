<template>
	<div class="edit-order">
    <div class="vehicle-detail">
      <ul>
        <li><Input v-model="value" placeholder="请输入配件名称" style="width: 300px" size="large"></Input></li>
        <li> <span class="search-btn" @click="showpj">保存添加</span></li>
      </ul>
    </div>

   <div class="adself" v-show="showzcj">
      <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
        <table   cellpadding="0" cellspacing="0">
          <tr>
            <td>* 选择供应商:</td>
            <td>
                <Select v-model="model1" style="width:300px;margin:0 10px;" size='large'>
                       <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
            </td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td>* 配件名称:</td>
            <td><Input  size="large" placeholder="请输入配件名称" style="width:300px;"></Input></td>
            <td>* 数量:</td>
            <td><Input  size="large" placeholder="请输入采购数量" style="width:300px;"></Input></td>
          </tr>

          <tr>
            <td>* 采购价格:</td>
            <td><Input  size="large" placeholder="请输入采购价" style="width:300px;"></Input></td>
            <td>* 销售价格:</td>
            <td><Input  size="large" placeholder="请输入销售价" style="width:300px;"></Input></td>
          </tr>

          <tr>
            <td>配件品牌:</td>
            <td><Input  size="large" placeholder="请输入配件品牌(选填)" style="width:300px;"></Input></td>
            <td>规格型号:</td>
            <td><Input  size="large" placeholder="请输入规格型号(选填)" style="width:300px;"></Input></td>
          </tr>
        </table>
        <button class="complete" style="height:40px;width:300px;line-height:40px;margin:10px auto;">点击确认</button>
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
          <tr v-for="(car, item) in carlist" :key="item">
            <td>{{item+1}}</td>
            <td>{{car.license}}</td>
            <td>{{car.username}}</td>
            <td>{{car.userphone}}</td>
            <td>{{car.lastcome}}</td>
            <td>{{car.kilometre}}</td>
            <td>{{car.brand}}</td>
            <td>{{car.carseries}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!----------------分页---------------------->
      <div class="padge-box-right"><Page :total="100" show-elevator></Page></div>
    </div>
  </div>
</template>
<style scoped lang="less">
  @import '../../assets/css/public.less';
  @cl-ye:#fdedb1;
  .complete{
    color:white;
    background:#f3a340;
    line-height: @title-h;
  .border-radius;
    background:@color-o;
    outline: none;
    cursor:pointer;
    border:none;
    font-size:18px;
  }
  .parst{
    line-height: @title-h;
    border:@border-line01;
  .border-radius;
    outline: none;
    cursor:pointer;
    font-size:18px;
  }
  .new-li li{
    float: left;
    padding: 0 20px;
    font-size:16px;
  }
  .statusbtn{
  width:100%;
  height:40px;
  padding-left:20px;
}
.statusbtn ul li{
  float:left;
}
  .vehicle-detail {
    text-align: left;
    background: #ffffff;
    line-height: 60px;
    border-radius: 10px;
    padding-left: 40px;
    display: inline-block;
    width: 100%;
  }
  .vehicle-detail li{
    font-size:18px;
    float: left;
    padding-right:20px;
  }
  .depot-h1{
    font-size:24px !important;
    font-weight: bold;
    color:#f3a340;
    margin-right:40px;
  }
  .address-li{
    width:80%;
    font-size:16px;
    padding-left:30px;
  }
  .address-li li{
    line-height:50px;
  }
  .adself{
    width:80%;
    margin:0 auto;
    padding:20px 0 10px;
    background:white;
    border:1px @cl-ye solid;
    position:relative;
  table{
    width:80%;
    margin:10px auto;
  td{
    height:70px;
  }
  td:first-child{
    text-align:right;
  }
  td:nth-child(3){
    text-align:right;
  }
  }
  }
</style>
<script>
export default {
  data () {
    return {
      value: '',
      pjstatus: '常规保养',
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
      showzcj: true,
      zcjno: false,
      zcjact: true
    }
  },
  methods: {
    showpj () {
      this.showzcj = true
    },
    closeaddcar () {
      this.showzcj = false
    },
    addzcjact () {
      this.zcjact = true
      this.zcjno = false
    },
    addactno () {
      this.zcjno = true
      this.zcjact = false
    }
  }
}
</script>
