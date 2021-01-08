import Vue from 'vue'
import VueRouter from 'vue-router'
import {syncRoutesList} from "@/router/syncRoutes"

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'hash',
    routes: syncRoutesList
});
router.beforeEach(async (to, from, next) => {
	//	微信config、wx config
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1)
    });
    next();
});
export default router;
