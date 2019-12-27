<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>行政办公</span>
    </div>
    <div>
      <van-cell title="车辆申请" is-link to="/carapplylist"></van-cell>
      <van-cell title="车辆分派" is-link to="/carassignform"></van-cell>
      <van-cell title="信息发布" is-link to="/message"></van-cell>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {},
  beforeMount () {},
  mounted () {},
  beforeDestroy () {},
  methods: {
    prev () {
      this.$router.go(-1) // 返回上一层
    }
  }
}
</script>
<style scoped lang="less">
.page {
  margin-top: 56px;
  .home-head {
  }
  .van-icons {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }
}
</style>
