/*
  配置中心总路由
*/
import routerHelper from '../../index'
const routes = routerHelper.importRoutes(require.context('./', true, /\.js$/))

const router = [
  {
    path: 'providers',
    meta: {
      isLayout: true,
      title: '供应商库'
    },
    component: routerHelper.loadView('providers', 'index'),
    children: [
      ...routes
    ]
  }
]

const layout = 'base'

export default {
  router,
  layout
}