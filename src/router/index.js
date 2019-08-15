import Router from 'vue-router';

import Vue from 'vue';
import system_setting from './map/system-setting'
import merchant from './map/merchant'
import game from './map/game'
Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      redirect:{name:'permission-manage'},
      component: () => import('@/views/index.vue'),
      children: [system_setting,merchant,game],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index'),
      meta:{noAuth:true},
      children:[]
    }
  ],
});
