<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>详情</span>
      <div class="content">
        <p class="title">{{info.title}}</p>
        <p class="time">{{info.issuer}}&emsp;&emsp;&emsp;&emsp;{{issuerdate}}</p>
        <div class="infocontent" v-html="info.infocontent"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: "",
      issuerdate: "",
      toast:""
    };
  },
  beforeMount(){
    console.log(this.$route.params.id);
  },
  methods: {
    prev() {
      this.$router.go(-1); //返回上一层
    },
    getinfo() {
      this.toast = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      console.log(this.id!=null);
      if (this.id != null) {
        var url = this.GLOBA.serverSrc + "infoissue/getById";
        let param = new URLSearchParams();
        param.append("id", this.id);
        console.log(param.toString());
        this.$http
          .post(url, param)
          .then(response => {
            console.log("详情：", response);
            this.info = response.data.data;
            
            this.issuerdate = this.time(this.info.issuerdate);
            this.toast.clear();
          })
          .catch(error => {
            this.toast.clear();
            if (error.message.indexOf("timeout") != -1) {
              Notify({ type: "warning", message: "请求超时!请更换网络!" });
            } else {
              Notify({ type: "danger", message: "连接异常!" });
            }
          });
      }else{
        this.toast.clear();
      }
    },
    time(time) {
      var date = new Date(time); // 增加8小时
      return date
        .toJSON()
        .substr(0, 10)
        .replace("T", " ");
    }
  },
  beforeDestroy(){
  this.toast.clear();
  },
  mounted() {
    this.getinfo();
  }
};
</script>
<style scoped lang="less">
.page {
  height: 100%;
  width: 100%;
  background-color: #f5f6f7;
  top: 56px;
  .van-icons {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }
  .content {
    color: #000;
  }
  .title {
    text-align: center;
    font-weight: 700;
    line-height: 30px;
    font-size: 18px;
  }
  .time {
    text-align: center;
    font-weight: 700;
    font-size: 14px;
  }
  .infocontent {
    height: 500px;
    overflow:auto;
    font-size: 18px;
  }
}
</style>
