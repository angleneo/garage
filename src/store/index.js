import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  tokenid: null,
  userinfo: null, // 用户信息
  cars: null,
  carid: null,
  carsact: null,
  cartree: null,
  carinfo: null,
  selectedCarname: null,
  selectedCarmodel: null,
  selectedDisplacement: null,
  selectYear: null,
  cityparts: [],
  bxtsinfo: [],
  addparts: [],
  orderlistinfo: [],
  choosecarinfo: '',
  suppletime: null,
  cityaddress: ''
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
