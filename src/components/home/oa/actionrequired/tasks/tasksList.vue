<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>待办事务</span>
    </div>
    <div class="body">
      <van-list v-model="loading" :finished="finished" :finished-text="daiban" @load="onLoad">
        <div
          class="list"
          v-for="item in tasksList"
          :key="item.taskId"
          @click="gototasksInfo(item.processInstanceId,item.taskId,0)"
        >
          <p class="title">{{ item.processDefinitionName }}</p>
          <van-row>
            <van-col span="5" class="explain">环节名称：</van-col>
            <van-col span="7" class="content">{{ item.taskName }}</van-col>
            <van-col span="5" class="explain">申请人：</van-col>
            <van-col span="7" class="content">{{ item.startUser }}</van-col>
          </van-row>
          <van-row>
            <van-col span="5" class="explain">开始时间：</van-col>
            <van-col span="19" class="content">{{ item.startTime | formatDate}}</van-col>
          </van-row>
        </div>
        <div v-show="zanwu">暂无待办</div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { log } from "util";
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      backlogLlist: "",
      daiban: "",
      //页码
      page: 1,
      //条数
      rows: 10,
      //用户ID
      userId: "",
      tasksList: [],
      taskId: "",
      zanwu: false
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userId = userInfo.id;
    this.getbacklogLlist();
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
      }, 300);
    },
    gototasksInfo(processInstanceId, taskId, judge) {
      //进入代办详情
      var appProcessId = {
        taskId: taskId,
        processInstanceId: processInstanceId
      };
      localStorage.setItem("appProcessId", JSON.stringify(appProcessId));
      this.$router.push({
        name: "tasksInfo",
        params: {
          judge: judge
        }
      });
    },
    getbacklogLlist() {
      var url = this.GLOBA.serverSrc + "/appProcess/loadNeedDealtTask";
      let param = new URLSearchParams();
      param.append("page", this.page); //页码
      param.append("rows", this.rows); //条数
      param.append("userId", this.userId);
      //  ;
      this.$http
        .post(url, param)
        .then(res => {
          //console.log(res);
          if (res.data.rows == null || res.data.rows == '') {
            this.zanwu = true;
          } else {
            this.tasksList = res.data.rows;
            
          }
        })
        .catch(error => {
          this.daiban = "暂无代办";
          if (error.message.indexOf("timeout") != -1) {
            Toast.fail("请求超时!请更换网络!");
          } else {
          }
        });
    }
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
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
  .van-list {
    padding-top: 5px;
  }
  .list {
    background-color: #ffffff;
    padding: 16px;
    border-bottom: 5px solid #f5f6f7;
    line-height: 24px;
    border-radius: 20px;
    margin: 5px 2px 0px 2px ;

    .explain {
      color: #8c999f;
      font-size: 14px;
    }
    .content {
      color: #323233;
      font-size: 14px;
    }
    .title {
      color: #025e80;
      font-size: 15px;
    }
  }
}
</style>
