module.exports = [
  {
    name: `addRoute`,
    type: 'confirm',
    message: '是否添加路由配置(默认添加）？',
    default: true,
  },
  {
    name: `addUtil`,
    type: 'confirm',
    message: '是否添加通用util(默认添加）？',
    default: true,
  },
  {
    name: `addStore`,
    type: 'confirm',
    message: '是否添加状态管理配置(默认添加）？',
    default: true,
  }
]