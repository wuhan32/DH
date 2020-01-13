<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>个人日志</span>
      <span class="sub" @click="gotoLogList">看日志</span>
    </div>
    <div>
      <van-cell-group>
        <van-field
          v-model="senderText"
          required
          clearable
          disabled
          label="发送人："
          placeholder="请输入发送人"
        />
        <van-field
          v-model="mandSendText"
          @click="popupMandSend = true"
          required
          clearable
          disabled
          label="接收人："
          placeholder="请选择日志接收人"
        />
        <van-field
          v-model="copyToText"
          clearable
          disabled
          rows="1"
            autosize
          label="抄送人："
          @click="popupcopyTo = true"
          type="textarea"
          placeholder="请选择日志抄送人"
        />
        <van-field v-model="workingDate" clearable disabled label="日期：" placeholder="请输入日期" />
        <van-field
          v-model="jobContent"
          required
          clearable
          rows="10"
          autosize
          label="日志内容"
          type="textarea"
          placeholder="例：1、今日完成      2、明日计划"
          show-word-limit
        />
      </van-cell-group>
      <div class="bottom">
        <van-button @click="saveForm" type="info" color="#00A047" size="large">提交</van-button>
      </div>
      <!-- 选择日志接收人 -->
      <van-popup
        v-model="popupMandSend"
        label="选择日志接收人"
        position="bottom"
        :overlay="true"
        :safe-area-inset-bottom="true"
        :style="{ height: '60%' }"
      >
        <div class="popuphead">
          <span>选择日志接收人</span>
          <span @click="getMandSendInfo">&emsp;确定</span>
        </div>
        <div class="popupbody">
          <van-radio-group v-model="MandSend">
            <van-cell-group>
              <div v-for="(item, index) in List" :key="index">
                <span v-if="item.name != null">
                  <van-cell clickable :title="item.chsname" :label="item.name">
                    <van-radio :name="index" slot="right-icon" shape="square" />
                  </van-cell>
                </span>
                <span v-else>
                  <van-cell clickable :title="item.chsname">
                    <van-radio :name="index" slot="right-icon" shape="square" />
                  </van-cell>
                </span>
              </div>
            </van-cell-group>
          </van-radio-group>
        </div>
      </van-popup>
      <!-- 选择日志抄送人 -->
      <van-popup
        v-model="popupcopyTo"
        label="选择日志抄送人"
        position="bottom"
        :overlay="true"
        :safe-area-inset-bottom="true"
        :style="{ height: '60%' }"
      >
        <div class="popuphead">
          <span>选择日志抄送人</span>
          <span @click="getCopyToInfo">&emsp;确定</span>
        </div>
        <div class="popupbody">
          <van-checkbox-group v-model="CopyTo">
            <van-cell-group>
              <div v-for="(item, index) in List" :key="index">
                <span v-if="item.name != null">
                  <van-cell clickable :title="item.chsname" :label="item.name">
                    <van-checkbox :name="index" slot="right-icon" shape="square" />
                  </van-cell>
                </span>
                <span v-else>
                  <van-cell clickable :title="item.chsname">
                    <van-checkbox :name="index" slot="right-icon" shape="square" />
                  </van-cell>
                </span>
              </div>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      userInfo: "",

      //表单
      sender: "",
      senderText: "",
      mandSend: "",
      mandSendText: "",
      copyTo: "",
      copyToText: "",
      workingDate: "",
      jobContent: "",
      //接收人
      List: [],
      popupMandSend: false,
      MandSend: [],
      //抄送人
      popupcopyTo: false,
      CopyTo: []
    };
  },
  created() {},
  beforeMount() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.senderText = this.userInfo.chsname;
    this.sender = this.userInfo.id;
    
    this.getdate();//获取当前时间
    ///获取接收人集合
    this.getList();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
      getdate(){
          var date = new Date();
    var seperator1 = "-";
    var sep = ":";
    var kongge = " ";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    this.workingDate =
      year +
      seperator1 +
      month +
      seperator1 +
      strDate +
      kongge +
      hours +
      sep +
      m +
      sep +
      s;
      },
    getMandSendInfo() {
      if (this.MandSend.length != 0) {
        this.mandSendText = this.List[this.MandSend].chsname;
        this.mandSend = this.List[this.MandSend].id;
        console.log("mandSend接收人：",this.List,this.MandSend,this.mandSend);
        this.popupMandSend = false;
      } else {
        this.$toast("请至少选中一位日志接收人");
      }
    },
    getCopyToInfo() {
      var chsname = "";
      var id="";
      if (this.CopyTo.length != 0) {
        this.CopyTo.forEach(element => {
          chsname += this.List[element].chsname + ",";
          id += this.List[element].id + ",";
        });
        this.copyToText = chsname.substring(0, chsname.length - 1);
        this.copyTo = id.substring(0, id.length - 1);
      }else{
          this.copyToText ="";
        this.copyTo ="";
      }
      this.popupcopyTo = false;
    },
    getList() {
      const toast = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      //获取用户信息
      var url = this.GLOBA.serverSrc + "userinfo/rosterListLoad";
      let param = new URLSearchParams();
      this.$http
        .post(url, param)
        .then(response => {
          toast.clear();
          console.log("日志接收人：", response);
          if (response.data != null && response.data.total > 0) {
            this.List = response.data.rows;
            if (this.List.length > 15) {
              this.msg = "没有更多";
            } else {
              this.msg = "";
            }
          } else {
            this.List = [];
            this.msg = "暂无日志";
          }
        })
        .catch(error => {
          toast.clear();
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    },
    saveForm(){
        console.log(this.mandSend,this.jobContent)
      if(!this.mandSend){
        Notify({ type: "primary", message: "请选择接收人!" });
        return;
      }
      if(!this.jobContent){
        Notify({ type: "primary", message: "请输入日志内容!" });
        return;
      }
      const toast = Toast.loading({
        mask: true,
        message: "提交中...",
        duration: 0
      });
      //获取申请单
      var url = this.GLOBA.serverSrc + "workDiary/AppFormSave";
      let param = new URLSearchParams();
      var text = {
        sender: this.sender,
        mandSend: this.mandSend,
        copyTo: this.copyTo,
        workingDate: this.workingDate,
        jobContent: this.jobContent,
      };
      var strJson = JSON.stringify(text);
      param.append("workDiaryStr", strJson);
      this.$http
        .post(url, param)
        .then(response => {
          toast.clear();
          console.log("提交日志：", response);
          if(response.data!=null){
              if(response.data.status){
                  Toast.success("提交成功");
                  this.mandSendText="";
                  this.mandSend="";
                  this.copyTo="";
                  this.copyToText="";
                  this.jobContent="";
                  this.getdate();//获取当前时间
              }else{
                  Toast.fail("提交失败");
              }
          }else{
              Toast.fail("提交失败");
              }
        })
        .catch(error => {
          toast.clear();
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    },
    gotoLogList() {
      this.$router.push("/logList");
    },
    prev() {
      this.$router.go(-1); // 返回上一层
    }
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
  .popuphead {
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    background-color: #fff;
    display: flex;
    position: fixed;
    z-index: 100;
    justify-content: space-between;
    :nth-child(1) {
      color: #323233;
      margin-left: 15px;
    }
    :nth-child(2) {
      color: #1989fa;
      margin-right: 15px;
    }
  }
  .popupbody {
    margin-top: 40px;
  }
  .bottom{
      width: 100%;
      position: fixed;
      bottom: 0px;
  }
}
</style>
