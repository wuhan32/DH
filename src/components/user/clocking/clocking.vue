<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>签到</span>
    </div>
    <div>
      <van-tabs color="#025E80">
        <van-tab title="今天">
          <div>
            <van-cell-group>
              <van-cell title="签到地址：" :value="clockInfo.ext1" />
              <van-cell title="偏差范围" :value="clockInfo.scope+mi" />
              <van-cell v-show="clockInfo.clocktime1!=''">
                <template slot="title">
                  <span class="custom-title">打卡班次1【{{clockInfo.clocktime1}}】</span>&emsp;
                  <van-tag v-show="attendancerecord.recordtime1==null" plain>未签到</van-tag>
                  <van-tag
                    v-show="attendancerecord.recordtime1!=null"
                    type="success"
                  >签到时间：{{attendancerecord.recordtime1 | datefilterTime}}</van-tag>
                </template>
              </van-cell>
              <van-cell v-show="clockInfo.clocktime2!=''">
                <template slot="title">
                  <span class="custom-title">打卡班次2【{{clockInfo.clocktime2}}】</span>&emsp;
                  <van-tag v-show="attendancerecord.recordtime2==null" plain>未签到</van-tag>
                  <van-tag
                    v-show="attendancerecord.recordtime2!=null"
                    type="success"
                  >签到时间：{{attendancerecord.recordtime2 | datefilterTime}}</van-tag>
                </template>
              </van-cell>
              <van-cell v-show="clockInfo.clocktime3!=''">
                <template slot="title">
                  <span class="custom-title">打卡班次3【{{clockInfo.clocktime3}}】</span>&emsp;
                  <van-tag v-show="attendancerecord.recordtime3==null" plain>未签到</van-tag>
                  <van-tag
                    v-show="attendancerecord.recordtime3!=null"
                    type="success"
                  >签到时间：{{attendancerecord.recordtime3 | datefilterTime}}</van-tag>
                </template>
              </van-cell>
              <van-cell v-show="clockInfo.clocktime4!=''">
                <template slot="title">
                  <span class="custom-title">打卡班次4【{{clockInfo.clocktime4}}】</span>&emsp;
                  <van-tag v-show="attendancerecord.recordtime4==null" plain>未签到</van-tag>
                  <van-tag
                    v-show="attendancerecord.recordtime4!=null"
                    type="success"
                  >签到时间：{{attendancerecord.recordtime4 | datefilterTime}}</van-tag>
                </template>
              </van-cell>
              <van-cell v-show="clockInfo.clocktime5!=''">
                <template slot="title">
                  <span class="custom-title">打卡班次【{{clockInfo.clocktime5}}】</span>&emsp;
                  <van-tag v-show="attendancerecord.recordtime5==null" plain>未签到</van-tag>
                  <van-tag
                    v-show="attendancerecord.recordtime5!=null"
                    type="success"
                  >签到时间：{{attendancerecord.recordtime5 | datefilterTime}}</van-tag>
                </template>
              </van-cell>
              <van-cell v-show="clockInfo.clocktime6!=''">
                <template slot="title">
                  <span class="custom-title">打卡班次【{{clockInfo.clocktime6}}】</span>&emsp;
                  <van-tag v-show="attendancerecord.recordtime6==null" plain>未签到</van-tag>
                  <van-tag
                    v-show="attendancerecord.recordtime6!=null"
                    type="success"
                  >签到时间：{{attendancerecord.recordtime6 | datefilterTime}}</van-tag>
                </template>
              </van-cell>
              <van-cell v-show="clockInfo.clocktime7!=''">
                <template slot="title">
                  <span class="custom-title">打卡班次7【{{clockInfo.clocktime7}}】</span>&emsp;
                  <van-tag v-show="attendancerecord.recordtime7==null" plain>未签到</van-tag>
                  <van-tag
                    v-show="attendancerecord.recordtime7!=null"
                    type="success"
                  >签到时间：{{attendancerecord.recordtime7 | datefilterTime}}</van-tag>
                </template>
              </van-cell>
              <van-cell v-show="clockInfo.clocktime8!=''">
                <template slot="title">
                  <span class="custom-title">打卡班次8【{{clockInfo.clocktime8}}】</span>&emsp;
                  <van-tag v-show="attendancerecord.recordtime8==null" plain>未签到</van-tag>
                  <van-tag
                    v-show="attendancerecord.recordtime8!=null"
                    type="success"
                  >签到时间：{{attendancerecord.recordtime8 | datefilterTime}}</van-tag>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
        </van-tab>
        <van-tab title="历史">
          <div class="hostrydiv">
            <span v-for="(item,index) in List" :key="index">
              <van-panel :title="item.createdate | datefilter">
                <div>
                  <van-cell-group>
                    <van-cell v-show="item.recordtime1!=''">
                      <template slot="title">
                        <span class="custom-title">打卡班次1</span>&emsp;
                        <van-tag v-show="item.recordtime1==null" plain>未签到</van-tag>
                        <van-tag
                          v-show="item.recordtime1!=null"
                          type="success"
                        >签到时间：{{item.recordtime1 | datefilterTime}}</van-tag>
                      </template>
                    </van-cell>
                    <van-cell v-show="item.recordtime2!=''">
                      <template slot="title">
                        <span class="custom-title">打卡班次2</span>&emsp;
                        <van-tag v-show="item.recordtime2==null" plain>未签到</van-tag>
                        <van-tag
                          v-show="item.recordtime2!=null"
                          type="success"
                        >签到时间：{{item.recordtime2 | datefilterTime}}</van-tag>
                      </template>
                    </van-cell>
                  </van-cell-group>
                </div>
              </van-panel>
            </span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { Notify, Toast } from "vant";
