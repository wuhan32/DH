<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/login/logo.png" alt />
    </div>
    <div class="denglu">
      <input type="text" placeholder="用户名" v-model="userName" />
      <input :type="changepas" placeholder="密码" v-model="password" />
      <button @click="login">登录</button>
      <van-icon name="user-o" class="icon-user" />
      <van-icon name="lock" class="icon-bag" />
      <div class="icon-eye">
        <van-icon name="eye-o" class="icon-eye-one" v-show="!iconfontEye" @click="iconfontP" />
        <van-icon name="closed-eye" class="icon-closed" v-show="iconfontEye" @click="iconfontP" />
      </div>
    </div>
  </div>
</template>

<script>
import { Notify, Toast } from 'vant'

export default {
  data () {
    return {
      changepas: 'password',
      iconfontEye: true,
      userName: '',
      password: ''
    }
  },
  created () {
    // var hasEnter = localStorage.getItem('hasEnter')
    // if (hasEnter == 'true') {
    //   // 进入首页
    //   this.$router.push('/index')
    // }
  },
  methods: {
    iconfontP () {
      this.changepas = this.changepas == 'text' ? 'password' : 'text'
      this.iconfontEye = !this.iconfontEye
    },
    login () {
      if (!this.userName) {
        Notify({ type: 'primary', message: '请输入用户名!' })
        return
      }
      if (!this.password) {
        Notify({ type: 'primary', message: '请输入密码!' })
        return
      }
      const toast = Toast.loading({
        mask: true,
        message: '登录中...',
        duration: 0
      })

      var url = this.GLOBA.serverSrc + 'userinfo/appLogin'
      let param = new URLSearchParams()
      //param.append('token', this.GLOBA.token)
      param.append('userName', this.userName)
      param.append('passWord', this.$md5(this.password))
      this.$http
        .post(url, param)
        .then(response => {
         //console.log(response)
          toast.clear()
          if (response.data.data != null && response.data.data.user != null) {
            let user = response.data.data.user
            let token = response.data.data.token
            localStorage.setItem('userInfo', JSON.stringify(user))
            localStorage.setItem('hasEnter', true)
            localStorage.setItem('token', token)
           
            // 进入主页
            this.$router.push('/home')
          } else {
            Toast.fail('账号或密码错误!!');
          }
        })
        .catch(error => {
          //console.log("123",error);
          
          toast.clear()
          if (error.message.indexOf('timeout') != -1) {
            Toast.fail('请求超时!请更换网络!');
          } else if (error.message.indexOf('code') != -1) {
            Toast.fail('账号或密码错误!!');
          } else {
            Toast.fail('连接异常!');
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>

.login {
  height: 100%;
  position:fixed;
  background-color: #fff;
}
.logo {
  width: 212px;
  height: 75px;
  margin: 0 auto;
  margin-top: 130px;
  img {
    width: 100%;
    height: 100%;
  }
}
.denglu {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  position: relative;
  touch-action: none;
  .icon-user {
    font-size: 20px;
    color: #409eff;
    position: absolute;
    top: 43px;
    left: 52px;
  }
  .icon-bag {
    font-size: 20px;
    color: #409eff;
    position: absolute;
    top: 124px;
    left: 52px;
  }
  .icon-eye {
    font-size: 20px;
    position: absolute;
    top: 122px;
    right: 50px;
  }
  button {
    margin: 0 auto;
    margin-top: 40px;
    width: 80%;
    height: 55px;
    background-color: #409eff;
    border: none;
    border-radius: 55px;
    text-align: center;
    color: #fff;
    font-size: 20px;
  }
  input {
    width: 80%;
    height: 50px;
    padding-left: 40px;
    border-radius: 50px;
    margin: 0 auto;
    margin-top: 30px;
    border: 1px solid #eee;
    font-size: 16px;
    box-sizing: border-box;
  }
}
</style>
