<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click.native="prevs" />
      <span>车辆申请</span>
      <span class="sub" @click="getAssign">提交申请</span>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="流程审批信息" class="title"/>
        <van-field v-model="processTitle" clearable disabled label="流程标题：" placeholder="请输入流程标题" />
        <van-field v-model="processProposer" clearable disabled label="申请人：" placeholder="请输入申请人" />
        <van-field v-model="processOrgText" clearable disabled label="申请部门：" placeholder="请输入申请部门" />
        <br />

        <van-cell title="申请表单" class="title"/>
        <van-field
          v-model="assignrecordNo"
          required
          clearable
          disabled
          label="申请编号："
          placeholder="请输入申请编号"
        />
        <van-field
          v-model="appvehpersonname"
          required
          disabled
          clearable
          label="申请名称："
          placeholder="请选择申请人名称"
        />
        <van-field
          v-model="appphonenumber"
          required
          disabled
          clearable
          label="申请电话："
          placeholder="请输入申请人电话"
        />
        <br />

        <van-field
          v-model="usevehpersonname"
          @click="vanpopup=true"
          required
          disabled
          clearable
          label="用车名称："
          placeholder="请点击选择用车人名称"
        />
        <van-field
          v-model="usevehpersonphone"
          disabled
          required
          clearable
          label="用车电话："
          placeholder="请点击选择用车人电话"
        />
        <van-field
          v-model="personnum"
          required
          type="number"
          clearable
          label="人数："
          placeholder="请输入人数"
        />
        <br />
        <van-field
          v-model="toplace"
          required
          clearable
          label="上客地址："
          placeholder="请输入上客地址"
        />
        <van-field v-model="toAddress" required  clearable label="到达地址：" placeholder="请输入到达地址" />
        <br />
        <div data-v-ef56a2f2 class="van-cell van-field">
          <div class="van-cell__title van-field__label">
            <span>市内/长途：</span>
          </div>
          <div class="van-cell__value">
            <div class="van-field__body">
              市内&emsp;
              <van-switch
                v-model="distancetype"
                active-value="cp1555569228491"
                inactive-value="cp1555569220483"
                inactive-color="#025E80"
                size="20px"
              />&emsp;长途
            </div>
          </div>
        </div>
        <van-field
          v-model="usevehtypeText"
          required
          disabled
          clearable
          @click="usevehtypeShow = true"
          label="用途："
          placeholder="请选择用途"
        />
        <van-action-sheet
          v-model="usevehtypeShow"
          title="选择车辆用途"
          :actions="actions"
          :round="false"
          @select="onSelect"
        />
        <br />
        <van-field
          v-model="appstarttime"
          @click="popup = true"
          required
          disabled
          clearable
          label="开始时间："
          placeholder="请选择开始时间"
        />
        <van-field
          v-model="appendtime"
          @click="popup1 = true"
          required
          disabled
          clearable
          label="归还时间："
          placeholder="请选择归还时间"
        />
        <br />
        <van-field
          v-model="usevehreason"
          required
          clearable
          type="textarea"
          rows="5"
          label="用车事由："
          placeholder="请输入用车事由"
        />
        <van-field
          v-show="false"
          v-model="returnTime"
          disabled
          clearable
          label="实际归还时间："
          placeholder="实际归还时间不必填写"
        />
      </van-cell-group>
      <!-- 用车人名称 -->
      <van-popup
        v-model="vanpopup"
        label="选择日志接收人"
        position="bottom"
        :overlay="true"
        :safe-area-inset-bottom="true"
        :style="{ height: '60%' }"
      >
        <div class="popuphead">
          <span>选择用户</span>
          <span @click="vanpopupSure">&emsp;确定</span>
        </div>
        <div class="popupbody">
          <van-radio-group v-model="vanpopupText">
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

      <!-- 时间1 -->
      <van-popup v-model="popup" label="计划开始时间" position="bottom" :overlay="true">
        <van-datetime-picker
          title="请选择计划开始时间"
          v-model="appstarttimeText"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @cancel="popup = false"
          @confirm="confirmFn()"
        />
      </van-popup>
      <!-- 时间2 -->
      <van-popup v-model="popup1" label="计划归还时间：" position="bottom" :overlay="true">
        <van-datetime-picker
          title="请选择计划归还时间"
          v-model="appendtimeText"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @cancel="popup1 = false"
          @confirm="confirmFn1()"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      minHour: 1,
      maxHour: 24,
      minDate: new Date(),
      maxDate: new Date(3019, 10, 1),
      //流程审批信息
      processTitle:"车辆申请",
      processProposer:"",
      processOrg:"",
      processOrgText:"",
      //时间1
      popup: false,
      appstarttimeText:new Date(),
      //时间2
      popup1: false,
      appendtimeText:new Date(),
      //弹框1
      vanpopup: false,
      vanpopupText:"",
      //用户信息
      List: [],
      userInfo:"",//登录用户信息
      //用途处理
      usevehtypeShow: false,
      usevehtypeText:"",
      actionss: {
        接待: "cp1557392875552",
        送检: "cp1557392893508",
        送货: "cp1557392922156",
        其他: "cp1562202233994",
      },
      actions: [
        { name: "接待" },
        { name: "送检" },
        { name: "送货" },
        { name: "其他" }
      ],
      //表单参数
      assignrecordNo: "",//申请编号
      appvehpersonname:"",//申请人名称
      appphonenumber:"",//申请人电话
      usevehpersonname:"",//用车人名称
      usevehpersonphone:"",//用车人电话
      personnum:"",//人数
      toplace:"",//上客地址
      toAddress:"",//达到地址
      distancetype:"cp1555569220483",//市内/长途
      usevehtype:"",//用途
      usevehreason:"",//用车事由
      appstarttime:"",//计划开始时间
      appendtime:"",//计划归还时间
      returnTime:"",//实际归还时间

      //启动流程
      formId:"",//外置表单id
      variables:[],//Form表单参数
      processDefinitionId:"vehicleaApply_process:27:225006",//流程定义id    (因为这里时车辆申请的流程)
      //vehicleaApply_process:27:225006  LZ
      //vehicleaApply_process:5:25004    XS
    };
  },
  created() {},
  beforeMount() {
    this.getUserInfo();
    this.randomWord(false, 18); //编号
    this.getList(); //获取用户信息
  },
  mounted() {},
  beforeDestroy() {},
  updated() {},
  methods: {
    prevs() {
      this.$router.go(-1); // 返回上一层
    },
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.usevehtypeShow = false;
      this.usevehtypeText = item.name;
      this.usevehtype = this.actionss[item.name];
    },
    randomWord(randomFlag, min, max) {
      var str = "",
        range = min,
        arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      console.log("随机数：", str);
      this.assignrecordNo = "DHYC" + str;
    },
    vanpopupSure() {//确认选中的用户并对选中用户做处理
      if (this.vanpopupText.length != 0) {
        this.usevehpersonname = this.List[this.vanpopupText].chsname;
        this.usevehpersonphone=this.List[this.vanpopupText].mobile
        this.vanpopup = false;
      } else {
        this.$toast("请至少选中一位用车人");
      }
    },
    getList() {
      //获取用户信息，在弹框中展示用户相关信息
      var url = this.GLOBA.serverSrc + "userinfo/rosterListLoad";
      let param = new URLSearchParams();
      this.$http
        .post(url, param)
        .then(response => {
          console.log("用户集合的信息：", response);
          if (response.data != null && response.data.total > 0) {
            this.List = response.data.rows;
          } else {
            this.List = [];
          }
        })
        .catch(error => {
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    },
    confirmFn(value) {//计划开始时间选择后处理
      var date = this.appstarttimeText;
      var seperator1 = "-";
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
      var time =year +seperator1 +month +seperator1 +strDate +" " +hours +":" +m;
      this.appstarttime = time;
      this.popup = false;
    },
    confirmFn1(value) {//计划结束时间做处理
      var date = this.appendtimeText;
      var seperator1 = "-";
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
      var time =year +seperator1 +month +seperator1 +strDate +" " +hours +":" +m;
      this.appendtime = time;
      this.popup1 = false;
    },
    getUserInfo(){//获取登录用户的详细信息
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));//获取登录用户信息
      var url = this.GLOBA.serverSrc + "/user/formLoad";
      let param = new URLSearchParams();
      param.append("id", userInfo.id);
      this.$http.post(url, param).then(res => {
        if (res.data != "") {
          console.log("登录用户信息：",res.data);
          this.userInfo = res.data;
          this.appvehpersonname=this.userInfo.chsname;
          this.processProposer=this.userInfo.chsname;
          this.appphonenumber=this.userInfo.mobile;
          this.processOrgText=this.userInfo.orgname;
          this.processOrg=this.userInfo.orgid;
        } else {
          Toast.loading({
            message: "用户不存在",
            forbidClick: true
          });
        }
      });
    },
    getAssign() {
      if (!this.usevehpersonname) {
        Notify({ type: "primary", message: "请选择用车人!" });
        return;
      }
      if (!this.personnum) {
        Notify({ type: "primary", message: "请输入人数!" });
        return;
      }
      if (!this.toplace) {
        Notify({ type: "primary", message: "请输入上客地址!" });
        return;
      }
      if (!this.toAddress) {
        Notify({ type: "primary", message: "请输入到达地址!" });
        return;
      }
      if (!this.usevehtype) {
        Notify({ type: "primary", message: "请选择用途!" });
        return;
      }
      if (!this.appstarttime) {
        Notify({ type: "primary", message: "请选择计划开始时间!" });
        return;
      }
      if (!this.appendtime) {
        Notify({ type: "primary", message: "请选择计划结束时间!" });
        return;
      }
      const toast = Toast.loading({
        mask: true,
        message: "提交表单中……",
        duration: 0
      });
      var url = this.GLOBA.serverSrc + "vehicleapplyrecord/formSaveMove";
      let param = new URLSearchParams();
      var text = {
        applyrecordno: this.assignrecordNo,
        appvehpersonname: this.appvehpersonname,
        appphonenumber: this.appphonenumber,
        usevehpersonname: this.usevehpersonname,
        usevehpersonphone: this.usevehpersonphone,
        personnum: this.personnum,
        toplace: this.toplace,
        toAddress: this.toAddress,
        distancetype: this.distancetype,
        usevehtype: this.usevehtype,
        usevehreason: this.usevehreason,
        appstarttime: this.appstarttime,
        appendtime: this.appendtime,
        returnTime: this.returnTime,
      };
      var strJson = JSON.stringify(text);
      param.append("strJson", strJson);
      console.log(strJson);
      this.$http
        .post(url, param)
        .then(response => {
          console.log("提交车辆申请表单：", response);
          toast.clear();
          if (response.data != null) {
            if (response.data.status) {
              Toast.success("申请表单提交成功");
              //清空表单数据
              this.assignrecordNo= "",//申请编号
              this.randomWord(false, 18); //编号
              this.usevehpersonname="",//用车人名称
              this.usevehpersonphone="",//用车人电话
              this.personnum="",//人数
              this.toplace="",//上客地址
              this.toAddress="",//达到地址
              this.distancetype="cp1555569220483",//市内/长途
              this.usevehtype="",//用途
              this.usevehreason="",//用车事由
              this.appstarttime="",//计划开始时间
              this.appendtime="",//计划归还时间
              this.returnTime="",//实际归还时间

              this.formId=response.data.id;
              this.start();//表单提交成功后，启动流程
            } else {
              Toast.fail("提交失败，请查看相关参数是否填写正确!");
            }
          } else {
            Toast.fail("申请表单提交失败");
          }
        })
        .catch(error => {
          console.log(error);
          toast.clear();        
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    },
    start() {
      const toast = Toast.loading({
        mask: true,
        message: "流程启动中...",
        duration: 0
      });
      //获取用户信息
      var url = this.GLOBA.serverSrc + "appProcess/startById?processDefinitionId="+this.processDefinitionId+"&formId="+this.formId;
      console.log("url:",url);
      let param = new URLSearchParams();
      param.append("processDefinitionId", this.processDefinitionId);
      param.append("variables",""+[]);
      param.append("formId", this.formId);
      this.$http
        .post(url, "{}",{
           headers: {
              "Content-Type": "text/plain"
            }
        })
        .then(response => {
          toast.clear();
          console.log("流程启动：", response);
          if(response.data!=''){
            if(response.data.status){
              Toast.success("流程成功，请到个人事务中查看我的流程");  
            }else{
              Toast.fail("流程启动失败，请到个人事务中查看我的流程");
            }
          }else{
            Toast.fail("流程启动失败，请到个人事务中查看我的流程");
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
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    }
  }
};
</script>
<style scoped lang="less">
.page {
  height: 100%;
  width: 100%;
  background-color: #f5f6f7;
  margin-top: 56px;
  .van-icons {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }
  .sub {
    margin-right: 20px;
    position: absolute;
    right: 10px;
  }
  .van-cell-group {
    background-color: #f5f6f7;
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
  .title {
    .van-cell__title{
      color: #31A83D;
    }
  }
}
</style>
