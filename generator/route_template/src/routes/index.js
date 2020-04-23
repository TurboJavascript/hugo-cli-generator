/*
  路由通用
*/

const routerHelper = {
  /*
    引入路由对应view文件
  */
  loadView (menu, module, path) {
    if (module === 'index' || !path) {
      return () => import(/* webpackChunkName: "chunk-[request]" */ `@/views/${menu}/${module}.vue`)
    } else {
      return () => import(/* webpackChunkName: "chunk-[request]" */ `@/views/${menu}/${module}/${path}.vue`)
    }
  },
  
  /*
    批量引入路由
  */
  importRoutes (r) {
    let routes = []
    r.keys().forEach(key => {
      if (key !== './index.js') {
        routes = [
          ...r(key).default,
          ...routes
        ]
      } // 不引入index.js
    })
    return routes
  }

}

export default routerHelper