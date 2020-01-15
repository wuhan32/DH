<template>
  <van-panel title="申请表单" status>
    <ul class="tasksInfo">
      <li>
        <span>申请日期</span>
        <span>{{ res.applydate }}</span>
      </li>
      <li>
        <span>更新时间</span>
        <span>{{ res.updatetime }}</span>
      </li>
      <li>
        <span>用品名称	</span>
        <span>{{ res.resno }}</span>
      </li>
      <li>
        <span>供应商名称	</span>
        <span>{{ res.suppliername }}</span>
      </li>
      <li>
        <span>品牌型号	</span>
        <span>{{ res.models }}</span>
      </li>
      <li>
        <span>单位</span>
        <span>{{ res.unit }}</span>
      </li>
      <li>
        <span>单价（元）</span>
        <span>{{ res.price }}</span>
      </li>
      <li>
        <span>数量	</span>
        <span>{{ res.number }}</span>
      </li>
      <li>
        <span>用途及说明</span>
        <span>{{ res.remar }}</span>
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
      var url = this.GLOBA.serverSrc + "purchaseapply/formLoad";//办公
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
