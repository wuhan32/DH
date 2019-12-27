<template>
  <div class="chattingRecords">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>{{ portrait.chsname }}</span>
    </div>
    <div class="app">
      <!-- 聊天框 -->
      <div class="xw-content" ref="xwBody">
        <div class="xw-chat-wrap">
          <ul ref="xwBody">
            <li v-for="(messageList,index) in records" :key="index">
              <div v-if="messageList.type==1">
                <div class="xw-chat-time">{{messageList.time}}</div>
                <div class="xw-chat-servicer">
                  <div class="xw-servicer-avantar-wrap">
                    <img
                      src="../../assets/home/b09e106a6bbcb6c79a425102eb696a4.png"
                      class="xw-servicer-avantar"
                      v-if="portrait.avater == '' || portrait.avater == null "
                    />
                    <img :src="portrait.avater" class="xw-servicer-avantar" v-else />
                  </div>
                  <div class="xw-chat-msg">
                    <span v-html="replaceFace(messageList.content)"></span>
                  </div>
                </div>
              </div>
              <!-- 用户发送的消息模板-->
              <div v-else>
                <div class="xw-chat-time">{{messageList.time}}</div>
                <div class="xw-chat-customer">
                  <div class="xw-customer-avantar-wrap">
                    <img
                      src="../../assets/home/b09e106a6bbcb6c79a425102eb696a4.png"
                      class="xw-servicer-avantar"
                      v-if="portraitO.avater == '' || portraitO.avater == null "
                    />
                    <img :src="portraitO.avater" class="xw-servicer-avantar" v-else />
                  </div>
                  <div class="xw-chat-msg" style="display:inline-block">
                    <span v-html="replaceFace(messageList.content)"></span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="xw-footer-wrap">
        <div class="xw-footer-content">
          <div class="xw-vmodel-wrap">
            <textarea class="xw-content-textarea" placeholder="请输入您的问题" v-model="content"></textarea>
          </div>
          <div class="xw-chat-tool">
            <div class="xw-chat-tool-item">
              <transition name="fade">
                <a href="javascript:void(0)" class="xw-send-btn-text" @click="sendMsg">发送</a>
              </transition>
            </div>
            <div class="xw-chat-tool-item">
              <a
                href="javascript:;"
                :class="[showEmoji ? 'xw-face' :'xw-face-close','xw-chat-tool-btn']"
                @click="emojiFuc"
              ></a>
            </div>
          </div>
        </div>
        <!-- 表情开始 -->
        <transition name="slide-fade" style="display:none">
          <div v-if="showEmoji">
            <div class="xw-chat-ul-box">
              <van-swipe :autoplay="0">
                <van-swipe-item v-for="n in Math.ceil(EXPS.length/15)" :key="n">
                  <li
                    v-for="(item, index) in getEmotionData(n,15)"
                    class="xw-faceEmoji"
                    :key="index"
                  >
                    <img :src="item.file" :data="item.code" v-on:click="content+=item.code" />
                  </li>
                </van-swipe-item>
              </van-swipe>
            </div>
          </div>
        </transition>
      </div>

      <div class="xw-footer-wrap-foot"></div>
    </div>
  </div>
</template>

