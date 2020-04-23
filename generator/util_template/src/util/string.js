/**
 * 字符串相关处理模块
 */

let StringUtils = {
  /**
   * 去除所有空格
   * @param str
   */
  trimAll (str) {
    if (str === undefined || str === null) {
      return ''
    }
    return str.replace(/\s+/g, '')
  },
  /**
   * 去除两头的空格
   * @param str
   */
  trim (str) {
    if (this.isBlank(str)) {
      return ''
    }
    return str.replace(/^\s+|\s+$/g, '')
  },
  /**
   * 去除左边的空格
   * @param str
   * @return {*}
   */
  ltrim (str) {
    if (this.isBlank(str)) {
      return ''
    }
    return str.replace(/^\s*/, '')
  },
  /**
   * 去除右边的空格
   * @param str
   * @return {*}
   */
  rtrim (str) {
    if (this.isBlank(str)) {
      return ''
    }
    return str.replace(/(\s*$)/g, '')
  },
  /**
   * 判断字符串是否为空
   * @param str
   * @return {boolean}
   */
  isBlank (str) {
    if (str === undefined || str === null || this.trimAll(String(str)) === '') {
      return true
    }
    return false
  },
  /**
   * 判断字符串是否超过len个字节
   * @param str
   * @param len
   * @return {boolean}
   */
  overLen (str, len) {
    if (!len || !(typeof(len) === 'number') || this.isBlank(str)) {
      return false
    }
    // 中文字占三个字节，其他占两个字节。
    // 把中文字替换成两个字母。然后计算长度
    let _str = str.replace(/[^\u4e00-\u9fa5]/g, '2')
    _str = _str.replace(/[\u4e00-\u9fa5]/g, '3')
    return _str.split('').reduce((i, j) => {return Number(i) + Number(j)}) > len
  },

  /**
   * 截取超过len个字符串
   * @param str
   * @param len
   * @return {boolean}
   */
  cutStr (str, len) {
    if (!len || !(typeof(len) === 'number') || this.isBlank(str)) {
      return str
    }
    let  result = ''
    let strlen = str.length // 字符串长度
    let chrlen = str.replace(/[^\x00-\xff]/g,'**').length; // 字节长度

    if(chrlen <= len){return str}
    for (let i=0,j=0; i < strlen; i++) {
      let chr = str.charAt(i)
      if(/[\x00-\xff]/.test(chr)){
        j++ // ascii码为0-255，一个字符就是一个字节的长度
      }else{
        j+=2 // ascii码为0-255以外，一个字符就是两个字节的长度
      }
      if(j <= len){ // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
        result += chr
      }else{ // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
        return result
      }
    }
  },
  /* 填写数字 */
  check_number (value,f) {
    let pat = /^-?[0-9]\d*\.?\d*$/
    // let cc = /^[^\d.]+$/g
    let cc = /[^\d\.]/g
    return value.replace(cc, '')
  }
}

export default StringUtils
