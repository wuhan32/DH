<template>
  <div class="personalInfo">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>{{ portrait.chsname }}</span>
    </div>
    <div>
      <div class="BgcImg">
        <div
          class="bg-blur"
          v-if="portrait.avater != '' || portrait.avater != '' "
          :style="{backgroundImage: 'url(' + portrait.avater + ')'}"
        />
        <div class="bg-blur bg" v-else />
      </div>
      <div class="headPortrait">
        <van-image :src="portrait.avater" width="100" height="100">
          <template v-slot:error>暂无头像</template>
        </van-image>
        <div>
          <p>{{ portrait.chsname }}</p>
        </div>
      </div>
      <div class="personalInfo-boby">
        <a href="tel:18228855977">
          <van-button type="primary">打电话</van-button>
        </a>
        <van-button type="default" @click="chattingRecords(userId)">发消息</van-button>
      </div>
      <div class="personalInfoBodyOne">
        <ul>
          <li>
            <p>电话</p>
            <span>{{ portrait.mobile }}</span>
          </li>
          <li>
            <p>部门</p>
            <span>{{ portrait.orgname }}</span>
          </li>
          <li>
            <p>职位</p>
            <span>{{ portrait.rolename }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      userId: "",
      portrait: "",
    };
  },
  created() {
    this.userId = this.$route.params.userId;
    //console.log(this.userId);
    
    this.headPortrait();
  },
  beforeMount(){

  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    chattingRecords(userId) {
      this.$router.push({
        path:`/chattingRecords/${userId}`
      });
    },

    headPortrait() {
      var url = this.GLOBA.serverSrc + "/user/formLoad";
      let param = new URLSearchParams();
      param.append("id", this.userId);
      this.$http.post(url, param).then(res => {
        if (res.data != "") {
          this.portrait = res.data;
        } else {
          Toast.loading({
            message: "用户不存在",
            forbidClick: true
          });
        }
      }).catch(error => {
            //console.log(error);
          });
    },
  }
};
</script>

<style lang="less" scoped>
.home-head {
  background-color: transparent;
}
.personalInfo {
  background-color: #fff;
}
.van-icons {
  margin-right: 20px;
  position: absolute;
  top: 19px;
  left: 10px;
  font-size: 18px;
}
.bg {
  background-image: url("../../assets/home/b09e106a6bbcb6c79a425102eb696a4.png");
}
.BgcImg {
  height: 200px;
  border-bottom: 2px solid #fff;
}
.bg-blur {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  -webkit-filter: blur(15px);
  -moz-filter: blur(15px);
  -o-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(2px);
}

.headPortrait {
    margin: -36px 32px 5px 134px;
  .van-image {
    border: 3px solid #fff;
  }
  .chsname {
    font-size: 15px;
  }
  p {
    font-size: 18px;
    font-weight: 400;
    margin-left: 25px;
  }
}
.personalInfo-boby {
  .van-button {
    width: 150px;
    margin-left: 25px;
    a {
      color: #fff;
    }
  }
}

.personalInfoBodyOne {
  ul {
    margin-top: 25px;
    padding: 0 25px;

    li {
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      font-size: 15px;
      line-height: 45px;
      p {
        color: rgb(156, 154, 154);
        padding: 0;
        margin: 0;
        margin-right: 35px;
      }
    }
  }
}
</style>