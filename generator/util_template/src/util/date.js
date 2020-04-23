/**
 * 字符串相关处理模块
 */

let dateUtils = {
  /**
   * 格式化日期
   * @param date
   * @param formatStr
   * @return 格式化后的日期
   */
  formate_date(date, formatStr) {
    let str = formatStr
    let Week = ['日', '一', '二', '三', '四', '五', '六']

    str = str.replace(/yyyy|YYYY/, date.getFullYear())
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100))

    const mon = Number.parseInt(date.getMonth()) + 1
    str = str.replace(/MM/, mon > 9 ? mon.toString() : '0' + mon)
    str = str.replace(/M/g, mon)

    str = str.replace(/w|W/g, Week[date.getDay()])

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate())
    str = str.replace(/d|D/g, date.getDate())

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours())
    str = str.replace(/h|H/g, date.getHours())
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes())
    str = str.replace(/m/g, date.getMinutes())

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds())
    str = str.replace(/s|S/g, date.getSeconds())

    return str
  },
  /* 获取今天起始 00:00:00 */
  start_of_day (date) {
    let res = new Date(date)
    res.setHours(0)
    res.setMinutes(0)
    res.setSeconds(0)
    return res
  },
  /* 获取今天结束 23:59:59 */
  end_of_day (date) {
    let res = new Date(date)
    res.setHours(23)
    res.setMinutes(59)
    res.setSeconds(59)
    return res
  },
  /* 获取上一周 */
  last_week_day (date) {
    return count_day(date, -7)
  },
  /* 计算日期（x天前或x天后） */
  count_day (date, day) {
    //Date()返回当日的日期和时间。
    //getTime()返回 1970 年 1 月 1 日至今的毫秒数。
    let gettimes = date.getTime() + 1000 * 60 * 60 * 24 * day
    let newDate = new Date(gettimes)
    return newDate
  }
}

export default dateUtils
