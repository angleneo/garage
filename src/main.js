// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Vuex from 'vuex'
import store from './store'
import dircts from './directives'
import axios from 'axios'
import echarts from 'echarts'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
import Filters from './filter'
import './assets/css/public.css'
import VueCookie from 'vue-cookie'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.use(VueCookie)
Vue.use(iView)
Vue.use(Vuex)
Vue.use(Filters)
Vue.use(dircts)
Validator.addLocale(zh)
const config = {
  locale: 'zh_CN'
}

router.beforeEach(async (to, from, next) => {
  console.log('test')
  console.log(to.name)
  if ((to.name !== '登录') && (!Vue.cookie.get('login'))) {
    next({name: '登录'})
  }
  next()
})
Vue.use(VeeValidate, config)
const dictionary = {
   zh_CN: {
    messages: {
      carnum: () => '车牌号不正确',
      required: ( field )=> "请输入" + field
    },
    attributes:{
    carnum: '车牌号',
    phone: '手机号码'
    }
  }
}
Validator.updateDictionary(dictionary)
Validator.extend('carnum', {
  messages: {
    zh_CN: field => field + '车牌号不正确',
  },
  validate: value => {
    return value.length === /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{5,6}[挂学警港澳]?$/.test(number)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
