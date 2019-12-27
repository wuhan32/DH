<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>待签流程</span>
    </div>
    <div class="body">
      <van-list v-model="loading" :finished="finished" :finished-text="daiban" @load="onLoad">
        <div
          class="list"
          v-for="(item,index) in ClaimList"
          :key="index"
          @click="gototasksInfo(item.processInstanceId,item.taskId,1)"
        >
          <p class="title">{{ item.processDefinitionName }}</p>
            <van-row>
            <van-col span="5" class="explain">申请人：</van-col>
            <van-col span="7" class="content">{{ item.startUser }}</van-col>
          </van-row>
          <van-row>
            <van-col span="5" class="explain">环节名称：</van-col>
            <van-col span="7" class="content">{{ item.processDefinitionName }}</van-col>
          </van-row>
          <van-row v-if="item.endTime == ''">
            <van-col span="5" class="explain">结束时间：</van-col>
            <van-col span="19" class="content">{{ item.endTime | datefilter }}</van-col>
          </van-row>
          <van-row v-else>
            <van-col span="5" class="explain">开始时间：</van-col>
            <van-col span="19" class="content">{{ item.startTime | datefilter }}</van-col>
            <p class="examine" >签收</p>
          </van-row>
        </div>
      </van-list>
    </div>
    <div v-show="zanwu">暂无待签</div>
  </div>
</template>
<script>
import moment from "moment";
import { Dialog } from "vant";
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
      ClaimList: "",
      zanwu:false
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userId = userInfo.id;
    this.getClaimList();
    
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
    gototasksInfo(processInstanceId, taskId, judge) {
      var appProcessId = {
        taskId: taskId,
        processInstanceId: processInstanceId
      };
      localStorage.setItem("appProcessId", JSON.stringify(appProcessId));
      this.$router.push({
        name: "tasksInfo",
        params: {
          judge: 1
        }
      });
    },
    getClaimList() {
      var url = this.GLOBA.serverSrc + "appProcess/loadNeedClaimTask";
      let param = new URLSearchParams();
      param.append("page", this.page); //页码
      param.append("rows", this.rows); //条数
      param.append("userId", this.userId);
      // ;
      this.$http
        .post(url, param)
        .then(res => {
          if ((res.data.rows == null || res.data.rows == "")) {
             this.zanwu  = true
          } else {
            
            this.ClaimList = res.data.rows;
          }
          
        })
        .catch(error => {
          this.daiban = "暂无待签";
        });
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
    border-radius: 20px;
    margin: 5px 2px 0px 2px ;
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
      font-size: 14px;
    }
    .title {
           color: #025e80;

      font-size: 15px;
    }
  }
}
</style>
