<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" @click="prev" />
      <span>软件更新</span>
    </div>
    <div class="bodydiv">
      <div class="updateLogo" align="center">
        <img class="updateImg" src="../../assets/login/logo.png" />
        <p>当前版本：{{version}}</p>
      </div>
      <div class="updatemsg">
        <p>
          <span class="span13">更新日志：</span>
        </p>
        <div class="updaterizhi" v-if="appinfo.updateDesc != null">{{appinfo.updateDesc}}</div>
        <div v-else>无更新日志</div>
        <p>
          <span class="span13">更新时间：</span>
          {{appinfo.updateTime}}
        </p>
        <p>
          <span class="span13">更新版本：</span>
          {{appinfo.versionName}}
        </p>
      </div>
    </div>
    <div class="bottomdiv">
      <div v-if="updateBoole">
        <!--@click="download" -->
        <a href="http://yun.app8h.com/themes/appDistribute.html?id=RvQJZv" target="_blank">
          <van-button type="primary" size="large" round>更新（{{appinfo.filesize}}）</van-button>
        </a>
      </div>
      <div v-else>
        <van-button
        type="info"
          @click="updateApp"
          size="large"
          round
        >已是最新版</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify, Toast } from 'vant'

export default {
  data () {
    return {
      appinfo: '',
      version: this.GLOBA.versionName,
      updateBoole: true,
      taost: ''
    }
  },
  created () {},
  beforeMount () {},
  mounted () {
    this.updateApp()
  },
  beforeDestroy () {
    this.taost.clear()
  },
  methods: {
    prev () {
      this.$router.go(-1) // 返回上一层
    },
    download () {
      var url = 'http://yun.app8h.com/themes/appDistribute.html?id=RvQJZv'
      this.$router.push({
        path: 'iframe',
        name: 'iframe',
        params: {
          iframeurl: 'http://yun.app8h.com/themes/appDistribute.html?id=RvQJZv',
          iframename: '更新下载'
        }
      })
    },
    updateApp () {
      this.taost = Toast.loading({
        mask: true,
        message: '正在获取更新信息',
        duration: 0
      })
      let url = this.GLOBA.serverSrc + 'appversions/getAppVersions'
      let param = new URLSearchParams()
      this.$http
        .post(url, param)
        .then(response => {
         //console.log('更新：', response.data)
          if (response.data != null) {
            var AppVersionsData = response.data.AppVersionsData
            var appinfo = response.data.httpData.appInfo
            this.appinfo = appinfo
            if (AppVersionsData.appversions > this.GLOBA.versionCode) {
              if (AppVersionsData.appconstraint == 'true') {
                this.GLOBA.updateBool = { update: true, app: true }
              } else {
                this.GLOBA.updateBool = { update: false, app: true }
              }
              this.updateBoole = true
            } else if (AppVersionsData.appversions == this.GLOBA.versionCode) {
              if (AppVersionsData.versionsno != this.GLOBA.versionName) {
                if (AppVersionsData.appconstraint == 'true') {
                  this.GLOBA.updateBool = { update: true, app: true }
                } else {
                  this.GLOBA.updateBool = { update: false, app: true }
                }
                this.updateBoole = true
              } else {
                this.updateBoole = false
                this.GLOBA.updateBool = { update: false, app: false }
              }
            } else {
              this.updateBoole = false
            }
          }
          this.taost.clear()
        })
        .catch(error => {
         //console.log(error)
          this.updateBoole = false
          this.GLOBAL.updateBool = { update: false, app: false }
          this.taost.clear()
        })
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

<style lang="less" scoped>
.page{
  margin-top: 56px;
}
.home-head {
}
.van-icon {
  margin-right: 20px;
  position: absolute;
  top: 19px;
  left: 10px;
  font-size: 18px;
}
.bodydiv {
  width: 100%;
  background-color: #ffffff;
}
.updateLogo {
  width: 100%;
  align-content: center;
  text-align: center;
}
.updateImg {
  margin: 20px auto;
  width: 150px;
  height: 100%;
}
.updatemsg {
  background-color: #ffffff;
  text-align: left;
  font-size: 13px;
  line-height: 30px;
  margin-left: 16px;
  margin-right: 16px;
}
.updaterizhi {
  line-height: 25px;
}
.span13 {
  font-size: 13px;
  color: #8a8a8a;
}
.bottomdiv {
  border: 0 solid #ebeef5;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top-width: 1px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
}
.van-button {
  height: 38px;
  line-height: 40px;
  background-color: #0A719B;
  border: 1px solid #0A719B;
}
</style>
