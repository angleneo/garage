<template>
	<div class="edit-order">
    <div class="vehicle-detail">
      <Select v-model="model1" style="width:100px;margin:0 20px;">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Input v-model="value" placeholder="请输入车牌号" style="width:210px;margin-right:20px;"></Input>
      <span class="search-btn">保存</span>
    </div>
    <!----------------以上车牌号信息---------------------------->
    <div class="datail-new">
      <h5>基本信息：</h5>
          <div class="add-datail">
            <ul>
              <li><span>车主姓名：</span> <Input v-model="value" placeholder="请填写车主姓名" style="width:200px"></Input></li>
              <li><span>联系方式：</span> <Input v-model="value" placeholder="请填写车主手机号..." style="width:200px"></Input></li>
              <li><span>VIN码：</span> <Input v-model="value" placeholder="请填写车辆VIN码..." style="width:200px"></Input></li>
              <li @click="showaddcar"><span>车型：</span><span style="width:780px;height:45px;border:lightgray 1px solid;text-align:left;text-indent:10px;color:#999;">
                {{carinfo}}
              </span></li>
            </ul>
          </div>
    </div>
    <!-------------以上基本信息-------------------->
    <div class="add-car-bg billing-border" v-show="addcarmsg">
      <div class="car-choice-title">
        <img src="../../assets/images/tips-car-icon.png" alt="">
        选择车型
      </div>
      <div class="step-box">
        <ul v-for="(progress,index) in progresses">
          <li :class='{active:ind===index}'>{{progress.name}}</li>
        </ul>
      </div>
      <div class="box-enter" >
        <div class="hot-pro" v-show="hidehot">
          <ul>
            <li class="hot">热门</li>
            <li><a>A</a></li>
            <li><a>B</a></li>
            <li><a>C</a></li>
            <li><a>D</a></li>
            <li><a>E</a></li>
            <li><a>G</a></li>
            <li><a>H</a></li>
            <li><a>J</a></li>
            <li><a>K</a></li>
            <li><a>M</a></li>
            <li><a>L</a></li>
            <li><a>N</a></li>
            <li><a>O</a></li>
            <li><a>P</a></li>
            <li><a>Q</a></li>
            <li><a>R</a></li>
            <li><a>S</a></li>
            <li><a>T</a></li>
            <li><a>W</a></li>
            <li><a>X</a></li>
            <li><a>Y</a></li>
            <li><a>Z</a></li>
          </ul>
        </div>

        <div class="pro-list"  v-show="step[0]">
          <ul v-for="(car, item) in carmodellist">
            <li @click="stepjump(item)"><span><img :src="car.img" alt=""></span>{{car.carname}}</li>
          </ul>
        </div>
      </div>
      <div class="box-enter">

        <div class="have-tips" v-show="selectedVehicle">
          <span class="have-left">已选车型</span>
          <ul v-for="(car, item) in vehicle">
            <li  class="have-border"  @click="clearcarinfo(item)">{{car.carname}}{{car.carmodel}}{{car.displacement}}{{car.productionyear}} <span><img src="../../assets/images/sm-close-icon.png" alt=""></span></li>
          </ul>
        </div>


        <div class="pro-list"  v-show="step[1]">
          <ul v-for="(car, item) in carmodellist2">
            <li @click="stepjump2(item)">{{car.carmodel}}</li>
          </ul>
        </div>

        <div class="pro-list"  v-show="step[2]">
          <ul v-for="(car, item) in carmodellist3">
            <li @click="stepjump3(item)">{{car.displacement}}</li>
          </ul>
        </div>

        <div class="pro-list"  v-show="step[3]">
          <ul v-for="(car, item) in carmodellist4">
            <li @click="stepjump4(item)">{{car.year}}</li>
          </ul>
        </div>
      </div>

      <div class="com-mcen">
        <div class="complete01" @click="submission">点击确认</div>
      </div>
    </div>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        carinfo: null,
        model1: '',
        value: '',
        ind: 0,
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
        cityList: [
          {
            value: 'beijing',
            label: '北京市'
          }
        ],
        carmodellist: [
        // 选择品牌
        {img: require('../../assets/images/pro-logo-icon.png'), carname: '别克'},
        {img: require('../../assets/images/pro-logo-icon.png'), carname: '玛莎拉蒂'},
        {img: require('../../assets/images/pro-logo-icon.png'), carname: '宝马'},
        {img: require('../../assets/images/pro-logo-icon.png'), carname: '法拉利'},
        {img: require('../../assets/images/pro-logo-icon.png'), carname: '奇瑞QQ'}
        ],
        carmodellist2: [
        {carmodel: 'MS45'},
        {carmodel: 'SG7'},
        {carmodel: 'a8'},
        {carmodel: 's470'},
        {carmodel: 'NO.1'}
        ],
        carmodellist3: [
        {displacement: '2.0L'},
        {displacement: '2.0L'},
        {displacement: '2.0L'},
        {displacement: '2.0L'},
        {displacement: '2.5L'},
        {displacement: '3.0L'}
        ],
        carmodellist4: [
        {year: '2009'},
        {year: '2029'},
        {year: '2013'}
        ],
        step: [
          true, false, false, false
        ]
      }
    },
    methods: {
      showaddcar () {
        this.addcarmsg = true
      },
      closeaddcar () {
        this.addcarmsg = false
      },
      stepjump (item) {
        this.$store.state.selectedCarname = this.carmodellist[item].carname
        this.vehicle.push({carname: this.$store.state.selectedCarname})
        this.step[0] = false
        this.step[1] = true
        this.ind++
        this.hidehot = false
        this.selectedVehicle = true
      },
      stepjump2 (item) {
        this.$store.state.selectedCarmodel = this.carmodellist2[item].carmodel
        this.vehicle.push({carmodel: this.$store.state.selectedCarmodel})
        this.step[1] = false
        this.step[2] = true
        this.ind++
      },
      stepjump3 (item) {
        this.$store.state.selectedDisplacement = this.carmodellist3[item].displacement
        this.vehicle.push({displacement: this.$store.state.selectedDisplacement})
        this.step[2] = false
        this.step[3] = true
        this.ind++
      },
      stepjump4 (item) {
        this.$store.state.selectYear = this.carmodellist4[item].year
        if (this.carmodellist4[item].year) {
          this.vehicle.splice(3, 1, {productionyear: this.$store.state.selectYear})
        } else {
          this.vehicle.push({productionyear: this.$store.state.selectYear})
        }
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
        this.carinfo = ''
        this.carinfo = this.vehicle[0].carname + this.vehicle[1].carmodel + this.vehicle[2].displacement + this.vehicle[3].productionyear
        this.addcarmsg = false
      }
    }
  }
</script>
<style scoped lang='less'>
  @import '../../assets/css/public.less';
  .add-datail{
    padding-left:5px;
    width:80%;
      & li{
        float: left;
        padding:0  @mb;
        line-height: 50px;
        & span {
            width: 70px;
            text-align: right;
            display: inline-grid;
            float: left;
          }
      }
  }

</style>
