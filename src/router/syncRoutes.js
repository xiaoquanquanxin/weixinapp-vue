import Page404 from '@/views/Page404.vue'
import Login from "@/views/Login.vue";
import PayIndex from "@/views/payment/PayIndex.vue";
import PaymentList from "@/views/payment/PaymentList.vue";
import ConfirmPayment from "@/views/payment/ConfirmPayment.vue";
import PaySuccess from "@/views/PaySuccess.vue";
import OrderDetail from "@/views/order/OrderDetail.vue";
import Prepayment from "@/views/prepay/Prepayment.vue";
//	同步路由
export const syncRoutesList = [
  {
    path: '*',
    redirect: '/PayIndex',
  },
  {
    path: '/404',
    name: '404',
    component: Page404,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/PayIndex',
    name: 'PayIndex',
    component: PayIndex,

  },
  {
    path: '/PaymentList',
    name: 'PaymentList',
    component: PaymentList,
    children: [
      {
        path: 'Paid-in',
        name: 'Paid-in',
        component: () => import(/* webpackChunkName: "inventory" */ '@/views/payment/Paid-in'),
      },
      {
        path: 'Paid-out',
        name: 'Paid-out',
        component: () => import(/* webpackChunkName: "purchaseOrder" */ '@/views/payment/Paid-out'),
      }]

  },

  {
    path: '/ConfirmPayment',
    name: 'ConfirmPayment',
    component: ConfirmPayment,

  },
  {
    path: '/PaySuccess',
    name: 'PaySuccess',
    component: PaySuccess,

  },
  {
    path: '/OrderDetail',
    name: 'OrderDetail',
    component: OrderDetail,

  },
  {
    path: '/Prepayment',
    name: 'Prepayment',
    component: Prepayment,

  },
];

