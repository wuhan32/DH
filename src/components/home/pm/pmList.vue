<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>项目管理</span>
    </div>
    <div>
      <van-cell title="项目立项-立项信息登记" is-link to="/initiateForm"></van-cell>
      <van-cell title="收入合同" is-link to="/incomeContractList"></van-cell>
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
  mounted(){
  
  },
  destroyed () {
  },
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
