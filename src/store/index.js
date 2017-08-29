import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  userinfo: null, // 用户信息
  cars: null,
  carinfo: null,
  selectedCarname: null,
  selectedCarmodel: null,
  selectedDisplacement: null,
  selectYear: null
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
