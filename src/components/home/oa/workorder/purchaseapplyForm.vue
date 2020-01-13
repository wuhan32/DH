<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>办公用品申请</span>
      <span class="sub" @click="getAssign">提交</span>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="流程审批信息" class="title" />
        <van-field v-model="processTitle" clearable disabled label="流程标题：" placeholder="请输入流程标题" />
        <van-field v-model="processProposer" clearable disabled label="申请人：" placeholder="请输入申请人" />
        <van-field v-model="processOrgText" clearable disabled label="申请部门：" placeholder="请输入申请部门" />
        <br />

        <van-cell title="申请表单" class="title" />
        <van-field
          v-model="applydate"
          clearable
          label="申请日期："
          @click="popup = true"
          disabled
          placeholder="请选择申请日期"
        />
        <van-field
          v-model="updatetime"
          clearable
          label="更新日期："
          @click="popup1 = true"
          disabled
          placeholder="请选择更新日期"
        />
        <br />
        <van-field v-model="resnoText" @click="vanpopup = true" disabled label="用品名称：" placeholder="请选择用品名称" />
        <!-- 用品名称 -->
        <van-popup
          v-model="vanpopup"
          label="选择申请的办公用品"
          position="bottom"
          :overlay="true"
          :safe-area-inset-bottom="true"
          :style="{ height: '60%' }"
        >
          <div class="popuphead">
            <span>选择申请的办公用品</span>
            <span @click="vanpopupSure">&emsp;确定</span>
          </div>
          <div class="popupbody">
            <van-radio-group v-model="vanpopupText">
              <van-cell-group>
                <div v-for="(item, index) in List" :key="index">
                  <span v-if="item.dsrestype != null">
                    <van-cell clickable :title="item.resname" :label="item.dsrestype">
                      <van-radio :name="index" slot="right-icon" shape="square" />
                    </van-cell>
                  </span>
                  <span v-else>
                    <van-cell clickable :title="item.resname">
                      <van-radio :name="index" slot="right-icon" shape="square" />
                    </van-cell>
                  </span>
                </div>
              </van-cell-group>
            </van-radio-group>
          </div>
        </van-popup>
        <!-- 用品名称 -->
        <van-field v-model="suppliername"  label="供应商：" placeholder="请输入供应商" />
        <van-field v-model="models"  label="品牌型号：" placeholder="请输入品牌型号" />
        <van-field v-model="unit"  label="单位：" placeholder="请输入单位" />
        <br />
        <van-field
          v-model="price"
          @click="typeShow = true"
          clearable
          label="单价："
          placeholder="请输入单价"
        />
        <br />
        <van-field v-model="number" clearable label="数量：" placeholder="请输入数量" />
        <van-field
          v-model="remar"
          rows="4"
          autosize
          label="用途说明："
          type="textarea"
          placeholder="请输入用途说明"
          show-word-limit
        />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      //流程审批信息
      userInfo: "",
      processTitle: this.$route.params.processTitle,
      processProposer: "",
      processOrg: "",
      processOrgText: "",
      //启动流程
      formId: "", //外置表单id
      variables: [], //Form表单参数
      processDefinitionId: this.$route.params.processDefinitionId, //流程定义id    (因为这里时车辆申请的流程)
      //purchaseapply_process:9:282507   LZ
      //purchaseapply_process:9:282507  LG
      //purchaseapply_process:2:2508    XS
      //表单参数
      applydate: "", //申请日期
      updatetime: "", //更新日期
      resno: "", //用品名称
      suppliername: "", //供应商名称
      models: "", //品牌型号
      unit: "", //单位
      price: "", //单价
      number: "", //数量
      remar: "", //用途及说明

      //用品名称处理
      List: "",
      //弹框1
      vanpopup: false,
      vanpopupText:"",
      resnoText:"",
    };
  },
  created() {},
  beforeMount() {
    this.getUserInfo();//获取登录用户的信息
    this.getList();//获取办公用品集合
    this.getdateText();//获取当前时间
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    prev() {
      this.$router.go(-1); // 返回上一层
    },
    getAssign() {
      if (!this.resno) {
        Notify({ type: "primary", message: "请选择申请的办公用品!" });
        return;
      }
      if (!this.suppliername) {
        Notify({ type: "primary", message: "请输入供应商名称!" });
        return;
      }
      if (!this.models) {
        Notify({ type: "primary", message: "请输入品牌型号!" });
        return;
      }
      if (!this.unit) {
        Notify({ type: "primary", message: "请输入单位!" });
        return;
      }
      if (!this.price) {
        Notify({ type: "primary", message: "请输入单价!" });
        return;
      }
      if (!this.number) {
        Notify({ type: "primary", message: "请输入数量!" });
        return;
      }
      const toast = Toast.loading({
        mask: true,
        message: "提交表单中……",
        duration: 0
      });
      var url = this.GLOBA.serverSrc + "purchaseapply/appFormSave";
      let param = new URLSearchParams();
      var text = {
        applydate: this.applydate,
        updatetime: this.updatetime,
        resno: this.resno,
        suppliername: this.suppliername,
        models: this.models,
        unit: this.unit,
        price: this.price,
        number: this.number,
        remar: this.remar,
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
              this.getdateText();//获取当前时间---为申请日期赋值
              this.resno= "", //用品名称
              this.suppliername=  "", //供应商名称
              this.models= "", //品牌型号
              this.unit= "", //单位
              this.price=  "", //单价
              this.number=  "", //数量
              this.remar= "", //用途及说明

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
    getdateText(){
      
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
    if (hours >= 0 && hours <= 9) {
      hours = "0" + hours;
    }
    if (m >= 0 && m <= 9) {
      m = "0" + m;
    }
    if (s >= 0 && s <= 9) {
      s = "0" + s;
    }
    var rectime =
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
      this.applydate=rectime;
      this.updatetime=rectime;
    },
    vanpopupSure() {//确认选中的用户并对选中用户做处理
      if (this.vanpopupText.length != 0) {
        this.resnoText = this.List[this.vanpopupText].resname;
        this.resno=this.List[this.vanpopupText].resno;
        this.vanpopup = false;
      } else {
        this.$toast("请至少选择一个办公用品进行申请");
      }
    },
    getList() {
      //获取用户信息，在弹框中展示用户相关信息
      var url = this.GLOBA.serverSrc + "res/listLoad?restype=offices";
      let param = new URLSearchParams();
      this.$http
        .post(url, param)
        .then(response => {
          console.log("集合：", response);
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
    getUserInfo() {
      //获取登录用户的详细信息
      var userInfo = JSON.parse(localStorage.getItem("userInfo")); //获取登录用户信息
      var url = this.GLOBA.serverSrc + "/user/formLoad";
      let param = new URLSearchParams();
      param.append("id", userInfo.id);
      this.$http.post(url, param).then(res => {
        if (res.data != "") {
          console.log("登录用户信息：", res.data);
          this.userInfo = res.data;
          this.appvehpersonname = this.userInfo.chsname;
          this.processProposer = this.userInfo.chsname;
          this.appphonenumber = this.userInfo.mobile;
          this.processOrgText = this.userInfo.orgname;
          this.processOrg = this.userInfo.orgid;

          //申请人
          this.staffname = this.userInfo.chsname;
          this.orgid = this.userInfo.orgid;
          this.orgText = this.userInfo.orgname;
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
  }
};
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
  .sub {
    margin-right: 20px;
    position: absolute;
    right: 10px;
  }
  .van-cell-group {
    background-color: #f5f6f7;
  }
  .title {
    .van-cell__title {
      color: #31a83d;
    }
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
}
</style>
