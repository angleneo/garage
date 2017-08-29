<template>
	<div class="edit-order">
    <div class="vehicle-detail">

      <ul>
        <li class="depot-h1">百希特汽车服务中心0008-唐山大兵</li>
        <li>客户经理：宋建峰</li>
        <li><span class="search-btn">保存修改</span></li>
      </ul>
    </div>

    <div class="datail-new">
      <h5>基本信息：</h5>
      <table class="usertable">
        <tr>
          <td>联系人:</td>
          <td>寇静</td>
          <td>联系方式:</td>
          <td>1582301852</td>
        </tr>
        <tr>
          <td>持卡人:</td>
          <td> <Input v-model="value" placeholder="请输入..." style="width: 210px"></Input></td>
        </tr>
        <tr>
          <td>银行卡号:</td>
          <td> <Input v-model="value2" placeholder="请输入..." style="width: 210px"></Input></td>
        </tr>
      </table>
    </div>

    <div class="datail-new">
      <h5>地址信息：</h5>
      <cityparts></cityparts>
    </div>
  </div>
</template>
<style>
  .address-li span{
    width: 100px;
    text-align: right;
    display: inline-block;
  }
  .usertable{
    display:block;
    min-width:400px;
  }
  .usertable td{
    height:50px;
  }
  .usertable td:first-child{
    text-align:right;
    width:100px;
  }
  .usertable td:nth-child(2){
    text-align:left;
    width:100px;
    padding-left:20px;
  } 
  .usertable td:nth-child(3){
    text-align:right;
    width:100px;
  }  
  .usertable td:last-child{
    text-align:left;
    padding-left:20px;
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
</style>
<script>
import cityparts from '../../components/resuable/cityparts/cityparts'
export default {
  components: {
    cityparts
  },
  data () {
    return {
      value: '',
      value2: '',
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
      model1: ''
    }
  }
}
</script>
