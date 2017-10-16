<template>
  <div class='leftm'>
    <div class="menu-title">达欧门店管理系统</div>
    <ul v-for='(paths,index) in rpath' :key="index">
      <li :class="{active:currentIndex == index}">
        <router-link :to="paths.pathd">
          <span :class="currentIndex===index ? paths.selected : paths.cl"></span>
          <span :style="currentIndex===index ? { color: '#000' } : { color: '#fff' }">{{paths.text}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {getSessionStorage, setSessionStorage} from '../../utils/mUtils'
export default {
  data () {
    return {
      ind: -1,
      rpath: [
        { pathd: '/Home', cl: 'icon icon-home-on', selected: 'icon icon-home', text: '首页/经营分析' },
        { pathd: '/Home/billing', cl: 'icon billing-icon-on', selected: 'icon billing-icon', text: '开单' },
        { pathd: '/Home/worklist', cl: 'icon order-icon-on', selected: 'icon order-icon', text: '工单管理' },
        { pathd: '/Home/vehiclelist', cl: 'icon vehicle-icon-on', selected: 'icon vehicle-icon', text: '车辆管理' },
        { pathd: '/Home/accessory', cl: 'icon parts-icon-on', selected: 'icon parts-icon', text: '配件管理' },
        { pathd: '/Home/purchasing', cl: 'icon purchase-icon-on', selected: 'icon purchase-icon', text: '采购管理' },
        { pathd: '/Home/supplier', cl: 'icon supplier-icon-on', selected: 'icon supplier-icon', text: '供应商管理' }
      ]
    }
  },
  computed: {
    currentIndex: function () {
      for (let [index, item] of new Map(this.rpath.map((item, i) => [i, item]))) {
        if (item.pathd === this.$route.path) {
          setSessionStorage('navigator_index', index)
          return index
        }
      }

      this.ind = this.ind >= 0 ? this.ind : getSessionStorage('navigator_index')
      return this.ind
    }
  },
  mounted () {
  },
  updated () {
    this.ind = this.currentIndex
    console.log('current path: ' + this.$route.path + ', index: ' + this.ind)
  },
  methods: {
  }
}
</script>
<style scoped lang="less">
@import '../../assets/css/public.less';
.active {
  color: @color-gary;
  background: @bg-yellow;
}

a {
  display: inline-block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  color: #fff;
}

a:hover {
  color: @color-blue;
}

.ivu-menu-item {
  padding-left: 2px;
}

.menu-title {
  line-height: 98px;
  font-size:22px;
  color: #fff;
  font-family: "Noto Sans CJK SC", "Source Han Sans CN";
}

.leftm li {
  color: @color;
  text-align: center;
  font-size: @font18;
  padding: 30px 0 10px 0;
}

.leftm li:hover {
  background: @bg-yellow;
  color: @color-blue !important;
}

.icon {
  width: @icon-w;
  height: @icon-w;
  display: block;
  margin: 0 auto;
}
</style>
