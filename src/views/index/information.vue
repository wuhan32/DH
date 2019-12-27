<template>
  <div class="information">
    <div class="home-head">资讯</div>
    <div class="information">
      <van-list v-model="loading" :finished="finished" :finished-text="msg" @load="onLoad">
        <div class="carapplylist"  v-for="(item,index) in List" :key="index">
          <van-panel @click="gotoinfo(item.id)" :title="item.title" :status="item.issuerdate"></van-panel>
        </div>
      </van-list>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      List: [],
      msg: "没有更多",
      loading: false,
      finished: false,
      timer:"",
    };
  },
  mounted(){
  },
  beforeMount(){
    this.getList();
  },
  methods: {
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
    gotoinfo(id){
      this.$router.push({
        path:"/info",
        name:"info",
        params:{
          id:id
        }
      })
    },
    getList() {
      var url = this.GLOBA.serverSrc + "infoissue/listLoad";
      let param = new URLSearchParams();
      param.append("title","");
      param.append("infotype", "news");
      param.append("infocontent", ""); //条件
      this.$http
        .post(url, param)
        .then(response => {
          console.log("新闻加载：", response);
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
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    },
  }
}
</script>

<style lang="less" scoped>
.information {
  padding-top: 28px;
}
h1 {
  margin: 0;
  padding: 0;
  height: 40px;
  line-height: 40px;
}
span {
  color: #000 !important;
}
</style>
