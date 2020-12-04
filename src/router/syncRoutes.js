import Page404 from '@/views/Page404.vue'
import Login from "@/views/Login.vue";
import PayIndex from "@/views/payment/PayIndex.vue";
import Payment from "@/views/payment/Payment.vue";
import PaymentList from "@/views/payment/PaymentList.vue";
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
        path: '/Payment',
        name: 'Payment',
        component: Payment,

    },
    {
        path: '/PaymentList',
        name: 'PaymentList',
        component: PaymentList,
        children: [
            {
                path: 'paid-in',
                name: 'paid-in',
                component: () => import(/* webpackChunkName: "inventory" */ '@/views/payment/paid-in'),
            },
            {
                path: 'paid-out',
                name: 'paid-out',
                component: () => import(/* webpackChunkName: "purchaseOrder" */ '@/views/payment/paid-out'),
            }]

    },
];

