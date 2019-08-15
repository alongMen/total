export default {
  name: 'merchant',
  path: 'merchant',
  component: () => import('../../views/merchant/index.vue'),
  children: [
    {
      path: 'merchant-setting',
      name: 'merchant-setting',
      component: () => import('../../views/merchant/merchant-setting/index.vue')
    },
    {
      path: 'ip-setting',
      name: 'ip-setting',
      component: () => import('../../views/merchant/ip-setting/index.vue')
    }
  ]
};
