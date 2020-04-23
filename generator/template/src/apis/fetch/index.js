/**
 */
// 接口调用 业务相关
import config from '../../../config'
import Fetch from './fetch'
import bus from '../../util/bus'
// 正常返回
const successResponseJson = (responseJson) => {
  if (responseJson.code === -3) {
    // 登录过期或未登录
    bus.$emit('logout')
  } else if (responseJson.code === -999){
  } else if (responseJson.code === 2200) {
    bus.$emit('jump_no_permission')
  }
  return responseJson
}
// 后台未处理返回 400之类的,错误统一处理
const failResponseJson = (status, responseJson) => {
  if (status === '401' || status === 401) {
  }  else if (responseJson.name === 'RepeatRequestError') {
    // console.log(responseJson)
    return {code: -333, message: '错误编号：-333', msg: 'RepeatRequest'}
    // throw responseJson.message
  } else if (responseJson.name === 'RepeatResponseError') {
    return {code: -334, message: '错误编号：-334', msg: 'RepeatResponse'}
    // throw responseJson.message
  } else if (status === 'cancle') {
    return {code: -222, message: '错误编号：-222', msg: 'CancelRequest'}
  } else {
    console.log(responseJson)
    return {code: -888, message: '错误编号：500', msg: 'UnknownError'}
    // throw new Error('调用接口错误')
  }
}

// 业务默认参数
const defaultOptions = {
  request_method: 'post', // 默认post请求
  use_host: 'host'
  // use_session: true // 默认使用session
}

export default async(options, params = {}, rawResult = null) => {
  let fetch = new Fetch()
  let outOptions = options
  for (let key in defaultOptions) {
    if (options[key] === undefined || options[key] === null) {
      outOptions[key] = defaultOptions[key]
    }
  }
  let url = outOptions['path'] // 接口路径
  const hostName = outOptions['use_host'] // 接口域名name
  const host = config[hostName] || 'host'
  url = `${host}/${url}`
  const type = outOptions.request_method
  let result = await fetch.request(type, url, params, outOptions)
  if (rawResult) {
    rawResult = Object.assign(rawResult, result)
  }
  if (result.status === true) {
    return successResponseJson(result.data)
  } else {
    return failResponseJson(result.status, result.data)
  }
}