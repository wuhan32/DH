<template>
  <div class="takeFood">
    <baidu-map :center="center" :zoom="zoom" @ready="handler"></baidu-map>
    <div class="home-head">
      <van-icon name="arrow-left" @click="prev" class="arrow-left" />
      <span>选择餐厅</span>
    </div>
    <div class="home-gongneng">
      <b>|</b>
      <span>餐厅地址</span>
    </div>

    <div class="takeFood-info">
      <van-list v-model="loading" :finished="finished" :finished-text="msg" @load="onLoad">
        <van-cell @click="showPopup(item.id)" class="takeFood-dizhi" v-for="item in list" :key="item.id">
          <p>{{item.title}}</p>
          <span class="dingwei">
            <p>{{item.address}}</p>
            <van-icon name="location-o" class="location-o">{{item.distance}} km</van-icon>
          </span>
        </van-cell>
      </van-list>
    </div>

    <van-popup v-model="show" closeable position="bottom" :style="{ height: '30%' }">
      <h3>请选择就餐方式</h3>
      <div class="dabao">
        <button @click="goMenu(0)">
          <van-icon class="iconfont" class-prefix="icon" name="canyin ">
            <span>店内就餐</span>
          </van-icon>
        </button>
        <button @click="goMenu(1)">
          <van-icon class="iconfont" class-prefix="icon" name="changyongtubiao-mianxing- ">
            <span>打包带走</span>
          </van-icon>
        </button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      listO:[],
      msg: "",
      show: false,
      center: { lng: 0, lat: 0 },
      lng: 0,
      lat: 0,
      zoom: 3,
      list: "", // 餐厅地址集合,
      mealId: "" // 餐厅id
    };
  },
  beforeMount() {
    this.addressDetail();
  },
  created() {
    // var hasEnter=localStorage.getItem('hasEnter');
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    showPopup(id, DiningWay) {
      // 餐厅ID
      sessionStorage.setItem("mealId", id);
      this.mealId = sessionStorage.getItem("mealId");

      this.show = true;
    },
    handler({ BMap, map }) {
      this.center.lng = 0;
      this.center.lat = 0;
      this.zoom = 15;
    },
    goMenu(DiningWay) {
      this.$router.push("/menu");
      sessionStorage.setItem("DiningWay", DiningWay); // DiningWay  ==  0   ? 店内就餐   ：  打包带走
    },
    addressDetail() {
      // 获取地理位置
      var self = this;
      // 全局的this在方法中不能使用，需要重新定义一下
      var geolocation = new BMap.Geolocation();
      // 调用百度地图api 中的获取当前位置接口
      //console.log(geolocation);

      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // 获取当前位置经纬度
          var myGeo = new BMap.Geocoder();
          myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(
            result
          ) {
            if (result) {
              //console.log(result.point.lat + "," + result.point.lng);
              self.lat = result.point.lat;
              self.lng = result.point.lng;
              self.load(result.point.lat, result.point.lng);
            }
          });
        }
      });
    },
    load(lat, lng) {
      // 发送post请求
      if (lat != 0 || lng != 0) {
        //console.log("" + lat, lng);
        var url = this.GLOBA.serverSrc + "canteen/getCanteenList";

        let param = new URLSearchParams();
        param.append("latitude", lat);
        param.append("longitude", lng);
         ;

        //console.log(param.toString());

        this.$http
          .post(url, param)
          .then(response => {
            //console.log("获取餐厅地址返回值：", response.data);
            if (response.data != null) {
              if (response.data.status) {
                var data = response.data.data;
                // this.list=data;
                var lists = [];
                data.forEach(res => {
                  var pointB = new BMap.Point(
                    parseFloat(res.longitude),
                    parseFloat(res.latitude)
                  ); // 店铺的经纬度
                  var pointA = new BMap.Point(
                    parseFloat(this.lng),
                    parseFloat(this.lat)
                  ); // 店铺的经纬度
                  var map = new BMap.Map("");
                  var distance = 0.0;
                  distance = (map.getDistance(pointA, pointB) / 1000).toFixed(
                    2
                  ); // 保留小数点后两位
                  //console.log("res", res.title, distance);

                  lists.push({
                    id: res.id,
                    title: res.title,
                    address: res.address,
                    distance: distance
                  });
                });
                this.list = lists;
              }
            }
          })
          .catch(error => {
            //console.log(error);
          });
      } else {
        this.addressDetail();
      }
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.listO.push(this.listO.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.listO.length >= 30) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.takeFood {
  padding-top: 56px;
  .home-gongneng {
    width: 100%;
    font-size: 14px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    position: fixed;
    top: 56px;
    z-index: 100;
    b {
      color: #025e80;
      margin-left: 12px;
      font-size: 18px;
    }
    span {
      margin-left: 10px;
      line-height: 40px;
    }
  }
  .arrow-left {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }

  .van-cell {
    padding: 0;
  }
  .takeFood-dizhi {
    height: 80px;
    margin-bottom: 2px;
    padding: 10px 10px;
    p {
      font-size: 14px;
    }
    span {
      color: #ccc;
      font-size: 13px;
      .location-o {
        color: #025e80;
      }
    }
    .dingwei {
      display: flex;
      justify-content: space-between;
      p {
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .dabao {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    button {
      background-color: #fff;
      border: 1px solid #ccc;
      width: 120px;
      line-height: 40px;
      border-radius: 4px;
    }
    .iconfont {
      font-size: 12px;
      line-height: 30px;
      span {
        margin-left: 12px;
      }
    }
  }
  .takeFood-info {
    margin-top: 40px;
  }
  .van-popup {
    h3 {
      padding: 0 20px;
    }
  }
}
</style>
