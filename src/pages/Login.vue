<template>
  <div class="Login">
    <div class="signbox">
      <strong>达欧门店管理系统</strong>
      <div class="sign">
        <div class="user"><input type="text" placeholder="请输入您的用户名" v-model="username"></div>
        <div class="pwd"><input type="password" placeholder="请输入密码" v-model="password"></div>
        <button class="signbtn" @click="Signin">登 录</button>
        <Alert type="error" show-icon v-show="err" style="margin:20px auto;z-index:999;">
          <span slot="desc" style="font-size:20px;color:Red;">
            {{errmsg}}
          </span>
        </Alert>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '../service/users'
import md5 from 'js-md5'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      err: false,
      errmsg: ''
    }
  },
  methods: {
    Signin () {
      let params = { acc: this.username, pwd: md5(this.password) }
      if (this.username === '') {
        this.err = true
        this.errmsg = '请输入用户名'
        return false
      }
      getToken(JSON.stringify(params)).then((res) => {
        if (res.data.result === 0) {
          let cook = res.data.data
          this.$cookie.set('login', cook)
          this.$router.push({ path: '/Home' })
        } else {
          this.err = true
          this.errmsg = '账号或密码错误!'
          if (this.err === true) {
            setTimeout(() => {
              this.err = false
            }, 2000)
          }
        }
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import './../assets/css/public.less';
@base: pink;
h1,
h2 {
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

table {
  margin: 0 auto;
}

.errors {
  width: 350px;
  height: 200px;
  margin: 0 auto;
}

.Login {
  width: 100%;
  height: 100%;
  background: url('../assets/images/loginbg.png');
  background-position: 50% 50% center;
  background-size: cover;
  position: relative;
}

.signbox {
  width: 485px;
  height: 542px;
  border-radius: 10px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: -271px;
}

strong {
  width: 335px;
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 70px auto 0;
  font-size:41px;
  color: #90bdd0;
  font-family: "Noto Sans CJK SC", "Source Han Sans CN";
}

.sign {
  width: 335px;
  margin: 70px auto 0;
}

.user {
  width: 335px;
  height: 40px;
  background: #f2f8fb;
  margin-bottom: 15px;
}

.pwd {
  width: 335px;
  height: 40px;
  background: #f2f8fb;
  margin-top: 15px;
}

input {
  width: 100%;
  height: 100%;
  background: #f2f8fb;
  border: none;
  display: block;
  text-indent: 60px;
  font-size: 14px;
  color: #999999;
}

.user input {
  background: url('../assets/images/icon-user.png') center left no-repeat;
}

.pwd input {
  background: url('../assets/images/icon-password.png') center left no-repeat;
}

.signbtn {
  width: 335px;
  height: 45px;
  border-radius: 5px;
  background: #f3a340;
  color: white;
  border: none;
  margin-top: 45px;
  outline: none;
  font-size: 16px;
  cursor: pointer;
}
</style>
