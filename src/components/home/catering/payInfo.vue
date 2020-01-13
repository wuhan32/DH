<template>
  <div class="payInfo">
    <div class="home-head">
      <van-icon name="arrow-left" @click="prev" class="arrow-left" />
      <span>结算中心</span>
    </div>
    <div class="payInfo-main">
      <div class="pay-site">
        <p>就餐地址</p>
        <h3>
          <van-icon name="location-o" />
          {{diningAddress}}
        </h3>
      </div>
      <div class="payInfo-price">
        <p>餐品详情</p>
        <div class="payInfo-set" v-for="menu in menuAccocationList" :key="menu.id">
          <p>{{menu.dishesname}}</p>
          <i>{{menu.menuname}}</i>
          <span>￥{{menu.price}}X{{menu.size}}</span>
        </div>
        <h3>
          共{{CountNum}}件,总计：
          <span>￥{{MoneyCount}}</span>
        </h3>
      </div>
      <div class="payInfo-way">
        <p>就餐方式</p>
        <van-tabs type="card" v-model="DiningWay" color="#F27000" title-active-color="#fff">
          <van-tab title="店内就餐" :type="dljc" @click="dljction" />
          <van-tab title="打包带走" :type="dbdz" @click="dbdztion" />
        </van-tabs>
      </div>
      <div class="payInfo-pay">
        <p>支付方式</p>
        <van-radio-group v-model="payment">
          <van-radio name="0" checked-color="#F27000" class="iconfont-weixin">
            <van-icon class="iconfont weixin" class-prefix="icon" name="weixin" />微信支付
          </van-radio>
          <van-radio name="1" checked-color="#F27000" class="iconfont-zhifubao">
            <van-icon class="iconfont zhifubao" class-prefix="icon" name="zhifubao" />支付宝支付
          </van-radio>
        </van-radio-group>
      </div>
      <div class="payInfo-relation">
        <h4>联系方式</h4>
        <input type="text" :placeholder="phone" />
      </div>
      <div class="payInfo-remark">
        <p>备注</p>
        <van-cell-group>
          <van-field
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请填写要求"
            show-word-limit
            v-model="remark"
          />
        </van-cell-group>
      </div>
    </div>

    <div class="payInfo-footer">
      <p>￥{{ MoneyCount }}</p>
      <button @click="updatePaymentStatus">去支付</button>
    </div>
  </div>
</template>

