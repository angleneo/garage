import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
      path: '/Home',
      component: resolve => require(['../pages/homepage/Home.vue'], resolve),
      children: [
        {
          path: '/Home',
          name: '首页',
          component: resolve => require(['../pages/homepage/management.vue'], resolve)
        },
        {
          path: '/Home/settlement',
          name: '结算',
          component: resolve => require(['../pages/homepage/settlement.vue'], resolve)
        },
        {
          path: '/Home/repairshop',
          name: '门店信息',
          component: resolve => require(['../pages/homepage/repairshop.vue'], resolve)
        },
        {
          path: '/Home/billing',
          name: '开单',
          component: resolve => require(['../pages/billingpage/billing.vue'], resolve)
        },
        {
          path: '/Home/worklist',
          name: '工单管理',
          component: resolve => require(['../pages/workorderpage/worklist.vue'], resolve)
        },
        {
          path: '/Home/worklist/workupdate',
          name: '工单编辑',
          component: resolve => require(['../pages/workorderpage/workupdate.vue'], resolve)
        },
        {
          path: '/Home/vehiclelist',
          name: '车辆管理',
          component: resolve => require(['../pages/vehiclemanagementpage/vehiclelist.vue'], resolve)
        },
        {
          path: '/Home/vehiclelist/addvehicle',
          name: '添加车辆',
          component: resolve => require(['../pages/vehiclemanagementpage/addvehicle.vue'], resolve)
        },
        {
          path: '/Home/vehiclelist/vehicledetail',
          name: '车辆详情',
          component: resolve => require(['../pages/vehiclemanagementpage/vehicledetail.vue'], resolve)
        },
        {
          path: '/Home/accessory',
          name: '配件管理',
          component: resolve => require(['../pages/accessory/accessory.vue'], resolve)
        },
        {
          path: '/Home/accessory/addaccess',
          name: '添加配件',
          component: resolve => require(['../pages/accessory/addaccess.vue'], resolve)
        },
        {
          path: '/Home/purchasing',
          name: '采购管理',
          component: resolve => require(['../pages/purchasing/purchasing.vue'], resolve)
        },
        {
          path: '/Home/purchasing/purchasedetail',
          name: '采购单详情',
          component: resolve => require(['../pages/purchasing/purchasedetail.vue'], resolve)
        },
        {
          path: '/Home/purchasing/newpurchase',
          name: '新建采购单',
          component: resolve => require(['../pages/purchasing/newpurchase.vue'], resolve)
        },
        {
          path: '/Home/supplier',
          name: '供应商管理',
          component: resolve => require(['../pages/supplier/supplier.vue'], resolve)
        },
        {
          path: '/Home/supplier/addvendor',
          name: '添加供应商',
          component: resolve => require(['../pages/supplier/addvendor.vue'], resolve)
        }
      ]
    }
  ]
})
