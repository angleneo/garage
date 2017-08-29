<template>
	<div class='leftm'>
		<div class="menu-title">达欧社群门店系统</div>
		<ul v-for='(paths,item) in rpath'>
      <li @click='changebg(item)' v-bind:class="{'active':ind === item}"><router-link :to="paths.pathd" > <span :class="paths.cl" ></span>{{paths.text}}</router-link></li>
<!--       <li><router-link to="/Home/billing" v-bind:class="{active: isActive}"> <span class="icon billing-icon-on" ></span>开单</router-link></li>
      <li><router-link to="/Home/management"> <span class="icon order-icon-on" ></span>工单管理</router-link></li>
      <li><router-link to="/Home/management"> <span class="icon vehicle-icon-on" ></span>车辆管理</router-link></li>
      <li><router-link to="/Home/management"> <span class="icon parts-icon-on" ></span>配件管理</router-link></li>
      <li><router-link to="/Home/management"> <span class="icon purchase-icon-on" ></span>采购管理</router-link></li> -->
		</ul>
	</div>
</template>
<script>
    export default {
      data () {
        return {
          ind: 0,
          rpath: [
           {pathd: '/Home', cl: 'icon icon-home-on', text: '首页/经营分析'},
           {pathd: '/Home/billing', cl: 'icon billing-icon-on', text: '开单'},
           {pathd: '/Home/worklist', cl: 'icon order-icon-on', text: '工单管理'},
           {pathd: '/Home/vehiclelist', cl: 'icon vehicle-icon-on', text: '车辆管理'},
           {pathd: '/Home/accessory', cl: 'icon parts-icon-on', text: '配件管理'},
           {pathd: '/Home/purchasing', cl: 'icon purchase-icon-on', text: '采购管理'},
           {pathd: '/Home/supplier', cl: 'icon supplier-icon-on', text: '供应商管理'}
          ]
        }
      },
      methods: {
        changebg (item) {
          this.ind = item
        }
  }
}
</script>
<style scoped lang="less">
  @import '../../assets/css/public.less';
.active{
  color:@color-gary;
  background:@bg-yellow;
}
a{
	display: inline-block;
	width:100%;
	height:45px;
	line-height:45px;
  color:#fff;
}
a:hover{
  color:@color-blue;
}
.ivu-menu-item {
    padding-left: 2px;
}
.menu-title{
  /*font:32px/98px #fff 'Microsoft YaHei';*/
  line-height: 98px;
  font-size:22px;
  color:#fff;
  font-family:"Noto Sans CJK SC", "Source Han Sans CN";
}

.leftm li{
  color: @color;
  text-align: center;
  font-size:@font18;
  padding:30px 0 10px 0;
}
.leftm li:hover{
  background:@bg-yellow;
  color:@color-blue !important;
}
  .icon {
    width: @icon-w;
    height: @icon-w;display: block; margin: 0 auto;
  }
</style>
