/*
  供应商模块路由
*/
import routerHelper from '../../index'

const router = [
  {
    path: 'provider',
    meta: {
      isLayout: true,
      title: '供应商'
    },
    component: routerHelper.loadView('providers', 'provider', 'index'),
    children: [
      {
        name: 'provider_list',
        path: 'list',
        component: routerHelper.loadView('providers', 'provider', 'list'),
        meta: {
          title: '供应商列表'
        }
      }
    ]
  }
]

export default router