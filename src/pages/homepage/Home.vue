<template>
  <div class="home">
          <leftmenu class="leftm"></leftmenu>
    <div class="main">
          <div class='headinfo'>
            <div class="yourposition">
              当前模块：{{routename}}
            </div>
            <div class="setting">
               <ul>
                 <li  class="left"><span  v-goto="'门店信息'" data-key="id"><img src="../../assets/images/user-icon.png" >{{xlcname}}</span></li>
                 <li class="right"  @click="instance"><a> <img src="../../assets/images/sign-icon.png">退出</a> </li>
                <!--- <li class="right"><a><img src="../../assets/images/password-icon.png" >修改密码</a>  </li>
                 <li class="right"><a><img src="../../assets/images/set-up-icon.png" >设置</a>  </li>
                 <li class="right"><a v-goto="'结算'"> <img src="../../assets/images/wallet-icon.png" >账单</a> </li>-->
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
import {getGarageInfo} from '@/service/home'
import {delToken} from '@/service/users'
import {mapState} from 'vuex'
export default {
  name: 'home',
  components: {
    leftmenu
  },
  data () {
    return {
      route: '首页',
      routename: '首页',
      xlcname: ''
    }
  },
  computed: {
    ...mapState(['tokenid'])
  },
  mounted () {
    this.getGarage()
  },
  methods: {
    getGarage () {
      let params = {}
      getGarageInfo(JSON.stringify(params)).then((res) => {
        this.xlcname = res.data.data
      })
    },
    instance () {
      let params = {}
      delToken(JSON.stringify(params)).then((res) => {
        this.$router.push({name: '登录'})
      })
    }
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
  /*margin: 10px 0;*/
  float: left;
  width:29.5%;
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
/*  margin: 10px 0;*/
  float: left;
  width:67.9%;
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
  background: #f9f8f3;
}
.leftm{
  display: inline-block;
  min-width: 150px;
  width: 13%;
  background: #343841;
  border-radius: 20px;
  margin-left: -17px;
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
  cursor: pointer;
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
