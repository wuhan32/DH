<template>
  <div class="content">
    <div class="headimg">
      <van-uploader :after-read="afterRead">
        <van-image
          id="headimg"
          round
          width="100px"
          height="100px"
          fit="fill"
          :src="avater"
        >
          <template v-slot:error>暂无头像</template>
        </van-image>
      </van-uploader>
      <p>{{userInfo.chsname}}</p>
    </div>
    <div>
      <van-cell icon="aim" title="签到" is-link to="/clockingindex" />
      <!-- <van-cell icon="scan" title="扫一扫" is-link url="/home" /> -->
      <van-cell icon="user-o" title="个人信息" is-link to="/userinfo" />
      <van-cell icon="cluster-o" title="个人日志" is-link to="/logForm" />
      <van-cell icon="replay" title="软件更新" is-link to="/updateapp">
      </van-cell>
      <van-cell title="退出登录" @click="closeApp" icon="close" is-link></van-cell>
    </div>
    <baidu-map :center="center" :zoom="zoom" @ready="handler"></baidu-map>
  </div>
</template>

<script>
import { Notify, Dialog,Toast } from "vant";
export default {
  components: {},
  data() {
    return {
      show: true,
      center: { lng: 0, lat: 0 },
      zoom: 3,
      userInfo: "",
      avater:"",
    };
  },
  beforeMount() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.avater=this.userInfo.avater;
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log("file:"+file.file,"type:"+file.file.type);
      if (file.file.type=='image/jpeg'||file.file.type=='image/png') {
        
        this.updateAvater(file.file);
      }else{
        Toast('请上传 jpg/png 格式图片');
        return false;
      }
    },
    updateAvater(file){
      const toast = Toast.loading({
        mask: true,
        message: "修改头像中...",
        duration: 0
      });
      var url = this.GLOBA.serverSrc + "userinfo/updateUserheadPic";
      console.log("url:",url);
      let param = new FormData();
      param.append("file",file);
      let config={
        headers:{
            'Content-Type':'multipart/form-data'
        }
      }
      this.$http
        .post(url, param,config)
        .then(response => {
          toast.clear();
          console.log("头像修改：", response);
          if(response.data.status){
            this.avater=response.data.data;  
            this.userInfo.avater=this.avater;
            let user=this.userInfo;
            localStorage.setItem("userInfo", JSON.stringify(user));
          }else{
            Toast.fail("头像修改失败!请稍后修改!");
          }
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
    handler({ BMap, map }) {
      this.center.lng = 0;
      this.center.lat = 0;
      this.zoom = 15;
    },
    closeApp() {
      //console.log('close App')
      Dialog.confirm({
        title: "提示",
        message: "是否确认退出当前账号?"
      })
        .then(() => {
          var url = this.GLOBA.serverSrc + "/userinfo/appLogout";
          this.$http.post(url).then(res => {
            console.log("11", res);
            localStorage.clear();
            this.$router.push("/");
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  background-color: #f5f6f7;
  .headimg {
    background-color: #fff;
    height: 200px;
    text-align: center;
    font-size: 16px;
    font-family: "Courier New", Courier, monospace;
    border-bottom: 5px solid #f5f6f7;
    #headimg {
      border: 1px solid #efefef;
      margin-top: 30px;
    }
  }
}
</style>
