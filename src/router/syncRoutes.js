import Login from "@/views/Login.vue";
import PayIndex from "@/views/PayIndex.vue";
import PaymentList from "@/views/payment/PaymentList.vue";
import ConfirmPayment from "@/views/payment/ConfirmPayment.vue";
import PaySuccess from "@/views/PaySuccess.vue";
import OrderDetail from "@/views/order/OrderDetail.vue";
import Prepayment from "@/views/prepay/Prepayment.vue";
import ConfirmPrepay from "@/views/prepay/ConfirmPrepay.vue";
import PaymentRecords from "@/views/PaymentRecords.vue";
import kesu from "@/views/kesu/kesuList.vue";
//	同步路由
export const syncRoutesList = [
  {
    path: '*',
    redirect: '/wechat-pay/PayIndex',
  },
  {
    path: '/wechat-pay/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/wechat-pay/PayIndex',
    name: 'PayIndex',
    component: PayIndex,
  },
  {
    path: '/wechat-pay/PaymentList',
    name: 'PaymentList',
    component: PaymentList,
  },

  {
    path: '/wechat-pay/ConfirmPayment',
    name: 'ConfirmPayment',
    component: ConfirmPayment,

  },
  {
    path: '/wechat-pay/PaySuccess',
    name: 'PaySuccess',
    component: PaySuccess,

  },
  {
    path: '/wechat-pay/OrderDetail',
    name: 'OrderDetail',
    component: OrderDetail,

  },
  {
    path: '/wechat-pay/Prepayment',
    name: 'Prepayment',
    component: Prepayment,

  },
  {
    path: '/wechat-pay/ConfirmPrepay',
    name: 'ConfirmPrepay',
    component: ConfirmPrepay,

  },
  {
    path: '/wechat-pay/PaymentRecords',
    name: 'PaymentRecords',
    component: PaymentRecords,
  },
  {
    path: '/wechat-pay/kesu',
    name: 'kesu',
    component: kesu,
  },
];

