<template>
  <div class="actionrequiredlist">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>个人事务</span>
    </div>
    <div>
      <van-cell title="待办任务" is-link to="/taskList"></van-cell>
      <van-cell title="已办任务" is-link to="/hastasksList"></van-cell>
      <van-cell title="我的流程" is-link to="/myprocessList"></van-cell>
      <van-cell title="待签流程" is-link to="/mydraftList"></van-cell>
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
.actionrequiredlist {
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
