<template>
  <div class="home">
    <div class="home-head">大恒建设集团信息化系统</div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="1000" indicator-color="white">
      <van-swipe-item>
        <img src="http://www.dahengzh.com:8080/oa/upload/2019-12-27/b09e106a6bbcb6c79a425102eb696a4.png" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="http://www.dahengzh.com:8080/oa/upload/2019-12-27/MAIN201710252134000262017183848.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="http://www.dahengzh.com:8080/oa/upload/2019-12-27/MAIN201710252135000095332786024.jpg" alt />
      </van-swipe-item>
    </van-swipe>
    <!-- 九宫格 -->
    <div class="Odd">
      <van-grid :column-num="3">
        <van-grid-item to="/oalist">
          <van-icon class="iconfont" class-prefix="icon" name="changyongtubiao-mianxing-" />
          <p>行政办公</p>
        </van-grid-item>
        <van-grid-item to="/catering">
          <van-icon class="iconfont" class-prefix="icon" name="canyin" />
          <p>餐饮系统</p>
        </van-grid-item>
        <van-grid-item @click="underdevelopment">
          <van-icon class="iconfont" class-prefix="icon" name="caigou" />
          <p>采集系统</p>
        </van-grid-item>
        <van-grid-item @click="underdevelopment">
          <van-icon class="iconfont" class-prefix="icon" name="cangchujiaofei" />
          <p>物资仓储</p>
        </van-grid-item>
        <van-grid-item @click="underdevelopment">
          <van-icon class="iconfont" class-prefix="icon" name="ziyuan " />
          <p>金融机构</p>
        </van-grid-item>
        <van-grid-item to="/pmList">
          <van-icon class="iconfont" class-prefix="icon" name="project-o" />
          <p>项目管理</p>
        </van-grid-item>
        <van-grid-item @click="underdevelopment">
          <van-icon class="iconfont" class-prefix="icon" name="icon2" />
          <p>智慧工地</p>
        </van-grid-item>
        <van-grid-item @click="underdevelopment">
          <van-icon class="iconfont" class-prefix="icon" name="hetong" />
          <p>合同管理</p>
        </van-grid-item>
        <van-grid-item @click="underdevelopment"> 
          <van-icon class="iconfont" class-prefix="icon" name="jiaoyu" />
          <p>教育机构</p>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="home-gongneng">
      <b>|</b>
      <span>常用功能</span>
    </div>
    <van-grid :column-num="3" class="Event">
      <van-grid-item to="/actionrequired">
        <van-icon class="iconfont" class-prefix="icon" name="drxx38" />
        <p>个人事务</p>
      </van-grid-item>
      <van-grid-item @click="underdevelopment">
        <van-icon class="iconfont" class-prefix="icon" name="richeng1" />
        <p>个人日程</p>
      </van-grid-item>
      <van-grid-item to="/workorder">
        <van-icon class="iconfont" class-prefix="icon" name="order" />
        <p>流程入口</p>
      </van-grid-item>
    </van-grid>
    <div class="home-foot"></div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";

export default {
  data() {
    return {};
  },
  methods: {
    underdevelopment() {
      Toast("暂未开放");
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  padding-top: 56px;

  .home-gongneng {
    background-color: #fff;
    font-size: 14px;
    b {
      color: #00A047;
      margin-left: 12px;
      font-size: 18px;
    }
    span {
      margin-left: 10px;
      line-height: 40px;
    }
  }
  .home-foot {
    height: 100px;
  }

  .iconfont {
    color: #7d7e94;
  }
}
.Odd {
  .van-grid {
    > :nth-child(odd) {
      :nth-child(1) {
        background-color: #f5f6f7;
        .iconfont {
          color: #000;
        }
        p {
          color: #000;
        }
      }
    }
  }
}
.Event {
  .iconfont {
    // color: #025e80;
    font-size: 25px;
  }
}
</style>
