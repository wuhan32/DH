<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click.native="prev()" />
      <span>{{ header }}</span>
      <span class="sub" @click="showPopup()" v-if=" judge == 0 ">审批</span>
    </div>
    <div class="tasks">
      <van-panel title="流程详情" status v-show="flowInfo != ''">
        <ul class="tasksInfo">
          <li>
            <span>申请人</span>
            <span>{{flowInfo.startUser }}</span>
          </li>
          <li>
            <span>联系电话</span>
            <span>{{ flowInfo.phone }}</span>
          </li>
          <li>
            <span>所属部门</span>
            <span>{{ flowInfo.department }}</span>
          </li>
          <li>
            <span>申请流程</span>
            <span>{{ header }}</span>
          </li>
          <li>
            <span>开始时间</span>
            <span>{{ flowInfo.startTime | datefilter}}</span>
          </li>
        </ul>
      </van-panel>

      <router-view />
    </div>

    <van-panel title="审批记录" status v-show="historyActivitys.length>0">
      <div class="historyActivitys">
        <div v-for="(item,index) in historyActivitys" :key="index">
          <h3>{{ item.activityName }} - {{ item.actionUser }}</h3>
          <span v-for="(i,idnex) in item.taskComments" :key="idnex">
            <p>
              <span>意见：</span>
              {{ i.fullMessage }}
            </p>
            <p>{{ i.time | datefilter }}</p>
          </span>
        </div>
      </div>
    </van-panel>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import { log } from "util";
import moment from "moment";
export default {
  data() {
    return {
      message: "",
      show: false,
      appProcessId: "",
      //流程实例ID
      processInstanceId: this.$route.query.processInstanceId,
      //任务Id
      //表单
      taskInfo: "",
      //
      taskInfoId: "",
      //表头
      header: "",
      //流程详情
      flowInfo: "",
      //审批意见
      historyActivitys: [],
      //审批表单
      approvalForm: "",
      //判断传值
      judge: this.$route.query.judge,
      taskId:this.$route.query.taskId,
      userId: "",
    };
  },
  created() {
    
    
  },
  beforeMount() {
    this.getbacklogInfo();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    prev() {
      this.$router.go(-1); // 返回上一层
    },
    showPopup() {
      this.$router.push({
         path: '/approvalForm',
          query: {
            taskId:this.taskId
          }
      });
    },
    getbacklogInfo() {
      var url = this.GLOBA.serverSrc + "appProcess/loadHisProcessDetail";
      let param = new URLSearchParams();
      param.append("processInstanceId", this.processInstanceId);
      this.$http
        .post(url, param)
        .then(res => {
          this.header = res.data.data.process.processDefinitionName;
          this.taskInfo = res.data.data.startFrom.formProperties;
          this.flowInfo = res.data.data.startFrom;
          this.taskInfoId = res.data.data.startFrom.variables;
          this.historyActivitys = res.data.data.historyActivitys;
          this.taskInfo.forEach((res, index) => {
            if (res.type.name == "date") {
              var time = this.taskInfoId[res.id];
              var t1 = this.$moment(time).format("YYYY-MM-DD HH:mm:ss");
              this.taskInfoId[res.id] = t1;
              res.id = this.taskInfoId[res.id];
            } else if (res.type.name == "enum") {
              var enums = "";
              res.values.forEach(r => {
                var rid = this.taskInfoId[res.id];
                if (r.id == rid) {
                  this.taskInfo[index].id = r.name;
                }
              });
            } else {
              res.id = this.taskInfoId[res.id];
            }
          });
        })
        .catch(error => {});
    },

  },
  filters: {
    datefilter: function(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style scoped lang="less">
.page {
  height: 100%;
  width: 100%;
  background-color: #f5f6f7;
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
  .sub {
    margin-right: 20px;
    position: absolute;
    right: 10px;
  }

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
  .van-cell__title {
    span {
      color: #000;
      font-weight: 700;
      font-size: 15px;
    }
  }
  .historyActivitys {
    padding: 0 15px;
    > div {
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      h3 {
        color: #333;
        font-weight: normal;
        margin: 0;
      }
      span {
        :nth-child(1) {
          > span {
            color: #000;
            line-height: 20px;
          }
        }
        :nth-child(2) {
          color: #8c999f;
          padding: 5px 0;
        }
      }
    }
  }
}
</style>
