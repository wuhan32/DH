<template>
  <van-panel title="申请表单" status>
    <ul class="tasksInfo">
      <li>
        <span>申请编号</span>
        <span>{{ res.applyno }}</span>
      </li>
      <li>
        <span>岗位</span>
        <span>{{ res.post }}</span>
      </li>
      <li>
        <span>开始时间</span>
        <span>{{ res.starttime }}</span>
      </li>
      <li>
        <span>结束时间</span>
        <span>{{ res.endtime }}</span>
      </li>
      <li>
        <span>请假天数</span>
        <span>{{ res.days }}</span>
      </li>
      <li>
        <span>请假类型</span>
        <span>{{ res.vacationtype }}</span>
      </li>
      <li>
        <span>事由</span>
        <span>{{ res.reason }}</span>
      </li>
      <li>
        <span>联系方式</span>
        <span>{{ res.contactinformation }}</span>
      </li>
      <li>
        <span>工作代处理人</span>
        <span>{{ res.handler }}</span>
      </li>
    </ul>
  </van-panel>
</template>

<script>
export default {
  data() {
    return {
      businessId: this.$route.query.businessId,
      res: []
    };
  },
  created() {
    this.vehicle();
  },
  methods: {
    vehicle() {
      var url = this.GLOBA.serverSrc + "vacationapply/formLoad"; //请假申请
      let param = new URLSearchParams();
      param.append("id", this.businessId);
      this.$http.post(url, param).then(res => {
        this.res = res.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tasksInfo {
  padding: 0 10px;
  margin-bottom: 10px;
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    line-height: 30px;
    :nth-child(1) {
      font-size: 14px;
      color: #8c999f;
      margin: 5px;
    }
    :nth-child(2) {
      font-size: 13px;
      color: #323233;
      margin: 5px;
    }
  }
}
</style>