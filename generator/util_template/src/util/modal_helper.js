/* eslint-disable */
// 解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用
let _scrollTop
class ModalHelper {
  // popup 显示时调用
  static afterOpen () {
    _scrollTop = document.scrollingElement.scrollTop
    document.body.style.width = '100%'
    document.body.style.position = 'fixed'
    document.body.style.top = -_scrollTop + 'px'
  }

  // popup 关闭时调用
  static beforeClose () {
    document.body.style.position = ''
    document.body.style.top = ''
    // 使 scrollTop 恢复原状
    document.scrollingElement.scrollTop = _scrollTop
  }
}

export default ModalHelper