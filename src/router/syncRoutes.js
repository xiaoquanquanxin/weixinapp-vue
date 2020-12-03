import Page404 from '@/views/Page404.vue'
import Login from "@/views/Login.vue";
//	同步路由
export const syncRoutesList = [
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
        path: '*',
        redirect: '/404',
    }
];

