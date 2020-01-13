<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>收入合同变更签证</span>
      <span class="sub" @click="getAssign">提交</span>
    </div>
    <div>
        <van-cell-group>
            <van-cell title="基本信息" class="title"/>
            <van-field v-model="no" clearable disabled label="签证日期：" placeholder="" />
            <van-field v-model="no" clearable disabled label="签证编号：" placeholder="" />
            <van-field v-model="no" clearable disabled label="变更名称：" placeholder="" />
            <van-field v-model="no" clearable disabled label="所属项目：" placeholder="" />
            <van-field v-model="no" clearable disabled label="变更合同名称：" placeholder="" />
            <van-field v-model="no" clearable disabled label="变更金额：" placeholder="" />
            <van-field v-model="no" clearable disabled label="金额大写：" placeholder="" />
            <van-field v-model="no" clearable disabled label="变更签订人：" placeholder="" />
            <van-field v-model="no" clearable disabled label="结算方式：" placeholder="" />
            <van-field v-model="no" rows="4" autosize type="textarea" show-word-limit clearable disabled label="收款条件：" placeholder="" />
            <van-field v-model="no" rows="4" autosize type="textarea" show-word-limit clearable disabled label="主要条款：" placeholder="" />
            <van-field v-model="no" rows="4" autosize type="textarea" show-word-limit clearable disabled label="备注：" placeholder="" />
            <br>
            <van-cell title="附件" class="title"/>
            <van-uploader>
              <van-button icon="photo" type="primary">单个上传</van-button>
            </van-uploader>
            <van-uploader>
              <van-button icon="photo" type="primary">批量上传</van-button>
            </van-uploader>
            <br>
        </van-cell-group>
       
    </div>
  </div>
</template>
<script>
import { Notify, Toast } from "vant";
export default {
  data () {
    return {
      no: '',
    }
  },
  created () {},
  beforeMount () {
    this.getUserInfo();
    this.randomWord(false, 18); //编号
  },
  mounted () {},
  beforeDestroy () {},
  methods: {
    prev () {
      this.$router.go(-1) // 返回上一层
    }
  }
}
</script>
<style scoped lang="less">
.page {
    height: 100%;
    width: 100%;
    background-color: #f5f6f7;
    margin-top: 56px;
  .home-head {
  }
  .van-icons {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }
  .sub{
    margin-right: 20px;
    position: absolute;
    right: 10px;
  }
  .van-cell-group{
      background-color: #f5f6f7;
  }
  .title {
    .van-cell__title{
      color: #31A83D;
    }
  }
}
</style>
