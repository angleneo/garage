<template>
  <div class='enterp'>
	 <div class="phone-box">
     <div class="car-title">
       <img src="../../assets/images/01-icon.png" alt=""><h3>车主信息</h3>
     </div>

     <div class="car-phone">
       <ul>
         <li><img src="../../assets/images/phone-icon.png" alt=""></li>
         <li>手机号</li>
         <li><input name="phone" v-model="phone" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="Phone"> <button class="search-btn-new">搜索</button> </li>
         <li><i v-show="errors.has('phone')" class="fa fa-warning"></i>
            <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span></li>
         <li v-for="car in carinfomsg">{{car.carname}}  {{car.carmodel}}  {{car.displacement}}  {{car.productionyear}}</li>
       </ul>
     </div>

     <div class="car-card">
       <a  ><div class="card-list">
         <ul>
           <li class="font16 color-gary">张洋</li>
           <li  class="font24">沪A12345</li>
           <li  class="font16">奥迪 - A4L - 1.8T - 2012年生产</li>
         </ul>
       </div>
       </a>
    <a  ><div class="card-list-add" :class="{cardactive: cardac}" @click="showaddcar">
         <img src="../../assets/images/add-icon.png" alt="">
         <p>添加车辆</p>
       </div></a>

     </div>
   </div>

	 <div class="add-car-bg billing-border" v-show="addcarmsg">
     <div class="title-add" >添加车辆信息:</div>
     <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
     <div class="add-car">
       <ul>
         <li>车牌号码
             <Select v-model="model2" style="width:90px">
               <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
             </Select>
             <Input  placeholder="请输入..." style="width: 120px"></Input>
           </li>
         <li>车主姓名：
           <Input  placeholder="请输入..." style="width: 150px"></Input>
         </li>
       </ul>
       <div class="pro-input">品牌：
           <Input  placeholder="请输入..." style="width:750px;"></Input>
       </div>
     </div>
     <!------------以上品牌选择框----------------->
     <div class="car-choice-title">
       <img src="../../assets/images/tips-car-icon.png" alt="">
       选择车型
     </div>
     <!------以下步骤提示------------>
     <div class="step-box">
       <ul v-for="(progress,index) in progresses">
         <li :class='{active:ind===index}'>{{progress.name}}</li>
       </ul>
     </div>
     <!--------以下热门品牌-------->
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
        <!--------------以下品牌列表------------------>
        <div class="pro-list"  v-show="step[0]">
          <ul v-for="(car, item) in carmodellist">
            <li @click="stepjump(item)"><span><img :src="car.img" alt=""></span>{{car.carname}}</li>
          </ul>
        </div>
      </div>
     <div class="box-enter">
      <!-- 已选车型 -->
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


     <!--------------以下确认按钮---------------------->
     <div class="com-mcen">
       <div class="complete01" @click="clickConfirm">点击确认</div>
     </div>
   </div>

  </div>
</template>
<style>
  input{
    border-radius:1px;}
    .cardactive{
      border: none;
  -webkit-box-shadow: 1px 2px 10px #fdd43a;
  -moz-box-shadow: 1px 2px 10px #fdd43a;
  box-shadow: 1px 2px 10px #fdd43a;
    }
</style>
<script>
  export default {
    data () {
      return {
        phone: '',
        cardac: false,
        model2: '',
        ind: 0,
        hidehot: true,
        selectedVehicle: false,
        vehicle: [],
        carinfomsg: [],
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
        {carmodel: '凯越'},
        {carmodel: '劳斯莱斯'},
        {carmodel: '宝马'},
        {carmodel: '玛莎拉蒂'},
        {carmodel: '舒马赫'},
        {carmodel: '法拉利'}
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
        addcarmsg: false,
        step: [
          true, false, false, false
        ]
      }
    },
    methods: {
      showaddcar () {
        this.addcarmsg = true
        this.cardac = true
      },
      closeaddcar () {
        this.addcarmsg = false
        this.cardac = false
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
      clickConfirm () {
        this.$store.state.carinfo = this.vehicle
        this.carinfomsg = this.$store.state.carinfo
        this.addcarmsg = false
        console.log(this.carinfomsg)
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
      validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // eslint-disable-next-line
            alert('From Submitted!')
            return
          }
          alert('Correct them errors!')
        })
      }
    }
  }
</script>

