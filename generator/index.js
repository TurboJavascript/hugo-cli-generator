const fetchLine1 = `\nimport fetch from './apis/fetch/index.js'\n`
const fetchLine2 = `\nVue.prototype.$fetch = (optons, params, raw) => fetch(optons, params, raw)\n`

module.exports = (api, options, rootOptions) => {
  // 添加package.json依赖
  api.extendPackage({
    dependencies: {
      "axios": "^0.19.2",
      "js-cookie": "^2.2.1",
      "js-md5": "^0.7.3"
    },
    devdepencies: {
      "terser-webpack-plugin": "^2.1.0",
      "compression-webpack-plugin": "^3.0.0",
    },
    scripts: {
      'serve:local': 'vue-cli-service serve --mode local',
      'serve:test': 'vue-cli-service serve --mode test',
      'build:local': 'vue-cli-service build --mode local',
      'build:tes': 'vue-cli-service build --mode tes',
      'build:online': 'vue-cli-service build --mode online'
    },
  })
  // 修改src/main.js，添加引入
  api.onCreateComplete(() => {
    const fs = require('fs');
    const mainPath = api.resolve('./src/main.js');
    // 获取内容
    let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g).reverse()
    // 注入import
    const lastImportIndex = lines.findIndex(line => line.match(/^import/))
    lines[lastImportIndex] += fetchLine1 + fetchLine2
    // 修改应用
    contentMain = lines.reverse().join('\n')
    fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' })
  })
  // 往项目加入自定义文件
  // 默认文件的添加
  if (options['addBase']) {
    api.render('./template', {
      ...options,
    })
  }
  // 添加路由配置
  if (options['addRoute']) {
    const routeLine = `\nimport router from './router'\n`
    const routeVueLine = `\n\b\brouter,\n`
    // 修改src/main.js，添加引入router.js
    api.onCreateComplete(() => {
      const fs = require('fs');
      const mainPath = api.resolve('./src/main.js');
      // 获取内容
      let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' })
      const lines = contentMain.split(/\r?\n/g).reverse()
      // 注入import
      const lastImportIndex = lines.findIndex(line => line.match(/^import/))
      lines[lastImportIndex] += routeLine
      // 往new Vue中注入
      const newVueIndex = lines.findIndex(line => line.match(/^new Vue/))
      lines[newVueIndex] += routeVueLine
      // 修改应用
      contentMain = lines.reverse().join('\n')
      fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' })
    })
    // 往项目加入自定义路由相关文件
    api.render('./route_template', {
      ...options,
    })
  }
  // 添加通用util
  if (options['addUtil']) {
    // 往项目加入自定义util相关文件
    api.render('./util_template', {
      ...options,
    })
  }
  // 添加store
  if (options['addStore']) {
    api.extendPackage({
      dependencies: {
        "vuex": "^3.0.1",
        "vuex-persist": "^2.1.0"
      },
    })
    // 往项目加入自定义store相关文件
    api.render('./store_template', {
      ...options,
    })
    const routeLine = `\nimport store from './store'\n`
    const routeVueLine = `\n\b\bstore,\n`
    // 修改src/main.js，添加引入router.js
    api.onCreateComplete(() => {
      const fs = require('fs');
      const mainPath = api.resolve('./src/main.js');
      // 获取内容
      let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' })
      const lines = contentMain.split(/\r?\n/g).reverse()
      // 注入import
      const lastImportIndex = lines.findIndex(line => line.match(/^import/))
      lines[lastImportIndex] += routeLine
      // 往new Vue中注入
      const newVueIndex = lines.findIndex(line => line.match(/^new Vue/))
      lines[newVueIndex] += routeVueLine
      // 修改应用
      contentMain = lines.reverse().join('\n')
      fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' })
    })
  }
  // 添加eslint
  if (options['addEslint']) {
    // 往项目加入自定义store相关文件
    api.render('./eslint_template', {
      ...options,
    })
  }
}