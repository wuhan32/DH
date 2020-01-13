<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>车辆申请工单</span>
    </div>
    <div>
      <van-panel title="申请单信息">
        <div>
          <div class="list">
            <p>
              <span class="explain">申请姓名：</span>
              <span class="content">{{carApplyInfo.appvehpersonname}}</span>
            </p>
            <p>
              <span class="explain">申请电话：</span>
              <span class="content">{{carApplyInfo.appphonenumber}}</span>
            </p>
            <p>
              <span class="explain">乘车人数：</span>
              <span class="content">{{carApplyInfo.personnum}}人</span>
            </p>
            <p>
              <span class="explain">开始时间：</span>
              <span class="content">{{carApplyInfo.appstarttime}}</span>
            </p>
            <p>
              <span class="explain">结束时间：</span>
              <span class="content">{{carApplyInfo.appendtime}}</span>
            </p>
            <p>
              <span class="explain">开始地址：</span>
              <span class="content">{{carApplyInfo.toplace}}</span>
            </p>
            <p>
              <span class="explain">结束地址：</span>
              <span class="content">{{carApplyInfo.toAddress}}</span>
            </p>
            <p>
              <span class="explain">申请事由：</span>
              <span class="content">{{carApplyInfo.usevehreason}}</span>
            </p>
          </div>
        </div>
      </van-panel>
      <div v-if="carassignInfo != ''">
        <van-panel v-show="carassignInfo != ''" title="分派信息">
          <div>
            <div class="list">
              <p>
                <span class="explain">分派编号：</span>
                <span class="content">{{carassignInfo.applyrecordno}}</span>
              </p>
              <p>
                <span class="explain">指定驾驶：</span>
                <span class="content">{{carassignInfo.drivername}}</span>
              </p>
              <p>
                <span class="explain">临时驾驶：</span>
                <span class="content">{{carassignInfo.assusevehpersonname}}</span>
              </p>
              <p>
                <span class="explain">派车时间：</span>
                <span class="content">{{carassignInfo.assignstarttime}}</span>
              </p>
              <p>
                <span class="explain">分派状态：</span>
                <span class="content">
                  {{carassignInfo.status == 'assigned' ? '已分派' : ''}}
                  {{carassignInfo.status == 'return' ? '已还车' : ''}}
                  {{carassignInfo.status == 'notAssigned' ? '未分派' : ''}}
                </span>
              </p>
            </div>
          </div>
        </van-panel>
      </div>

      <van-panel v-show="carInfo != ''" title="分派车辆信息">
        <div>
          <div class="list">
            <van-row>
              <van-col span="8">
                <van-image id="headimg" width="100px" height="83px" fit="cover" :src="carImg">
                  <template v-slot:error>暂无图像</template>
                </van-image>
              </van-col>
              <van-col span="16">
                <p>
                  <span class="explain">车牌号码：</span>
                  <span class="content">{{carInfo.vehiclenumber}}</span>
                </p>
                <p>
                  <span class="explain">车辆类型：</span>
                  <span class="content">{{carInfo.brandtype}}</span>
                </p>
                <p>
                  <span class="explain">车辆颜色：</span>
                  <span class="content">{{carInfo.vehiclecolor}}</span>
                </p>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-panel>

      <van-panel v-show="map" title="行驶轨迹图">
        <div>
          <baidu-map
            :pinch-to-zoom="true"
            :double-click-zoom="true"
            :autoLocation="true"
            class="map"
            :scroll-wheel-zoom="true"
            :center="mapList[0]"
            :zoom="zoom"
          >
            <bm-polyline
              :path="mapList"
              stroke-color="red"
              :stroke-opacity="1"
              :strokeWeight="5"
              :stroke-weight="2"
            ></bm-polyline>
            <!-- :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}" -->
            <bm-marker
              :position="{lng: mapList[0].lng, lat: mapList[0].lat}"
              
              :dragging="false"
            ></bm-marker>
          </baidu-map>
        </div>
      </van-panel>

      <van-button
        v-show="quchebtn"
        @click="updateExt1"
        type="primary"
        size="large"
        color="#00A047"
      >取车</van-button>
      <van-button
        @click="returnCars"
        v-show="huanchebtn"
        type="primary"
        size="large"
        color="#00A047"
      >还车</van-button>
    </div>

    <van-popup class="hcdiv" round v-model="huanchediv">
      <baidu-map
        :pinch-to-zoom="true"
        :double-click-zoom="true"
        :autoLocation="true"
        style="height:55%;"
        :scroll-wheel-zoom="true"
        :center="mapList[0]"
        :zoom="zoom"
      >
        <bm-polyline
          :path="mapList"
          stroke-color="red"
          :stroke-opacity="1"
          :strokeWeight="5"
          :stroke-weight="2"
        ></bm-polyline>
        <bm-marker
          :position="{lng: mapList[0].lng, lat: mapList[0].lat}"
          :dragging="false"
        ></bm-marker>
      </baidu-map>
      <van-cell-group>
        <van-field disabled label="行驶里程：" v-model="value1" placeholder="5.8km" />
        <van-field label="油价(元/升):" v-model="value2" placeholder="请输入油价" />
        <van-field label="总费用（元）:" v-model="value3" placeholder="请输入总费用" />
      </van-cell-group>
      <div class="hcbottom">
        <van-row>
          <van-col span="12">
            <van-button size="large" @click="closehuachediv(0)" type="default">取消</van-button>
          </van-col>
          <van-col span="12">
            <van-button size="large" @click="closehuachediv(1)" type="default">确认</van-button>
          </van-col>
        </van-row>
      </div>
    </van-popup>

    <baidu-map :center="center" :zoom="zoom" @ready="handler"></baidu-map>
  </div>
