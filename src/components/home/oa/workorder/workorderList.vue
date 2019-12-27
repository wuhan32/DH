<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>工单</span>
    </div>
    <div>
      <van-cell title="请假申请" is-link to="/askforleaveform"></van-cell>
      <van-cell title="外出申请" is-link to="/gooutform"></van-cell>
      <van-cell title="印章申请" is-link to="/sealform"></van-cell>
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
