<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>请假申请表单</span>
      <span class="sub">提交</span>
    </div>
    <div>
        <van-cell-group>
            <van-field v-model="no" clearable label="申请编号：" placeholder="请输入申请编号"/>
            <van-field v-model="no" clearable label="申请对象：" placeholder="请输入申请对象"/>
            <van-field v-model="no" clearable label="所在部门：" placeholder="请输入所在部门"/>
            <van-field v-model="no" clearable label="所在岗位：" placeholder="请输入所在岗位"/>
            <br>
            <van-field v-model="no" clearable label="请假类型：" placeholder="请输入请假类型"/>
            <br>
            <van-field v-model="no" clearable label="开始时间：" placeholder="请输入开始时间"/>
            <van-field v-model="no" clearable label="结束时间：" placeholder="请输入结束时间"/>
            <br>
            <van-field v-model="no" clearable label="联系方式：" placeholder="请输入联系方式"/>
            <van-field v-model="no" clearable label="工作处理：" placeholder="请输入工作待处理人"/>
            <van-field
                v-model="message"
                rows="2"
                autosize
                label="请假事由："
                type="textarea"
                maxlength="50"
                placeholder="请输入请假事由"
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
    top: 56px;
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
