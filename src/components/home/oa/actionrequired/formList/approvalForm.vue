<template>
  <div class="approvalForm">
    <!-- 头部 -->
    <div class="home-head">
      <van-icon name="arrow-left" @click="prev()" class="arrow-left" />
      <span>表单审批</span>
    </div>
    <!-- 审批表单 -->
    <div v-for="(item,index) in approvalForm" :key="index">
      <span v-if="item.type.name=='enum'" class="approvalFormOne">
        {{item.name}}
        <van-radio-group v-model="timeTip[item.id]">
          <van-radio v-for="(v,i) in item.values" :key="i" :name="i">{{v.name}}</van-radio>
        </van-radio-group>
      </span>
      <van-cell-group v-else>
        <van-field
          v-model="timeTip[item.id]"
          rows="1"
          autosize
          :label="item.name"
          :type="item.type.name"
          :placeholder="'请输入'+item.name"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <van-cell-group>
      <van-field
        v-model="remark"
        rows="2"
        autosize
        label="审批意见"
        type="textarea"
        maxlength="150"
        placeholder="无"
        show-word-limit
      />
    </van-cell-group>
    <van-button type="primary" @click="completeTask">确认</van-button>
  </div>
</template>

<script>
import { Toast } from "vant";
import { log } from "util";
export default {
  data() {
    return {
      //任务Id
      taskId: this.$route.query.taskId,
      //提交审批表单
      approvalForm: "",
      appProcessId: "",
      remark: "",
      value: "",
      userId: "",
      timeTip: {},
      token: ""
    };
  },
  created() {
    //this.timeTip[item.id] = this.approvalForm[0].id;
  },
  updated() {},
  beforeMount() {
    this.appProcessId = JSON.parse(localStorage.getItem("appProcessId"));
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userId = userInfo.id;
    this.token = localStorage.getItem("token");
    this.getapprovalForm();
  },
  methods: {
    getapprovalForm() {
      var url = this.GLOBA.serverSrc + "appProcess/loadTaskCompleteData";
      let param = new URLSearchParams();
      param.append("taskId", this.taskId);
      this.$http
        .post(url, param)
        .then(res => {
          this.approvalForm = res.data.taskFromProperties;
        })
        .catch(error => {
        });
    },
    prev() {
      this.$router.go(-2);
    },
    completeTask() {
      var url =
        this.GLOBA.serverSrc +
        "appProcess/completeTask?taskId=" +
        this.taskId +
        "&comment=" +
        this.remark;

      if (this.remark == "") {
        Toast("审批意见不能为空");
      } else {
        this.$http
          .post(url, JSON.stringify(this.timeTip), {
            headers: {
              "Content-Type": "text/plain"
            }
          })
          .then(res => {
            this.$router.go(-2);
            Toast(res.data.msg);
          })
          .catch(error => {});
      }
    }
  }
};
</script>

<style lang="less" scoped>
.approvalForm {
  padding-top: 56px;
  background: #fff;
  .home-head {
    .arrow-left {
      margin-right: 20px;
      position: absolute;
      top: 19px;
      left: 10px;
      font-size: 18px;
    }
  }
  .van-popup {
    padding: 0 20px;
    input {
      border: 1px solid #ccc;
    }
  }
  .approvalFormOne {
    line-height: 44px;
    padding: 0 14px;
    display: flex;
    .van-radio-group {
      display: flex;
      margin-left: 40px;
      flex-wrap: wrap;
      .van-radio {
        margin: 0 10px;
      }
    }
  }
  .van-button {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>