import Vue from 'vue'
import VueRouter from 'vue-router'
// const page_index= ()=>{import('../views/index')};
const page_index=() => import('../views/index');
Vue.use(VueRouter);

  const routes = [
    { path:'/', redirect:'/home',  },
    {
      path:'/home',
      name:'home',
      component:page_index
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
