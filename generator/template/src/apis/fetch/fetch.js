/**
 * 封装接口请求，初始化参数
 * @author  hugo
 */
import config from '../../../config'
import axios from './http'
import axios1 from 'axios'
import Cookies from 'js-cookie'
import LocalStorage from '@/util/localstorage.js'
let crypto = require('crypto')

class Fetch {
  // 处理传到后台参数(通用)
  dealParams(params, needles = {}) {
    let param = params
    param['visit_info'] = {
      ver: config.version || '0.0.1', // 前端版本
      // lan: sto.get('i18n', 'zh'), // 中英文
      from_genre: 'default'
    }

    param['session_id'] = Cookies.get(`${config.mode}_${config.project_name}_auth`)
    return param
  }

  getHeaders(needles={}){
    let _headers = {
      // 'Content-Type': 'application/json;charset=utf-8',
      // 'Access-Control-Allow-Origin': '*',
      'Accept': '*',
    }
    // if (!needles.without_session) {
    //   _headers['Authorization'] = Cookies.get(`${config.mode}_auth`')
    // }
    _headers['Authorization'] = Cookies.get(`${config.mode}_pi_auth`)
    return _headers
  }

  // 发起请求
  async request(type, url, params, needles = {}) {
    let _this = this
    // _this.mock() // 使用mock
    const param = this.dealParams(params, needles)
    try {
      let requestH = {
        method: type,
        url: url,
        canRepeat: needles.canRepeat || false, // 处理重复请求
        cancelToken: axios1.CancelToken.source().token, // 取消请求
        headers: this.getHeaders(needles),
        responseType: needles.responseType || 'json'
      }
      // post和get的传参不一样
      if (type === 'post') {
        requestH.data = param
      } else {
        requestH.params = param
      }
      // axios.axios.defaults.withCredentials = true
      const cacheKey = param.cacheKey
      let data = this.storage(url, cacheKey)
      if (needles.useCache && data) {
        return _this.dealSuccessResponse({data: data, code: 10000})
      } else {
        let res = await axios.axios(requestH)
        if (res.data.code >= 10000 && needles.useCache) {
          this.setStorage(url, res.data, cacheKey, param.cacheAge)
        }
        return _this.dealSuccessResponse(res)
      }
    } catch (e) {
      return _this.dealFailResponse(e)
    }
  }

  // 使用mock
  mock() {
    // require('@/test/mock/login.js')
    // require('@/test/mock/event.js')
  }

  /* 
    设置缓存
    @params url
    @params data
    @params cacheKey 缓存的key，没设置则取url生成
    @params age 过期时间，默认30分钟，单位为毫秒
  */
  setStorage (url, data, cacheKey, age = 30 * 60 * 1000) {
    let key = null
    if (cacheKey) {
      key = cacheKey
    } else {
      let urlDel = url.replace(/.*localhost.*?\//, '').replace(/.*\.com\//, '').replace(/\?.*/, '') // eslint-disable-line
      key = urlDel.split('/').join('_')
    }
    let localstorage = new LocalStorage()
    localstorage.setAge(age)
    localstorage.set(key, data)
  }

  // 使用缓存
  storage (url, cacheKey) {
    // TODO
    let key = null
    if (cacheKey) {
      key = cacheKey
    } else {
      let urlDel = url.replace(/.*localhost.*?\//, '').replace(/.*\.com\//, '').replace(/\?.*/, '') // eslint-disable-line
      key = urlDel.split('/').join('_')
    }
    let localstorage = new LocalStorage()
    let ress = localstorage.get(key)
    return ress
  }

  // 解密
  encrypt (text) {
    if (!text) {
      return ''
    }
    let algorithm = 'aes-256-ctr'
    let password = '12345678123456781234567812345678'
    let piv = '1234567890123456'
    try {
      let cipher = crypto.createDecipheriv(algorithm, password, piv)
      let crypted = cipher.update(text, 'base64', 'utf8')
      crypted += cipher.final('utf8')
      return crypted
    } catch (e) {
      // console.log(e)
    }
  }

  // 处理返回的正常请求
  dealSuccessResponse(res) {
    let data = res.data
    if (data.data) {
      // 解密数据
      // data.data = JSON.parse(this.encrypt(data.data))
    }
    return { status: true, data: data, headers: res.headers }
  }

  // 处理异常返回
  dealFailResponse(error) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data }
    } else {
      return { status: 405, data: error }
    }
  }
}

export default Fetch
