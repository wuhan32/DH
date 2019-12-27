<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click.native="prevs" />
      <span>车辆分派</span>
      <span class="sub" @click="getAssign">提交</span>
    </div>
    <div>
      <van-cell-group>
        <van-field
          v-model="assignrecordNo"
          required
          clearable
          disabled
          label="分派编号："
          placeholder="请输入分派编号"
        />
        <van-field
          v-model="usevehreason"
          required
          disabled
          @click="showpopupApplyTable"
          clearable
          label="申请单："
          placeholder="请选择申请单"
        />

        <br />
        <van-field
          v-model="useVehPersonName"
          required
          disabled
          clearable
          label="用车人："
          placeholder="请输入用车人姓名"
        />
        <van-field
          v-model="useVehPersonMobile"
          required
          disabled
          clearable
          label="手机号码："
          placeholder="请输入用车人手机号码"
        />

        <br />
        <van-field
          v-model="rectime"
          disabled
          required
          clearable
          label="登记时间："
          placeholder="请输入登记时间"
        />
        <van-field
          v-model="vehicleinfoidStr"
          @click="showpopupCarTable"
          required
          disabled
          clearable
          label="分派车辆："
          placeholder="请选择分派车辆"
        />
        <br />
        <van-field
          v-model="driverName"
          required
          clearable
          disabled
          label="指定司机："
          placeholder="请输入指定驾驶人"
        />
        <van-field
          v-model="temporaryDriverStr"
          @click="showpopupDriverTable"
          disabled
          clearable
          label="临时司机："
          placeholder="请选择临时驾驶人"
        />
        <br />
        <van-field
          v-model="assignstarttime"
          required
          disabled
          @click="popup = true"
          clearable
          label="派车时间："
          placeholder="请选择派车开始时间"
        />
        <van-field
          v-model="fixendtime"
          required
          disabled
          @click="popup1 = true"
          clearable
          label="返还时间："
          placeholder="请选择规定返还时间"
        />
      </van-cell-group>
      <!-- 申请车单 -->
      <van-popup
        v-model="popupApplyTable"
        label="申请车单"
        position="bottom"
        :overlay="true"
        :safe-area-inset-bottom="true"
        :style="{ height: '50%' }"
      >
        <div class="tableDiv">
          <van-row class="rowtr">
            <van-col span="4">
              <h3>用车人</h3>
            </van-col>
            <van-col span="9">
              <h3>开始时间</h3>
            </van-col>
            <van-col span="8">
              <h3>归还时间</h3>
            </van-col>
            <van-col span="3">
              <h3 style="color:#1989FA;" @click="getApplyInfo">确认</h3>
            </van-col>
          </van-row>
          <van-radio-group v-model="radio">
            <van-row class="rowtd" v-for="(item,index) in ApplyList" :key="item.id">
              <van-col span="4" class="strnum content">{{item.chsname}}</van-col>
              <van-col span="9" class="strnum content">{{item.appstarttime}}</van-col>
              <van-col span="8" class="strnum content">{{item.appendtime}}</van-col>
              <van-col span="3" class="check content">
                <van-radio :name="index"></van-radio>
              </van-col>
            </van-row>
          </van-radio-group>
        </div>
      </van-popup>
      <!-- 派发车辆 -->
      <van-popup
        v-model="popupCarTable"
        label="临时驾驶人"
        position="bottom"
        :overlay="true"
        :safe-area-inset-bottom="true"
        :style="{ height: '50%' }"
      >
        <div class="tableDiv">
          <van-row class="rowtr">
            <van-col span="6">
              <h3>车牌号码</h3>
            </van-col>
            <van-col span="7">
              <h3>品牌型号</h3>
            </van-col>
            <van-col span="8">
              <h3>核定载重</h3>
            </van-col>
            <van-col span="3">
              <h3 style="color:#1989FA;" @click="getCarInfo">确认</h3>
            </van-col>
          </van-row>
          <van-radio-group v-model="car">
            <van-row class="rowtd" v-for="(item,index) in carList" :key="item.id">
              <van-col span="6" class="strnum content">{{item.vehiclenumber}}</van-col>
              <van-col span="7" class="strnum content">{{item.brandtype}}</van-col>
              <van-col span="8" class="strnum content">{{item.prescribeload}}</van-col>
              <van-col span="3" class="check content">
                <van-radio :name="index"></van-radio>
              </van-col>
            </van-row>
          </van-radio-group>
        </div>
      </van-popup>
      <!-- 临时驾驶人 -->
      <van-popup
        v-model="popupDriverTable"
        label="临时驾驶人"
        position="bottom"
        :overlay="true"
        :safe-area-inset-bottom="true"
        :style="{ height: '50%' }"
      >
        <div class="tableDiv">
          <van-row class="rowtr">
            <van-col span="6">
              <h3>姓名</h3>
            </van-col>
            <van-col span="7">
              <h3>电话</h3>
            </van-col>
            <van-col span="8">
              <h3>驾龄</h3>
            </van-col>
            <van-col span="3">
              <h3 style="color:#1989FA;" @click="getDriverInfo">确认</h3>
            </van-col>
          </van-row>
          <van-radio-group v-model="Driver">
            <van-row class="rowtd" v-for="(item,index) in DriverList" :key="item.id">
              <van-col span="6" class="strnum content">{{item.chsname}}</van-col>
              <van-col span="7" class="strnum content">{{item.mobilephone}}</van-col>
              <van-col span="8" class="strnum content">{{item.driveyear}}</van-col>
              <van-col span="3" class="check content">
                <van-radio :name="index"></van-radio>
              </van-col>
            </van-row>
          </van-radio-group>
        </div>
      </van-popup>

      <!-- 派车时间 -->
      <van-popup v-model="popup" label="派车时间" position="bottom" :overlay="true">
        <van-datetime-picker
          title="请选择派车时间"
          v-model="currentDate"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @cancel="popup = false"
          @confirm="confirmFn()"
        />
      </van-popup>
      <!-- 归还时间 -->
      <van-popup v-model="popup1" label="返还时间：" position="bottom" :overlay="true">
        <van-datetime-picker
          title="请选择返还时间"
          v-model="currentDate1"
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
      // 派车时间
      popup: false,
      currentDate: new Date(),
      //归还时间
      popup1: false,
      currentDate1: new Date(),
      //车辆申请工单
      popupApplyTable: false,
      ApplyListShow: false,
      ApplyList: [], //车辆申请表单
      radio: "",
      //可分派的车辆
      carList: [],
      popupCarTable: false,
      car: "",
      //临时驾驶人
      DriverList: [],
      popupDriverTable: false,
      Driver: "",

      //表单参数
      assignrecordNo: "",
      applyrecordid: "",
      useVehPersonName: "", //用车人
      useVehPersonMobile: "", //用车人手机
      usevehreason: "", //用车事由
      rectime: "", //登记时间
      vehicleinfoid: "", //分派车辆
      vehicleinfoidStr: "",
      driverName: "", //指定驾驶人
      temporaryDriver: "", //临时驾驶人
      temporaryDriverStr: "", //显示驾驶人名称
      assignstarttime: "", //派车开始时间
      fixendtime: "" //规定归还时间
    };
  },
  created() {},
  beforeMount() {
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
    this.rectime =
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

    this.getApply(); //获取申请单
    this.getCarList(); //获取可分配车辆信息
    this.getDriverList(); //获取临时驾驶人

    this.randomWord(false, 18); //分派编号
  },
  mounted() {},
  beforeDestroy() {},
  updated() {
    if (this.carList.length <= 0) {
      this.vehicleinfoidStr = "暂无可分派的车辆";
    }
  },
  methods: {
    prevs() {
      this.$router.go(-1); // 返回上一层
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
      this.assignrecordNo = "DHFP" + str;
    },
    showpopupCarTable() {
      if (this.carList.length <= 0) {
        this.vehicleinfoidStr = "暂无可分派的车辆";
        this.$toast("暂无可分派的车辆");
      } else {
        this.popupCarTable = true;
      }
    },
    showpopupApplyTable() {
      if (this.ApplyList.length <= 0) {
        this.usevehreason = "暂无可分派的申请单";
        this.$toast("暂无可分派的申请单");
      } else {
        this.popupApplyTable = true;
      }
    },
    showpopupDriverTable() {
      //临时驾驶人
      if (this.DriverList.length <= 0) {
        this.temporaryDriverStr = "暂无可分派的临时驾驶人";
        this.$toast("暂无可分派的临时驾驶人");
      } else {
        this.popupDriverTable = true;
      }
    },
    confirmFn(value) {
      console.log(this.currentDate);
      var date = this.currentDate;
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
      var time =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hours +
        ":" +
        m +
        ":" +
        s;
      console.log(time);
      this.assignstarttime = time;
      this.popup = false;
    },
    confirmFn1(value) {
      console.log(this.currentDate1);
      var date = this.currentDate1;
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
      var time =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hours +
        ":" +
        m +
        ":" +
        s;
      console.log(time);
      this.fixendtime = time;
      this.popup1 = false;
    },
    getApplyInfo() {
      //获取选中的申请单信息
      console.log();
      var apply = this.ApplyList[this.radio];
      this.useVehPersonName = apply.chsname;
      this.useVehPersonMobile = apply.appphonenumber;
      this.usevehreason = apply.usevehreason;
      this.applyrecordid = apply.id;
      this.popupApplyTable = false;
    },
    getCarInfo() {
      var car = this.carList[this.car];
      this.vehicleinfoidStr = car.vehiclenumber;
      this.vehicleinfoid = car.id;
      this.driverName = car.carinsurancename;
      this.popupCarTable = false;
    },
    getDriverInfo() {
      //临时驾驶人信息
      var Driver = this.DriverList[this.Driver];
      this.temporaryDriverStr = Driver.chsname;
      this.temporaryDriver = Driver.id;
      this.popupDriverTable = false;
    },
    getApply() {
      //获取申请单
      var url = this.GLOBA.serverSrc + "vehicleapplyrecord/listLoads";
      let param = new URLSearchParams();
      param.append("status", "");
      this.$http
        .post(url, param)
        .then(response => {
          console.log("申请单：", response);
          if (response.data != null) {
            if (response.data.total > 0) {
              this.ApplyList = response.data.rows;
            } else {
              this.ApplyListShow = false;
            }
          } else {
            this.ApplyListShow = false;
          }
        })
        .catch(error => {
          this.ApplyListShow = false;
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    },
    getCarList() {
      //获取可分派车辆
      var url = this.GLOBA.serverSrc + "vehiclevehicleinfo/listLoadById";
      let param = new URLSearchParams();
      this.$http
        .post(url, param)
        .then(response => {
          console.log("获取可分配车辆：", response);
          if (response.data != null) {
            if (response.data.total > 0) {
              this.carList = response.data.rows;
            }
          } else {
            Notify({ type: "danger", message: "连接异常!" });
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
    getDriverList() {
      //获取临时驾驶人员
      var url = this.GLOBA.serverSrc + "vehicledriver/listLoadDriverType";
      let param = new URLSearchParams();
      param.append("drivertype", "temporary");
      this.$http
        .post(url, param)
        .then(response => {
          console.log("临时驾驶人：", response);
          if (response.data != null) {
            if (response.data.total > 0) {
              this.DriverList = response.data.rows;
            }
          } else {
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
    getAssign() {
      if (!this.usevehreason) {
        Notify({ type: "primary", message: "请选择申请单!" });
        return;
      }
      if (!this.vehicleinfoid) {
        Notify({ type: "primary", message: "请选择分派车辆!" });
        return;
      }

      if (!this.assignstarttime) {
        Notify({ type: "primary", message: "请选择派车开始时间!" });
        return;
      }

      if (!this.fixendtime) {
        Notify({ type: "primary", message: "请选择派车返还时间!" });
        return;
      }

      var url = this.GLOBA.serverSrc + "vehicleassignrecord/appFormSave";
      let param = new URLSearchParams();
      var text = {
        applyrecordid: this.applyrecordid,
        useVehPersonName: this.useVehPersonName,
        useVehPersonMobile: this.useVehPersonMobile,
        rectime: this.rectime,
        driverName: this.driverName,
        temporaryDriver: this.temporaryDriver,
        assignstarttime: this.assignstarttime,
        fixendtime: this.fixendtime,
        vehicleinfoid: this.vehicleinfoid
      };
      var strJson = JSON.stringify(text);
      param.append("strJson", strJson);
      console.log(strJson);
      this.$http
        .post(url, param)
        .then(response => {
          console.log("提交分派：", response);
          if (response.data != null) {
            if (response.data.status) {
              Toast.success("分派成功");
              //清空表单数据
              this.applyrecordid = "";
              this.useVehPersonName = "";
              this.useVehPersonMobile = "";
              this.rectime = "";
              this.driverName = "";
              this.temporaryDriver = "";
              this.assignstarttime = "";
              this.fixendtime = "";
              this.vehicleinfoid = "";
            } else {
              Toast.fail("分派失败");
            }
          } else {
            Toast.fail("分派失败");
          }
        })
        .catch(error => {
          console.log(error);
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
  .sub {
    margin-right: 20px;
    position: absolute;
    right: 10px;
  }
  .van-cell-group {
    background-color: #f5f6f7;
  }
  .strnum {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .tableDiv {
    margin-left: 10px;
    .rowtr {
      border-bottom: 1px solid #f5f6f7;
    }
    .rowtd {
      border-bottom: 1px solid #f5f6f7;
      .check {
        margin-top: 5px;
      }
    }
    .content {
      line-height: 30px;
    }
  }
}
</style>
