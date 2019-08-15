export default {
  name: 'game',
  path: 'game',
  component: () => import('../../views/game/index.vue'),
  children: [
    {
      path: 'game-type',
      name: 'game-type',
      component: () => import('../../views/game/game-type/index.vue')
    },
    {
      path: 'game-app',
      name: 'game-app',
      component: () => import('../../views/game/game-app/index.vue')
    },
    {
      path: 'game-platform',
      name: 'game-platform',
      component: () => import('../../views/game/game-platform/index.vue')
    },
    {
      path: 'game-setting',
      name: 'game-setting',
      component: () => import('../../views/game/game/index.vue')
    },
  ]
};
