<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>印章申请表单</span>
      <span class="sub">提交</span>
    </div>
    <div>
        <van-cell-group>
            <van-field v-model="no" clearable label="申请对象：" placeholder="请输入申请编号"/>
            <van-field v-model="no" clearable label="申请部门：" placeholder="请输入申请部门"/>
            <br>
            <br>
            <van-field v-model="no" clearable label="申请日期：" placeholder="请输入申请日期"/>
            <br>
            <van-field
                v-model="message"
                rows="3"
                autosize
                label="使用内容说明："
                type="textarea"
                maxlength="50"
                placeholder="请输入使用内容说明"
                show-word-limit
            />
            <van-field
                v-model="message"
                rows="3"
                autosize
                label="印章证照说明："
                type="textarea"
                maxlength="50"
                placeholder="请输入印章证照说明"
                show-word-limit
            />
        </van-cell-group>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      no: '',
      message: ''
    }
  },
  created () {},
  beforeMount () {},
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
    position: fixed;
    top:56px;
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
}
</style>
