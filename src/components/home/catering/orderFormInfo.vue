<template>
  <div class="orderFormInfo">
    <div class="home-head">
      <van-icon name="arrow-left" @click="prev" class="arrow-left" />
      <span>订单详情</span>
    </div>
    <div class="orderFormInfoTime" v-show="orderinfo.status == 0 || orderinfo.status == 1">
      <p>剩余支付倒计时{{`${day}天${hr}小时${min}分钟${sec}秒`}}</p>
    </div>
    <div class="orderFormlist-one">
      <div>
        <p>
          {{orderinfo.status == 0 ? '未付款' : '' }}
          {{orderinfo.status == 1 ? '未取餐' : '' }}
          {{orderinfo.status == 2 ? '已完成' : '' }}
          {{orderinfo.status == 3 ? '已取消' : '' }}
        </p>
        <p>【就餐方式】{{orderinfo.dineway == 0 ? '店内就餐' : '打包带走' }}</p>
      </div>
      <p>{{orderinfo.address}}</p>
    </div>
    <div class="orderFormlist-two">
      <van-cell-group>
        <van-cell title="餐品详情" />
        <van-cell
          :title="menu.dishesname"
          :label="menu.menuname"
          v-for="menu in menuInfoList"
          :key="menu.id"
        >￥ {{ menu.price }} x {{ menu.size }}</van-cell>
        <div class="jage">
          <p>
            共{{menuCount}}件,实付：
            <span>￥{{orderinfo.orderAmount}}</span>
          </p>
        </div>
      </van-cell-group>
      <div class="orderFormInfoShop" v-show="orderinfo.status == 0 || orderinfo.status == 1">
        <van-button class="qxdd" type="danger" @click="OrderById">取消订单</van-button>
        <van-button class="qzf" type="info" @click="payinfo">去支付</van-button>
      </div>
    </div>
    <div class="orderFormlist-three">
      <ul>
        <li>
          <p>订单详情</p>
        </li>
        <li>
          <span>订单编号：{{orderinfo.outTradeNo}}</span>
        </li>
        <li>联系方式：{{orderinfo.phone}}</li>
        <li>支付方式：{{orderinfo.payment == 0 ? '微信支付' : '支付宝支付'}}</li>
        <li>下单时间：{{orderinfo.createtime | formatDate}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      day: 0,
      hr: 0,
      min: 0,
      sec: 0,
      orderId: "", //获取订单id
      orderinfo: [], //订单详情
      menuInfoList: [], //菜品集合
      menuCount: 0, //菜品数量
      orderinfoLoading: true,
      pagebool: true
    };
  },
  created() {
    this.orderId = this.$route.params.id;
    //console.log(this.orderId);
  },
  beforeMount() {
    //查询我的订单
    var url = this.GLOBA.serverSrc + "orderinfo/getOrderById";
    let param = new URLSearchParams();
    param.append("id", this.orderId); //订单id
    //console.log("订单ID",this.orderId)
     ;
    this.$http
      .post(url, param)
      .then(response => {
        //console.log("订单详情： ",response.data);
        if (response.data != null) {
          if (response.data.status) {
            var orderinfo = response.data.data;
            this.orderinfo = orderinfo;
            //console.log(this.orderinfo);
            orderinfo.menuAccocationList.forEach(res => {
              this.menuInfoList.push({
                id: res.id,
                menuname: res.menuname,
                dishesname: res.dishesname,
                price: res.price,
                size: res.size
              });
              this.menuCount += res.size;
            });
            if (this.orderinfo.status == "0") {
              this.countdown(this.orderinfo.reserve2);
            }
            this.orderinfoLoading = false;
          } else {
            this.orderinfoLoading = false;
          }
        }
      })
      .catch(error => {
        //console.log(error);
        this.orderinfoLoading = false;
      });
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    OrderById() {
      //取消订单
      var url = this.GLOBA.serverSrc + "orderinfo/updateCancelOrderById";
      let param = new URLSearchParams();
      param.append("id", this.orderId); //订单id
      this.$http.post(url, param).then(res => {
        Toast.success("取消订单成功");
        this.$router.push("/orderFrom");
      }).catch(error => {
            //console.log(error);
          });
    },
    countdown(reserve2) {
      const end = Date.parse(new Date(reserve2));
      const now = Date.parse(new Date());
      const msec = end - now;
      let day = parseInt(msec / 1000 / 60 / 60 / 24);
      let hr = parseInt((msec / 1000 / 60 / 60) % 24);
      let min = parseInt((msec / 1000 / 60) % 60);
      let sec = parseInt((msec / 1000) % 60);
      this.day = day;
      this.hr = hr > 9 ? hr : "0" + hr;
      this.min = min > 9 ? min : "0" + min;
      this.sec = sec > 9 ? sec : "0" + sec;
      const _this = this;
      if (_this.hr == "00" && _this.min == "00" && _this.sec == "00") {
        //结束时调用
        _this.OrderById();
        _this.$router.push("/orderFrom");
        return;
      } else {
        setTimeout(function() {
          _this.countdown(reserve2);
        }, 1000);
      }
    },
    payinfo(){
      this.$router.push({  
            	path: '/Alipaypayment',   
            	name: 'Alipaypayment',  
            	params: {   
                	orderId: this.orderId
            	}  
        	}) 
    }
  },

  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 16) {
        return value.slice(0, 16) + "...";
      }
      return value;
    },
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  }
};
</script>

<style lang="less" scoped>
.orderFormInfo {
  padding-top: 56px;
  .home-head {
    .arrow-left {
      margin-right: 20px;
      position: absolute;
      top: 19px;
      left: 10px;
      font-size: 18px;
    }
  }
  .orderFormInfoTime {
    line-height: 40px;
    color: #F27000;
    height: 50px;
    background-color: #fff;
    margin-bottom: 10px;
    font-size: 16px;
    margin: 0 auto;
      p {
        text-align: center;
      }
  }
  .orderFormlist-one {
    padding: 0 20px;
    background-color: #fff;
    line-height: 30px;
    > div {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      p {
        font-size: 15px;
      }
    }
    > p {
      font-size: 10px;
    }
  }
  .orderFormlist-two {
    margin: 10px 0;
    background-color: #fff;
    .van-cell-group {
      padding-right: 20px;
    }
    .jage {
      float: right;
      padding: 0 18px;
      height: 50px;
      font-size: 15px;
      line-height: 50px;
      span {
        color: #F27000;
      }
    }
  }
  .orderFormlist-three {
    padding: 0 20px;
    line-height: 50px;
    background-color: #fff;

    ul {
      li {
        border-bottom: 1px solid #eee;
        > p {
          font-size: 15px;
        }
      }
    }
  }
  .orderFormInfoShop {
    display: flex;
    height: 55px;
    width: 100%;
    background-color: #fff;
    justify-content: flex-end !important;
    border-top: 1px solid #eee;
    .van-button {
      height: 30px;
      width: 90px;
      line-height: 30px;
      margin: auto 10px;
    }
    .qzf{
      background-color: #00A047;
    }
    .qxdd{
      background-color: #F27000;
      border: 1px solid #F27000;
    }
  }
  [class*="van-hairline"]::after {
    border: none;
  }
}
</style>
