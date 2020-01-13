<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>项目立项-立项信息登记</span>
      <span class="sub" @click="getAssign">提交</span>
    </div>
    <div>
        <van-cell-group>
            <van-cell title="基本信息" class="title"/>
            <van-field v-model="no" clearable disabled label="日期：" placeholder="请选择日期" />
            <van-field v-model="no" clearable disabled label="项目编号：" placeholder="" />
            <van-field v-model="no" clearable disabled label="项目名称：" placeholder="" />
            <van-field v-model="no" clearable disabled label="计划开始日期：" placeholder="" />
            <van-field v-model="no" clearable disabled label="计划结束日期：" placeholder="" />
            <van-field v-model="no" clearable disabled label="所属区域：" placeholder="" />
            <van-field v-model="no" clearable disabled label="项目地址：" placeholder="" />
            <van-field v-model="no" clearable disabled label="工程日期：" placeholder="" />
            <van-field v-model="no" clearable disabled label="工程量估算：" placeholder="" />
            <van-field v-model="no" clearable disabled label="工程造价：" placeholder="" />
            <van-field v-model="no" clearable disabled label="预期利润：" placeholder="" />
            <van-field v-model="no" clearable disabled label="造价（大写）：" placeholder="" />
            <van-field v-model="no" clearable disabled label="项目类型：" placeholder="" />
            <van-field v-model="no" clearable disabled label="质量等级：" placeholder="" />
            <van-field v-model="no" clearable disabled label="项目跟踪人：" placeholder="" />
            <van-field v-model="no" clearable disabled label="所属分公司：" placeholder="" />
            <van-field v-model="no" clearable disabled label="项目状态：" placeholder="" />
            <br>
            <van-cell title="建设单位" class="title"/>
            <van-field v-model="no" clearable disabled label="建设单位：" placeholder="" />
            <van-field v-model="no" clearable disabled label="联系人：" placeholder="" />
            <van-field v-model="no" clearable disabled label="联系方式：" placeholder="" />
            <van-field v-model="no" clearable disabled label="联系地址：" placeholder="" />
            <br>
            <van-cell title="立项人基本资料" class="title"/>
            <van-field v-model="no" clearable disabled label="立项人：" placeholder="" />
            <van-field v-model="no" clearable disabled label="部门：" placeholder="" />
            <van-field v-model="no" clearable disabled label="联系电话：" placeholder="" />
            <van-field v-model="no" clearable disabled label="所属机构：" placeholder="" />
            <van-field v-model="no"
            rows="4"
                autosize
                type="textarea"
                show-word-limit
                clearable disabled label="备注：" placeholder="" />
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
