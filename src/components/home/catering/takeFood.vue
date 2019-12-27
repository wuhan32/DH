<template>
  <div class="takeFood">
    <div class="home-head">
      <van-icon name="arrow-left" @click="prev" />
      <span>我的取餐码</span>
    </div>
    <div class="takeFood-info" v-for="order in order" :key="order.id">
      <h2>{{order.title}}</h2>
      <p>
        详细地址：
        <span>{{order.address}}</span>
      </p>
      <p>
        订单编号：
        <span>{{order.outTradeNo}}</span>
      </p>
      <P>
        联系方式：
        <span>{{order.phone}}</span>
      </P>
      <p>
        下单时间
        <span>:{{ order.createtime | formatDate}}</span>
      </p>
      <div class="qucan">
        <p>
          未取：
          <span>{{order.notTake}}</span>
        </p>
        <p>
          已取：
          <span>{{order.alreadyTake}}</span>
        </p>
      </div>
      <!-- 二维码区域 -->
      <div v-for="menu in order.menuAccocationList" :key="menu.id">
        <div class="takeFood-cai">
          <div>
            <p>
              菜品：
              <span>{{menu.dishesname}}</span>
            </p>
            <p>
              单价：￥
              <span>{{menu.price}}</span>
            </p>
            <p>
              状态：
              <span>未取餐</span>
            </p>
            <p>
              截止取餐时间:{{order.reserve3}}
              <span></span>
            </p>
          </div>
          <div class="takeFood-weima">
            <img src="../../../assets/catering/timg.jpg" alt />
          </div>
        </div>
        <p class="zhuyi">*注意：请在截止时间内取餐，超过截止时间该二维码无效</p>
      </div>
    </div>
    <div v-show="show">{{msg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: [],
      msg:'',
      show:false
    };
  },
  beforeMount() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.GLOBA.userId = userInfo.id;
    this.getOrder();
  },
  updated() {
  
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    getOrder() {
      //查询我的订单
      var url = this.GLOBA.serverSrc + "orderinfo/getNotTakeOrderList";
      let param = new URLSearchParams();
      param.append("staffid", this.GLOBA.userId); //订单id
       ;
     //console.log(url + param.toString());
      this.$http
        .post(url, param)
        .then(response => {
         //console.log("未取餐订单： ", response.data);
          if (response.data != null) {
            if (response.data.status) {
              var orderinfo = response.data.data;
              this.order = orderinfo;
            } else {
              this.msg = "您暂无可用的取餐码！";
              this.show = true
            }
          }
        })
        .catch(error => {
         //console.log(error);
          this.msg = "获取取餐码异常，请您检查网络!";
        });
    }
  },
	filters: {
	    ellipsis (value) {
	      if (!value) return ''
	      if (value.length > 16) {
	        return value.slice(0,16) + '...'
	      }
	      return value
	    },
	    formatDate: function (value) {
	        let date = new Date(value);
	        let y = date.getFullYear();
	        let MM = date.getMonth() + 1;
	        MM = MM < 10 ? ('0' + MM) : MM;
	        let d = date.getDate();
	        d = d < 10 ? ('0' + d) : d;
	        let h = date.getHours();
	        h = h < 10 ? ('0' + h) : h;
	        let m = date.getMinutes();
	        m = m < 10 ? ('0' + m) : m;
	        let s = date.getSeconds();
	        s = s < 10 ? ('0' + s) : s;
	        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
	      }
 	}
};
</script>

<style lang="less" scoped>
.takeFood {
  padding-top: 56px;
  .home-head {
    .van-icon {
      margin-right: 20px;
      position: absolute;
      top: 19px;
      left: 10px;
      font-size: 18px;
    }
  }
}
.takeFood-info {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 10px;
  > p {
    line-height: 24px;
  }
  .takeFood-cai {
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
    .takeFood-weima {
      width: 100px;
      height: 84px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .qucan {
    display: flex;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 20px;
    span {
      margin-right: 10px;
    }
  }
  .zhuyi {
    color: red;
    text-align: center;
    border-bottom: 1px dashed #ccc;
    line-height: 40px;
  }
}
</style>
