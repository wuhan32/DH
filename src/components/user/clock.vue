<template>
  <div id="clock">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="back" />
      <span>签到</span>
      <span class="sub" @click="getAddressGps">刷新地址</span>
    </div>
    <van-notice-bar mode="closeable">
      <van-icon name="location-o" />
      考勤地址：{{clockInfo.ext1}}
    </van-notice-bar>

    <div class="clockMap">
      <baidu-map class="map" :center="centerboss" :autoLocation="true" :zoom="17" @ready="handler">
        <bm-marker
          :position="{lng: center.lng, lat: center.lat}"
          :dragging="true"
          animation="BMAP_ANIMATION_BOUNCE"
        ></bm-marker>
        <!-- <bm-marker :position="center" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"></bm-marker> -->
        <bm-marker :position="{lng: centerboss.lng, lat: centerboss.lat}" :dragging="false"></bm-marker>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bm-circle
          :center="centerboss"
          fillColor="#3B89A7"
          content="打卡位置"
          radius="100"
          stroke-color="#025E80"
          :stroke-opacity="0.2"
          :stroke-weight="6"
          :editing="false"
        ></bm-circle>
      </baidu-map>
    </div>
    <div class="clockBody">
      <van-cell title="偏差范围" :value="clockInfo.scope+mi" />
      <van-cell v-show="clockInfo.clocktime1!=''" :value="clockInfo.clocktime1" is-link>
        <template slot="title">
          <span class="custom-title">打卡班次1</span>&emsp;
          <van-tag v-show="attendancerecord.recordtime1!=null" type="success">已打卡</van-tag>
          <van-tag v-show="attendancerecord.recordtime1==null" plain>未打卡</van-tag>
        </template>
      </van-cell>
      <van-cell v-show="clockInfo.clocktime2!=''" :value="clockInfo.clocktime2" is-link>
        <template slot="title">
          <span class="custom-title">打卡班次2</span>&emsp;
          <van-tag v-show="attendancerecord.recordtime2!=null" type="success">已打卡</van-tag>
          <van-tag v-show="attendancerecord.recordtime2==null" plain>未打卡</van-tag>
        </template>
      </van-cell>
      <van-cell v-show="clockInfo.clocktime3!=''" :value="clockInfo.clocktime3" is-link>
        <template slot="title">
          <span class="custom-title">打卡班次3</span>&emsp;
          <van-tag v-show="attendancerecord.recordtime3!=null" type="success">已打卡</van-tag>
          <van-tag v-show="attendancerecord.recordtime3==null" plain>未打卡</van-tag>
        </template>
      </van-cell>
      <van-cell v-show="clockInfo.clocktime4!=''" :value="clockInfo.clocktime4" is-link>
        <template slot="title">
          <span class="custom-title">打卡班次4</span>&emsp;
          <van-tag v-show="attendancerecord.recordtime4!=null" type="success">已打卡</van-tag>
          <van-tag v-show="attendancerecord.recordtime4==null" plain>未打卡</van-tag>
        </template>
      </van-cell>
      <van-cell v-show="clockInfo.clocktime5!=''" :value="clockInfo.clocktime5" is-link>
        <template slot="title">
          <span class="custom-title">打卡班次5</span>&emsp;
          <van-tag v-show="attendancerecord.recordtime5!=null" type="success">已打卡</van-tag>
          <van-tag v-show="attendancerecord.recordtime5==null" plain>未打卡</van-tag>
        </template>
      </van-cell>
      <van-cell v-show="clockInfo.clocktime6!=''" :value="clockInfo.clocktime6" is-link>
        <template slot="title">
          <span class="custom-title">打卡班次6</span>&emsp;
          <van-tag v-show="attendancerecord.recordtime6!=null" type="success">已打卡</van-tag>
          <van-tag v-show="attendancerecord.recordtime6==null" plain>未打卡</van-tag>
        </template>
      </van-cell>
      <van-cell v-show="clockInfo.clocktime7!=''" :value="clockInfo.clocktime7" is-link>
        <template slot="title">
          <span class="custom-title">打卡班次7</span>&emsp;
          <van-tag v-show="attendancerecord.recordtime7!=null" type="success">已打卡</van-tag>
          <van-tag v-show="attendancerecord.recordtime7==null" plain>未打卡</van-tag>
        </template>
      </van-cell>
      <van-cell v-show="clockInfo.clocktime8!=''" :value="clockInfo.clocktime8" is-link>
        <template slot="title">
          <span class="custom-title">打卡班次8</span>&emsp;
          <van-tag v-show="attendancerecord.recordtime8!=null" type="success">已打卡</van-tag>
          <van-tag v-show="attendancerecord.recordtime8==null" plain>未打卡</van-tag>
        </template>
      </van-cell>
    </div>
    <div class="clockBtn">
      <van-button @click="clock" type="info">签到</van-button>
    </div>

    <!-- 提示 -->
    <van-overlay :show="show" @click="show = false" class="zhezhao" class-name="zhezhao" />
    <van-popup
      v-model="show"
      :style="{ height: '46%',width:'65%',color:'#fff'}"
      :closeable="true"
      close-icon="cross"
      :overlay="false"
      overlay-class="zhezhao"
    >
      <div class="clockShow">
        <div class="msg">
          <van-icon name="checked" />打卡成功
        </div>
        <div>
          <van-row>
            <van-col span="2">&emsp;</van-col>
            <van-col span="20">
              <div class="time">
                <van-icon name="clock" />
                {{recordtime}}
              </div>
            </van-col>
            <van-col span="2">&emsp;</van-col>
          </van-row>
        </div>
        <div
          v-show="content.userno != ''"
          class="language"
        >{{content.username}}(工号：{{content.userno}})</div>
        <div v-show="content.userno == ''" class="language">{{content.username}}</div>
        <div>
          <van-divider :dashed="true" :hairline="true" />
        </div>
        <div @click="show = false" class="closeShow">我知道了</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Notify, Toast } from 'vant'