import moment from "moment";
export default {
  data() {
    return {
      clockInfo: "",
      attendancerecord: "",
      mi: "m≤",
      //历史记录
      List: []
    };
  },
  created() {},
  beforeMount() {
    this.getAttendancerecordById(); // 获取今天打卡记录
    this.getclockInfo(); // 打卡班次

    this.getclockList(); //获取历史记录
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    prev() {
      this.$router.go(-1); // 返回上一层
    },
    getAttendancerecordById() {
      this.taost = Toast.loading({
        mask: true,
        message: "正在定位...",
        duration: 0
      });
      // 获取实时打卡信息
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var url =
        this.GLOBA.serverSrc + "attendanceshift/getAttendancerecordById";
      let param = new URLSearchParams();
       ;
      param.append("userId", userInfo.id);
      this.$http
        .post(url, param)
        .then(response => {
          //console.log('获取打卡实时信息：', response)
          this.taost.clear();
          if (response.data != null && response.data.attendancerecord != null) {
            this.attendancerecord = response.data.attendancerecord;
          } else {
            this.getAttendancerecordById();
          }
        })
        .catch(error => {
          this.taost.clear();
          if (error.message.indexOf("timeout") != -1) {
            Toast("连接超时!");
          } else {
            Toast("连接异常，请稍后尝试!");
          }
        });
    },
    getclockInfo() {
      // attendanceshift/getAttendancesById?userId=?
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var url = this.GLOBA.serverSrc + "attendanceshift/getAttendancesById";
      let param = new URLSearchParams();
       ;
      param.append("userId", userInfo.id);
      this.$http
        .post(url, param)
        .then(response => {
          //console.log('获取打卡信息：', response)
          if (response.data != null && response.data.attendanceshift != null) {
            this.clockInfo = response.data.attendanceshift;
            var cb = {
              lng: this.clockInfo.longitude,
              lat: this.clockInfo.latitude
            };
            this.centerboss = cb;
            //console.log('centerboss:', this.centerboss)
          } else {
            this.getclockInfo();
          }
        })
        .catch(error => {
          if (error.message.indexOf("timeout") != -1) {
            Toast("连接超时!");
          } else {
            Toast("连接异常，请稍后尝试!");
          }
        });
    },
    getclockList() {
      var url = this.GLOBA.serverSrc + "attendancerecord/appListLoad";
      let param = new URLSearchParams();
      this.$http
        .post(url, param)
        .then(response => {
          console.log("获取历史记录：", response);
          if (response.data != null) {
            if (response.data.total > 0) {
              this.List = response.data.rows;
            } else {
            }
          } else {
          }
        })
        .catch(error => {
          if (error.message.indexOf("timeout") != -1) {
            Toast("连接超时!");
          } else {
            Toast("连接异常，请稍后尝试!");
          }
        });
    }
  },
  filters: {
    datefilter: function(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    datefilterTime: function(value) {
      return moment(value).format("YYYY-MM-DD  HH:mm:ss");
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
  .home-head {
  }
  .van-icons {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }
  .hostrydiv {
    .van-cell__title {
      font-size: 14px;
      font-weight: 700;
    }
    .custom-title {
      font-size: 12px;
    }
  }
}
</style>
