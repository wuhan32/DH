<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>支付</span>
    </div>
    <div>
      <div v-html="html"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderId: this.$route.params.orderId,
      html: ""
    };
  },
  methods: {
    prev() {
      this.$router.go(-2); // 返回上一层
    },
    fetchVideoPay() {
      //去支付
      var url = this.GLOBA.serverSrc + "orderinfo/aliPay";
      let param = new URLSearchParams();
      param.append("id", this.orderId); //订单id
      this.$http
        .post(url, param)
        .then(res => {
          console.log("支付详情： ", res);
          this.html = res.data;
          this.$nextTick(() => {
            document.forms[0].submit(); //渲染支付宝支付页面
          });
        })
        .catch(error => {});
    }
  },
  mounted() {
    this.fetchVideoPay();
  }
};
</script>
<style scoped lang="less">
.page {
  height: 100%;
  width: 100%;
  background-color: #f5f6f7;
  margin-top: 56px;

  .van-icons {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }

  .van-cell-group {
    background-color: #f5f6f7;
  }
}
</style>

