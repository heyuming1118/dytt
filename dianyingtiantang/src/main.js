import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/font/iconfont.css'
import Vant from 'vant';
import 'vant/lib/index.css';

import axios from 'axios'
Vue.prototype.axios = axios;

Vue.filter("setWH",(url,arg)=>{
  return url.replace(/w\.h/,arg)
});

import Scroller from './components/Scroller';
Vue.component('Scroller',Scroller)

import Loading from './components/Loding'
Vue.component('Loading',Loading)

Vue.config.productionTip = false
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
