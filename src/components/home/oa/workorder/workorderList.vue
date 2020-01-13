<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>流程仓库</span>
    </div>
    <div>
      <!-- <van-cell title="车辆申请" is-link to="/carfrom"></van-cell>
      <van-cell title="请假申请" is-link to="/askforleaveform"></van-cell>
      <van-cell title="办公用品申请" is-link to="/purchaseapplyform"></van-cell> -->
      <!-- <van-cell title="外出申请" is-link to="/gooutform"></van-cell> -->
      <!-- <van-cell title="印章申请" is-link to="/sealform"></van-cell> -->
      <van-cell
        v-for="item in List"
        :key="item.processDefinitionVersion"
        :title="item.processDefinitionName"
        is-link
        @click="gotoPage(item.processDefinitionName,item.processDefinitionId)"
      ></van-cell>
    </div>
  </div>
</template>
<script>
import { Notify, Toast } from "vant";
import { parse } from "path";
export default {
  data() {
    return {
      List: []
    };
  },
  created() {},
  beforeMount() {
    this.getList();
  },
  mounted(){
    
  },
  destroyed () {
    
  },
  beforeDestroy() {},
  methods: {
    prev() {
      this.$router.go(-1); // 返回上一层
    },
    gotoPage(text, processDefinitionId) {
      if (text == "车辆申请") {
        this.$router.push({
          path: "/carfrom",
          name: "carfrom",
          params: {
            processTitle: text,
            processDefinitionId: processDefinitionId
          }
        });
      } else if (text == "请假申请") {
        this.$router.push({
          path: "/askforleaveform",
          name: "askforleaveform",
          params: {
            processTitle: text,
            processDefinitionId: processDefinitionId
          }
        });
      } else if (text == "办公用品申购") {
        this.$router.push({
          path: "/purchaseapplyform",
          name: "purchaseapplyform",
          params: {
            processTitle: text,
            processDefinitionId: processDefinitionId
          }
        });
      } else {
        Toast("暂未开放");
      }
    },
    getList() {
      const toast = Toast.loading({
        mask: true,
        message: "流程仓库加载中",
        duration: 0
      });
      //获取用户信息，在弹框中展示用户相关信息
      var url =
        this.GLOBA.serverSrc + "appProcess/listLoadActiveProcessDefinition";
      let param = new URLSearchParams();
      param.append("processName", "");
      param.append("category", "");
      this.$http
        .post(url, param)
        .then(response => {
          console.log("可用流程：", response);
          toast.clear();
          if (response.data != null && response.data.total > 0) {
            this.List = response.data.rows;
          } else {
            this.List = [];
          }
        })
        .catch(error => {
          toast.clear();
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    }
  }
};
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