<script>
import { log } from "util";
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      payment: "0",
      diningAddress: "",
      phone: "",
      remark: "", //订单备注
      DiningWay: 1, //就餐方式
      dljc: "primary",
      dbdz: "",
      menuAccocationList: [],
      MoneyCount: 0, //总金额
      CountNum: 0, //商品件数
      orderloading: true,
      orderId: 0,
      userInfo: "" //登录用户的信息
    };
  },
  beforeMount() {
    this.DiningWay = sessionStorage.getItem("DiningWay");
    var dininghallid = sessionStorage.getItem("mealId");
    if (this.DiningWay != 0) {
      this.dbdztion();
    }
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.phone = this.userInfo.mobile;
    //生成订单
    var url = this.GLOBA.serverSrc + "orderinfo/saveOrder";
    let param = new URLSearchParams();
    param.append("staffid", this.userInfo.id); //用户id
    param.append("canteenid", dininghallid); //食堂id
    param.append("dineway", this.DiningWay); //就餐方式
    param.append("phone", this.phone); //  联系方式
    param.append("remark", ""); //备注
     ;
    //console.log(url + param.toString());
    this.$http
      .post(url, param)
      .then(response => {
        console.log("生成订单： ", response.data);
        if (response.data != null) {
          if (response.data.status) {
            var orderinfo = response.data.data;
            this.diningAddress = orderinfo.address;
            this.phone = orderinfo.phone;
            this.orderId = orderinfo.id;
            orderinfo.menuAccocationList.forEach(res => {
              this.menuAccocationList.push({
                id: res.id,
                menuname: res.menuname,
                dishesname: res.dishesname,
                price: res.price,
                size: res.size
              });
              this.MoneyCount += res.price * res.size;
              this.CountNum += res.size;
            });
            this.orderloading = false;
          } else {
            this.orderloading = false;
          }
        }
        this.orderloading = false;
      })
      .catch(error => {
        //console.log(error);
        this.orderloading = false;
      });
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    dljction() {
      this.dljc = "primary";
      this.dbdz = "";
      this.recrptionData = this.allReception;
      this.DiningWay = 0;
      //this.updateOrderInfo();//修改订单
    },
    dbdztion() {
      this.dljc = "";
      this.dbdz = "primary";
      this.recrptionData = this.dbdz;
      this.DiningWay = 1;
      //this.updateOrderInfo();//修改订单
    },
    updatePaymentStatus() {
      //修改订单状态为支付状态
      var url = this.GLOBA.serverSrc + "orderinfo/callBackNotify";
      let param = new URLSearchParams();
      param.append("id", this.orderId); //订单id
      param.append("remark", this.remark); //备注
       ;
      this.$http
        .post(url, param)
        .then(response => {
          if (response.data != null) {
            if (response.data.status) {
              Toast({
                message: "支付成功!"
              });
              this.prev();
            } else {
              Toast({
                message: "支付失败，请稍后尝试!"
              });
            }
          }
        })
        .catch(error => {
          //console.log(error);
          Toast({
            message: "支付异常，请稍后尝试!"
          });
        });
    },
    //修改订单
    updateOrderInfo() {
      var url = this.GLOBAL.serverSrc + "orderinfo/updateOrderById";
      let param = new URLSearchParams();
      param.append("id", this.orderId); //用户id
      param.append("dineway", this.DiningWay); //就餐方式
      param.append("phone", this.phone); //  联系方式
      param.append("remark", this.remark); //备注
      param.append("payment",this.payment)//支付
      console.log(url + param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          console.log("修改订单： ", response.data);
          if (response.data != null) {
            if (response.data.status) {
            } else {
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.payInfo {
  padding-top: 56px;
  margin-bottom: 50px;
  .home-head {
    .arrow-left {
      margin-right: 20px;
      position: absolute;
      top: 19px;
      left: 10px;
      font-size: 18px;
    }
  }
  .payInfo-main {
    .pay-site {
      background: #fff;
      height: 95px;
      padding: 0 20px;
      border-bottom: 1px solid #eee;
      > p {
        margin: 0;
        line-height: 50px;
        font-size: 15px;
      }
      h3 {
        margin: 0;
        line-height: 20px;
      }
    }
    .payInfo-price {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      margin: 15px 0;
      padding: 0 20px;
      > p {
        line-height: 45px;
        font-size: 15px;
      }
      h3 {
        text-align: right;
      }
      .payInfo-set {
        height: 50px;
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        p {
          margin: 0;
        }
        i {
          font-style: normal;
        }
      }
      span {
        color: red;
      }
    }
    .payInfo-way {
      background-color: #fff;
      border-bottom: 1px solid #eee;
      border-top: 1px solid #eee;
      height: 100px;

      p {
        padding: 0 20px;
        line-height: 45px;
        font-size: 15px;
      }
    }
    .payInfo-pay {
      padding: 15px 20px;
      margin: 15px 0;
      background-color: #fff;
      height: 90px;
      border-bottom: 1px solid #eee;
      border-top: 1px solid #eee;
      p {
        font-size: 15px;
      }
      .zhifubao {
        font-size: 20px;
        margin: 0 5px;
      }
      .iconfont-weixin {
        margin: 10px 0 8px 0;
      }
      .weixin {
        width: 20px;
        height: 20px;
      }
    }
    .payInfo-relation {
      display: flex;
      padding: 0 20px;
      justify-content: space-between;
      background-color: #fff;
      line-height: 80px;
      h4,
      p {
        margin: 0;
        font-size: 15px;
      }
      input {
        height: 40px;
        margin: auto 0;
        line-height: 40px;
        border: none;
        text-align: right;
      }
    }
    .payInfo-remark {
      padding: 0 20px;
      background-color: #fff;
      margin: 15px 0;
      height: 150px;
      p {
        line-height: 45px;
        font-size: 15px;
      }
      .van-cell-group {
        border: 1px solid #eee;
      }
    }
  }

  .payInfo-footer {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #ccc;
    padding-left: 20px;
    box-sizing: border-box;
    background-color: #fff;
    p {
      color: red;
      font-size: 20px;
    }
    button {
      background-color: #00A047;
      color: #fff;
      border: none;
      width: 150px;
      font-size: 20px;
    }
  }
}
</style>
