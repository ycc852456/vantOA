import Vue from 'vue';
import Router from 'vue-router';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from "../store/store";
import * as types from '../store/types';

Vue.use(Router);

const routes = [
  {
    path: '/home',
    name: 'home',
    meta:{
      requireAuth:true   //添加这个字段 表明进入这个路由需要登陆
    },
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login.vue')
  },
  {
    path: '*',
    name: 'login',
    meta:{
      requireAuth:true   //添加这个字段 表明进入这个路由需要登陆
    },
    component: ()=>import('../views/login.vue')
  },
];

//页面刷新是，重新赋值token
if(window.localStorage.getItem('token')){
  store.commit(types.LOGIN,window.localStorage.getItem('token'));
}

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next)=>{
  if(to.matched.some( r => r.meta.requireAuth )){
    if(store.state.token){
      next();
    }else{
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next();
  }
});
export default router;

