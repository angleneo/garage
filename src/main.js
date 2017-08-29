// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iView/dist/styles/iview.css'
import Vuex from 'vuex'
import store from './store'
import dircts from './directives'
import axios from 'axios'
import echarts from 'echarts'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
import './assets/css/public.css'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.use(iView)
Vue.use(Vuex)
Vue.use(dircts)
Validator.addLocale(zh)
const config = {
  locale: 'zh_CN'
}
Vue.use(VeeValidate, config)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
