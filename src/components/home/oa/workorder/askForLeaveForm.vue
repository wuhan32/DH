<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>请假申请</span>
      <span class="sub" @click="getAssign">提交</span>
    </div>
    <div>
        <van-cell-group>
            <van-cell title="流程审批信息" class="title"/>
            <van-field v-model="processTitle" clearable disabled label="流程标题：" placeholder="请输入流程标题" />
            <van-field v-model="processProposer" clearable disabled label="申请人：" placeholder="请输入申请人" />
            <van-field v-model="processOrgText" clearable disabled label="申请部门：" placeholder="请输入申请部门" />
            <br />
            <van-cell title="申请表单" class="title"/>
            <van-field v-model="applyno" disabled label="申请编号：" placeholder="请输入申请编号"/>
            <van-field v-model="staffname" disabled  label="申请对象：" placeholder="请输入申请对象"/>
            <van-field v-model="processOrgText" disabled label="所在部门：" placeholder="请输入所在部门"/>
            <br>
            <van-field v-model="days" required label="请假天数：" placeholder="请输入请假天数"/>
            <van-field v-model="vacationtypeText" @click="typeShow = true" clearable disabled required label="请假类型：" placeholder="请选择请假类型"/>
            <van-action-sheet
          v-model="typeShow"
          title="选择请假类型"
          :actions="actions"
          :round="false"
          @select="onSelect"
        />
            <br>
            <van-field v-model="starttime" clearable label="开始时间：" @click="popup = true"  disabled required placeholder="请选择开始时间"/>
            <van-field v-model="endtime" clearable label="结束时间：" @click="popup1 = true"  disabled required placeholder="请选择结束时间"/>
            <br>
            <van-field v-model="post" required label="所在岗位：" placeholder="请输入岗位"/>
            <van-field v-model="contactinformation" clearable label="联系方式：" placeholder="请输入联系方式"/>
            <van-field v-model="handler" clearable label="工作处理：" placeholder="请输入工作待处理人"/>
            <van-field
                v-model="reason"
                rows="4"
                autosize
                label="请假事由："
                type="textarea"
                placeholder="请输入请假事由"
                show-word-limit
            />
        </van-cell-group>
        <!-- 时间1 -->
      <van-popup v-model="popup" label="开始时间" position="bottom" :overlay="true">
        <van-datetime-picker
          title="请选择开始时间"
          v-model="popupText"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @cancel="popup = false"
          @confirm="confirmFn()"
        />
      </van-popup>
      <!-- 时间2 -->
      <van-popup v-model="popup1" label="结束时间：" position="bottom" :overlay="true">
        <van-datetime-picker
          title="请选择结束时间"
          v-model="popup1Text"
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
  data () {
    return {
      no: '',
      message: '',
      //时间
      minHour: 1,
      maxHour: 24,
      minDate: new Date(),
      maxDate: new Date(3019, 10, 1),
      //时间1
      popup: false,
      popupText:new Date(),
      //时间2
      popup1: false,
      popup1Text:new Date(),
      //流程审批信息
      userInfo:"",
      processTitle:this.$route.params.processTitle,
      processProposer:"",
      processOrg:"",
      processOrgText:"",
      //启动流程
      formId:"",//外置表单id
      variables:[],//Form表单参数
      processDefinitionId:this.$route.params.processDefinitionId,//流程定义id    (因为这里时车辆申请的流程)
      //leave_process:96:317508  LG
      //leave_process:4:5004    XS
      //表单参数
      applyno:"",//申请单编号
      staffname:"",//申请人
      orgid:"",//部门
      post:"",//岗位
      starttime:"",//开始时间
      endtime:"",//结束时间
      days:"",//请假天数
      vacationtype:"",//请假类型
      reason:"",//请假事由
      contactinformation:"",//联系方式
      handler:"",//工作待处理人

      //请假类型处理
      typeShow: false,
      vacationtypeText:"",
      actionss: {
        事假:"cp1563272616392",
        病假:"cp1563272639079",
        婚假:"cp1563272656641",
        丧假:"cp1563272662910",
        其他:"cp1563272675878",
      },
      actions: [
        { name: "事假" },
        { name: "病假" },
        { name: "婚假" },
        { name: "丧假" },
        { name: "其他" }
      ],

    }
  },
  created () {},
  beforeMount () {
    this.getUserInfo();
    this.randomWord(false, 18); //编号
  },
  mounted () {},
  beforeDestroy () {},
  methods: {
    prev () {
      this.$router.go(-1) // 返回上一层
    },
    getAssign() {
      if (!this.starttime) {
        Notify({ type: "primary", message: "请选择开始时间!" });
        return;
      }
      if (!this.endtime) {
        Notify({ type: "primary", message: "请选择结束时间!" });
        return;
      }
      if (!this.days) {
        Notify({ type: "primary", message: "请输入请假天数!" });
        return;
      }
      if (!this.vacationtype) {
        Notify({ type: "primary", message: "请选择请假类型!" });
        return;
      }
      if (!this.reason) {
        Notify({ type: "primary", message: "请输入请假事由!" });
        return;
      }
          if (!this.contactinformation) {
        Notify({ type: "primary", message: "请输入联系方式!" });
        return;
      }
      const toast = Toast.loading({
        mask: true,
        message: "提交表单中……",
        duration: 0
      });
      var url = this.GLOBA.serverSrc + "vacationapply/appFormSave";
      let param = new URLSearchParams();
      var text = {
        applyno: this.applyno,
        staffname: this.staffname,
        orgid: this.orgid,
        post:this.post,
        starttime: this.starttime,
        endtime: this.endtime,
        days: this.days,
        vacationtype: this.vacationtype,
        reason: this.reason,
        contactinformation: this.contactinformation,
        handler: this.handler,
      };
      var strJson = JSON.stringify(text);
      param.append("strJson", strJson);
      console.log("strjson:",strJson);
      this.$http
        .post(url, param)
        .then(response => {
          console.log("提交申请表单：", response);
          toast.clear();
          if (response.data != null) {
            if (response.data.status) {
              Toast.success("申请表单提交成功");
              //清空表单数据
              this.randomWord(false, 18); //编号
              this.starttime= "", //开始时间
              this.endtime=  "", //结束时间
              this.days= "", //天数
              this.vacationtype= "", //请假类型
              this.reason=  "", //请假事由
              this.contactinformation=  "", //联系方式
              this.handler= "", //待处理人

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
              Toast.success("流程启动成功，请到个人事务中查看我的流程");  
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

          //申请人
          this.staffname=this.userInfo.chsname;
          this.orgid=this.userInfo.orgid;
        } else {
          Toast.loading({
            message: "用户不存在",
            forbidClick: true
          });
        }
      }).catch(error => {
          toast.clear();
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });;
    },
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.typeShow = false;
      this.vacationtypeText = item.name;
      this.vacationtype = this.actionss[item.name];
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
      this.applyno = "DHQJ" + str;
    },
    confirmFn(value) {//计划开始时间选择后处理
      var date = this.popupText;
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
    if (hours >= 0 && hours <= 9) {
      hours = "0" + hours;
    }
    if (m >= 0 && m <= 9) {
      m = "0" + m;
    }
    if (s >= 0 && s <= 9) {
      s = "0" + s;
    }
      var time =year +seperator1 +month +seperator1 +strDate +" " +hours +":" +m +":" + s;
      this.starttime = time;
      this.popup = false;
    },
    confirmFn1(value) {//计划结束时间做处理
      var date = this.popup1Text;
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
    if (hours >= 0 && hours <= 9) {
      hours = "0" + hours;
    }
    if (m >= 0 && m <= 9) {
      m = "0" + m;
    }
    if (s >= 0 && s <= 9) {
      s = "0" + s;
    }
      var time =year +seperator1 +month +seperator1 +strDate +" " +hours +":" +m +":" + s;
      this.endtime = time;
      this.popup1 = false;
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
}
</script>
<style scoped lang="less">
.page {
    height: 100%;
    width: 100%;
    background-color: #f5f6f7;
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
  .sub{
    margin-right: 20px;
    position: absolute;
    right: 10px;
  }
  .van-cell-group{
      background-color: #f5f6f7;
  }
  .title {
    .van-cell__title{
      color: #31A83D;
    }
  }
}
</style>
