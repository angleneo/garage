<template>
  <div class="Login">
      <div class="signbox">
        <strong>修理厂管理系统</strong>
        <div class="sign">
            <div class="user"><input type="text" placeholder="请输入您的用户名"></div>
            <div class="pwd"><input type="text" placeholder="请输入密码"></div>
            <button class="signbtn" v-goto="'首页'">登   录</button>
        </div>
      </div>
  </div>
</template>

<script>
// import {getToken} from '../service/users'
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  methods: {
    gohome () {
      // let params = {acc: this.username, pwd: this.password}
      // getToken(params).then((res) => {
      //   if (res.data === '0') {
      //     document.cookie = res.data.data
      //     console.log(res.data)
      //     this.$router.push({path: '/Home'})
      //   } else {
      //     this.errors = true
      //     if (this.errors === true) {
      //       setTimeout(() => {
      //         console.log(111)
      //         this.errors = false
      //       }, 2000)
      //     }
      //   }
      // }, (error) => {
      //   console.log(error)
      // })
      // this.$router.push({path: '/Home'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import './../assets/css/public.less';
@base:pink;
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
}

a {
  color: @base;
}
table{
  margin:0 auto;
}
.errors{
  width:350px;
  height:200px;
  margin:0 auto;
}
.Login{
  width:100%;
  height:100%;
  background:url('../assets/images/loginbg.png');
  background-position:50% 50% center;
  background-size:cover;
  position:relative;
}
.signbox{
  width:485px;
  height:542px;
  border-radius:10px;
  margin:0 auto;
  background:rgba(255,255,255,0.8);
  position:absolute;
  top:50%;
  left:0;
  right:0;
  bottom:0;
  margin-top:-271px;
}
strong{
  width:335px;
  height:50px;
  line-height:50px;
  display:block;
  margin:70px auto 0;
  font-size:45px;
  color:#90bdd0;
  font-family:"Noto Sans CJK SC", "Source Han Sans CN";
}
.sign{
  width:335px;
  margin:70px auto 0;
}
.user{
  width:335px;
  height:40px;
  background:#f2f8fb;
  margin-bottom:15px;
}
.pwd{
  width:335px;
  height:40px;
  background:#f2f8fb;
  margin-top:15px;
}
input{
  width:100%;
  height:100%;
  background:#f2f8fb;
  border:none;
  display:block;
  text-indent:60px;
  font-size:14px;
  color:#999999;
}
.user input{
    background:url('../assets/images/icon-user.png') center left no-repeat; 
}
.pwd input{
  background:url('../assets/images/icon-password.png') center left no-repeat;
}
.signbtn{
  width:335px;
  height:45px;
  border-radius:5px;
  background:#f3a340;
  color:white;
  border:none;
  margin-top:45px;
  outline:none;
  font-size:16px;
  cursor: pointer;
}
</style>
