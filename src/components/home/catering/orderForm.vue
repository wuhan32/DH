<template>
  <div class="takeFood">
    <div class="home-head">
      <van-icon name="arrow-left" @click="prev" class="home-arrow" />
      <span>我的订单</span>
      <input type="text" placeholder="请输入搜索关键字" v-model="likeContent" />
      <van-icon name="search" class="home-search" @click.native="showOrderList" />
    </div>
    <div class="takeFoodList">
      <van-tabs
        v-model="orderStatus"
        animated
        title-active-color="#025e80"
        color="#025e80"
        line-height="2px"
        @click="statusClick"
      >
        <van-tab title="全部" name="0"></van-tab>
        <van-tab title="未付款" name="1"></van-tab>
        <van-tab title="未取餐" name="2"></van-tab>
        <van-tab title="已完成 " name="3"></van-tab>
        <van-tab title="已取消" name="4"></van-tab>
      </van-tabs>
    </div>
    <div class="takelist">
      <div
        class="takeFood-info"
        @click="gotoCateringOrderInfo(order.id)"
        v-for="order in orderList"
        :key="order.id"
      >
        <div class="takeFood-list">
          <div>
            <h4>{{order.title}}</h4>
            <p>{{order.createtime | formatDate}}</p>
          </div>
          <p>{{order.status}}</p>
        </div>
        <div class="takeFood-can">
          <span>{{order.size}}分{{order.menuname}}</span>
          <span>￥ &nbsp;{{order.orderamount}}</span>
        </div>
      </div>
    </div>
    <div v-show="show" class="Vshow">
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likeContent: [],
      search: "",
      orderList: [],
      orderStatus: "0",
      status: ["", "0", "1", "2", "3"],
      msg: "",
      show: false
    };
  },
  created() {},
  beforeMount() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.GLOBA.userId = userInfo.id;

    this.showOrderList();
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },

    statusClick() {
      this.showOrderList();
    },
    showOrderList() {
      this.orderList = [];
      //查询我的订单
      var url = this.GLOBA.serverSrc + "orderinfo/listLoad";
      let param = new URLSearchParams();
      param.append("staffid", this.GLOBA.userId); ////用户id
      param.append("likeContent", this.likeContent); //条件
      param.append("status", this.status[this.orderStatus]); //状态
      //param.append("page", this.page);
      //param.append("rows", this.rows);
      this.$http
        .post(url, param)
        .then(response => {
          if (response.data.status) {
            var order = response.data.data;
            var num = 0;
            order.forEach(res => {
              var statustext = "";
              if (res.status == 0) {
                statustext = "未付款";
              } else if (res.status == 1) {
                statustext = "未取餐";
              } else if (res.status == 2) {
                statustext = "已完成";
              } else if (res.status == 3) {
                statustext = "已取消";
              } 
              
              this.orderList.push({
                id: res.id,
                address: res.address,
                size: res.size,
                menuname: res.menuname,
                orderAmount: res.orderAmount,
                createtime: res.createtime,
                title: res.title,
                status: statustext,
                orderamount: res.orderamount
              });
              num++;
            });
             this.show =false
          } else {
            var statustext = "";
            if (
              this.status[this.orderStatus] == 0 &&
              this.status[this.orderStatus] != ""
            ) {
              statustext = "未付款";
            } else if (this.status[this.orderStatus] == 1) {
              statustext = "未取餐";
            } else if (this.status[this.orderStatus] == 2) {
              statustext = "已完成";
            } else if (this.status[this.orderStatus] == 3) {
              statustext = "已取消";
            } else if (this.status[this.orderStatus] == "") {
              statustext = "餐饮";
            }
            this.msg = '暂无' + statustext + '的订单!'
                this.show = true  
            
            
          }
        })

        .catch(error => {
        });
    },
    gotoCateringOrderInfo(orderid) {
      //进入我的订单
      this.$router.push({
        name: "OrderFormInfo",
        params: {
          id: orderid
        }
      });
    }
  },
  filters: {
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
.takeFood {
  padding-top: 56px;
  position: relative;
  .home-head {
    input {
      position: absolute;
      right: 20px;
      top: 15px;
      height: 25px;
      width: 160px;
      padding-left: 20px;
      border: 1px solid #000;
      font-size: 12px;
      color: #000;
    }
    .home-search {
      position: absolute;
      top: 21px;
      right: 30px;
      color: #000;
    }
  }
  .takelist {
    margin-top: 45px;
  }
  .takeFoodList {
    position: fixed;
    top: 56px;
    width: 100%;
  }
  .home-arrow {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }
  .takeFood-info {
    background-color: #fff;
    padding: 0 20px;
    margin-bottom: 10px;
    .takeFood-list {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;

      div {
        h4 {
          margin: 20px 0 0 0;
        }
        p {
          margin: 10px 0;
        }
      }
      > p {
        margin-top: 20px;
      }
    }
    .takeFood-can {
      display: flex;
      justify-content: space-between;
      line-height: 40px;
    }
  }
}
</style>
