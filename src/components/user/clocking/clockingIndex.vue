<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#025E80">
      <van-tabbar-item name="clock" @click="switchTo('/clock')">
        <van-icon name="edit" />
        <p>签到</p>
      </van-tabbar-item>
      <van-tabbar-item name="clocking" @click="switchTo('/clocking')">
        <van-icon name="wap-nav" />
        <p>查询</p>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'clock'
    }
  },
  created () {
    this.active = 'clock'
    localStorage.setItem('active2', 'clock')
  },
  methods: {
    switchTo (path) {
      localStorage.setItem('active2', this.active)
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="less">
p {
  margin: 0;
  padding: 0;
  margin-top: 4px;
}
.van-tabbar-item {
  text-align: center;
}
.van-tabbar {
  touch-action: none;
}
</style>
