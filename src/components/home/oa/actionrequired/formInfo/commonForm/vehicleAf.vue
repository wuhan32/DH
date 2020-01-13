<template>
  <div>车辆申请</div>
</template>

<script>
export default {
  data() {
    return {
      processInstanceId: this.$route.params.processInstanceId
    };
  },
  created() {
      console.log("2",this.$route.params.processInstanceId);
      this.vehicle()
  },
  methods: {
    vehicle() {
      var url = this.GLOBA.serverSrc + "vehicleapplyrecord/formLoad?";
      let param = new URLSearchParams();
      param.append("processInstanceId", this.processInstanceId);
      this.$http.post(url, param).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>