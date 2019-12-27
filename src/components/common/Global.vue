<script>
// 线上
// const serverSrc = 'http://www.dahengzh.com:8080/oa/';

// 测试  李zhen
// const serverSrc='http://192.168.0.108:8080/dhjs_web/';

// 测试 张关权
// const serverSrc = "http://192.168.0.155:8080/dhjs_web/";
// 测试 刘广
//const serverSrc = "http://192.168.0.128:8080/dhjs_web/";

 const serverSrc = "http://mypc:8080/dhjs_web/";

const hasEnter = false;
const updateBool = { update: false, app: false };
const versionName = "1.0.3";
const versionCode = "1";
const userId = "000";
export default {
  serverSrc, // 服务器地址
  hasEnter, // 用户登录状态
  updateBool, // 是否更新
  versionName, // 版本号
  versionCode, // 版本
  userId //登录用户的id
};
</script>
