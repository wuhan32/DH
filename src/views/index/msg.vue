<template>
  <div class="msg">
    <div class="home-head">消息</div>
    <!-- <van-list v-model="loading" :finished="finished" :finished-text="msg" @load="onLoad">
      <van-cell v-for="item in list" :key="item" @click="chattingRecords">
        <div class="chattingRecords">
          <van-image src="https://img.yzcdn.cn/vant/cat.jpeg">
            <template v-slot:loading>
              <van-loading type="spinner" size="5" />
            </template>
          </van-image>
          <div>
            <p>吴金平</p>
            <span>聊天记录上课就不能看了你按实际达拉斯客户大声道考虑好阿萨德</span>
          </div>
          <span>11:00</span>
        </div>
      </van-cell>
    </van-list> -->
    
  </div>
</template>

<script>
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      list: [],
      List: [],
      loading: false,
      finished: false,
      msg: "没有更多"
    };
  },
  beforeMount() {},
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
      }, 100);
    },
    gotoInfo(id) {
      this.$router.push({
        path: "/info",
        name: "info",
        params: {
          id: id
        }
      });
    },
    chattingRecords() {
      this.$router.push('/chattingRecords')
    }
  }
};
</script>

<style lang="less" scoped>
.msg {
  padding-top: 56px;
}
h1 {
  margin: 0;
  padding: 0;
  height: 40px;
  line-height: 40px;
}

.chattingRecords {
  display: flex;
  .van-image {
    margin-right: 20px;
    width: 50px;
    height: 50px;
  }
  > div {
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    > span {
      width: 80px;
      font-size: 12px;
      color: #bcc1c5;
    }
  }
  > span {
    line-height: 50px;
  }
}
</style>
