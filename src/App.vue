<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Notify } from "vant";
import { Toast } from "vant";
import { Dialog } from "vant";

export default {
  data () {
    return {};
  },
  beforeUpdate(){
    if(this.GLOBA.updateBool.update){
      if(this.GLOBA.updateBool.app){
        this.updateApp();
      }
    }
  },
  created() {
    this.updateApp();
  },
  methods: {
    updateApp() {
      var version = this.GLOBA.versionName;
      let url = this.GLOBA.serverSrc + "appversions/getAppVersions";
      // let url='http://www.dahengzh.com:8080/oa/appversions/getAppVersions';
      let param = new URLSearchParams();
      //console.log(url + "?" + param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          //console.log("更新：", response.data);
          if (response.data != null) {
            var AppVersionsData = response.data.AppVersionsData;
            var appinfo = response.data.httpData.appInfo;
            if (AppVersionsData.appversions > this.GLOBA.versionCode) {
              if (AppVersionsData.appconstraint == "true") {
                this.GLOBA.updateBool = { update: true, app: true };
                Dialog.alert({
                  title: "更新",
                  confirmButtonText:"下载",
                  message: "您有新的版本需要更新！点击下载下载最新版本。注：【必须更新】"
                }).then(() => {
                  var url =
                    "http://yun.app8h.com/themes/appDistribute.html?id=RvQJZv";
                    window.open(url, "_blank");
                });
              } else {
                this.GLOBA.updateBool = { update: false, app: true };
                Dialog.alert({
                  title: "更新",
                  showCancelButton:true,
                  confirmButtonText:"下载",
                  message: "您有新的版本需要更新！点击下载下载最新版本。"
                }).then(() => {
                  var url =
                    "http://yun.app8h.com/themes/appDistribute.html?id=RvQJZv";
                    window.open(url, "_blank");
                });
              }
            } else if (AppVersionsData.appversions == this.GLOBA.versionCode) {
              if (AppVersionsData.versionsno != this.GLOBA.versionName) {
                //console.log(this.GLOBA.updateBool.update);
                if (AppVersionsData.appconstraint == "true") {
                  this.GLOBA.updateBool = { update: true, app: true };
                  Dialog.alert({
                  title: "更新",
                  confirmButtonText:"下载",
                  message: "您有新的版本需要更新！点击下载下载最新版本。注：【必须更新】"
                }).then(() => {
                  var url =
                    "http://yun.app8h.com/themes/appDistribute.html?id=RvQJZv";
                    window.open(url, "_blank");
                });
                } else {
                  this.GLOBA.updateBool = { update: false, app: true };
                  Dialog.alert({
                  title: "更新",
                  confirmButtonText:"下载",
                  showCancelButton:true,
                  message: "您有新的版本需要更新！点击下载下载最新版本。"
                }).then(() => {
                  var url =
                    "http://yun.app8h.com/themes/appDistribute.html?id=RvQJZv";
                    window.open(url, "_blank");
                });
                }
              } else {
                this.GLOBA.updateBool = { update: false, app: false };
              }
            } else {
              this.GLOBA.updateBool = { update: false, app: false };
            }
          }
        })
        .catch(error => {
          if (-1 != error.message.indexOf("timeout")) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
          this.GLOBA.updateBool = { update: false, app: false };
        });
    }
  }
}
</script>

<style lang="less">
#app {
  background-color: #f5f6f7;
}
//导航
.home-head {
  width: 100%;
  height: 56px;
  background-color: #025e80;
  line-height: 56px;
  color: #fff;
  font-size: 15px;
  padding-left: 35px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 999;
}


.iconfont {
  font-weight: 400;
}

.van-swipe-item {
  width: 100%;
  margin-bottom: 2px;
  img {
    width: 100%;

    height: 200px;
  }
}
.Vshow {
  text-align: center;
  line-height: 20px;
  font-size: 18px;
}
</style>
