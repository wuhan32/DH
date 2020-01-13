<template>
  <div class="userinfo">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>个人信息</span>
    </div>
    <div>
      <van-cell class="headimg" title="头像" @click="show =true">
          <van-image
            width="30px"
            height="30px"
            fit="cover"
            :src="userInfo.avater"
        >
          <template v-slot:error>暂无头像</template>
          </van-image>
      </van-cell>
      <van-cell class="headimg" title="签名" @click="show =true">
          <van-image
            width="30px"
            height="30px"
            fit="cover"
            :src="userInfo.digitsign"
        >
          <template v-slot:error>暂无签名</template>
          </van-image>
      </van-cell>
      <van-cell v-show="userInfo.userno != '' " title="工号">{{userInfo.userno}}</van-cell>
      <van-cell title="用户名">{{userInfo.chsname}}</van-cell>
      <van-cell title="大恒号" >{{userInfo.ename}}</van-cell>
      <!-- <van-cell title="二维码名片" >
          <van-icon name="qr-invalid" />
      </van-cell> -->
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      userInfo: ''
    }
  },
  created () {},
  beforeMount () {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(this.userInfo);
  },
  mounted () {},
  beforeDestroy () {},
  methods: {
    
    prev () {
      this.$router.go(-1) // 返回上一层
    }
  }
}
</script>
<style scoped lang="less">
.userinfo {
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
  .van-icon-qr-invalid{
      font-size: 20px;
  }
}
</style>