export default {
  data () {
    return {
      center: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 20,
      centerContent: '', // 提示内容
      centerBool: false, //
      centerboss: { lng: 113.571732, lat: 22.283589 },
      timer: '', // 计时器
      clockInfo: '', // 个人打卡信息
      mi: 'm≤',
      attendancerecord: '', // 当天实时打卡信息
      // 提示
      show: false,
      recordtime: '',
      content: {}
    }
  },
  updated () {
    if (this.center.lng != '0' || this.center.lat != '0') {
      this.clockAddress()
    }
  },
  created () {
    this.getclockInfo()
  },
  methods: {
    back () {
      this.$router.push('/user') // 返回上一层
    },
    handler ({ BMap, map }) {
     //console.log(BMap, map)
      this.center.lng = 0
      this.center.lat = 0
      this.zoom = 15
    },
    getAddressGps () {
      const taost = Toast.loading({
        mask: true,
        message: '正在定位...',
        duration: 0
      })
      var self = this
      // 全局的this在方法中不能使用，需要重新定义一下
      var geolocation = new BMap.Geolocation()
      // 调用百度地图api 中的获取当前位置接口
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // 获取当前位置经纬度
          var myGeo = new BMap.Geocoder()
          myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (
            result
          ) {
            if (result) {
             //console.log(result.point.lat + ',' + result.point.lng)
              self.center.lat = result.point.lat
              self.center.lng = result.point.lng
              taost.clear()
            }
          })
        }
      })
    },
    getclockInfo () {
      // attendanceshift/getAttendancesById?userId=?
      var userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      var url = this.GLOBA.serverSrc + 'attendanceshift/getAttendancesById'
      let param = new URLSearchParams()
      param.append('token', this.GLOBA.token)
      param.append('userId', userInfo.id)
      this.$http
        .post(url, param)
        .then(response => {
         //console.log('获取打卡信息：', response)
          if (response.data != null && response.data.attendanceshift != null) {
            this.clockInfo = response.data.attendanceshift
            var cb = {
              lng: this.clockInfo.longitude,
              lat: this.clockInfo.latitude
            }
            this.centerboss = cb
           //console.log('centerboss:', this.centerboss)
          } else {
            this.getclockInfo()
          }
        })
        .catch(error => {
          if (error.message.indexOf('timeout') != -1) {
            Toast('连接超时!')
          } else {
            Toast('连接异常，请稍后尝试!')
          }
        })
    },
    getAttendancerecordById () {
      // 获取实时打卡信息
      var userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      var url =
        this.GLOBA.serverSrc + 'attendanceshift/getAttendancerecordById'
      let param = new URLSearchParams()
      param.append('token', this.GLOBA.token)
      param.append('userId', userInfo.id)
      this.$http
        .post(url, param)
        .then(response => {
         //console.log('获取打卡实时信息：', response)
          if (response.data != null && response.data.attendancerecord != null) {
            this.attendancerecord = response.data.attendancerecord
          } else {
            this.getAttendancerecordById()
          }
        })
        .catch(error => {
          if (error.message.indexOf('timeout') != -1) {
            Toast('连接超时!')
          } else {
            Toast('连接异常，请稍后尝试!')
          }
        })
    },
    clockAddress () {
     //console.log('距离：', this.centerboss, '距离2：', this.center)
      var pointB = new BMap.Point(
        parseFloat(this.centerboss.lng),
        parseFloat(this.centerboss.lat)
      ) // 店铺的经纬度
      var pointA = new BMap.Point(
        parseFloat(this.center.lng),
        parseFloat(this.center.lat)
      ) // 店铺的经纬度

      var map = new BMap.Map('')
      var distance = 0.0
      distance =
        (map.getDistance(pointA, pointB) / 1000).toFixed(2) * 1000 -
        parseInt(this.clockInfo.scope) // 保留小数点后两位
      if (distance > 0) {
        this.centerContent = '您距离可打卡范围还有' + distance + 'm'
        this.centerBool = false
      } else {
        this.centerContent = ''
        this.centerBool = true
      }
    },
    clock () {
      this.getAttendancerecordById()
     //console.log(this.centerBool, this.centerContent)
      if (this.centerBool) {
        const taost = Toast.loading({
          mask: true,
          message: '正在打卡...',
          duration: 0
        })
        var self = this
        // 全局的this在方法中不能使用，需要重新定义一下
        var geolocation = new BMap.Geolocation()
        // 调用百度地图api 中的获取当前位置接口
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            // 获取当前位置经纬度
            var myGeo = new BMap.Geocoder()
            myGeo.getLocation(
              new BMap.Point(r.point.lng, r.point.lat),
              function (result) {
                if (result) {
                 //console.log(result.point.lat + ',' + result.point.lng)
                  self.center.lat = result.point.lat
                  self.center.lng = result.point.lng
                  var userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
                  if (self.center.lng != '0' && self.center.lat != '0') {
                    var text = {
                      orgId: userInfo.orgid,
                      userid: userInfo.id,
                      username: userInfo.chsname,
                      userno: userInfo.userno,
                      clockIntype: userInfo.orgid,
                      clockposition: self.center.lat + self.center.lng,
                      remark: '打卡',
                      longitude: self.center.lng,
                      latitude: self.center.lat
                    }
                    var strJson = JSON.stringify(text)
                    var url =
                      self.GLOBA.serverSrc + 'attendancerecord/formSaveApp'
                    let param = new URLSearchParams()
                    param.append('strJson', strJson)
                    param.append('token', self.GLOBA.token)
                    self.$http
                      .post(url, param)
                      .then(response => {
                       //console.log('打卡:', response.data)
                        taost.clear()

                        var recordtime = response.data.recordtime
                        self.recordtime = recordtime
                        self.status = response.data.status
                        if (response.data.status) {
                          self.content = response.data.content
                          this.show = true
                        } else {
                          if (response.data.distance != null) {
                            Toast({
                              message:
                                '您超出打卡范围,您距可打卡距离' +
                                response.data.distance.toFixed(2) +
                                'm',
                              icon: 'fail'
                            })
                          } else if (response.data.msg != null) {
                            Toast({
                              message: '打卡失败，你没有权限打卡!',
                              icon: 'fail'
                            })
                          } else {
                            Toast({
                              message: '打卡异常，请重新打卡!',
                              icon: 'fail'
                            })
                          }
                        }
                      })
                      .catch(error => {
                        taost.clear()
                        Toast({
                          message: '打卡异常，请重新打卡!',
                          icon: 'fail'
                        })
                      })
                  } else {
                    taost.clear()
                    Toast({
                      message: '打卡异常，请重新打卡!',
                      icon: 'fail'
                    })
                  }
                }
              }
            )
          }
        })
      } else {
        Toast({
          message: this.centerContent,
          icon: 'fail'
        })
      }
    }
  },
  beforeMount () {
    var self = this
    // 全局的this在方法中不能使用，需要重新定义一下
    var geolocation = new BMap.Geolocation()
    // 调用百度地图api 中的获取当前位置接口
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        // 获取当前位置经纬度
        var myGeo = new BMap.Geocoder()
        myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (
          result
        ) {
          if (result) {
           //console.log(
              '钩子定位：',
              result.point.lat + ',' + result.point.lng
            )
            self.center.lat = result.point.lat
            self.center.lng = result.point.lng
          }
        })
      }
    })
  },
  mounted () {
    this.timer = setInterval(function () {
      var self = this
      // 全局的this在方法中不能使用，需要重新定义一下
      var geolocation = new BMap.Geolocation()
      // 调用百度地图api 中的获取当前位置接口
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // 获取当前位置经纬度
          var myGeo = new BMap.Geocoder()
          myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (
            result
          ) {
            if (result) {
              var cen = { lng: result.point.lng, lat: result.point.lat }
              self.center = cen
            }
          })
        }
      })
    }, 3000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在vue实例销毁钱，清除我们的定时器
    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 16) {
        return value.slice(0, 16) + '...'
      }
      return value
    },
    formatDate: function (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
  }
}
</script>
<style scoped lang="less">
.page {
  height: 100%;
  width: 100%;
  background-color: #f5f6f7;
  .home-head {
    .van-icons {
      margin-right: 20px;
      position: absolute;
      top: 19px;
      left: 10px;
      font-size: 18px;
    }
  }

  .sub {
    margin-right: 20px;
    position: absolute;
    right: 10px;
  }
  .head {
    width: 100%;
    height: 54px;
    color: #ffffff;
    background-color: #025e80;
    .backicon {
      color: #ffffff;
      font-size: 18px;
      line-height: 54px;
      padding: 0px;
      width: 30px;
    }
    .left {
      padding-left: 16px;
      font-size: 16px;
      line-height: 45px;
    }
    .right {
      text-align: right;
      padding-right: 16px;
      font-size: 16px;
      line-height: 54px;
    }
  }
  #clock {
    margin-top: 150px;
  }
  .map {
    width: 100%;
    height: 300px;
  }
  .clockBody {
    width: 100%;
    height: 150px;
    overflow-y: scroll;
    margin-bottom: 0px;
  }
  .clockBtn {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 60px;
    background-color: #ffffff;
    .van-button {
      font-size: 18px;
      margin-top: 10px;
      margin-bottom: 10px;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background-color: #025e80;
    }
  }

  .van-notice-bar {
    margin-top: 11px;
    background-color: #ffffff;
    color: #000000;
    z-index: 2000;
  }
  .clockShow {
    background-color: #5f97f6;
    width: 100%;
    height: 100%;
    color: #ffffff;
    text-align: center;
    .msg {
      padding-top: 50px;
      font-size: 25px;
    }
    .time {
      margin-top: 30px;
      margin-bottom: 30px;
      line-height: 60px;
      background-color: #ffffff;
      color: #787c85;
      font-size: 25px;
      border-radius: 5px;
    }
    .language {
      font-size: 16px;
      text-align: center;
      margin-bottom: 35px;
    }
    .closeShow {
      font-size: 16px;
    }
    .van-icon-cross {
      color: #ffffff;
    }
    .zhezhao {
      background-color: #ffffff;
    }
  }
}
</style>
