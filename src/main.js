import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import showToast from 'my-showtoast';
Vue.config.productionTip = false;


Vue.use(showToast)

import axios from 'axios';

axios.interceptors.request.use(
  config => {
    config.headers.post['Content-Type'] = 'application/json';
    const Authorization = localStorage.getItem('auth');
    config.headers['Authorization'] = Authorization;
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
      const res = response.data;
      const {status} = res;
      //	正常接口
      if (status === 200 || status === 1000) {
          return Promise.resolve(res);
      }
      //未登录 未授权
      if (status === 401 || status === 403) {
          localStorage.clear();
          window.location.href = '/login';
      }
      return Promise.reject(new Error(res.msg || 'Error'));
  },
  (error) => {
      return Promise.reject(error);
  }
);
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
