<template>
  <div class="catering">
    <div class="home-head">
      <van-icon name="arrow-left" @click="prev" />
      <span>大恒建设集团自助点餐</span>
    </div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="1000" indicator-color="white">
      <van-swipe-item>
        <img src="@/assets/catering/134ff4a8361cd5389b57269c720f486.png" alt />
      </van-swipe-item>

      <van-swipe-item>
        <img src="@/assets/catering/588a06418322533afebc905ada2ff54.png" alt />
      </van-swipe-item>

      <van-swipe-item>
        <img src="@/assets/catering/7d79a47bc67d65fb5a3fc9752b0afa5.png" alt />
      </van-swipe-item>

      <van-swipe-item>
        <img src="@/assets/catering/ce450e299a8b3dda19bbf29747361a1.png" alt />
      </van-swipe-item>
    </van-swipe>
    <h4>大恒集团的员工们，{{ sayhellotoText }}</h4>
    <div class="catering-dingdan">
      <div @click="TakeFood">
        <p class="xiaoyuan" v-show="xiaoqiu">●</p>
        <img src="@/assets/catering/qucanma.png" alt />
        <p>取餐码</p>
      </div>
      <div @click="OrderFrom">
        <img src="@/assets/catering/dingdan.png" alt />
        <p>订单</p>
      </div>
    </div>
    <button class="catering-diancan" @click="BeginOrder">
      <van-icon class="iconfont" class-prefix="icon" name="icon-" />
      <span>开始点餐</span>
    </button>
    <baidu-map :center="center" :zoom="zoom" @ready="handler"></baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sayhellotoText: "",
      center: { lng: 0, lat: 0 },
      zoom: 3,
      xiaoqiu: false
    };
  },

  methods: {
    prev() {
      this.$router.go(-1);
    },
    TakeFood() {
      this.$router.push("/takeFood");
    },
    OrderFrom() {
      this.$router.push("/orderFrom");
    },
    BeginOrder() {
      this.$router.push("/beginOrder");
    },
    handler({ BMap, map }) {
      this.center.lng = 0;
      this.center.lat = 0;
      this.zoom = 15;
    },
    getMycount() {
      let self = this;
      let date = new Date();
      if (date.getHours() >= 0 && date.getHours() < 12) {
        self.sayhellotoText = "上午好!";
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        self.sayhellotoText = "下午好!";
      } else {
        self.sayhellotoText = "晚上好!";
      }
    },
    getOrder() {
      //查询我的订单
      var url = this.GLOBA.serverSrc + "orderinfo/getNotTakeOrderList";
      let param = new URLSearchParams();
      param.append("staffid", this.GLOBA.userId); //订单id
      //console.log(url + param.toString());
      this.$http.post(url, param).then(response => {
        //console.log("未取餐订单： ", response);
        if (response.data != null) {
          this.xiaoqiu = true;
        }
      });
    }
  },
  created() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.GLOBA.userId = userInfo.id;
    this.getOrder();
    this.getMycount();
  }
};
</script>

<style lang="less" scoped>
.catering {
  background-color: #fff;
  padding-top: 56px;
  h4 {
    padding: 0 20px;
  }
  .van-icon {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }

  .catering-dingdan {
    display: flex;
    div {
      position: relative;
      text-align: center;
      margin: 0 auto;
      font-size: 14px;
      margin-top: 50px;
      .xiaoyuan {
        position: absolute;
        top: -19px;
        right: 0;
        font-size: 12px;
        color: red;
      }
      img {
        width: 30px;
        height: 25px;
      }
    }
  }
  .catering-diancan {
    width: 80%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #5a9cf8;
    border-radius: 40px;
    border: none;
    color: #fff;
    font-size: 17px;
    position: relative;
    left: 10%;
    margin-top: 40px;
    .iconfont {
      position: absolute;
      top: 1px;
      left: 80px;
      color: #fff;
    }
  }
}
</style>
