<template>
  <div class='enterp'>
    <div class="phone-box">
      <div class="car-title">
        <img src="../../assets/images/01-icon.png" alt="">
        <h3>车主信息</h3>
      </div>
      <form @submit.prevent="validateBeforeSubmit">
        <div class="car-phone">
          <ul>
            <li><img src="../../assets/images/phone-icon.png" alt=""></li>
            <li>手机号</li>
            <li>
              <input name="phone" v-model.trim="phone" v-validate="'required|numeric|max:11|min:11'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="请输入11位手机号">
              <button class="search-btn-new">搜索</button>
            </li>
            <li>
              <span v-show="errors.has('phone')" style="color:red;">{{ errors.first('phone') }}</span>
            </li>
          </ul>
        </div>
      </form>
      <div class="car-card" v-show="showcarcard">
        <div class="card-list">
          <ul v-for="(card, item) in carcardlist" :key="item">
            <li @click="onActiveCar(item)" v-bind:class="{'cardborder':inde === item}">
              <p class="font16 color-gary">{{card.name}}</p>
              <p class="font24">{{card.code}}</p>
              <div class="font16">
                <i>
                  <nobr>{{card.brandname}} - {{card.linename}} - {{card.displacement}} - {{card.produceyear}}年产</nobr>
                </i>
              </div>
            </li>
          </ul>
        </div>
        <div class="card-list-add" :class="{cardactive: cardac}" @click="showaddcar">
          <img src="../../assets/images/add-icon.png" alt="">
          <p>添加车辆</p>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>

    <div class="add-car-bg billing-border" v-show="addcarmsg">
      <form @submit.prevent="validateBeforeSubmit2">
        <div class="title-add">添加车辆信息:</div>
        <div class="close" @click="closeaddcar"><img src="../../assets/images/close-icon.png" alt=""></div>
        <div class="add-car">
          <ul>
            <li>* 车牌号码:
              <Select v-model="model2" style="width:100px">
                <Option style="width:80px;text-align:center;font-size:16px;height:30px;line-height:30px;" v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
              <input placeholder="请输入车牌号" v-model="carnumber" style="width: 120px;height:32px;border-radius: 5px;border:1px solid lightgray;text-transform:uppercase;text-indent:7px;" v-validate="'required|max:7|min:6'" :class="{'input': true, 'is-danger': errors.has('carnum') }" name="carnum">
              <span v-show="errors.has('carnum')" style="color:red;">{{ errors.first('carnum') }}</span>
            </li>
            <li>* 车主姓名:
              <input type="text" placeholder="请输入车主姓名" 
                style="width: 150px;height:32px;border:1px lightgray solid;border-radius:5px;text-indent:7px;" 
                v-model="uname" 
                :disabled="dis" 
                v-validate="'required|max:20|min:2'" 
                :class="{'input': true, 'is-danger': errors.has('车主姓名') }" 
                name="车主姓名">
              <span v-show="errors.has('车主姓名')" style="color:red;">{{ errors.first('车主姓名') }}</span>
            </li>
          </ul>

          <div class="clearfix"></div>
          <div class="pro-input clearfix">
            <span style=" width:48px; text-align: right; display: inline-block ;height: 20px; line-height: 20px; vertical-align:top; margin-top:5px;">* 品牌:</span>
            <span style="width:60%;height:30px;text-indent:5px;border:1px solid #dddee1;border-radius:5px;display:inline-block;line-height:30px;" @click="showaddcarchoose">{{carchooseinfo}}</span>
          </div>
        </div>
        <button class="search-btn" style="margin:20px auto;display:block" v-show="addthiscar">添加此车辆</button>
      </form>
      <choosecar v-show="carchoose" v-on:listenToChildEvent="showMsgFromChild2"></choosecar>

    </div>
  </div>
</template>
<style>
input {
  border-radius: 1px;
}

.cardactive {
  border: none;
  -webkit-box-shadow: 1px 2px 10px #fdd43a;
  -moz-box-shadow: 1px 2px 10px #fdd43a;
  box-shadow: 1px 2px 10px #fdd43a;
}

.cardborder {
  border: #ffba14 6px solid;
}

