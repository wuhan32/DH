<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>已办任务</span>
    </div>
    <van-tabs line-height="1" title-active-color="#00A03D" color="#00A03D">
      <van-tab title="审批中">
        <div class="body">
          <van-list v-model="loading" :finished="finished" :finished-text="daiban" @load="onLoad">
            <div
              class="list"
              v-for="(item,index) in ProcesslistHis"
              :key="index"
              @click="gototasksInfo(item.processInstanceId,item.fromType,item.startFromKey,item.businessId)"
              v-show="item.endTime == null"
            >
              <p class="title">{{ item.processDefinitionName }}</p>
              <van-row>
                <van-col span="5" class="explain">环节名称：</van-col>
                <van-col span="9" class="content">{{ item.processDefinitionName }}</van-col>
              </van-row>
              <van-row v-if="item.endTime == ''">
                <van-col span="5" class="explain">结束时间：</van-col>
                <van-col span="19" class="content">{{ item.endTime | datefilter }}</van-col>
              </van-row>
              <van-row v-else>
                <van-col span="5" class="explain">开始时间：</van-col>
                <van-col span="19" class="content">{{ item.startTime | datefilter }}</van-col>
                <p class="examine">审批中</p>
              </van-row>
            </div>
            <div v-if="ProcesslistHisX" class="zanwu">
              <van-icon name="warning-o" />
              <p>暂无流程</p>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="审批完成">
        <div class="body">
          <van-list v-model="loading" :finished="finished" :finished-text="daiban" @load="onLoad">
            <div
              class="list"
              v-for="(item,index) in ProcesslistHis"
              :key="index"
              v-show="item.endTime != null"
              @click="gototasksInfo(item.processInstanceId,item.fromType,item.startFromKey,item.businessId)"
            >
              <p class="title">{{ item.processDefinitionName }}</p>
              <van-row>
                <van-col span="5" class="explain">环节名称：</van-col>
                <van-col span="9" class="content">{{ item.processDefinitionName }}</van-col>
              </van-row>
              <van-row v-if="item.endTime == ''">
                <van-col span="5" class="explain">结束时间：</van-col>
                <van-col span="19" class="content">{{ item.endTime | datefilter }}</van-col>
              </van-row>
              <van-row v-else>
                <van-col span="5" class="explain">开始时间：</van-col>
                <van-col span="19" class="content">{{ item.startTime | datefilter }}</van-col>
                <p class="examine">审批完成</p>
              </van-row>
            </div>
          </van-list>
        </div>
        <div v-if="ProcesslistHisY" class="zanwu">
          <van-icon name="warning-o" />
          <p>暂无流程</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      list: [],
      daiban: "",
      loading: false,
      finished: false,
      //页码
      page: 1,
      //条数
      rows: 10,
      ProcesslistHis: "",
      ProcesslistHisX: true, //审批中
      ProcesslistHisY: true, //审批完成
      zanwu: false
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userId = userInfo.id;
    this.getProcesslistHis();
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    prev() {
      this.$router.go(-1); // 返回上一层
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 30) {
          this.finished = true;
        }
      }, 500);
    },
    gototasksInfo(processInstanceId, fromType, startFromKey, businessId) {
      if (fromType == "external") {
        this.$router.push({
          path: startFromKey,
          query: {
            processInstanceId: processInstanceId,
            businessId: businessId
          }
        });
      } else {
        this.$router.push({
          name: "tasksInfo",
          query: {
            processInstanceId: processInstanceId
          }
        });
      }
    },
    getProcesslistHis() {
      var url = this.GLOBA.serverSrc + "appProcess/loadMineDealtProcess";
      let param = new URLSearchParams();
      param.append("page", this.page); //页码
      param.append("rows", this.rows); //条数
      param.append("userId", this.userId);
      this.$http
        .post(url, param)
        .then(res => {
          if (res.data == null || res.data == "") {
            this.zanwu = true;
          } else {
            this.ProcesslistHis = res.data.rows;
            this.ProcesslistHis.forEach(element => {
              if (element.endTime != null) {
                this.ProcesslistHisX = false; //有时间
              } else {
                this.ProcesslistHisY = false; //无时间
              }
            });
          }
        })
        .catch(error => {
          this.daiban = "暂无流程";
        });
    }
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
  .body {
  }
  .list {
    background-color: #ffffff;
    padding: 16px;
    border-bottom: 5px solid #f5f6f7;
    line-height: 24px;
    position: relative;
    .examine {
      position: absolute;
      right: 25px;
      bottom: 50px;
    }

    .explain {
      color: #8c999f;
      font-size: 14px;
    }
    .content {
      color: #323233;
      font-size: 13px;
    }
    .title {
      color: #000000;
      font-size: 14px;
    }
  }
  .zanwu {
    padding-top: 200px;
    background-color: #fff;
    text-align: center;
    font-size: 20px;
    color: #8c8c8c;
    p {
      font-size: 16px;
      margin: 0;
    }
  }
}
</style>
