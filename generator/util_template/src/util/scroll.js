/* 滚动加载 */
const util = {
  /* 监听滚动触底 */
  on_touch_bottom (element, distance = 10, callback) {
    if (!element || (element.clientHeight === undefined || element.clientHeight === null)) {
      console.log('element not found')
      return false
    }
    let onscroll = element.onscroll
    element.onscroll = ((event) => {
      if (onscroll) {
        onscroll()
      }
      if (this.touch_bottom(element, distance)) {
        callback()
      }
    })
  },
  /* 
    滚动触底
    @params: element 传入DOM元素，distance 距离底部多少距离（px）算触底，默认10px
  */
  touch_bottom (element, distance = 10) { 
    if (!element || !element.clientHeight) {
      return false
    }
    if (element.clientHeight + Number(element.scrollTop) >= element.scrollHeight - distance) {
      return true
    } else {
      return false
    }
  },
  /* 滚动触顶 */
  touch_top (element) {}
}

export default util