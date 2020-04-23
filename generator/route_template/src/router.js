import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import base from './views/base.vue'
import empty from './views/empty.vue'

let routes = [] // 默认layout路由
let outRoutes = [] // 空白layout路由
let keyV = null
function importRoutes(r) {
  r.keys().forEach(key => {
    keyV = r(key).default
    switch (keyV.layout) {
      case 'base':
        routes = [
          ...routes,
          ...keyV.router
        ]
        break
      case 'empty':
        outRoutes = [
          ...outRoutes,
          ...keyV.router
        ]
        break
      default:
        break
    }
  })
}
importRoutes(require.context('./routes/modules', true, /index.js/))

Vue.use(Router)

const res = [
  {
    path: '/',
    component: empty,
    meta: {
      isLayout: true,
      title: '首页'
    },
    children: [
      ...outRoutes
    ]
  },
  {
    path: '/',
    component: base,
    meta: {
      // isBase: true,
      isLayout: true,
      title: '首页'
    },
    children: [
      ...routes,
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...res
  ]
})
