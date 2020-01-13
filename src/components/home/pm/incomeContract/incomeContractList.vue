<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>收入合同</span>
    </div>
    <div>
      <van-cell title="收入合同" is-link to="/incomeContractForm"></van-cell>
      <van-cell title="合同收款" is-link to="/contractPaymentForm"></van-cell>
      <van-cell title="进度款申报" is-link to="/progressPaymentDeclarationForm"></van-cell>
      <van-cell title="完工结算" is-link to="/completionAndSettlementForm"></van-cell>
      <van-cell title="收入合同变更签证" is-link to="/changeOfIncomeContractForm"></van-cell>
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