<script>
import { Toast, Notify } from "vant";
export default {
  data() {
    return {
      showEmoji: false, //是否显示表情
      userId: "",
      portrait: "",
      userIdO: "",
      portraitO: "",
      content: "",
      websock: null,
      token: "",
      EXPS: [
        {
          file: "https://kf.163.cn/service/ui/image/emotion/100.gif",
          code: "/::)",
          title: "微笑",
          reg: /\/::\)/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/101.gif",
          code: "/::~",
          title: "伤心",
          reg: /\/::~/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/102.gif",
          code: "/::B",
          title: "美女",
          reg: /\/::B/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/103.gif",
          code: "/::|",
          title: "发呆",
          reg: /\/::\|/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/104.gif",
          code: "/:8-)",
          title: "墨镜",
          reg: /\/:8-\)/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/105.gif",
          code: "/::<",
          title: "哭",
          reg: /\/::</g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/106.gif",
          code: "/::$",
          title: "羞",
          reg: /\/::\$/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/107.gif",
          code: "/::X",
          title: "哑",
          reg: /\/::X/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/108.gif",
          code: "/::Z",
          title: "睡",
          reg: /\/::Z/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/109.gif",
          code: '/::"(',
          title: "哭",
          reg: /\/::"\(/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/110.gif",
          code: "/::-|",
          title: "囧",
          reg: /\/::-\|/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/111.gif",
          code: "/::@",
          title: "怒",
          reg: /\/::@/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/112.gif",
          code: "/::P",
          title: "调皮",
          reg: /\/::P/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/113.gif",
          code: "/::D",
          title: "笑",
          reg: /\/::D/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/114.gif",
          code: "/::O",
          title: "惊讶",
          reg: /\/::O/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/115.gif",
          code: "/::(",
          title: "难过",
          reg: /\/::\(/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/116.gif",
          code: "/::+",
          title: "酷",
          reg: /\/::\+/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/117.gif",
          code: "/:--b",
          title: "汗",
          reg: /\/:--b/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/118.gif",
          code: "/::Q",
          title: "抓狂",
          reg: /\/::Q/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/119.gif",
          code: "/::T",
          title: "吐",
          reg: /\/::T/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/120.gif",
          code: "/:,@P",
          title: "笑",
          reg: /\/:,@P/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/121.gif",
          code: "/:,@-D",
          title: "快乐",
          reg: /\/:,@-D/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/122.gif",
          code: "/::d",
          title: "奇",
          reg: /\/::d/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/123.gif",
          code: "/:,@o",
          title: "傲",
          reg: /\/:,@o/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/124.gif",
          code: "/::g",
          title: "饿",
          reg: /\/::g/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/125.gif",
          code: "/:|-)",
          title: "累",
          reg: /\/:\|-\)/g
        },
        {
          file: "https://kf.163.cn/service/ui/image/emotion/126.gif",
          code: "/::!",
          title: "吓",
          reg: /\/::!/g
        }
      ],

      //聊天记录
      records: []
    };
  },
  created() {
    this.userId = this.$route.params.userId;
    this.userIdO = JSON.parse(localStorage.getItem("userInfo")).id;
    this.token = localStorage.getItem("token");
    this.headPortrait();
    this.initWebSocket();
  },
  mounted() {},
  updated() {
    if (this.records.length != 0) {
      window.scrollTo(0, this.$refs.xwBody.scrollHeight);
    }
  },
  beforeUpdate() {},
  methods: {
    prev() {
      this.$router.go(-1);
    },
    //点击控制表情切换（显示和隐藏）
    emojiFuc() {
      this.showEmoji = !this.showEmoji;
    },
    
    headPortrait() {
      var url = this.GLOBA.serverSrc + "/user/formLoad";
      let param = new URLSearchParams();

      param.append("id", this.userId);
      this.$http.post(url, param).then(res => {
        if (res.data != "") {
          this.portrait = res.data;
        } else {
          Toast.loading({
            message: "用户不存在",
            forbidClick: true
          });
        }
      });

      let paramO = new URLSearchParams();
      paramO.append("id", this.userIdO);
      this.$http.post(url, paramO).then(res => {
        if (res.data != "") {
          this.portraitO = res.data;
        } else {
          Toast.loading({
            message: "用户不存在",
            forbidClick: true
          });
        }
      });
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://www.dahengzh.com:8080/oa/im/" + this.token;

      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      if (this.content != "") {
        var content = this.content.trim();
        this.records.push({
          time: new Date().toLocaleTimeString(),
          content: content,
          type: 2
        });

        let msg = {
          toUser: this.userId,
          message: content,
          messageType: 1
        };
        this.websocketsend(JSON.stringify(msg));
      }
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      // console.log(e.data);

      this.records.push({
        time: new Date().toLocaleTimeString(),
        content: redata.message,
        type: 1
      });
      Notify({ type: "success", message: "你有一条消息" ,duration: 500});
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      //console.log("断开连接", e);
    },

    //发送
    sendMsg() {
      this.websocketonopen();
      this.content = "";
    },
    getEmotionData(pageNow, pageSize) {
      return this.EXPS.slice((pageNow - 1) * pageSize, pageSize * pageNow);
    },
    // 聊天记录
    replaceFace(con) {
      if (!con) {
        return;
      }
      if (con.toString().indexOf("/:") > -1) {
        var exps = this.EXPS;
        for (var i = 0; i < exps.length; i++) {
          con = con.replace(
            exps[i].reg,
            '<img src="' + exps[i].file + '"  alt="" />'
          );
        }
      }
      return con;
    }
  }
};
</script>

<style lang="less" scoped>
.chattingRecords {
  margin-top: 55px;
  background-color: #fff;
}
.home-head {
}
.van-icons {
  margin-right: 20px;
  position: absolute;
  top: 19px;
  left: 10px;
  font-size: 18px;
}

