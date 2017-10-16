<template>
	<div class="edit-order">
    <form @submit.prevent="validateBeforeSubmit">
    <div class="vehicle-detail" style="padding-left:20px;">
       * <Select v-model="model1" style="width:100px;margin:0;text-align:center;"  placeholder="请选择省份">
        <Option v-for="item in cityList" :value="item.value" :key="item.value" style="text-align:center;width:80px;height:30px;font-size:18px;">{{ item.label }}</Option>
      </Select>
      <input v-model="carNum" placeholder="请输入车牌号" style="margin:0 20px 0 0;width: 120px;height:32px;border-radius: 5px;border:1px solid lightgray;text-transform:uppercase;text-indent:7px;" v-validate="'required|max:7|min:6'" :class="{'input': true, 'is-danger': errors.has('carnum') }" name="carnum">
      <span v-show="errors.has('carnum')" style="color:red;">{{ errors.first('carnum') }}</span>
      <button class="search-btn">保存</button>
    </div>
    <!----------------以上车牌号信息---------------------------->
    <div class="datail-new">
      <h5>基本信息：</h5>
          <div class="add-datail">
            <ul>
              <li><span>* 车主姓名：</span> <Input v-model="caruser" placeholder="请填写车主姓名" style="width:200px"  v-validate="'required|max:20|min:2'" 
                :class="{'input': true, 'is-danger': errors.has('车主姓名') }" 
                name="车主姓名"
                ></Input>
              <div v-show="errors.has('车主姓名')" style="color:red;  width:100%;text-align: left; margin-left:70px;">{{ errors.first('车主姓名') }}</div>
              </li>
              <li><span>* 联系方式：</span> <Input v-model="caruserphone" placeholder="请填写车主手机号" style="width:200px"  v-validate="'required|numeric|max:11|min:11'" name="phone"></Input>
                <div v-show="errors.has('phone')" style="color:red;  width:100%; text-align: left; margin-left:70px;">{{ errors.first('phone') }}</div>
              </li>
              <li><span>VIN码：</span> <Input v-model="vinNum" placeholder="请填写车辆VIN码..." style="width:200px"></Input></li>
              <li @click="showaddcar"><span>* 车型：</span><span style="width:780px;height:45px;border:lightgray 1px solid;text-align:left;text-indent:10px;color:#999;" v-validate="'required|max:20|min:1'" name="车型">
              {{carinfomsg}}
              </span>
              <span v-show="errors.has('车型')" style="color:red;">{{ errors.first('车型') }}</span>
            </li>
            </ul>
          </div>
    </div>
    <!-------------以上基本信息-------------------->
    <choosecar v-if="addcarmsg"  v-on:listenToChildEvent="showMsgFromChild"></choosecar>
  </form>
	</div>
</template>

<script>
import {cartree, carline, cardisplacement, carproduction, addcar} from '@/service/carmanage'
import {mapState} from 'vuex'
import choosecar from '../../components/resuable/carchoose/carchoose.vue'
import {cityList} from '../../config/cityList'
export default {
  components: {
    choosecar
  },
  data () {
    return {
      carinfo: '点击选择车型',
      treemsg: [],
      model1: '',
      carNum: '',
      caruser: '',
      caruserphone: '',
      vinNum: '',
      ind: 0,
      hidehot: true,
      selectedVehicle: false,
      vehicle: [],
      carinfomsg: '',
      addcarmsg: false,
      cityList: cityList
    }
  },
  computed: {
    ...mapState(['tokenid']),
    toupdatecase () {
      return this.carNum.toUpperCase()
    }
  },
  mounted () {
    this.getCarTree()
  },
  methods: {
    getCarTree () {
      let params = {}
      cartree(JSON.stringify(params)).then((res) => {
        this.$store.state.cartree = res.data.data.brandMap
      })
    },
    savecarmsg () {
      let params = {code: this.model1 + this.carNum, userName: this.caruser, userPhone: this.caruserphone, brandName: this.$store.state.selectedCarname, lineName: this.$store.state.selectedCarmodel, displacement: this.$store.state.selectedDisplacement, productionYear: this.$store.state.selectYear, vinCode: this.vinNum}
      addcar(JSON.stringify(params)).then((res) => {
        if (res.data.result === 0) {
          this.$Message.success('添加车辆成功！')
          this.$router.push({name: '车辆管理'})
        } else {
          this.$Message.error(res.data.desc)
        }
      })
    },
    showaddcar () {
      this.addcarmsg = true
      this.carmodellist = this.$store.state.cartree.hot
    },
    getAlpha (item) {
      const load = (cc = this.sorts[item].alpha) => {
        this.carmodellist = this.$store.state.cartree[cc]
      }
      load()
    },
    closeaddcar () {
      this.addcarmsg = false
    },
    stepjump (item) {
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
      let params = {lineId: this.carmodellist2[item].id}
      cardisplacement(JSON.stringify(params)).then((res) => {
        this.carmodellist3 = res.data.data
      })
      this.$store.state.selectedCarmodel = this.carmodellist2[item].name
      this.vehicle.push({carmodel: this.$store.state.selectedCarmodel})
      this.step[1] = false
      this.step[2] = true
      this.ind++
      this.btnshow = false
    },
    stepjump3 (item) {
      this.$store.state.selectedDisplacement = this.carmodellist3[item]
      this.vehicle.push({displacement: this.$store.state.selectedDisplacement})
      let params = {lineId: this.carmodellist2[item].id, displacement: this.carmodellist3[item]}
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
      if (this.carmodellist4[item].year) {
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
    showMsgFromChild (data) {
      this.carinfomsg = data
      this.addcarmsg = false
    },
    validateBeforeSubmit () {
      this.$validator.validateAll({carnum: this.carNum, 车主姓名: this.caruser, phone: this.caruserphone, 车型: this.carinfomsg}).then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.savecarmsg()
          return
        }
        this.$Message.error('请输入正确的车辆信息！')
      })
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
        position: relative;
        & span {
            width: 70px;
            text-align: right;
            display: inline-grid;
            float: left;
          }
      }
  }
</style>
