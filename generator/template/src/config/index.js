const mode = process.env.VUE_APP_MODE || 'online'

const hosts = {
  local: {
    host: 'http://localhost:3031/api'
  },
  test: {
    host: 'http://localhost:3031/api'
  },
  online: {
    host: 'http://localhost:3031/api'
  }
}

const settings = {
  intervalTime: 60,
  homeName: 'home', // 默认打开的首页的路由name值，默认为home
  loginName: 'login',
  version: '0.1.2'
}

// cookie对应domain
const domains = {
  local: '',
  dev: '',
  test: '',
  online: ''
}

const vuex_key = 'hugo-vuex'

const res = Object.assign(hosts[mode], settings, {mode: mode}, {domain: domains[mode]}, {vuex_key: vuex_key})
export default res
