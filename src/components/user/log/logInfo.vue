<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>日志详情</span>
    </div>
    <div class="content">
      <div>
        <span class="explain">接收人：</span>
        {{logInfo.mandSendText}}
      </div>
      <div v-show="logInfo.copyToText != null">
        <span class="explain">抄送人：</span>
        {{logInfo.copyToText}}
      </div>
      <div>
        <span class="explain">日期：</span>
        {{logInfo.workingDate}}
      </div>
      <div>
        <span class="explain">内容：</span>
        {{logInfo.jobContent}}
      </div>
    </div>
  </div>
</template>

<script>
import { Notify, Toast } from "vant";
import { log } from "util";
export default {
  data() {
    return {
      id: this.$route.params.id,
      logInfo: ""
    };
  },
  methods: {
    prev() {
      this.$router.go(-1); //返回上一层
    },
    getinfo() {
      const toast = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      if (this.id != null) {
        var url = this.GLOBA.serverSrc + "workDiary/formLoad";
        let param = new URLSearchParams();
        param.append("id", this.id);
        console.log(param.toString());
        this.$http
          .post(url, param)
          .then(response => {
            console.log("详情：", response);
            this.logInfo=response.data;
            var item=this.logInfo;
            var self=this;
            if (self.logInfo.mandSend != null) {
              this.getInfo(self.logInfo.mandSend, function(res) {
                console.log("res:",res);
                self.$set(self.logInfo, "mandSendText", res);
              });
            }
            if (self.logInfo.copyTo != null) {
              if (self.logInfo.copyTo.indexOf(",") != -1) {
                self.logInfo.copyTo.split(",").forEach(element => {
                  self.getInfo(element, function(res) {
                    if (self.logInfo.copyToText != null) {
                      self.$set(self.logInfo,"copyToText",item.copyToText + "，" + res);
                    } else {
                      self.$set(self.logInfo, "copyToText", res);
                    }
                  });
                });
              } else {
                this.getInfo(self.logInfo.copyTo, function(res) {
                  console.log(res);
                  self.$set(self.logInfo, "copyToText", res);
                });
              }
            }
            toast.clear();
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
    },
    getInfo(dataid, fun) {
      //获取用户信息
      var url = this.GLOBA.serverSrc + "userinfo/getUserinfo";
      let param = new URLSearchParams();
      param.append("dataid", dataid);
      this.$http
        .post(url, param)
        .then(response => {
          var name = response.data.data.chsname;
          fun(name);
        })
        .catch(error => {
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    }
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
  position: fixed;
  top: 56px;
  .home-head {
  }
  .van-icons {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }
  .explain {
    color: #8c999f;
    font-size: 14px;
  }
  .content {
    background-color: #fff;
    color: #323233;
    font-size: 14px;
    line-height: 30px;
    padding: 10px;
  }
}
</style>
