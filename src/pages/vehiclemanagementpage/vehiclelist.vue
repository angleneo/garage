<template>
	<div class="vehicle-box">
    <form @submit.prevent="validateBeforeSearchcar">
    <div class="vehicle-title">
    <ul>
      <li><span class="search-box"><input type="text" placeholder="请输入车牌号或联系方式" v-model="vcp"> </span>
      </li>
     <li><div class="search-btn" @click="searchcar">查找车辆</div></li>
      <li><div class="search-btn" v-goto="'添加车辆'">添加车辆</div></li>
    </ul>
    </div>
  </form>
    <!-------------------工单管理---------------->
    <div class="order-table" style="padding-top:20px;">
      <table  cellpadding="0" cellspacing="0">
        <div class="tablebox" v-if="tablebg">
          <img src="../../assets/images/vehiclelist-icon.png">
        </div>
        <div class="tablebox" v-if="tablebg2">
           <span >当前无搜索结果</span>
        </div>
        <tbody>
        <tr>
          <th>序号</th>
          <th>车牌号码</th>
          <th>车主姓名</th>
          <th>联系方式</th>
          <th>最后进厂时间</th>
          <th>下次保养／维修里程数</th>
          <th>品牌</th>
          <th>车系</th>
          <th>排量</th>
          <th>生产年份</th>
        </tr>
        <tr v-for="(car, item) in cars">
          <td>{{(item+1)+ (page-1) * pgsize}}</td>
          <td style="min-width: 120px;"><a v-goto="'车辆详情'" data-key="id" :data-value="car.id">{{car.code}}</a></td>
          <td>{{car.name}}</td>
          <td>{{car.phone}}</td>
          <td>{{car.maintaintime}}</td>
          <td>{{car.nextmileage}}</td>
          <td>{{car.brandname}}</td>
          <td>{{car.linename}}</td>
          <td>{{car.displacement}}</td>
          <td>{{car.produceyear}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!----------------分页---------------------->
    <div class="padge-box-right"><Page :total="totalNum"  @on-change="change" show-elevator></Page></div>

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
  .vehicle-title ul li {
    float:left;
    margin:0 10px;
  }
  .clearfix{
    content:'';
    display:block;
    clear:both;
  }
  .order-table table {
    width: 100%;
    font-size: 16px;
    border-collapse: collapse;
    margin-bottom: 20px;
    position: relative;
  }
  .tablebox{
    padding: 2% 0;
    position:absolute;
    top:60px;
    left:0;
    width:100%;
    z-index:100;
    text-align: center;
    background:white;
  }
</style>

<script>
import {carlists} from '@/service/carmanage'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      cars: [],
      pgsize: 10,
      pgNum: 1,
      vcp: '',
      totalNum: 10,
      carid: '',
      page: 1,
      tablebg: true,
      tablebg2: false
    }
  },
  computed: {
    ...mapState(['tokenid'])
  },
  mounted () {
    this.getCarlists()
  },
  methods: {
    getCarlists () {
      let params = '&likename='
      let pagestr = '?pageNum=' + 1
      carlists(params, pagestr).then((res) => {
        this.cars = res.data.data.carList
        this.totalNum = res.data.data.totalcount
        if (this.cars[0]) {
          this.tablebg = false
        } else {
          this.tablebg = true
        }
      })
    },
    searchcar (item) {
      let params = '&likename=' + this.vcp
      let pagestr = '?pageNum=' + 1
      carlists(params, pagestr).then((res) => {
        this.cars = res.data.data.carList
        this.totalNum = res.data.data.totalcount
        console.log(this.cars)
        if (this.cars[0]) {
          this.tablebg2 = false
        } else {
          this.tablebg2 = true
        }
      })
    },
    change (page) {
      let params = '&likename=' + this.vcp
      let pagestr = '?pageNum=' + page
      this.page = page
      carlists(params, pagestr).then((res) => {
        this.cars = res.data.data.carList
        this.totalNum = res.data.data.totalcount
      })
    }
  }
}
</script>
