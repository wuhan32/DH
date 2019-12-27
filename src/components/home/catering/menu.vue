<template>
  <div class="menu">
    <!-- 头部 -->
    <div class="home-head">
      <van-icon name="arrow-left" @click="prev" class="arrow-left" />
      <span>菜单</span>
    </div>
    <van-tabs v-model="active" class="taocan" color="#025e80" title-active-color="#025e80">
      <van-icon class="iconfont richeng-left" class-prefix="icon" name="richeng" />
      <van-icon class="iconfont richeng-right" class-prefix="icon" name="richeng" />
      <!-- 套餐 -->
      <van-tab title="套餐" class="menu-list">
        <van-cell
          @click="showdrawer(dishesinfo.id,dishesinfo.vegetablecount,dishesinfo.meatcount);"
          v-for="dishesinfo in taocanList"
          :key="dishesinfo.id"
          class="menu-info"
        >
          <van-image :src="dishesinfo.imgpath">
            <template v-slot:error>加载失败</template>
          </van-image>
          <div class="jaige">
            <p>{{dishesinfo.menuname}}</p>
          </div>
        </van-cell>
      </van-tab>
      <!-- 套餐弹框 -->
      <van-popup
        closeable
        position="bottom"
        :style="{ height: '80%' }"
        class="menu-listInfo"
        v-model="showTwo"
      >
        <p>请选择菜品</p>
        <div class="home-gongneng">
          <b>|</b>
          <span>荤菜</span>
        </div>
        <van-checkbox-group v-model="huncailist" :max="maxnum" class="menu-cai">
          <van-checkbox
            :name="menuinfo.id"
            v-for="menuinfo in onehuncailist"
            :key="menuinfo.id"
          >{{menuinfo.dishesname}}</van-checkbox>
        </van-checkbox-group>
        <div class="home-gongneng">
          <b>|</b>
          <span>素菜</span>
        </div>
        <van-checkbox-group v-model="sucailist" :max="sumaxnum" class="menu-cai">
          <van-checkbox
            :name="menuinfo.id"
            v-for="menuinfo in onesucailist"
            :key="menuinfo.id"
          >{{menuinfo.dishesname}}</van-checkbox>
        </van-checkbox-group>
        <button @click="addToShoppingCart">选好了</button>
      </van-popup>

      <!-- 单点 -->
      <van-tab title="单点" class="dandian">
        <div class="home-gongneng">
          <span>
            <van-icon class="iconfont" class-prefix="icon" name="huncai" />
            <i>荤菜</i>
          </span>
        </div>
        <div class="caidanList">
          <div v-for="menuinfo in onehuncailist" :key="menuinfo.id">
            <van-image :src="menuinfo.imgpath">
              <template v-slot:error>加载失败</template>
            </van-image>
            <p>{{menuinfo.dishesname}}</p>
            <span>
              ￥{{menuinfo.price}}
              <van-icon name="add-o" class="add-o" @click="addCart(menuinfo.id)" />
            </span>
          </div>
        </div>
        <div class="home-gongneng">
          <span>
            <van-icon class="iconfont" class-prefix="icon" name="shucai" />
            <i>素菜</i>
          </span>
        </div>
        <div class="caidanList">
          <div v-for="menuinfo in onesucailist" :key="menuinfo.id">
            <van-image :src="menuinfo.imgpath">
              <template v-slot:error>加载失败</template>
            </van-image>
            <p>{{menuinfo.dishesname}}</p>
            <span>
              ￥{{menuinfo.price}}
              <van-icon name="add-o" class="add-o" @click="addCart(menuinfo.id)" />
            </span>
          </div>
        </div>
        <div class="dibu"></div>
      </van-tab>
    </van-tabs>
    <!-- 底部购物车 -->
    <div class="menu-footer">
      <van-tag round type="danger" class="xiaoqiu">{{ shoppingcartNum }}</van-tag>
      <div>
        <van-cell class="shopping" @click="showPopupOne">
          <van-icon name="shopping-cart-o" />
        </van-cell>
      </div>
      <div>
        <span class="jiage">￥ {{cartMoneyCount}}</span>
        <button class="menu-delete" @click="EmptyShoppingCart">
          <van-icon name="delete" class="delete" />清空
        </button>
        <button class="menu-payInfo" @click="closeanaccount">去结算</button>
      </div>
    </div>
    <!-- 底部购物车弹框 -->
    <van-popup
      v-model="showOne"
      position="bottom"
      :style="{ height: '60%' }"
      class="shoppingInfo"
      v-for="cart in carList"
      :key="cart.id"
    >
      <p>
        <span>已选菜品</span>
        <van-icon name="cross" @click="shoppingInfoHidde" />
      </p>
      <div v-for="cart in carList" :key="cart.id">
        <div v-if="cart.menuname == null || cart.menuname ==''">
          <p>{{cart.dishesname }}</p>
        </div>
        <div v-else>
          <p>{{cart.menuname }}</p>
          <p class="shoppingInfoOne">{{cart.dishesname }}</p>
        </div>
        <div class="shoppingInfo-jiage">
          <p>￥{{cart.price}}</p>
          <!-- 增加减少 -->
          <van-stepper
            :value="cart.size"
            @plus="increaseTheNumber(cart.id,cart.menuid,cart.dishesid,cart.groupid)"
            @minus="reduce(cart.id,cart.menuaccocationid,cart.size)"
          />
          <!-- 垃圾桶 -->
          <van-icon name="delete" @click="reduce(cart.id,cart.menuaccocationid,1)" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { log } from "util";
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      showTwo: false,
      showOne: false,
      active: 0,
      mealId: "", //获取食堂id
      //套餐集合
      taocanList: [],
      //单点集合 荤
      onehuncailist: [],
      //单点集合 素
      onesucailist: [],
      taoId: "",
      //荤菜集合
      huncailist: [],
      //素菜集合
      sucailist: [],
      maxnum: 0, //荤菜最大值
      sumaxnum: 0, //素菜最大值
      //购物数据
      carList: [],
      num: 1,
      shoppingcartNum: 0, //购物车数量
      cartMoneyCount: 0 //总金额,
    };
  },
  updated() {},
  created() {
    this.mealId = sessionStorage.getItem("mealId");
    if (this.GLOBA.userId == "" || this.GLOBA.userId == "000") {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.GLOBA.userId = userInfo.id;
    }

    //加载所有套餐
    this.getListByCanteenId();
    //加载所有单点 荤菜
    this.getonehuncailist();
    //加载所有单点 素菜
    this.getonesucailist();
    //加载购物车
    this.showCartList();
  },
  beforeMount() {},
  methods: {
    showPopupOne() {
      this.showOne = !this.showOne;
      this.showTwo = false;
    },
    prev() {
      this.$router.go(-1);
    },
    closeanaccount() {
      if (this.shoppingcartNum > 0) {
        this.$router.push("/payInfo");
      } else {
        Toast({
          message: "请选择菜品后再去结算!"
        });
      }
    },
    shoppingInfoHidde() {
      this.showOne = false;
    },
    //获取该食堂的所有套餐
    getListByCanteenId() {
      var url = this.GLOBA.serverSrc + "menuinfo/getListByCanteenId";
      let param = new URLSearchParams();
      param.append("canteenid", this.mealId); //食堂id
       ;
      this.$http
        .post(url, param)
        .then(response => {
          //console.log("t",response);
          if (response.data != null) {
            if (response.data.status) {
              var data = response.data.data;
              data.forEach(res => {
                //console.log(res);
                this.taocanList.push({
                  id: res.id,
                  menuname: res.menuname,
                  picture: res.picture,
                  imgpath:
                    this.GLOBA.serverSrc +
                    res.pictureserverpath +
                    "/" +
                    res.picturefilename +
                    "." +
                    res.picturefiletype,
                  vegetablecount: res.vegetablecount,
                  meatcount: res.meatcount
                });
              });
            } else {
            }
          } else {
          }
        })
        .catch(error => {
          //console.log(error);
        });
    },
    //  获取该食堂所有单点 荤菜
    getonehuncailist() {
      var url = this.GLOBA.serverSrc + "dishesinfo/getListByCanteenId";
      let param = new URLSearchParams();
      param.append("canteenid", this.mealId); //食堂iddishestype
      param.append("dishestype", "cp1566199509714"); //荤菜
      // ;
      this.$http.post(url, param).then(response => {
        //console.log("单点", response);
        if (response.data != null) {
          if (response.data.status) {
            var data = response.data.data;
            data.forEach(res => {
              this.onehuncailist.push({
                id: res.id,
                dishesname: res.dishesname,
                picture: res.picture,
                price: res.price,
                imgpath:
                  this.GLOBA.serverSrc +
                  res.pictureserverpath +
                  "/" +
                  res.picturefilename +
                  "." +
                  res.picturefiletype,
                vegetablecount: res.vegetablecount,
                meatcount: res.meatcount
              });
            });
          }
        } else {
          this.huncaiO = false;
        }
      });
    },
    getonesucailist() {
      //  获取该食堂所有单点 素菜
      var url = this.GLOBA.serverSrc + "dishesinfo/getListByCanteenId";
      let param = new URLSearchParams();
      param.append("canteenid", this.mealId); //食堂
      param.append("dishestype", "cp1566199517170"); //su菜
      // ;
      //console.log(param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          //console.log("单点",response.data);
          if (response.data != null) {
            var data = response.data.data;
            data.forEach(res => {
              this.onesucailist.push({
                id: res.id,
                dishesname: res.dishesname,
                picture: res.picture,
                price: res.price,
                imgpath:
                  this.GLOBA.serverSrc +
                  res.pictureserverpath +
                  "/" +
                  res.picturefilename +
                  "." +
                  res.picturefiletype
              });
            });
          } else {
          }
        })
        .catch(error => {
          //console.log(error);
        });
    },
    //套餐

    showdrawer(taoId, hunmaxnum, sumaxnum) {
      this.maxnum = hunmaxnum; //获取改套餐的最大荤菜数量
      this.sumaxnum = sumaxnum; //获取改套餐的最大素菜数量
      this.huncailist = [];
      this.sucailist = [];

      this.taoId = taoId; //获取套餐的id

      this.showTwo = true;
    },
    taoaddCart(menuid, dishesid, menustatus) {
      //加入购物车
      var url = this.GLOBA.serverSrc + "cartinfo/saveCart";
      let param = new URLSearchParams();
      param.append("canteenid", this.mealId); //食堂id
      param.append("staffid", this.GLOBA.userId); //用户id
      param.append("menuid", menuid); //套餐id
      param.append("dishesid", dishesid); //菜品id 字符串如：1,2,3 或者1
      param.append("menustatus", menustatus); //0：套餐 1：单点
      // ;
      this.$http
        .post(url, param)
        .then(response => {
          //console.log("加入购物车 ： ", response.data);
          if (response.data != null) {
            if (response.data.status) {
              Toast({
                message: response.data.msg,
                type: "success"
              });
              //加载购物车
              this.showCartList();
            } else {
              Toast({
                message: response.data.msg,
                type: "error"
              });
            }
          }
        })
        .catch(error => {
          //console.log(error);
          Toast({
            message: "加入购物车失败!",
            type: "error"
          });
        });
    },
    //套餐加入购物车
    addToShoppingCart() {
      var huncailistlength = this.huncailist.length;

      if (huncailistlength <= 0) {
        Toast({
          message: "请选择至少一个荤菜!"
        });
        return;
      }
      if (this.sucailist <= 0) {
        Toast({
          message: "请选择至少一个素菜!"
        });
        return;
      }
      //加入购物车
      var dishesid = "";
      this.huncailist.forEach(res => {
        console.log(res);
        dishesid += res + ",";
      });
      this.sucailist.forEach(res => {
        //console.log("sucailist", this.sucailist);
        dishesid += res + ",";
      });
      dishesid = dishesid.substring(0, dishesid.length - 1);

      this.taoaddCart(this.taoId, dishesid, 0); //套餐加入购物车

      this.showTwo = false;
    },
    addCart(dishesid) {
      //单品加入购物车
      this.taoaddCart(null, dishesid, 1);
    },
    //  加载购物车
    showCartList() {
      var url = this.GLOBA.serverSrc + "cartinfo/getCartinfoList";
      let param = new URLSearchParams();
      param.append("canteenid", this.mealId); //食堂id
      param.append("staffid", this.GLOBA.userId); //用户id
      // ;
      //console.log(url+param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          //console.log("购物车 ： ",response.data);
          if (response.data != null) {
            if (response.data.status) {
              var carlist = response.data.data;
              this.shoppingcartNum = carlist.length;
              if (this.shoppingcartNum > 0) {
                this.carList = [];
                this.cartMoneyCount = 0;
                carlist.forEach(res => {
                  this.carList.push({
                    id: res.id,
                    menuname: res.menuname,
                    dishesname: res.dishesname,
                    size: res.size,
                    price: res.price,
                    dishesid: res.dishesid,
                    menuaccocationid: res.menuaccocationid,
                    groupid: res.groupid,
                    menuid: res.menuid
                  });
                  this.cartMoneyCount += res.price;
                });
              }
            } else {
              this.shoppingcartNum = 0;
              this.carList = [];
              this.cartMoneyCount = 0;
            }
          }
        })
        .catch(error => {
          //console.log(error);
        });
    },
    reduce(carid, menuAccocationid, num) {
      //减少数量 cartinfo/updateDelCart
      if (menuAccocationid.search(",") != -1) {
        menuAccocationid = menuAccocationid.split(",")[0];
      }
      var url = this.GLOBA.serverSrc + "cartinfo/updateDelCart";
      let param = new URLSearchParams();
      param.append("canteenid", this.mealId); //食堂id
      param.append("staffid", this.GLOBA.userId); //用户id
      param.append("menuAccocationid", menuAccocationid); //菜品管理表id
      param.append("carid", carid); //购物车id
      if (num == 1) {
        param.append("deleteStatus", 1); //- 操作 1：删除整条数据
      } else {
        param.append("deleteStatus", 0); //- 操作 1：减少数量
      }

      // ;
      this.$http
        .post(url, param)
        .then(response => {
          //console.log("减少数量： ",response.data);
          if (response.data != null) {
            if (response.data.status) {
              var carlist = response.data.data;
              this.shoppingcartNum = carlist.length;
              if (this.shoppingcartNum > 0) {
                this.carList = [];
                this.cartMoneyCount = 0;
                carlist.forEach(res => {
                  this.carList.push({
                    id: res.id,
                    menuname: res.menuname,
                    dishesname: res.dishesname,
                    size: res.size,
                    price: res.price,
                    dishesid: res.dishesid,
                    menuaccocationid: res.menuaccocationid,
                    groupid: res.groupid,
                    menuid: res.menuid
                  });
                  this.cartMoneyCount += res.price;
                });
              } else {
                this.shoppingcartNum = 0;
                this.carList = [];
                this.cartMoneyCount = 0;
              }
            }
          }
        })
        .catch(error => {
          //console.log(error);
        });
    },
    increaseTheNumber(carid, menuid, dishesid, groupid) {
      //增加数量
      var url = this.GLOBA.serverSrc + "cartinfo/updateAddCart";
      let param = new URLSearchParams();
      param.append("canteenid", this.mealId); //食堂id
      param.append("staffid", this.GLOBA.userId); //用户id
      param.append("carid", carid); //购物车id
      param.append("menuid", menuid); //菜单套餐id，单点则不传或者NULL
      param.append("dishesid", dishesid); //菜品id 字符串如：1,2,3 或者1
      param.append("groupid", groupid); //同一套餐同一组的标识
      // ;
      //console.log(param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          //console.log("增加数量： ",response.data);
          if (response.data != null) {
            if (response.data.status) {
              var carlist = response.data.data;
              this.shoppingcartNum = carlist.length;
              if (this.shoppingcartNum > 0) {
                this.carList = [];
                this.cartMoneyCount = 0;
                carlist.forEach(res => {
                  this.carList.push({
                    id: res.id,
                    menuname: res.menuname,
                    dishesname: res.dishesname,
                    size: res.size,
                    price: res.price,
                    dishesid: res.dishesid,
                    menuaccocationid: res.menuaccocationid,
                    groupid: res.groupid,
                    menuid: res.menuid
                  });
                  this.cartMoneyCount += res.price;
                  this.showOne = true;
                });
              } else {
                this.shoppingcartNum = 0;
                this.carList = [];
                this.cartMoneyCount = 0;
              }
            } else {
            }
          }
        })
        .catch(error => {
          //console.log(error);
        });
    },
    EmptyShoppingCart() {
      //清空购物车
      if (this.shoppingcartNum > 0) {
        var url = this.GLOBA.serverSrc + "cartinfo/deleteCart";
        let param = new URLSearchParams();
        param.append("canteenid", this.mealId); //食堂id
        param.append("staffid", this.GLOBA.userId); //用户id
        // ;
        this.$http
          .post(url, param)
          .then(response => {
            //console.log("清空购物车： ",response.data);
            if (response.data != null) {
              if (response.data.status) {
                this.shoppingcartNum = 0;
                this.carList = [];
                this.cartMoneyCount = 0;
              } else {
              }
            }
          })
          .catch(error => {
            //console.log(error);
          });
      } else {
      }
    }
    // filters: {
    //   ellipsis(value) {
    //     if (!value) return "";
    //     if (value.length > 16) {
    //       return value.slice(0, 16) + "...";
    //     }
    //     return value;
    //   }
    // }
  }
};
</script>

