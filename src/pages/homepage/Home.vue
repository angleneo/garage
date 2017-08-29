<template>
  <div class="home">
          <leftmenu class="leftm"></leftmenu>
    <div class="main">
          <div class='headinfo'>
            <div class="yourposition">
              <img src="../../assets/images/gps-icon.png" alt="">您的位置：{{routename}}
             <span class="home-left" v-goto="'门店信息'"><img src="../../assets/images/user-icon.png" >百希特心0008-唐山大兵</span>
            </div>
            <div class="setting">
               <ul>
                 <li class="right"><a> <img src="../../assets/images/sign-icon.png" >退出</a> </li>
                 <li class="right"><a><img src="../../assets/images/password-icon.png" >修改密码</a>  </li>
                 <li class="right"><a><img src="../../assets/images/set-up-icon.png" >设置</a>  </li>
                 <li class="right"><a v-goto="'结算'"> <img src="../../assets/images/wallet-icon.png" >账单</a> </li>
               </ul>
            </div>
          </div>
          <router-view class="viewMap"></router-view>
          <div class="clearfix"></div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import leftmenu from '@/components/noresuable/leftmenu'
export default {
  name: 'home',
  components: {
    leftmenu
  },
  data () {
    return {
      route: '首页',
      routename: '首页'
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  },
  watch: {
    '$route' (to, from) {
      this.route = this.$route.name
      this.routename = this.route
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@wid:48.5%;
@hei:70px;
@bgc:#343940;
@brs:10px;
@font-size:18px;
@color-wihte:#fff;
a{color:@color-wihte;}
.home-left{padding-right:20px;
  white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;
  text-align:center; width:280px;
  float:right;
  cursor:pointer;
}
.clearfix{
  content:'';
  display:block;
  clear:both;
}
.yourposition{
  padding-left: 20px;
  margin: 10px 0;
  float: left;
  width:@wid;
  height:@hei;
  background:@bgc;
  border-radius:@brs;
  -webkit-border-radius:@brs;
  display:inline-block;
  color:@color-wihte;
  text-align:left;
  line-height: 70px;
  font-size:@font-size;
  margin-right:2%;
}
.yourposition img,.setting img{
  margin: -5px 13px -5px 0px;
  width: 28px;
  height:28px;
  overflow: hidden;
}

.setting{
  padding:0 20px;
  margin: 10px 0;
  float: left;
  width:@wid;
  height:@hei;
  background:@bgc;
  border-radius:@brs;
  -webkit-border-radius:@brs;
  display:inline-block;
  line-height: 70px;
  text-align:left;
  font-size:@font-size;
  color:@color-wihte;

}
.li-w{
  min-width:200px;
}
.clearbox{
  content:'';
  clear:both;
  display:block;
}
.home{
  width:100%;
  height:auto;
  overflow:hidden;
}
.leftm{
  display: inline-block;
  min-width: 150px;
  width: 13%;
  background: #343841;
  border-radius: 20px;
  margin-left: -12px;
  vertical-align: top;
  padding-bottom: 2000px;
  margin-bottom: -2000px;
}
.main{
  float:right;
  width:86%;
  height:100%;
  display: inline-block;
  padding-bottom: 2000px;
  margin-bottom: -2000px;
}
.headinfo{
  width:100%;
  height:75px;
}
.viewMap{
  width:100%;
  height:100%;
  margin:10px auto;
  border-radius:10px;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/*a {
  color: #42b983;
}*/
  .right{
    float:right;
  }
  .left{
    float:left;
  }
</style>
