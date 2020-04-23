const path = require('path')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// uglifyjs-webpack-plugin 2.0版本的Release日志中，明确提示重新切换回到uglify-js，因为uglify-es被废弃了，如果需要ES6代码压缩，请使用terser-webpack-plugin
const TerserPlugin = require('terser-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const productionGzipExtensions = ['js', 'css']

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: 'production_dist',
  // pages:{ type:Object,Default:undfind }
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@p', resolve('packages'))
      .set('@s', resolve('src'))
      .set('@c', resolve('src/components'))
    if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
      // uglify一直有不支持es6的问题，改为使用terser-webpack-plugin(webpack 4.26后默认使用这个)
      config.optimization.minimizer([
        new TerserPlugin({
          parallel: true,
          sourceMap: false,
          terserOptions: {
            ecma: 6,
            warnings: false,
          },
        })
      ])
    }
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    // config.plugin('prefetch').tap(options => {
    //   // 只预加载provider(不生效)
    //   options[0].include = 'provider'
    //   // options[0].fileBlacklist = options[0].fileBlacklist || []
    //   // options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
    // config.plugin('html').tap((options) => {
    //   // eslint-disable-next-line
    //   options[0].inject = 'body'
    //   options[0].title = '测试一下'
    //   // more options: https://github.com/jantimon/html-webpack-plugin#minification
    //   return options
    // })
  },
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8,
      }))
    }
  },
  // webpack配置相关
  // cacheGroups: {
  //   vendors: {
  //     name: 'vendors',
  //     test: /[\\/]node_modules[\\/]/,
  //     chunks: 'all',
  //     priority: 2
  //   }
  // },
  css: {
    // css预设器配置项
    loaderOptions: {
      // pass options to sass-loader
      // sass: {
      //   // 引入全局变量样式,@使我们设置的别名,执行src目录
      //   data: `
      //       @import "@p/p/theme.scss";
      //   `
      // }
    },
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {}, // 为所有的 CSS 及其预处理文件开启 CSS Modules。

    modules: false
  },
  devServer: {
    // port: 5001, // 端口号
    // host: 'localhost',
    // https: false // https:{type:Boolean}
    // open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:3031' // 配置跨域处理,只有一个代理
    // proxy: {
    //   "/api": {
    //     target: "",
    //     ws: true,
    //     changeOrigin: true
    //   }
    // } // 配置多个代理
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // pluginOptions: {
  //   i18n: {
  //     locale: 'zh',
  //     fallbackLocale: 'zh',
  //     localeDir: 'locales',
  //     enableInSFC: false
  //   }
  // }
}
