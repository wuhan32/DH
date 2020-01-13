import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index/index.vue'
import Login from './views/login/login.vue'
import Home from './views/index/home.vue'
import Information from './views/index/information.vue'
import Mail from './views/index/mail.vue'
import Msg from './views/index/msg.vue'
import Info from './views/index/info.vue'
import User from './views/index/user.vue'
//帮助类
import Alipaypayment from './components/common/Alipaypayment.vue'

// 餐饮
import Catering from './components/home/catering/catering.vue'
import TakeFood from './components/home/catering/takeFood.vue'
import OrderFrom from './components/home/catering/orderForm.vue'
import BeginOrder from './components/home/catering/beginOrder.vue'
import Menu from './components/home/catering/menu.vue'
import OrderFormInfo from './components/home/catering/orderFormInfo.vue'
import PayInfo from './components/home/catering/payInfo.vue'

// 我的
import ClockIngIndex from './components/user/clocking/clockingIndex' // 打卡
import Clock from './components/user/clocking/clock.vue' // 打卡 --打卡
import ClockIng from './components/user/clocking/clocking' // 打卡 --查询

import LogList from './components/user/log/logList.vue' //个人日志  --  个人日志列表
import LogForm from './components/user/log/logForm.vue' //个人日志  --  个人日志-表单
import LogInfo from './components/user/log/logInfo.vue' //个人日志  --  个人日志--日志详情

import UpdateApp from './components/user/updateApp' // 软件更新
import Userinfo from './components/user/userInfo' // 个人信息

// 行政办公
import Oalist from './components/home/oa/oa/oaList' // 行政办公
import CarApplyList from './components/home/oa/oa/carmanage/carApplyList' // 车辆申请
import CarApplyInfo from './components/home/oa/oa/carmanage/carApplyInfo' // 车辆申请工单（详情）
import Carfrom from './components/home/oa/oa/carmanage/carform' // 车辆申请表单

import Carassignfrom from './components/home/oa/oa/carmanage/carAssignform' // 车辆分派表单
import Message from './components/home/oa/oa/message' // 信息发布

//项目管理
import pmList from './components/home/pm/pmList' //项目管理
import initiateForm from './components/home/pm/initiateForm' //项目立项

import incomeContractList from './components/home/pm/incomeContract/incomeContractList' //项目管理-收入合同
import incomeContractForm from './components/home/pm/incomeContract/incomeContractForm' //项目管理-收入合同--收入合同
import contractPaymentForm from './components/home/pm/incomeContract/contractPaymentForm' //项目管理-收入合同--合同收款
import progressPaymentDeclarationForm from './components/home/pm/incomeContract/progressPaymentDeclarationForm' //项目管理-收入合同--进度款申报
import completionAndSettlementForm from './components/home/pm/incomeContract/completionAndSettlementForm' //项目管理-收入合同--完工结算
import changeOfIncomeContractForm from './components/home/pm/incomeContract/changeOfIncomeContractForm' //项目管理-收入合同--收入合同变更签证


import Actionrequired from './components/home/oa/actionrequired/actionRequiredList' // 个人事务
import TasksList from './components/home/oa/actionrequired/formList/tasksList' // 待办事务--列表
import ApprovalForm from './components/home/oa/actionrequired/formList/approvalForm' //提交审批
import HastasksList from './components/home/oa/actionrequired/formList/hastasksList' // 已办事务--列表
import MydraftList from './components/home/oa/actionrequired/formList/mydraftList' // 我的草稿--列表
import MyprocessList from './components/home/oa/actionrequired/formList/myprocessList' // 我的流程--列表
import CommonForm from './components/home/oa/actionrequired/formInfo/commonForm/commonForm.vue' // 我的流程--列表

