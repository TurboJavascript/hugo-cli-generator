const fetchLine1 = `\nimport fetch from './apis/fetch/index.js';\n`
const fetchLine2 = `\nVue.prototype.$fetch = (optons, params, raw) => fetch(optons, params, raw)\n`

module.exports = (api, options, rootOptions) => {
  // 添加package.json依赖
  api.extendPackage({
    dependencies: {
      "axios": "^0.19.2",
      "js-cookie": "^2.2.1",
      "js-md5": "^0.7.3",
      "vuex": "^3.0.1",
      "vuex-persist": "^2.1.0"
    },
    scripts: {
      'serve:local': 'vue-cli-service serve --mode local',
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
  // 添加示例组件
  api.render('./template', {
    ...options,
  })
}