<template>
  <div>
    <router-view></router-view>
    <van-tabbar class="tabbar" v-model="active" active-color	="#00A047">
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
    
  },
  beforeMount(){
    var actives = localStorage.getItem('active');
    if (actives != null||actives!="") {
      this.active = actives;
    } else {
      this.active = 0;
    }
  },
  methods: {
    switchTo (path) {
      localStorage.setItem('active', this.active);
      this.$router.replace(path);
    },
    backButton () {//点击返回键时实现的业务逻辑
    },
  },
   mounted(){
    //监听返回键
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.backButton, false);//false阻止默认事件 
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.backButton, false);//false阻止默认事件
  },
  
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
  background-color: #F7F7F7;
  color: #080808;
}
.van-tabbar {
  touch-action: none;
}
</style>
