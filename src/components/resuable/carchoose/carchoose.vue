<template>
    <!-------------以上基本信息-------------------->
   <div>
	    <div class="add-car-bg billing-border">
      <div class="car-choice-title">
        <img src="../../../assets/images/tips-car-icon.png" alt="">
        选择车型
      </div>
      <div class="step-box">
        <ul v-for="(progress,index) in progresses" :key="index">
          <li :class='{active:ind===index}'>{{progress.name}}</li>
        </ul>
      </div>
      <div class="box-enter" >
        <div class="hot-pro" v-show="hidehot">
          <ul v-for="(sort, item) in sorts" :key="item">
            <li><a @click="getAlpha(item)" v-bind:class="{'active01':alphaIndex === item}">{{sort.alpha}}</a></li>
          </ul>
        </div>

        <div class="pro-list"  v-show="step[0]">
          <ul v-for="(car, item) in carmodellist" :key="item">
            <li @click="stepjump(item)"><img :src="getImgUrl(car.logoUrl)" style=""><span>{{car.name}}</span></li>
          </ul>
        </div>
      </div>
      <div class="box-enter">

        <div class="have-tips" v-show="selectedVehicle">
          <span class="have-left">已选车型</span>
          <ul v-for="(car, item) in vehicle" :key="item">
            <li  class="have-border"  @click="clearcarinfo(item)">{{car.carname}}{{car.carmodel}}{{car.displacement}}{{car.productionyear}} <span><Icon type="close"></Icon></span></li>
          </ul>
        </div>

        <div class="pro-list"  v-show="step[1]">
          <ul v-for="(car, item) in carmodellist2" :key="item">
            <li @click="stepjump2(item)">{{carmodellist2[item]}}</li>
          </ul>
        </div>

        <div class="pro-list"  v-show="step[2]">
          <ul v-for="(car, item) in carmodellist3" :key="item">
            <li @click="stepjump3(item)">{{carmodellist3[item]}}</li>
          </ul>
        </div>

        <div class="pro-list"  v-show="step[3]">
          <ul v-for="(car, item) in carmodellist4" :key="item">
            <li @click="stepjump4(item)">{{carmodellist4[item]}}</li>
          </ul>
        </div>
      </div>

      <div class="com-mcenc" v-show="btnshow">
        <div class="complete01" v-on:click="sendMsgToParent">确认添加车辆信息</div>
      </div>
    </div>
   </div>