.card-list div i {
  font-style: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 250px;
  display: inline-block;
}
</style>
<script>
import { carlistall, addcar } from '@/service/carmanage'
import choosecar from '../../components/resuable/carchoose/carchoose'
import {cityList} from '../../config/cityList'
export default {
  components: {
    choosecar
  },
  data () {
    return {
      addthiscar: false,
      carchoose: true,
      showcarcard: false,
      uname: '',
      phone: '',
      dis: false,
      carnumber: '',
      cardac: false,
      model2: '',
      ind: 0,
      inde: 0,
      hidehot: true,
      selectedVehicle: false,
      carcardlist: [],
      vehicle: [],
      carinfomsg: [],
      progresses: [
        { name: '选择品牌' },
        { name: '选择车系' },
        { name: '选择排量' },
        { name: '生产年份' }
      ],
      cityList: cityList,
      carmodellist: [],
      carmodellist2: [],
      carmodellist3: [],
      carmodellist4: [],
      addcarmsg: false,
      step: [
        true, false, false, false
      ],
      completebtn: false,
      carchooseinfo: ''
    }
  },
  computed: {
    toupdatecase () {
      return this.carnumber.toUpperCase()
    }
  },
  methods: {
    onActiveCar (item) {
      this.inde = item
      this.$store.commit('submissionbtn')
      this.$store.state.carinfo = this.carcardlist[item]
    },
    showaddcar () {
      this.carchooseinfo = ''
      this.carnumber = ''
      this.model2 = ''
      this.addcarmsg = true
      this.carchhose = true
      this.cardac = true
      let params = '&likename=' + this.phone
      let pagestr = '?pageNum=' + 1
      this.dis = false
      this.uname = ''
      carlistall(params, pagestr).then((res) => {
        for (let i = 0; i < res.data.data.carList.length; i++) {
          if (res.data.data.carList[i].name) {
            this.dis = true
            this.uname = res.data.data.carList[i].name
          } else {
            this.dis = false
          }
        }
      })
    },
    addthiscarinfo () {
      let params = {
        userName: this.uname,
        userPhone: this.phone,
        brandName: this.$store.state.selectedCarname,
        code: this.model2 + this.carnumber,
        displacement: this.$store.state.selectedDisplacement,
        lineName: this.$store.state.selectedCarmodel,
        productionYear: this.$store.state.selectYear
      }
      addcar(JSON.stringify(params)).then((res) => {
        if (res.data.result === 0) {
          let params = '&likename=' + this.phone
          let pagestr = '?pageNum=' + 1 + '&pageSize=' + 1000
          carlistall(params, pagestr).then((res) => {
            this.carcardlist = res.data.data.carList
            if (this.carcardlist) {
              this.$store.state.carinfo = this.carcardlist[0]
            }
            this.addcarmsg = false
          })
        } else {
          this.$Message.error(res.data.desc)
        }
      })
    },
    closeaddcar () {
      this.addcarmsg = false
      this.cardac = false
    },
    showMsgFromChild2 (data) {
      this.carchooseinfo = ''
      this.carchooseinfo = data
      this.carchoose = false
      this.addthiscar = true
    },
    showaddcarchoose () {
      this.addthiscar = false
      this.carchoose = true
    },
    validateBeforeSubmit () {
      this.closeaddcar()
      this.$validator.validateAll({ phone: this.phone }).then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.showcarcard = true
          this.$store.commit('submissionbtn')
          let params = '&likename=' + this.phone
          let pagestr = '?pageNum=' + 1 + '&pageSize=' + 1000
          this.dis = false
          this.uname = ''
          carlistall(params, pagestr).then((res) => {
            this.carcardlist = res.data.data.carList
            if (this.carcardlist) {
              this.$store.state.carinfo = this.carcardlist[0]
            }
          })
          return
        }
        this.btndis = false
      })
    },
    validateBeforeSubmit2 () {
      this.$validator.validateAll({ carnum: this.carnumber, name: this.uname }).then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.addthiscarinfo()
          return
        }
        this.$Message.error('请输入车牌号及车主姓名！')
      })
    }
  }
}
</script>

