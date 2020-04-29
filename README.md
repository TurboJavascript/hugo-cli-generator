## 介绍

## 参考
https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#service-%E6%8F%92%E4%BB%B6
https://juejin.im/post/5cb59c4bf265da03a743e979

## 安装方式
只能在装了vue-cli(3.0以上版本)的环境中使用
通过`vue add vue-cli-plugin-hugo-generator`或`vue invoke vue-cli-plugin-hugo-generator`安装（需要在项目根目录）

## 生成的项目目录结构
### vue.config.js
```
项目配置（打包、loader等处理）
```
### src
#### apis 接口相关
##### fetch 接口封装（基于axios)
```
index.js 封装接口请求, 业务逻辑相关
```
此处统一处理了返回状态码（res.code）小于0的情况和后端返回404、500等情况，前端页面只需处理正常返回且返回码为0以上的返回
```
fetch.js 封装接口请求，请求相关处理
http.js  接口请求拦截，用于处理重复请求等情况
```
##### modules 各模块接口相关参数配置
#### config 配置相关
```
index.js host配置等
```
#### mixins 聚合
```
如CurrentUser.vue 用户相关、LoginStep.vue 登录流程管理
```
#### locales 国际化（中英文等）
#### package 通用封装组件(基本组件)
```
与业务解耦，如封装通用弹框组件
```
#### components 业务封装组件
```
```
#### assets
图片、css文件等静态资源
#### routers
路由
##### modules
存放每个模块的相关js
index.js是每个模块的路由js的入口，需要在该文件中引入该模块下的其他路由文件（自动引入）
##### index.js
路由相关方法封装
#### test
测试相关（数据&接口拦截）
#### util
封装js，如数据结构相关js、字符串对象封装方法等
#### views
页面vue文件
结构按 menu/module/path.vue这个格式，即菜单（最大模块，如配置中心）/模块（如组织结构)/具体路径文件
**在view上的都会在路由上注册，不在路由上注册的vue文件放在component或者package中**
每个menu或者每个module都会有个index.vue，用于设置该模块的layout和执行该模块的一些初始化方法，路由设置时也在对应的路由模块目录上添加index.js，详细设置参考已有的modules/settings/index.js
#### store 状态机
##### modules
存放每个模块的状态机
```
base.js    各模块通用、基础的状态机
```
##### index.js
该文件中引入各个模块状态机（自动引入）
#### App.vue
#### main.js
项目入口文件
#### router.js
路由入口文件