<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>车辆申请列表</span>
      <router-link to="carfrom" class="carForm" tag="span">车辆申请</router-link>
    </div>
    <div class="body">
      
    <div class="takeFoodList">
      <van-tabs @click="onClick" color="#025E80" class="tabsvant">
        <van-tab title="全部"></van-tab>
        <van-tab title="未接"></van-tab>
        <van-tab title="已接"></van-tab>
        <van-tab title="已完成"></van-tab>
        <van-tab title="已取消"></van-tab>
      </van-tabs>
      </div>
      <div class="takelist">
      <van-list v-model="loading" :finished="finished" :finished-text="msg" @load="onLoad">
        <div class="carapplylist" v-for="(item,index) in List" :key="index" @click="gotocarapplyInfo(item.id)">
          <van-row>
            <van-col span="2" class="address strnum">从：</van-col>
            <van-col span="19" class="address strnum">{{item.toplace}}</van-col>
            <van-col span="3">{{item.newusevehstate}}</van-col>
          </van-row>  
          <van-row>
            <van-col span="2" class="address">到：</van-col>
            <van-col span="20" class="address strnum">{{item.toaddress}}</van-col>
            <van-col span="2">&emsp;</van-col>
          </van-row>
          <van-row>
            <van-col span="12" class="strnum">申请人：{{item.appvehpersonname}}</van-col>
            <van-col span="12" class="strnum">申请电话：{{item.appphonenumber}}</van-col>
          </van-row>
          <van-row>
            <van-col span="12" class="strnum">用车类型：{{item.newusevehtype}}</van-col>
            <van-col span="12" class="strnum">用车事由：{{item.usevehreason}}</van-col>
          </van-row>
          <van-row>
            <van-col span="12" class="strnum">开始时间：{{item.appstarttime}}</van-col>
            <van-col span="12" class="strnum">归还时间：{{item.appendtime}}</van-col>
          </van-row>
        </div>
      </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      list: [],
      List: [],
      status: [
        { newusevehstate: "", dvasext1: "", dvasstatus: "" },
        { newusevehstate: "已通过", dvasext1: "0", dvasstatus: "assigned" },
        { newusevehstate: "已通过", dvasext1: "1", dvasstatus: "assigned" },
        { newusevehstate: "已归还", dvasext1: "1", dvasstatus: "return" },
        { newusevehstate: "已取消", dvasext1: "1", dvasstatus: "" }
      ],
      msg: "没有更多",
      loading: false,
      finished: false,
      timer:"",
    };
  },
  created() {},
  beforeMount() {
    this.List=[];
    this.onClick(0,"");

    // this.timer = setInterval(function() {console.log("123456")},3000);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    prev() {
      this.$router.go(-1); // 返回上一层
      // clearInterval(this.timer);
    },
    onClick(name, title) {
      const toast = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      var url = this.GLOBA.serverSrc + "vehicleapplyrecord/listloadapply";
      let param = new URLSearchParams();
       ;
      param.append("newusevehstate", this.status[name].newusevehstate);
      param.append("dvasext1", this.status[name].dvasext1); //条件
      param.append("dvasstatus", this.status[name].dvasstatus);
      param.append("page", 1);
      param.append("rows", 20);
      this.$http
        .post(url, param)
        .then(response => {
          console.log("车辆加载：", response);
          toast.clear();
          if (response.data != null&&response.data.total>0) {
            this.List = response.data.rows;
            if(this.List.length>15){
              this.msg = "没有更多";
            }else{
              this.msg = "";
            }
          } else {
            this.List=[];
            this.msg = "暂无车辆申请";
          }
        })
        .catch(error => {
          toast.clear();
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 30) {
          this.finished = true;
        }
      }, 500);
    },
    gotocarapplyInfo(applyid) {
      this.$router.push({  
        	path: '/carapplyInfo',   
        	name: 'carapplyInfo',  
        	params: {   
            	id: applyid
        	}  
    		}) 
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

  .van-icons {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }
  .carForm{
    float: right;
    padding-right: 10px;
  }
  .carapplylist {
    background-color: #ffffff;
    padding: 16px;
    border-bottom: 5px solid #f5f6f7;
    .van-row {
      color: #7d7e80;
      line-height: 22px;
    }
    .address {
      color: #000000;
      line-height: 20px;
      font-size: 15px;
    }
    .strnum {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
  .takeFoodList {
    position: fixed;
    top: 56px;
    width: 100%;
  }
  .takelist {
    margin-top: 95px;
  }
}
</style>