</template>
<script>
import qidian from "../../../../../assets/home/qidian.png";
import zhongdian from "../../../../../assets/home/zhongdian.png";
import { Notify, Toast } from "vant";
import { Popup } from "vant";
export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,

      applyid: this.$route.params.id, //获取申请id
      carApplyInfo: "", //获取申请工单
      carassignInfo: "", //获取分派工单
      carInfo: "", //获取分派车辆工单
      carImg: "", //车辆图片

      quchebtn: false, //取车按钮
      huanchebtn: false, //还车按钮
      huanchediv: false, //还车弹框
      value1: "",
      value2: "",
      value3: "",

      map: false, //轨迹地图
      mapList: [
        //获取定位坐标集合
        { lng: 116.404, lat: 39.915 }
        // {lng: 116.405, lat: 39.920},
        // {lng: 116.423493, lat: 39.907445}
      ],
      timer: "" //定位时间
    };
  },
  created() {
    //判读
    var mapLists =[];
    mapLists= JSON.parse(localStorage.getItem("mapLists"));
    if (mapLists!=null) {
      this.orientation(); //继续定位
      console.log("maplists:", mapLists);
    }
  },
  beforeMount() {
    this.getCarApplyInfo();
    this.getCarAssignInfo();
  },
  mounted() {},
  beforeDestroy() {},
  updated() {
    if (this.carassignInfo != null && this.carassignInfo != "") {
      if (this.carassignInfo.status == "assigned") {
        if (this.carassignInfo.ext1 == "1") {
          this.quchebtn = false;
          this.huanchebtn = true;
          //重置坐标集合
          this.orientation(); //打开持续定位
        } else {
          this.quchebtn = true;
          this.huanchebtn = false;
        }
      } else if (this.carassignInfo.status == "notAssigned") {
        this.quchebtn = false;
        this.huanchebtn = false;
      } else if (this.carassignInfo.status == "return") {
        this.quchebtn = false;
        this.huanchebtn = false;
        this.map = true;
      } else {
        this.quchebtn = false;
        this.huanchebtn = true;
      }
    }
  },
  methods: {
    prev() {
      this.$router.go(-1); // 返回上一层
    },
    handler({ BMap, map }) {
      this.center.lng = 0;
      this.center.lat = 0;
      this.zoom = 15;
    },
    getCarApplyInfo() {
      //获取申请工单
      var url = this.GLOBA.serverSrc + "vehicleapplyrecord/formLoad";
      let param = new URLSearchParams();
      param.append("id", this.applyid); //订单id
       ;
      console.log(url + param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          console.log("车辆申请详情： ", response.data);
          if (response.data != null) {
            this.carApplyInfo = response.data;
          } else {
          }
        })
        .catch(error => {
          if (error.message.indexOf("timeout") != -1) {
            this.$toast("请求超时!请更换网络!!");
          } else {
            this.$toast("申请表单加载异常!!");
          }
        });
    },
    getCarAssignInfo() {
      //获取分派工单
      var url =
        this.GLOBA.serverSrc + "vehicleassignrecord/getAssignListByApplyId";
      let param = new URLSearchParams();
      param.append("id", this.applyid); //订单id
       ;
      console.log(url + param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          console.log("车辆分派详情： ", response.data);
          if (response.data.status=="true") {
            this.carassignInfo = response.data.assign;
            if (response.data.assign.vehicleinfoid != null) {
              //判断是否分派车辆
              this.getCarInfo(response.data.assign.vehicleinfoid);
            }
            if (response.data.assign.status == "return") {
              this.getListByid(response.data.assign.dvagid);
            }
          } else {
            this.carassignInfo="";
            this.carInfo = "";
          }
        })
        .catch(error => {
          if (error.message.indexOf("timeout") != -1) {
            this.$toast("请求超时!请更换网络!!");
          } else {
            this.$toast("分派表单加载异常!!");
          }
        });
    },
    getCarInfo(vehicleinfoid) {
      //获取分派车辆工单
      var url = this.GLOBA.serverSrc + "vehicleassignrecord/getCarInfoById";
      let param = new URLSearchParams();
      param.append("id", vehicleinfoid); //订单id
       ;
      console.log(url + param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          console.log("分派车辆工单详情： ", response.data);
          if (response.data != null) {
            this.carInfo = response.data;
            this.getCarImg(this.carInfo.vehiclepicsrc);
          } else {
          }
        })
        .catch(error => {
          if (error.message.indexOf("timeout") != -1) {
            this.$toast("请求超时!请更换网络!!");
          } else {
            this.$toast("连接异常!!");
          }
        });
    },
    updateExt1() {
      //修改取车状态
      var url = this.GLOBA.serverSrc + "vehicleassignrecord/doUpdate";
      let param = new URLSearchParams();
      param.append("id", this.carassignInfo.dvagid);
      param.append("ext1", "1");
       ;
      console.log(url + param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          console.log("修改已取车： ", response.data);
          if (response.data != null) {
            if (response.data.status) {
              this.getCarAssignInfo(); //重新获取分派信息
              this.$toast("取车成功!");
              this.quchebtn = false; //隐藏取车按钮
              this.huanchebtn = true; //显示还车按钮
            } else {
              this.$toast("取车失败!");
            }
          } else {
            this.$toast("取车失败!");
          }
        })
        .catch(error => {
          if (error.message.indexOf("timeout") != -1) {
            this.$toast("请求超时!请更换网络!!");
          } else {
            this.$toast("连接异常!!");
          }
        });
    },
    returnCars() {
      this.getDistance(); //计算里程
      //还车
      this.huanchediv = true; //展示弹框
    },
    getDistance() {
      var d = 0.0;
      var _this = this;
      _this.mapList.forEach(function(res, i) {
        if (i + 1 < _this.mapList.length) {
          var pointB = new BMap.Point(
            parseFloat(_this.mapList[i].lng),
            parseFloat(_this.mapList[i].lat)
          ); // 店铺的经纬度
          var pointA = new BMap.Point(
            parseFloat(_this.mapList[i + 1].lng),
            parseFloat(_this.mapList[i + 1].lat)
          ); // 店铺的经纬度
          var map = new BMap.Map("");
          var distance = 0.0;
          distance = (map.getDistance(pointA, pointB) / 1000).toFixed(2); // 保留小数点后两位
          d += distance;
        }
      });
      this.value1 = d;
      console.log("行驶里程：", d);
    },
    closehuachediv(num) {
      if (num == 1) {
        var url = this.GLOBA.serverSrc + "vehicleassignrecord/returnTheCar"; //确认还车
        let param = new URLSearchParams();
        var text = {
          id: this.carassignInfo.dvagid,
          mileage: this.value1, //里程
          oilprice: this.value2, //单价油
          usefee: this.value3, //总费用
          routemap: JSON.stringify(this.mapList), //坐标集合string类型
          stratAddress: this.carApplyInfo.stratAddress, //上车地点
          endAddress: this.carApplyInfo.endAddress //下车地点
        };
        var strJson = JSON.stringify(text);
        param.append("strjson", strJson);
         ;
        console.log(url + param.toString());
        this.$http
          .post(url, param)
          .then(response => {
            console.log("还车： ", response.data);
            var self=this;
            if (response.data != null) {
              if (response.data.status) {
                //关闭还车弹框
                self.huanchediv = false; 
                //隐藏还车按钮
                self.huanchebtn = false;
                //显示地图
                self.map = true;
                //重置坐标集合
                var arrs = [];
                localStorage.setItem("mapLists", JSON.stringify(arrs));
                //关闭定时器
                clearInterval(self.timer);
                clearTimeout(self.timer);
              } else {
                self.$toast("还车失败!");
              }
            } else {
              self.$toast("还车失败!");
            }
          })
          .catch(error => {
            if (error.message.indexOf("timeout") != -1) {
              this.$toast("请求超时!请更换网络!!");
            } else {
              this.$toast("连接异常!!");
            }
          });
      } else {
        //关闭还车弹框
        this.huanchediv = false;
      }
    },
    getCarImg(id) {
      //获取分派车辆图片
      var url = this.GLOBA.serverSrc + "vanityproject/getImgurl";
      let param = new URLSearchParams();
      param.append("ids", id);
       ;
      console.log(url + param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          console.log("获取车辆图片： ", response.data);
          if (response.data.status) {
            var img = response.data.data[0];
            this.carImg =
              this.GLOBA.serverSrc +
              img.serverpath +
              "/" +
              img.filename +
              "." +
              img.filetype;
            console.log("carImg", this.carImg);
          } else {
            this.carImg =
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAHAAcAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEsAZADASIAAhEBAxEB/8QAHAABAQEAAgMBAAAAAAAAAAAAAAcIAQUDBAYC/8QAQRAAAQIDBQUGAwYEBAcAAAAAAAECAwQFERIyUXEGBzFBwhchVWGU4hOBoRQiI5HB0RVCUrEkQ2LwM3ODkrLS4f/EABsBAQADAQEBAQAAAAAAAAAAAAACAwYFAQQH/8QANREBAAEBAwgJBQACAwEAAAAAAAECAwQRBRITFjGBoeEGFSE0UmOxwdEiQUNRcTJhFERT8P/aAAwDAQACEQMRAD8A7sAH0PzUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8stLxpqMyBLwnxYr1saxiWqolpeLNTEKXgMV8WI5GtanNVLRsrs7AoUmjW3XzTk/Fi2d6rkmSEaqsHQyfk+u91/qmNsviadu8n48O/OTEKWVUwonxFTXvRPqe92ZL4snp/eUdLfIKhXny01OR7rTGE0475Tjsyd4snp/eOzJ3iyen95SQM+XvVF08HGflNuzJ3iyen947MneLJ6f3lJAz5OqLp4OM/KbdmTvFk9P7x2ZO8WT0/vKSBnydUXTwcZ+U27MneLJ6f3jsyd4snp/eUkDPk6oung4z8pt2ZO8WT0/vHZk7xZPT+8pIGfJ1RdPBxn5Tbsyd4snp/eOzJ3iyen95SQM+Tqi6eDjPym3Zk7xZPT+8dmTvFk9P7ykgZ8nVF08HGflNuzJ3iyen947MneLJ6f3lJAz5OqLp4OM/KbdmTvFk9P7x2ZO8WT0/vKSBnydUXTwcZ+U27MneLJ6f3jsyd4snp/eUkDPk6oung4z8pt2ZO8WT0/vHZk7xZPT+8pIGfJ1RdPBxn5Tbsyd4snp/eOzJ3iyen95SQM+Tqi6eDjPym3Zk7xZPT+8dmTvFk9P7ykgZ8nVF08HGflNuzJ3iyen947MneLJ6f3lJAz5OqLp4OM/KbdmTvFk9P7x2ZO8WT0/vKSBnydUXTwcZ+U27MneLJ6f3jsyd4snp/eUkDPk6oung4z8pt2ZO8WT0/vHZk7xZPT+8pIGfJ1RdPBxn5Tbsyd4snp/eOzJ3iyen95SQM+Tqi6eDjPym3Zk7xZPT+8dmTvFk9P7ykgZ8nVF08HGflNezN3iyen956U/u6n4MO9JzUKYVP5XN+Gq6d6p9SrHFgz5eVZHusxhFOG+WeZyVjycd0GagvhRW8WvSxTwlx2moEtXJJYcWxkdqfhxUTvav6p5EUnZaNJzUaXmG3YsJytcnmWU1Ys1lDJ9V0q/dM7JeEAEnOAAB9vuqkWR6vMTTkRfs7ERvk51qW/ki/mVWzvJxugxVb/pdZR0XvKq9rbZHpim60zH3x9XK8AORN9u9rpiBNxKdS4nw1h90WKmK3+luVmZGIxfXer1RdaM+tSLUzQ4vNzQzxMTMeZerpiNEiuXir3K5fqeIno3EnpBH2o48mjbyZoLyZoZyA0bzWHy+PJo28maC8maGcgNGaw+Xx5NG3kzQXkzQzkBozWHy+PJo28maC8maGcgNGaw+Xx5NG3kzQXkzQzkBozWHy+PJo28maC8maGcgNGaw+Xx5NG3kzQXkzQzkBozWHy+PJo28maC8maGcgNGaw+Xx5NG3kzQXkzQzkBozWHy+PJo28maC8maGcgNGaw+Xx5NG3kzQXkzQzkBozWHy+PJo28maC8maGcgNGaw+Xx5NG3kzQXkzQzkBozWHy+PJo28maC8maGcgNGaw+Xx5NG3kzQXkzQzkBozWGP8Az48mjbyZoLyZoZyA0ZrDHg48mjbyZoLyZoZyA0ZrD5fHk0bebmhxanJUM5nll5mPLPR8vHiwnJwVj1av0Gjex0gjHto48miAnAnOwm10aZm20+qPvuf/AMKKvcqr/S7PyUo3IhMYO3db1ReqM+hwpK960kyDVZWaYlizDFa7zVtnf+SonyKqTfe/ipOkXoPaNr5MsUxN1qmfth6p0AC5iQAAUbc/iq2kLrKQTfc/iq2kLrKQhTXtbfJHdKN/q4dhXQzvNxnTE1GjvW10R7nqvmq2mh34F0M5krNzukM9lEf32AAWMyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO4pmzVXqTUdLSUT4a96PiWMaqZpbx+R2btgq21tqQ4LlySIlp5jD6aLneK4zqaJmP4+UB2FSotSpnfOycWG1P57LW/8Acncdeeqa7Oqic2uMJAAEAAAeWTjulpuBHYtjoT2vRfNFtNDtwoZzNGNwpoV2jTdH5nCuP57v0TffBipOkXoKQTffBipOkXoI0bXRyv3Svd6wnIALmIAABRtz+KraQuspCE33P4qtpC6ykIU17W3yR3Sjf6uH4V0M5GjX4V0M5ErNzekP49/sAAsZoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHkl4EWZjw4Mux0SLEW61rUtVVKtspsZL0xjJmfa2PO8bFS1kPROa+f5Hqbs6E2BK/xSZZbHioqQrf5GZ6r/bU+9XWwrqq+0NVkrJtNNEW1rGMzsj9c36REQAFbQPw9rXNVHIioqWKi8D4fabYaXnGvmKU1svMcfhp3Mf/AOq/Q+6B7E4PnvF2srxTm2kYs6zEGJLx4kGOx0OKxVa5rksVFQ/BSN59DasJKtAbY9tjI1icU4I79PyyJuXROMMPfLrVdbWaJ3fwAB6+UNGswpoZyNGswpoV2jS9Htle73ck33wYqTpF6CkE33wYqTpF6CNG10sr90r3esJyAC5iAAAUbc/iq2kLrKQhN9z+KraQuspCFNe1t8kd0o3+rh+FdDORo1+FdDORKzc3pD+Pf7AALGaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9wIaxo8OE3E9yNT5rYfg80lFSBOQIq8IcRrl+S2hKjDOjFoCUgMlpaFBhJYyGxGNTJESxD2OR+WKitRUXkfoofo1MREYQAA8SAAB6lSlWTshHlomCLDcxfmnEz9EY6HEcx6WOaqoqeZot2FdDPlVc19UnHswujPVNLyllmzXSCmPoq+/b7PVABYzQaNZhTQzkaNZhTQrtGl6PbK93u5JvvgxUnSL0FIJvvgxUnSL0EaNrpZX7pXu9YTkAFzEAAAo25/FVtIXWUhCb7n8VW0hdZSEKa9rb5I7pRv9XD8K6GcjRr8K6GciVm5vSH8e/wBgAFjNAAAAAAAAAABhiAAAAAAAAAAAAAAAAAAAAAAAAtOwtUSqbPwFV1saAiQoic7UTuX5pZ9T6Swh+x9edQqokR1qysWxkViZcnJ5p+5aZWZgzcsyPLxGxIL0ta9q2opTVGEttku+xeLGKZn6qdr2AARdQBwp4ZuZhSkB8aPEbDhMS85zlsRECMzERjLrNqaq2k0WYmbUSJZchJm9eH7/ACIWfQbY7Qvrk8nw7zZOFakNi883L5r9D58upjCGLytfIvNr9P8AjTs95AAScsNGswpoZyNGswpoV2jS9Htle73ck33wYqTpF6CkE33wYqTpF6CNG10sr90r3esJyAC5iAAAUbc/iq2kLrKQhN9z+KraQuspCFNe1t8kd0o3+rh+FdDORo1+FdDORKzc3pD+Pf7AALGaAAAAAA8kvAizMdkGXhuiRXrdaxqWqqnjKzu/2aSmyqTs4xPtsZvcjk74bV5arz/I8qnB9txudV7tM2Nn3l62zWwUCA1kesIkeNx+Fb9xuv8AUv01PsYdOkoUP4cOVgMZwupDaif2Pc5HC+SlMzMtnYXSxsKc2il8rXNjKZU2OdAhtlJjlEhNsS3zbwX6KSytUmao846XnId13Fr072vTNFL7zOq2go0vW5B0vNJYvFj0TvY7NP2JU1YbXw3/ACVZ3imarOMKvVCAe5V6bMUqfiSs2yx7OCpwcnJU8j0y1jqqZomaaowmAAB4AAAAAAAAAAAAAAAAHa0OvT9Fiq6Ti/hKtroL+9jvly1Q6oBZZWlVnVnUThKr0zeFTphrWz8OLKv5rZfb+ad/0O7ZtTRXNvfxKXs832L+RDQQzIdezy7b0xhVESr1T28pMrDslnPm4vJsNqoluq/paTzaLaSerkRUjuSHLotrYLMKea5qdID2KYh8t6ynb3mM2qcI/UAAJOcAAAaNZhTQzkaNZhTQrtGl6PbK93u5JvvgxUnSL0FIJvvgxUnSL0EaNrpZX7pXu9YTkAFzEAAAo25/FVtIXWUhCb7n8VW0hdZSEKa9rb5I7pRv9XD8K6GcjRr8K6GciVm5vSH8e/2AAWM0AAAAe9RKbGq1Sgykun3nr953JreaqEqKJrqimmMZl9Lu62fWoTn2+aZbKy7vuIqdz3/snH8itJwPSpclBp8lBlJZt2HCS6iZ+a+a8T3SmqcZbu4XSm62UURt+/8AXIAIvtAAB8/tbs/Br0grF+5NMtWFEyXJfJSLTcvGlJmLAmIaw4sN11zV5KaI+h8dt3sy2rS32uUaiT8JOCf5jf6dcvyJ01Ydjh5Wydp6dLZx9UcUjBy5qtcrXIqORbFReRwWsiAAAAAAAAAAAAAAAAAAAAAAAAAAAAABo1mFNDORo1mFNCu0aXo9sr3e7km++DFSdIvQUgm++DFSdIvQRo2ullfule71hOQAXMQAACjbn8VW0hdZSEJvufxVbSF1lIQpr2tvkjulG/1cPwroZyNGvwroZyJWbm9Ifx7/AGAAWM0AAAV7d/QP4RTvtMwyycmURXW8WN5N/Vf/AIfHbvKCtTqf2uYZbKSyoti8Hv5J8uK/LMsCd3chXXP2aXIlx/7Fcfz5cgAraUAAAAAAABON4ey95H1anw7XJ3x2NTj/AK0/X88ycGjFaipYvAkm32zH8LmFnpJn+Ciu+81P8py8tF5flkWUVfaWYyvk3Nxt7KOz7x7vjgAWM4AAAAAAAAAAAD36LSZqsTiS8nDvO4ucvc1iZqpUKLsNTJFjXTbPtkfm6JhTRv72kZqiH33PJ1teu2mMI/cpAC8xKDSnsurTZNW/8pqfofJ7RbAQIjFjUZVhRUS34LnWtdoq96L9NDyK4fXb5DtrOnOomKvVMgeSYgRZeO+DHhuhxWLdcxyWKinjJuNMZvZIAA8AAAAAA0azCmhnI0azCmhXaNL0e2V7vdyTffBipOkXoKQTffBipOkXoI0bXSyv3Svd6wnIALmIAABRtz+KraQuspCE33P4qtpC6ykIU17W3yR3Sjf6uH4V0M5GjX4V0M5ErNzekP49/sAAsZoPYp0nGn56DKSzb0aK661P1XyTieuVHdpQPssotTmWfjRkshIv8rM/n/bU8qnCH2XG6TeraKI2ff8Aj6ui02FSqZBlICfdYnevNy81XVTsQgKW7ppiimKadkOQAeJgAAAAAAACngmpeFNQHwY7GvhvarXNdwVDzgIzETGEohtfs9FoNQsbefKRFVYURf8AxXzT6nQF/rFNgVWQiSs229DenFOLV5KnmRCvUmYo1QiSsynDvY9E7nt5KhdTVix2VcnTdqtJR/jPD/TrwAScgAAAAADsKHSJmtTzZeVb5viLhY3NRQ6RM1qebLyrfN8RcLG5qWmg0eWosk2WlWpm964nuzUjVVg6uTcm1XqrOq7KI4/6hxQKPLUSSbLyrfN71xOdmp2oHIqbKiimzpimmMIhyADxN8tthstBrsH40KyHPMT7j7O53+l378iQz0pHkZl8vNQnQ4rFsc13++BoazI6LafZ2UrstcjJcjsT8OK1O9vkuaeROmrDa4uUslU3jG0s+yr1Q8HvVmlTVHnHS85Duu4tcmF6Zop6JayNdFVFU01RhMAACIAABo1mFNDORo1mFNCu0aXo9sr3e7km++DFSdIvQUgm++DFSdIvQRo2ullfule71hOQAXMQAACjbn8VW0hdZSEJvufxVbSF1lIQpr2tvkjulG/1cPwroZyNGvwroZyJWbm9Ifx7/YAP1DY6LEbDhtVz3KjWtTiqryLGajtd5sXRFrdXYyIi/ZYNj4y+XJvz/ctrGoxqNaiI1EsRE4WHS7I0VtEo8OAqIsw/78Zyc3Ly0Tgd3wVSmqcZbfJdz/4tl9X+U9s/D9AAi6YAAAAAAAAAAAAA4Oj2ooMGu09YL0Rkdlqwotne137LzO8A2K7SzptaZorjGJZ6n5SNITcWWmoasiw1sci/30PXLNtls1Drsr8SDdZPQk/DevByf0r/AL7iOzEvFlo8SDHhuhxYa3XMcliopdTVixGULhXdK8NtM7J/++7xgAk+AOwodIma1PNl5Vvm+IuFjc1OaFR5mtTrZeVb5viLhYmalooNHlqLJNlpVqZveuJ7s1I1VYOrk3JtV6qzquyiOP8AqHFBo8tRJJsvKt83vXE52anagcipsqKKbOmKaYwiHIAPEwAAAAB1tapErWJNZech3m8WuTi1c0Uju0uz01Qpm7GT4ku9fw4yJ3O8lyXyLmevOSkCdlnwJqG2LBeljmuTiSpqwc2/5OovdOOyr9/LPQPqdr9ko9Ge6Ylr0WQVcXF0Pyd5eZ8sWxOLG29hXYVzRaRhIAD1SGjWYU0M5GjWYU0K7Rpej2yvd7uSb74MVJ0i9BSCb74MVJ0i9BGja6WV+6V7vWE5ABcxAAAKNufxVbSF1lIQm+5/FVtIXWUhCmva2+SO6Ub/AFcPwroZyNGvwroZyJWbm9Ifx7/YPvN2VB+0TLqpMs/ChLdgov8AM/m75f30PkaJTY1WqcCUgYoi/edZ3NbzVS60+UgyMlClZdt2FCajWoe1zh2PlyNctLaaWuPpj15PbABU14AAAAAAAAAAAAAAAAAAODodo9mpGusRY7Fhx2pY2Mzucnl5od8NOJ7jgrtLKi1pmiuMYSab3d1SE9fs0eXjQ+SqqsX5pZ+p7FM3dTT4qOqU0yHD5thWucvzVLE+pUU4cQvDie58ubGRrtFWdhP8xdfSaZK0mUbLyUJsNid65quarzU7AfMcjx06aYoiKaYwiHIAPEwAAAAAAAAAAeOIxkRise1HMclioqWoqEx2x2LWWvztHYr4K98SXRLVZ5tzTy5f2qPI4stTkpKJwfHe7nZ3qjNrj+T+mcwVLbHYxk+sScpTWw5rE+FwbE80yX6KS+NDfBivhxWOZEYtjmuSxUXJS2JxYy+XK0ulebXs+0/t+TRrMKaGcjRrMKaELR2uj2yvd7uSb74MVJ0i9BSCb74MVJ0i9BGja6WV+6V7vWE5ABcxAAAKNufxVbSF1lIQm+5/FVtIXWUgpr2tvkjulG/1fl2FdDOZot/c1dCMbC0P+MVhFittlIFj4lvBy8m/P+yKe0Thi+PLVjVb2llZ07Zx9n2+7mhfw6nfbJhlk1Moi9/FrOSfPj+WR9mcWWdxzaRmcXYu9hTYWcWdOyAAHi8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHB8vtZstLVyEsWFdgzrU+7Es7neTv34ofUA9icFNtY0W9E0VxjEs91GQmKdNvlpyE6FGZxReaZovNDQbVtamh1G0FBlK3KfCmmWPbgiNxMXy/Y7hOCHtVWL4cn3GbnXXGONM4YOSb74MVJ0i9BSCb74MVJ0i9Ao2vcr90r3esJyAC5iAAAUbc/iq2kLrKQTfc/iq2kLrKQhTXtbfJHdKN/q/KnTbKUhlFpEKW7lir96K5P5nrx/b5HdLmEPH3zZ0zVFU7Yx4uQAeLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACb74MVJ0i9BSCb74MVJ0i9BKja5mV+6V7vWE5ABcxAAAKNufxVbSF1lIQm+5/FVtIXWUhCmva2+SO6Ub/UABF0wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJvvgxUnSL0FIJvvgxUnSL0EqNrmZX7pXu9YTkAFzEAAAoW6JUR9Ubb95UhWJpf/AHKUiWIRHYmrpR67DiRXXZeKnw4i5IvBfkqJ8rS2o5HIiovErrjtbLIttTXd4ojbT79r9gArdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAflUtQm291UWJS22/eRItqa3P2KQrkaiqqoiIRLbWrpWK5FiwnWy8JPhQlzROK/NVX5WE6I7XHy1bU0XeaJ21e3a6EAFrGgAAH2uyG2jqdDZJ1NHxJZvcyKne5iZKnNPqh8UDyYxX3e82l2rz6Jwlf6fVJKoMR8nNQoqWcGuS1NU4oe7eanNDOYIaN3KekM4fVR2/3k0beTNBeTNDOQGjS1h8vjyaNvJmgvJmhnIDRmsPl8eTRt5M0F5M0M5AaM1h8vjyaNvJmgvJmhnIDRmsPl8eTRt5M0F5M0M5AaM1h8vjyaNvJmgvJmhnIDRmsPl8eTRt5M0F5M0M5AaM1h8vjyaNvJmgvJmhnIDRmsPl8eTRt5M0F5M0M5AaM1h8vjyaNvJmgvJmhnIDRmsPl8eTRt5M0F5M0M5AaM1h8vjyaNvJmgvJmhnIDRmsPl8eTRt5M0F5M0M5AaM1h8vjyaNvJmgvJmhnIDRmsPl8eTRt5M0F5M0M5AaM1h8vjyaNvJmgvJmhnIDRmsPl8eTRt5M0F5M0M5AaM1h8vjyaNvJmgvJmhnIDRmsPl8eTRt5M0F5M0M5AaM1h8vjyaMvNXmh6VQqklT2K+cmoUJLODnJauicVIABo0aukE4fTR2/3k+02v2zdUoTpOmo+HKu7nxF7nPTLyT6qfFgE4jBw7xebS8159pOMgAPVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==";
          }
        })
        .catch(error => {
          if (error.message.indexOf("timeout") != -1) {
            this.$toast("请求超时!请更换网络!!");
          } else {
            this.$toast("连接异常!!");
          }
        });
    },
    getListByid(assignrecordid) {
      //获取轨迹坐标
      var url = this.GLOBA.serverSrc + "vehicledriverecord/getListByid";
      let param = new URLSearchParams();
      param.append("id", assignrecordid);
       ;
      console.log(url + param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          console.log("获取轨迹坐标： ", response.data);
          if (response.data != null) {
            if (response.data.status) {
              var routemap = response.data.date.routemap;
              if (routemap != null) {
                console.log("JSON.parse(routemap):", JSON.parse(routemap));
                this.mapList = JSON.parse(routemap);
              } else {
                this.map = false;
              }
            } else {
            }
          } else {
            this.map = false;
          }
        })
        .catch(error => {
          this.map = false;
        });
    },
    orientation() {
      var arr = [0];
      var mapLists = JSON.parse(localStorage.getItem("mapLists"));
      if (mapLists!=null) {
        arr = mapLists;
        console.log("arr");
      }
      this.timer = setInterval(function() {
        var self = this;
        // 全局的this在方法中不能使用，需要重新定义一下
        var geolocation = new BMap.Geolocation();
        // 调用百度地图api 中的获取当前位置接口
        geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            // 获取当前位置经纬度
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(
              new BMap.Point(r.point.lng, r.point.lat),
              function(result) {
                if (result) {
                  var cen = {
                    lng: result.point.lng,
                    lat: result.point.lat
                  };
                  self.center = cen;

                  arr.push({
                    lng: cen.lng,
                    lat: cen.lat
                  });
                  self.mapList = arr;
                  //储存定位坐标信息
                  localStorage.setItem(
                    "mapLists",
                    JSON.stringify(self.mapList)
                  );
                  console.log("this.maplist:", self.mapList.length);
                }
              }
            );
          }
        });
      }, 3000);
    }
  },
  mounted() {
    // this.orientation();
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
  .van-cell-group {
    background-color: #f5f6f7;
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
      font-size: 13px;
    }
    .title {
      color: #000000;
      font-size: 15px;
    }
  }
  .van-cell__title {
    font-size: 15px;
  }
  .map {
    height: 200px;
    margin-bottom: 10px;
  }
  //还车弹框样式
  .hcdiv {
    width: 80%;
    height: 60%;
  }
  .hcbottom {
    width: 100%;
    position: absolute;
    bottom: 0px;
  }
}
</style>