</template>
<script>
import {cartree, carline, cardisplacement, carproduction, addcar} from '@/service/carmanage'
import {mapState} from 'vuex'
import {imageServerUrl} from '../../../config/env'
import {cityList} from '../../../config/cityList'
export default {
  data () {
    return {
      carinfo: '点击选择车型',
      sorts: [
        {alpha: '热门'},
        {alpha: 'A'},
        {alpha: 'B'},
        {alpha: 'C'},
        {alpha: 'D'},
        {alpha: 'E'},
        {alpha: 'F'},
        {alpha: 'G'},
        {alpha: 'H'},
        {alpha: 'I'},
        {alpha: 'J'},
        {alpha: 'K'},
        {alpha: 'L'},
        {alpha: 'M'},
        {alpha: 'N'},
        {alpha: 'O'},
        {alpha: 'P'},
        {alpha: 'Q'},
        {alpha: 'R'},
        {alpha: 'S'},
        {alpha: 'T'},
        {alpha: 'U'},
        {alpha: 'V'},
        {alpha: 'W'},
        {alpha: 'X'},
        {alpha: 'Y'},
        {alpha: 'Z'}
      ],
      treemsg: [],
      model1: '',
      carNum: '',
      caruser: '',
      caruserphone: '',
      vinNum: '',
      ind: 0,
      alphaIndex: 0,
      hidehot: true,
      selectedVehicle: false,
      vehicle: [],
      carinfomsg: [],
      addcarmsg: false,
      progresses: [
      {name: '选择品牌'},
      {name: '选择车系'},
      {name: '选择排量'},
      {name: '生产年份'}
      ],
      cityList: cityList,
      carmodellist: [],
      carmodellist2: [],
      carmodellist3: [],
      carmodellist4: [],
      line2: '',
      step: [
        true, false, false, false
      ],
      btnshow: false
    }
  },
  computed: {
    ...mapState(['tokenid'])
  },
  mounted () {
    this.getCarTree()
  },
  methods: {
    getCarTree () {
      let params = {}
      cartree(JSON.stringify(params)).then((res) => {
        this.$store.state.cartree = res.data.data.brandMap
        this.carmodellist = this.$store.state.cartree.hot
        this.sorts = []
        this.sorts.push({alpha: '热门'})
        for (let key of res.data.data.keyList) {
          this.sorts.push({alpha: key})
        }
      })
    },
    getImgUrl (url) {
      return imageServerUrl + url
    },
    savecarmsg () {
      let params = {code: this.model1 + this.carNum, userName: this.caruser, userPhone: this.caruserphone, brandName: this.$store.state.selectedCarname, lineName: this.$store.state.selectedCarmodel, displacement: this.$store.state.selectedDisplacement, productionYear: this.$store.state.selectYear}
      addcar(JSON.stringify(params)).then((res) => {
        if (res.data.result === 0) {
          this.$Message.error('添加成功!')
        } else {
          alert(res.data.result)
        }
      })
    },
    showaddcar () {
      this.addcarmsg = true
      this.carmodellist = this.$store.state.cartree.hot
    },
    getAlpha (item) {
      this.alphaIndex = item
      const load = (cc = this.sorts[item].alpha) => {
        if (item === 0) {
          this.carmodellist = this.$store.state.cartree.hot
        } else {
          this.carmodellist = this.$store.state.cartree[cc]
        }
      }
      load()
    },
    closeaddcar () {
      this.addcarmsg = false
    },
    stepjump (item) {
      this.carmodellist2 = []
      let params = {brandId: this.carmodellist[item].id}
      carline(JSON.stringify(params)).then((res) => {
        this.carmodellist2 = res.data.data
      })
      this.$store.state.selectedCarname = this.carmodellist[item].name
      this.vehicle.push({carname: this.$store.state.selectedCarname})
      this.step[0] = false
      this.step[1] = true
      this.ind++
      this.hidehot = false
      this.selectedVehicle = true
      this.btnshow = false
    },
    stepjump2 (item) {
      this.carmodellist3 = []
      this.line2 = this.carmodellist2[item]
      let params = {modelName: this.line2}
      cardisplacement(JSON.stringify(params)).then((res) => {
        this.carmodellist3 = res.data.data
      })
      this.$store.state.selectedCarmodel = this.carmodellist2[item]
      this.vehicle.push({carmodel: this.$store.state.selectedCarmodel})
      this.step[1] = false
      this.step[2] = true
      this.ind++
      this.btnshow = false
    },
    stepjump3 (item) {
      this.carmodellist4 = []
      this.$store.state.selectedDisplacement = this.carmodellist3[item]
      this.vehicle.push({displacement: this.$store.state.selectedDisplacement})
      let params = {modelName: this.$store.state.selectedCarmodel, displacement: this.carmodellist3[item]}
      carproduction(JSON.stringify(params)).then((res) => {
        this.carmodellist4 = res.data.data
      })
      this.step[2] = false
      this.step[3] = true
      this.ind++
      this.btnshow = false
    },
    stepjump4 (item) {
      this.$store.state.selectYear = this.carmodellist4[item]
      if (this.carmodellist4[item]) {
        this.vehicle.splice(3, 1, {productionyear: this.$store.state.selectYear})
      } else {
        this.vehicle.push({productionyear: this.$store.state.selectYear})
      }
      this.btnshow = true
    },
    clearcarinfo (item) {
      if (item === 0) {
        this.vehicle = []
        this.step[0] = true
        this.step[1] = false
        this.step[2] = false
        this.step[3] = false
        this.hidehot = true
        this.selectedVehicle = false
        this.alphaIndex = 0
        this.getAlpha(0)
      }
      if (item === 1) {
        this.vehicle.splice(item, 4 - item)
        this.step[0] = false
        this.step[1] = true
        this.step[2] = false
        this.step[3] = false
        this.hidehot = false
        this.selectedVehicle = true
      }
      if (item === 2) {
        this.vehicle.splice(item, 4 - item)
        this.step[0] = false
        this.step[1] = false
        this.step[2] = true
        this.step[3] = false
        this.hidehot = false
        this.selectedVehicle = true
      }
      if (item === 3) {
        this.vehicle.splice(item, 4 - item)
        this.step[0] = false
        this.step[1] = false
        this.step[2] = false
        this.step[3] = true
        this.hidehot = false
        this.selectedVehicle = true
      }
      this.ind = item
    },
    submission () {
      this.$store.state.choosecarinfo = ''
      this.$store.state.choosecarinfo = this.vehicle[0].carname + this.vehicle[1].carmodel + this.vehicle[2].displacement + this.vehicle[3].productionyear
      this.addcarmsg = false
    },
    sendMsgToParent () {
      this.$store.state.choosecarinfo = ''
      this.$store.state.choosecarinfo = this.vehicle[0].carname + '-' + this.vehicle[1].carmodel + '-' + this.vehicle[2].displacement + '排量' + '-' + this.vehicle[3].productionyear + '年生产'
      this.addcarmsg = false
      this.$emit('listenToChildEvent', this.$store.state.choosecarinfo)
      this.clearcarinfo(0)
    }
  }
}
</script>
<style scoped lang='less'>
  .active01{
    color:#fff;
    background:#ffc900;
  }
.com-mcenc{
  margin: 20px auto;
  text-align:center;
}
.complete01{
  margin:0 auto;
}
.add-car-bg .pro-list li {
  width: 22.5%;
  float: left;
  margin: 10px;
  border: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  position: relative;
}
.pro-list li span{
  position: absolute;
  left:45%;
}
.pro-list li img { 
    padding: 0px 0px;
    width: 36px;
    height: 36px;
    -webkit-filter: 1;
    filter: 1;
    vertical-align: middle;
    margin-bottom: 4px;
    margin-right: 10px;
    position: absolute;
    top: 6px;
    left: 15%;
}
</style>
