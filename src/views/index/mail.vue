<template>
  <div class="mail">
    <div class="home-head">通讯</div>
    <van-search
      v-model="name"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="loaduserinfo"
      @clear="loaduserinfo"
    >
      <div slot="action" @click="loaduserinfo">搜索</div>
    </van-search>

    <van-index-bar highlight-color="none" :sticky-offset-top="50" v-if="list == ''">
      <van-cell>
        <span v-show="sous">暂无搜索对象</span>
        <van-loading size="24px" vertical v-show="jiaz">加载中...</van-loading>
      </van-cell>
    </van-index-bar>

    <van-index-bar highlight-color="none" :sticky-offset-top="50" v-else>
      <div v-for="(value, index) in sortobj" :key="index">
        <van-index-anchor :index="index" v-show="value.length > 0 ? true : false" />
        <van-cell v-for="item in value" :key="item.id" @click="gopersonalInfo(item.id)">
          <van-image :src="item.avater" round />
          <span>{{ item.chsname }}</span>
        </van-cell>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      list: [],
      sortobj: [],
      name: "",
      jiaz: false,
      sous: true
    };
  },
  beforeCreate() {},
  created() {
    this.loaduserinfo();
  },
  mounted() {
    this.jiaz = true;
    this.sous = false;
  },
  methods: {
    gopersonalInfo(userId) {
      this.$router.push({
        path:`/personalInfo/${userId}`,
       
      });
    },

    loaduserinfo() {
      var url = this.GLOBA.serverSrc + "userinfo/listLoadContacts";
      let param = new URLSearchParams();
      param.append("name", this.name);
      this.$http
        .post(url, param)
        .then(response => {
          //console.log(response);
          if (response.data != null) {
            this.list = response.data.rows;

            if (this.list == "") {
              Toast({
                message: "暂无搜索对象",
                type: "error"
              });
            }
            let sortobj = {};
            for (let j = 0; j < this.list.length; j++) {
              for (let i = 65; i <= 90; i++) {
                if (!sortobj[String.fromCharCode(i)]) {
                  sortobj[String.fromCharCode(i)] = [];
                }
                if (this.list[j].firstSpell == String.fromCharCode(i)) {
                  sortobj[String.fromCharCode(i)][
                    sortobj[String.fromCharCode(i)].length
                  ] = this.list[j];
                }
              }
            }
            this.sortobj = sortobj;
            //console.log(this.sortobj);
            this.jiaz = false;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="less" scoped>
.mail {
  padding-top: 56px;
  padding-bottom: 60px;
}
h1 {
  margin: 0;
  padding: 0;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  padding-left: 16px;
  font-weight: 400;
}
.van-cell {
  display: flex;
  .van-image {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