import TasksInfo from './components/home/oa/actionrequired/formInfo/tasksInfo' // 待办事务--详情
import VehicleAf from './components/home/oa/actionrequired/formInfo/commonForm/vehicleAf.vue' //车辆申请详情
import LeaveAf from './components/home/oa/actionrequired/formInfo/commonForm/leaveAf.vue' //请假申请详情
import WorkAf from './components/home/oa/actionrequired/formInfo/commonForm/workAf.vue' //办公申请详情

import Workorder from './components/home/oa/workorder/workorderList' // 工单
import Askforleaveform from './components/home/oa/workorder/askForLeaveForm' // 请假表单
import Purchaseapplyform from './components/home/oa/workorder/purchaseapplyForm' // 请假表单
import Gooutform from './components/home/oa/workorder/gooutForm' // 外出表单
import Sealform from './components/home/oa/workorder/sealForm' // 印章表单

import ChattingRecords from './components/msg/chattingRecords.vue' //聊天记录
import PersonalInfo from './components/mail/personalInfo.vue' // 个人信息



//import Camera from './views/login/camera.vue'
import { log } from 'util'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'index',
            redirect: '/home',
            component: Index,
            children: [{
                    path: '/home',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/information',
                    name: 'Information',
                    component: Information
                },
                {
                    path: '/mail',
                    name: 'mail',
                    component: Mail
                },
                {
                    path: '/msg',
                    name: 'msg',
                    component: Msg
                },
                {
                    path: '/user',
                    name: 'user',
                    component: User
                }

            ]
        },
        {
            path: '/info',
            name: 'info',
            component: Info
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        // 取餐
        {
            path: '/catering',
            name: 'catering',
            component: Catering

        },

        // 我的

        {
            path: '/clockingindex',
            name: 'clockingindex',
            component: ClockIngIndex, // 我的--打卡
            redirect: '/clock',
            children: [{
                    path: '/clock',
                    name: 'clock',
                    component: Clock // 我的--打卡--打卡
                },
                {
                    path: '/clocking',
                    name: 'clocking',
                    component: ClockIng // 我的--打卡-查询
                }
            ]
        },
        {
            path: '/logList',
            name: 'logList',
            component: LogList // 我的--个人日志-列表
        },
        {
            path: '/logForm',
            name: 'logForm',
            component: LogForm // 我的--个人日志-填写
        },
        {
            path: '/logInfo',
            name: 'logInfo',
            component: LogInfo // 我的--个人日志-日志详情
        },
        {
            path: '/updateapp',
            name: 'updateapp',
            component: UpdateApp // 我的--软件更新
        },
        {
            path: '/userinfo',
            name: 'userinfo',
            component: Userinfo // 我的--个人信息
        },
        // 行政办公
        {
            path: '/oalist',
            name: 'oalist',
            component: Oalist // 行政办公
        },
        {
            path: '/message',
            name: 'message',
            component: Message // 行政办公-信息发布
        },
        {
            path: '/carapplylist',
            name: 'carapplylist',
            component: CarApplyList // 行政办公--车辆申请列表
        },
        {
            path: '/carapplyInfo',
            name: 'carapplyInfo',
            component: CarApplyInfo // 行政办公--车辆申请工单
        },
        {
            path: '/carfrom',
            name: 'carfrom',
            component: Carfrom // 行政办公--车辆申请工单
        },
        {
            path: '/carassignform',
            name: 'carassignform',
            component: Carassignfrom // 行政办公--车辆分派表单
        },
        {
            path: '/actionrequired',
            name: 'actionrequired',
            component: Actionrequired // 个人事务
        },
        {
            path: '/taskList',
            name: 'taskList',
            component: TasksList // 个人事务 -- 待办事务
        },
        {
            path: '/tasksInfo',
            name: 'tasksInfo',
            component: TasksInfo // 个人事务 -- 待办事务 --详情
        },
        {
            path: '/approvalForm',
            name: 'ApprovalForm',
            component: ApprovalForm //提交申请表单
        },
        {
            path: '/hastasksList',
            name: 'hastasksList',
            component: HastasksList // 个人事务 -- 已办事务 --列表
        },
        {
            path: '/mydraftList',
            name: 'mydraftList',
            component: MydraftList // 个人事务 -- 我的草稿 --列表
        },
        {
            path: '/myprocessList',
            name: 'myprocessList',
            component: MyprocessList // 个人事务 -- 我的流程 --列表
        },
        {
            path: '/commonForm',
            name: 'commonForm',
            component: CommonForm,
            children: [{
                    path: '/vehicleapplyrecord/processToForm',
                    name: 'vehicleAf',
                    component: VehicleAf
                },
                {
                    path: '/vacationapply/processToForm',
                    name: 'leaveAf',
                    component: LeaveAf
                },
                {
                    path: '/purchaseapply/processToForm',
                    name: 'workAf',
                    component: WorkAf
                }
            ]
        },
        {
            path: '/workorder',
            name: 'workorder',
            component: Workorder // 工单
        },
        {
            path: '/askforleaveform',
            name: 'askforleaveform',
            component: Askforleaveform // 工单-请假表单
        },
        {
            path: '/purchaseapplyform',
            name: 'purchaseapplyform',
            component: Purchaseapplyform // 工单-办公用品表单
        },
        {
            path: '/gooutform',
            name: 'gooutform',
            component: Gooutform // 工单-外出表单
        },
        {
            path: '/sealform',
            name: 'sealform',
            component: Sealform // 工单-印章表单
        },
        //项目管理
        {
            path: '/pmList',
            name: 'pmList',
            component: pmList // 项目管理
        },
        {
            path: '/initiateForm',
            name: 'initiateForm',
            component: initiateForm // 项目管理-项目立项
        },
        {
            path: '/incomeContractList',
            name: 'incomeContractList',
            component: incomeContractList // 项目管理-收入合同
        }, {
            path: '/incomeContractForm',
            name: 'incomeContractForm',
            component: incomeContractForm // 项目管理-收入合同-收入合同
        },
        {
            path: '/contractPaymentForm',
            name: 'contractPaymentForm',
            component: contractPaymentForm // 项目管理-收入合同-合同收款
        },
        {
            path: '/progressPaymentDeclarationForm',
            name: 'progressPaymentDeclarationForm',
            component: progressPaymentDeclarationForm // 项目管理-收入合同-进度款申报
        },
        {
            path: '/completionAndSettlementForm',
            name: 'completionAndSettlementForm',
            component: completionAndSettlementForm // 项目管理-收入合同-完工结算
        },
        {
            path: '/changeOfIncomeContractForm',
            name: 'changeOfIncomeContractForm',
            component: changeOfIncomeContractForm // 项目管理-收入合同-收入合同变更签证
        },

        // 取餐码
        {
            path: '/takeFood',
            name: 'TakeFood',
            component: TakeFood
        },
        // 订单
        {
            path: '/orderFrom',
            name: 'OrderFrom',
            component: OrderFrom
        },
        // 订单详情
        {
            path: '/orderFormInfo',
            name: 'OrderFormInfo',
            component: OrderFormInfo
        },
        // 开始点餐
        {
            path: '/beginOrder',
            name: 'BeginOrder',
            component: BeginOrder
        },
        // 菜单页
        {
            path: '/menu',
            name: 'Ment',
            component: Menu
        },
        // 结算中心
        {
            path: '/payInfo',
            name: 'PayInfo',
            component: PayInfo
        },
        //帮助类

        {
            path: '/Alipaypayment',
            name: 'Alipaypayment',
            component: Alipaypayment
        },
        {
            path: '/chattingRecords/:userId',
            name: 'ChattingRecords',
            component: ChattingRecords
        },
        {
            path: '/personalInfo/:userId',
            name: 'PersonalInfo',
            component: PersonalInfo
        },
        // {
        //     path: '/camera',
        //     component: Camera
        // }
    ],
    mode: 'history'

})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
        // 获取token  
    const token = window.localStorage.getItem('token')
    if (!token) return next('/login')
    next()
})

export default router;