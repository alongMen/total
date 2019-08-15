import Vue from 'vue';
import App from './App.vue';
import iview from 'iview';
import store from './store/index';
import 'iview/dist/styles/iview.css';
import './assets/common.less';
import router from './router/index';

import collapse from './components/collapse/index';

import { formatBeijingDate } from '@/utils/date-utils';
import { parsePrice } from '@/utils/parsePrice';

Vue.component(collapse.name, collapse);

Vue.config.productionTip = false;

Vue.use(iview);

Vue.prototype.formatBeijingDate = function(str) {
  return formatBeijingDate(str);
};
Vue.prototype.parsePrice = function(str) {
	return parsePrice(str);
}


router.beforeEach((to, from, next) => {
	if (!to.matched.some(record => record.meta.noAuth)) {
		if (localStorage.getItem('token')) {
			next();
		} else {
			next('/login');
		}
	} else {
		next();
	}
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
