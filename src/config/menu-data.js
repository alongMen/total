export default [
  {
    name:'系统配置',
    path: 'system-setting',
    children:[
      {
        path: 'permission-manage',
        name: '权限管理',
        children:[
          
        ]
      },
      {
        name: '员工管理',
        path: 'staff-mamage',
        children: [
          {
            name: '角色管理',
            path: 'role-manage',
          },
          {
            name: '账号管理',
            path: 'account-manage',
          },
        ],
      },
    ]
  },
  {
    name:'商户管理',
    path: 'merchant',
    children:[
      {
        path: 'merchant-setting',
        name: '商户配置',
        children:[
          
        ]
      },
      {
        name:'IP管理',
        path: 'ip-setting',
      },
    ]
  },
  {
    name:'游戏管理',
    path: 'game',
    children:[
      {
        path: 'game-setting',
        name: '游戏配置',
        children:[
          
        ]
      },
      // {
      //   path: 'game-app',
      //   name: '游戏APP',
      //   children:[
          
      //   ]
      // },
      {
        path: 'game-platform',
        name: '游戏平台',
        children:[
          
        ]
      },
      // {
      //   path: 'game-type',
      //   name: '游戏类型',
      //   children:[
          
      //   ]
      // },
    ]
  },
];