.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.xw-content {
  flex: 1;
  position: relative;
  overflow: auto;
  transition: height 0.8s;
  background-color: #fff;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.bounceInDown {
  -webkit-animation-name: bounceInDown;
  animation-name: bounceInDown;
}

.bounceInLeft {
  -webkit-animation-name: bounceInLeft;
  animation-name: bounceInLeft;
}

.bounceInUp {
  -webkit-animation-name: bounceInUp;
  animation-name: bounceInUp;
}
::-webkit-scrollbar-track {
  border-radius: 0;
  padding: 0;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: transparent;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.xw-ring-wrap {
  position: absolute;
  right: 5px;
  top: 3px;
  padding: 0 2px;
  z-index: 4;
}

.xw-ring-icon {
  background: url(/static/images/soundOn.svg) no-repeat 50%;
}

.xw-ring-icon-toggle {
  background: url(/static/images/soundClose.svg) no-repeat 50%;
}

.xw-ring-icon {
  float: right;
  padding: 5px;
  margin-right: 3px;
  height: 30px;
  width: 30px;
  opacity: 0.6;
  cursor: pointer;
  text-indent: -9999px;
  overflow: visible;
}

.xw-body-wrap-scroll,
.xw-body-wrap-scroll-main {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: hidden;
  -webkit-overflow-scrolling: auto;
}

.xw-chat-servicer:after,
.xw-chat-servicer:before,
.xw-chat-customer:after,
.xw-chat-customer:before,
.xw-chat-wrap:after,
.xw-chat-wrap:before,
.xw-chat-tool:after,
.xw-chat-tool:before,
.xw-chat-ul-box:after,
.xw-chat-ul-box:before {
  display: table;
  content: "";
}

.xw-chat-wrap {
  overflow: auto;
  padding-left: 16px;
  padding-bottom: 20px;
}

.xw-chat-wrap .xw-chat-time,
.xw-chat-wrap time {
  line-height: 1;
  text-align: center;
  display: block;
  margin-bottom: 8px;
  margin-top: 8px;
  font-size: 12px;
  color: #999;
  text-shadow: 1px 1px 1px hsla(0, 0%, 100%, 0.6);
}

.xw-chat-servicer,
.xw-chat-customer {
  position: relative;
  margin-bottom: 16px;
  padding: 0 10px 0 45px;
}
.xw-chat-tool-btn.xw-face {
  background: url(../../assets/mail/smileOn.svg) no-repeat 50%;
}
.xw-chat-tool-btn.xw-face-close {
  background: url(../../assets/mail/smileClose.svg) no-repeat 50%;
}
.xw-servicer-avantar-wrap {
  position: absolute;
  bottom: 0;
  line-height: 0;
}
.xw-send-btn-text {
  padding: 4px 8px;
  background-color: #025e80;
  color: #fff;
  border-radius: 5px;
}
.xw-customer-avantar-wrap {
  position: absolute;
  bottom: 0;
  right: 8px;
  line-height: 0;
}

.xw-chat-servicer .xw-servicer-avantar-wrap,
.xw-customer-avantar-wrap {
  left: 0;
}

.xw-servicer-avantar {
  border-radius: 100%;
}

.xw-servicer-avantar-wrap img,
.xw-customer-avantar-wrap img {
  height: 34px;
  width: 34px;
}

.xw-chat-msg {
  -webkit-font-smoothing: antialiased;
  hyphens: auto;
  word-wrap: break-word;
  word-break: normal;
  position: relative;
  clear: both;
  padding: 8px 16px;
  border: 1px solid transparent;
  max-width: 100%;
  min-width: 50px;
  min-height: 22px;
  line-height: 1.6em;
  max-width: 70%;
  border-radius: 5px;
}

.xw-chat-servicer .xw-chat-msg {
  background: #fff;
  border-color: #efefef;
  float: left;
}

.xw-chat-msg span {
  white-space: pre-line;
}
.xw-chat-servicer,
.xw-chat-customer {
  position: relative;
  margin-bottom: 16px;
  padding: 0 10px 0 45px;
}

.xw-chat-customer {
  text-align: right;
}

.xw-chat-customer .xw-chat-msg {
  float: right;
  text-align: left;
  background: #025e80;
  color: #fff;
  margin-right: 45px;
}
.xw-customer-avantar {
  border-radius: 50%;
}
.xw-chat-msg :last-child {
  margin-bottom: 0;
}

.xw-chat-wrap .xw-system-info-time,
.xw-chat-wrap time {
  line-height: 1;
  text-align: center;
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  color: #999;
  text-shadow: 1px 1px 1px hsla(0, 0%, 100%, 0.6);
}

.xw-system-info {
  margin-bottom: 8px;
}

.xw-chat-wrap > :last-child {
  margin-bottom: 16px;
}

.xw-system-info {
  text-align: center;
  font-size: 12px;
}

.xw-system-info span {
  display: inline-block;
  background: rgba(0, 0, 0, 0.08);
  padding: 4px 8px;
  line-height: 1;
  color: #7c7c7c;
  border-radius: 2px;
  text-shadow: 1px 1px 1px hsla(0, 0%, 100%, 0.6);
}
.xw-footer-wrap-foot {
  height: 52px;
}
.xw-footer-wrap {
  position: fixed;
  bottom: 0;
  justify-content: flex-end;
  width: 100%;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.05);
  background: #fff;
  z-index: 2;
}

