import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRouter from 'vue-router';
import './plugins/vant.js'
//树形
import Vuetree from 'vue-simple-tree'
Vue.use(Vuetree);
//font-awesome 字体图标
import 'font-awesome/css/font-awesome.css'
// 自适应

import 'lib-flexible/flexible'
// 解决300ms延迟
import FastClick from 'fastclick'
//时间处理
import moment from 'moment'
Vue.prototype.$moment = moment
moment.locale('zh-cn');
// MD5加密
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

// 字体图标
import './assets/fonts/iconfont.css'
// token 域名 切换
import global_ from './components/common/Global.vue'

import axios from 'axios'
// 连接超时 
axios.defaults.timeout = 10000
    //登录拦截
axios.interceptors.request.use(config => {
    //console.log(config);
    let token = window.localStorage.getItem('token')
    config.headers.token = token == null ? '' : token;
    return config
})
axios.interceptors.response.use(response => {
    if (!response.data.status && response.data.code != null && response.data.code == "need-login") {
        router.replace({
            path: '/login',
        })
        Toast('登录失效');
    }
    return response;
});
Vue.prototype.$http = axios

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
import 'url-search-params-polyfill'
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.GLOBA = global_
    // 百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
    ak: 'dCkIZZ92XGySSARRAqZuqPT4N8TLlZ4F'
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')