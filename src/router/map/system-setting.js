export default {
  name: 'system-setting',
  path: 'system-setting',
  component: () => import('../../views/system-setting/index.vue'),
  children: [
    {
      path: 'permission-manage',
      name: 'permission-manage',
      component: () => import('../../views/system-setting/permission-manage/index.vue')
    },
    {
      name: 'staff-mamage',
      path: 'staff-mamage',
      component: () => import('@/views/system-setting/staff-manage/index'),
      children: [
        {
          name: 'role-manage',
          path: 'role-manage',
          component: () =>
            import('@/views/system-setting/staff-manage/role-manage/index'),
        },
        {
          name: 'account-manage',
          path: 'account-manage',
          component: () =>
            import('@/views/system-setting/staff-manage/account-manage/index'),
        },
      ],
    },
  ]
};
