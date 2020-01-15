<template>
  <van-panel title="申请表单" status>
    <ul class="tasksInfo">
      <li>
        <span>申请编号</span>
        <span>{{ res.applyrecordno }}</span>
      </li>
      <li>
        <span>申请人名称</span>
        <span>{{ res.appvehpersonname }}</span>
      </li>
      <li>
        <span>申请人电话</span>
        <span>{{ res.appphonenumber }}</span>
      </li>
      <li>
        <span>用车人名称</span>
        <span>{{ res.usevehpersonname }}</span>
      </li>
      <li>
        <span>用车人电话</span>
        <span>{{ res.usevehpersonphone }}</span>
      </li>
      <li>
        <span>人数</span>
        <span>{{ res.personnum }}</span>
      </li>
      <li>
        <span>上客地址</span>
        <span>{{ res.toplace }}</span>
      </li>
      <li>
        <span>到达地址</span>
        <span>{{ res.toAddress }}</span>
      </li>
      <li>
        <span>市内/长途</span>
        <span>{{ res.distancetype }}</span>
      </li>
      <li>
        <span>用途</span>
        <span>{{ res.usevehtype }}</span>
      </li>
      <li>
        <span>用车事由</span>
        <span>{{ res.usevehreason }}</span>
      </li>
      <li>
        <span>计划开始时间</span>
        <span>{{ res.appstarttime }}</span>
      </li>
      <li>
        <span>计划归还时间</span>
        <span>{{ res.appendtime }}</span>
      </li>
      <li>
        <span>实际归还时间</span>
        <span>{{ res.returnTime }}</span>
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
      var url = this.GLOBA.serverSrc + "vehicleapplyrecord/formLoad"; //车辆申请
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
