import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css';
import 'amfe-flexible'
import 'amfe-flexible/index.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import './utils/flexible'

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
