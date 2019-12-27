<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>写日志</span>
    </div>
    <div>
      <van-tabs @click="onClick" color="#025E80" class="tabsvant">
        <van-tab title="我的日志"></van-tab>
        <van-tab title="查看日志"></van-tab>
      </van-tabs>
      <van-list v-model="loading" :finished="finished" :finished-text="msg" @load="onLoad">
        <div class="list" v-for="(item,index) in Lists" :key="index" @click="gotologInfo(item.id)">
          <van-row>
            <van-col span="5" class="explain">接收人：</van-col>
            <van-col span="19" class="content" >{{item.mandSendText}}</van-col>
          </van-row>
          <van-row v-show="item.copyToText!=''">
            <van-col span="5" class="explain">抄送人：</van-col>
            <van-col span="19" class="content">{{ item.copyToText }}</van-col>
          </van-row>
          <van-row>
            <van-col span="5" class="explain">日期：</van-col>
            <van-col span="19" class="content">{{ item.workingDate }}</van-col>
          </van-row>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      userInfo: "",
      List: [],
      Lists: [],
      list: [],
      loading: false,
      finished: false,
      msg: "没有更多"
    };
  },
  created() {},
  beforeMount() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getList();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    prev() {
      this.$router.go(-1); // 返回上一层
    },
    gotologInfo(id) {
      this.$router.push({
        path: "/logInfo",
        name: "logInfo",
        params: {
          id: id
        }
      });
    },
    onClick(name, title) {
      console.log(name, title);
      this.Lists = [];
      if (name == 0) {
        this.getList();
      } else {
        this.getLists();
      }
    },
    getLists() {
      const toast = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      //获取日志列表
      var url = this.GLOBA.serverSrc + "workDiary/listMyLoad";
      let param = new URLSearchParams();
      param.append("userid", this.userInfo.id);
      this.$http
        .post(url, param)
        .then(response => {
          console.log("日志：", response);
          if (response.data != null && response.data.total > 0) {
            this.List = response.data.rows;
            this.Lists = response.data.rows;
            var _this = this;
            response.data.rows.forEach(function(items, i) {
              var item=_this.Lists[i];
              if (items.mandSend != null) {
                _this.getInfo(items.mandSend,function(res){
                  _this.$set(item, "mandSendText",res);
                });
              }
              if (items.copyTo != null) {
                if (items.copyTo.indexOf(",") != -1) {
                  items.copyTo.split(",").forEach(element => {
                    _this.getInfo(element,function(res){
                      if(item.copyToText!=null){
                        _this.$set(item, "copyToText",item.copyToText+"，"+res);
                      }else{
                        _this.$set(item, "copyToText",res);
                      }
                    });
                  });
                } else {
                  _this.getInfo(items.copyTo,function(res){
                    _this.$set(item, "copyToText", res);
                  });
                }
              }
              _this.Lists[i]=item;
            });
            console.log("完：",_this.Lists);
            if (this.List.length > 15) {
              this.msg = "没有更多";
            } else {
              this.msg = "";
            }
          } else {
            this.List = [];
            this.msg = "暂无日志";
          }
          toast.clear();
        })
        .catch(error => {
          toast.clear();
          console.log(error);
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    },
    getList() {
      const toast = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      //获取日志列表
      var url = this.GLOBA.serverSrc + "workDiary/AppListLoad";
      let param = new URLSearchParams();
      param.append("userid", this.userInfo.id);
      this.$http
        .post(url, param)
        .then(response => {
          console.log("我都日志：", response);
          if (response.data != null && response.data.total > 0) {
            this.List = response.data.rows;
            this.Lists = response.data.rows;
            var _this = this;
            response.data.rows.forEach(function(items, i) {
              var item=_this.Lists[i];
              if (items.mandSend != null) {
                _this.getInfo(items.mandSend,function(res){
                  _this.$set(item, "mandSendText",res);
                });
              }
              if (items.copyTo != null) {
                if (items.copyTo.indexOf(",") != -1) {
                  items.copyTo.split(",").forEach(element => {
                    _this.getInfo(element,function(res){
                      if(item.copyToText!=null){
                        _this.$set(item, "copyToText",item.copyToText+"，"+res);
                      }else{
                        _this.$set(item, "copyToText",res);
                      }
                    });
                  });
                } else {
                  _this.getInfo(items.copyTo,function(res){
                    _this.$set(item, "copyToText", res);
                  });
                }
              }
              _this.Lists[i]=item;
            });
            console.log("完：",_this.Lists);
            if (this.List.length > 15) {
              this.msg = "没有更多";
            } else {
              this.msg = "";
            }
          } else {
            this.List = [];
            this.msg = "暂无日志";
          }
          toast.clear();
        })
        .catch(error => {
          toast.clear();
          console.log(error);
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    },
    getInfo(dataid,fun) {
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
    }
  },
  filters: {
    datefilter: function(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    
  }
};
</script>
<style scoped lang="less">
.page {
  margin-top: 56px;
  .van-icons {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }
  .sub {
    margin-right: 10px;
    position: absolute;
    right: 0px;
  }
  .list {
    background-color: #ffffff;
    padding: 16px;
    border-bottom: 5px solid #f5f6f7;
    line-height: 24px;

    .explain {
      color: #8c999f;
      font-size: 14px;
    }
    .content {
      color: #323233;
      font-size: 14px;
    }
    .title {
      color: #000000;
      font-size: 15px;
    }
  }
}
</style>
