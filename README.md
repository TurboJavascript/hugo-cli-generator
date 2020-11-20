# vue-cli-plugin-hugo-generator

## 介绍

一个前端项目脚手架

## 参考文档

https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#service-%E6%8F%92%E4%BB%B6

https://juejin.im/post/5cb59c4bf265da03a743e979

## 安装方式

只能在装了vue-cli(3.0以上版本)的环境中使用

通过`vue add vue-cli-plugin-hugo-generator`或`vue invoke vue-cli-plugin-hugo-generator`安装（需要在项目根目录）

## 生成的项目目录结构

+ apis 后端接口
  + fetch
    + fetch.js 发送和接收请求，与业务无关
    + http.js 拦截请求，判断请求是否合法
    + index.js 业务相关，如设置请求域名、方法，处理通用请求返回
  + modules 具体接口模块
    + setting 配置中心
      + auth 组织结构相关接口
+ asset 静态资源
  + 使用SASS，尽量scope
+ componets 组件
+ config 项目具体host配置
+ mixins
+ routes 路由
  + modules
    + setting 配置中心
      + auth 组织结构相关路由
+ views 页面vue文件,结构按 menu/module/path.vue这个格式，即菜单（最大模块，如配置中心）/模块（如组织结构)/具体路径文件**在view上的都会在路由上注册，不在路由上注册的vue文件放在components或者packages中**
+ store 状态机
+ util 工具  
  + bus、tree、date（日期）、faye-client(订阅消息)、localstorgae(储存)、string(字符串)、scroll(滚动条)...
+ route.js 路由配置入口
+ main.js  全局配置入口
+ store.js 状态关联入口
