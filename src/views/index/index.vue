<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color	="#025E80">
      <van-tabbar-item name="0" @click="switchTo('/home')" >
        <van-icon class="iconfont" class-prefix="icon" name="product-cate"/>
        <p>首页</p>
      </van-tabbar-item>
      <van-tabbar-item name="1" @click="switchTo('/mail')">
        <van-icon class="iconfont" class-prefix="icon" name="ums" />
        <p>通讯录</p>
      </van-tabbar-item>
      <van-tabbar-item name="2"  @click="switchTo('/msg')">
        <van-icon class="iconfont" class-prefix="icon" name="order" />
        <p>消息</p>
      </van-tabbar-item>
      <van-tabbar-item name="3"  @click="switchTo('/information')">
        <van-icon class="iconfont" class-prefix="icon" name="xinwen-laiyuan" />
        <P>资讯</P>
      </van-tabbar-item>
      <van-tabbar-item name="4"   @click="switchTo('/user')">
        <van-icon class="iconfont"  class-prefix="icon" name="yonghu1" />
        <P>我的</P>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  created () {
    var active = localStorage.getItem('active')
    if (active != null) {
      this.active = active
    } else {
      this.active = 0
    }
   //console.log('created:', this.active)
  },
  methods: {
    switchTo (path) {
      localStorage.setItem('active', this.active)
     //console.log(this.active)
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="less">
P {
  margin: 0;
  padding: 0;
  margin-top: 4px;
}
.van-tabbar-item  {
  text-align: center;
}
.van-tabbar {
  touch-action: none;
}
</style>