<style lang="less" scoped>
.menu {
  padding-top: 56px;
  background: #fff;
  .home-head {
    .arrow-left {
      margin-right: 20px;
      position: absolute;
      top: 19px;
      left: 10px;
      font-size: 18px;
    }
  }
  .taocan {
    position: relative;
    .richeng-left {
      position: absolute;
      top: 13px;
      left: 52px;
    }
    .richeng-right {
      position: absolute;
      top: 13px;
      right: 114px;
    }
  }
  .menu-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 6px;
    .menu-info {
      width: 187px;
      height: 200px;
      border: 1px solid #eee;
      .van-image {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 80%;
      }
      .jaige {
        p {
          margin: 0;
          text-align: center;
        }
        span {
          color: red;
        }
      }
    }
  }

  .home-gongneng {
    font-size: 14px;
    background-color: #5a9cf8;
    color: #fff;
    margin-top: 10px;
    span {
      margin-left: 10px;
      line-height: 40px;
      i {
        margin: 0 10px;
        font-style: normal;
      }
    }
  }
  .dandian {
    padding: 0 20px;
    background-color: #fff;
    margin-bottom: 55px;
  }
  .caidanList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      width: 160px;
      height: 180px;
      border: 1px solid #eee;
      margin-top: 18px;
      text-align: center;
      position: relative;
      .van-image {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 75%;
      }
      span {
        color: red;
        position: absolute;
        right: 6px;
        display: flex;
        .add-o {
          margin: 2px 5px 0 8px;
        }
      }
    }
  }
  .menu-footer {
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #2177c7;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    z-index: 9999999999;
    .xiaoqiu {
      position: absolute;
      top: 0;
      left: 40px;
      z-index: 99999;
    }
    .shopping {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #2177c7;
      position: relative;
      .van-icon {
        color: #fff;
        font-size: 20px;
        text-align: center;
        font-weight: normal;
        line-height: 26px;
      }
    }

    button {
      background-color: #2177c7;
      box-shadow: 0 1 1px pink;
      border: none;
      height: 50px;
      color: #fff;
      font-size: 15px;
    }
    .menu-delete {
      position: relative;
      border-right: 1px solid #ccc;
      width: 80px;
      .delete {
        position: absolute;
        top: 18px;
        left: 8px;
      }
    }
    .menu-payInfo {
      width: 100px;
    }
  }
  .jiage {
    margin-right: 80px;
    font-size: 18px;
    color: red;
  }

  .menu-listInfo {
    margin-bottom: 50px;

    p {
      padding: 20px 15px;
    }
    button {
      height: 40px;
      width: 100%;
      border: none;
      background-color: #5a9cf8;
      color: #fff;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      margin-bottom: 10px;
    }
    .menu-cai {
      display: flex;
      flex-wrap: wrap;
      height: 100px;

      .van-radio {
        margin: 5px 10px;
      }
      .van-checkbox {
        margin: 5px 10px;
      }
    }
  }
  .shoppingInfo {
    padding-top: 55px;
    margin-bottom: 50px;
    > p {
      width: 100%;
      height: 23px;
      padding: 15px 20px;
      border-bottom: 1px solid #5a9cf8;
      background-color: #fff;
      position: fixed;
      top: 158px;
      z-index: 9999;
      .van-icon {
        margin-left: 255px;
      }
    }
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      height: 50px;
      > div {
        margin-top: 4px;
        .shoppingInfoOne {
          color: #ccc;
          width: 150px;
          height: 20px;
          font-size: 5px;
          overflow: hidden;
        }
      }

      .shoppingInfo-jiage {
        display: flex;
        justify-content: space-between;

        .van-stepper {
          margin: 0 20px;
          margin-top: 6px;
        }
        p {
          color: red;
          line-height: 24px;
        }
        .van-icon {
          font-size: 20px;
          line-height: 24px;
          color: red;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>