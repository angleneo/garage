<template>
	<div class="vehicle-box">
    <div class="vehicle-title">
      <span class="search-box"><input type="text" placeholder="请输入车牌号"> <img src="../../assets/images/search-icon.png" alt="" class="img-pa"></span>
      <div class="search-btn" v-goto="'添加车辆'">添加车辆</div>
    </div>
    <!-------------------工单管理---------------->
    <div class="order-table">
      <table  cellpadding="0" cellspacing="0">
        <tbody>
        <tr>
          <th>序号</th>
          <th>车牌号码</th>
          <th>车主姓名</th>
          <th>联系方式</th>
          <th>最后到店时间</th>
          <th>下次保养／维修里程</th>
          <th>品牌</th>
          <th>车系</th>
          <th>排量</th>
          <th>生产年份</th>
        </tr>
        <tr v-for="(car, item) in carlist">
          <td>{{item+1}}</td>
          <td><a v-goto="'车辆详情'">{{car.license}}</a></td>
          <td>{{car.username}}</td>
          <td>{{car.userphone}}</td>
          <td>{{car.lastcome}}</td>
          <td>{{car.kilometre}}公里</td>
          <td>{{car.brand}}</td>
          <td>{{car.carseries}}</td>
          <td>{{car.displacement}}</td>
          <td>{{car.yearproduction}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!----------------分页---------------------->
    <div class="padge-box-right"><Page :total="100" show-elevator></Page></div>

  </div>
</template>
<style>
  .ivu-page-item-active {
    background-color: #ffc900;
    border-color: #ffc900;
  }
  .ivu-page-item:hover {
    border-color: #ffc900;
  }
</style>

<script>
export default {
  data () {
    return {
      carlist: [
        {license: '冀BP555A', username: '于先生', userphone: '18712882222', lastcome: '17.2.25', kilometre: '2000', brand: 'jeep', carseries: '牧马人', displacement: '2.0', yearproduction: '2016年'},
        {license: '冀BP555A', username: '于先生', userphone: '18712882222', lastcome: '17.3.25', kilometre: '2020', brand: 'jeep', carseries: '牧马人', displacement: '2.0', yearproduction: '2016年'},
        {license: '冀BP555A', username: '于先生', userphone: '18712882222', lastcome: '15.2.25', kilometre: '1000', brand: 'jeep', carseries: '牧马人', displacement: '2.0', yearproduction: '2026年'},
        {license: '冀BP555A', username: '于先生', userphone: '18712882222', lastcome: '17.2.25', kilometre: '5000', brand: 'jeep', carseries: '牧马人', displacement: '2.0', yearproduction: '2017年'}
      ]
    }
  }
}
</script>