.xw-footer-content {
  position: relative;
  height: 52px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.05) 0px -1px 4px;
}
.xw-vmodel-wrap {
  flex: 1;
}
.xw-content-textarea {
  box-sizing: border-box;
  z-index: 1;
  overflow-y: auto;
  font-size: 14px;
  line-height: 14px;
  border: none;
  resize: none;
  padding: 16px 0px 16px 14px;
  font-family: inherit;
  white-space: pre;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 250px;
}

.xw-chat-tool {
  position: absolute;
  right: 0px;
  bottom: 0;
  z-index: 2;
}

.xw-chat-tool-item {
  height: 52px;
  line-height: 52px;
  position: relative;
  float: left;
  background: #fff;
}

.xw-chat-tool-btn {
  display: block;
}

.xw-chat-tool-btn {
  margin-top: 7px;
  height: 38px;
  width: 38px;
  border-radius: 100%;
  text-indent: -9999px;
  opacity: 0.5;
  overflow: hidden;
  transform: translateZ(0);
  margin-left: 10px;
}

.xw-chat-ul-box {
  list-style: none;
  margin: 0;
  padding: 0;
}

.xw-chat-ul-box {
  background: #fff;
  padding: 8px;
  height: 130px;
  width: 340px;
  margin: 0px auto;
}

.swiper-slide {
  float: left;
}

.xw-chat-ul-box a {
  display: block;
  height: 40px;
  width: 40px;
}
.swiper-pagination {
  display: flex;
  width: 100%;
  justify-content: center;
}
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
  background: #ccc;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
}
.swiper-pagination-bullet-active {
  background: #007aff;
}

.xw-chat-tool-item {
  height: 52px;
  position: relative;
  float: left;
}
.xw-faceEmoji {
  margin-bottom: 7px;
  width: 20%;
  float: left;
}

.xw-hide-operation {
  background: url(/static/images/addOn.svg) no-repeat 50%;
  width: 38px;
  height: 38px;
  margin-right: 10px;
  transform: scale(0.7);
}

.xw-hide-operation-close {
  background: url(/static/images/addClose.svg) no-repeat 50%;
  width: 38px;
  height: 38px;
  margin-right: 10px;
  transform: scale(0.7);
}

.xw-chat-servicer:after,
.xw-chat-customer:after,
.xw-chat-wrap:after,
.xw-chat-tool:after,
.xw-chat-ul-box:after {
  clear: both;
}

.xw-chat-msg:last-child:before {
  bottom: -1px;
}

.xw-chat-msg:last-child:after,
.xw-chat-msg:last-child:before {
  content: "";
  position: absolute;
  height: 0;
  width: 0;
  display: block;
}

.xw-chat-customer .xw-chat-msg:last-child:before {
  display: inline-block;
  height: 0;
  width: 0;
  border: 10px solid transparent;
  border-bottom: 10px solid #025e80;
  right: -10px;
  border-left-width: 9px;
}

.xw-chat-servicer .xw-chat-msg:last-child:before {
  display: inline-block;
  height: 0;
  width: 0;
  border: 10px solid transparent;
  border-bottom: 10px solid #efefef;
  left: -10px;
  border-left-width: 9px;
}

.xw-chat-servicer .xw-chat-msg:last-child:after {
  display: inline-block;
  height: 0;
  width: 0;
  border: 10px solid transparent;
  border-bottom: 10px solid #fff;
  left: -8px;
  border-left-width: 9px;
  bottom: 0px;
}
.van-swipe-item {
  li {
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>