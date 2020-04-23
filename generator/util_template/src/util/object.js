const util = {
  deep_copy (target) { 
    let copyedObjs = [];//此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象 
    
    return this._deep_copy(target, copyedObjs);
  },

  _deep_copy (target, copyedObjs) { 
    if((typeof target !== 'object')||!target){return target;}
    for(let i= 0 ;i<copyedObjs.length;i++){
      if(copyedObjs[i].target === target){
        return copyedObjs[i].copyTarget;
      }
    }
    let obj = {};
    if(Array.isArray(target)){
      obj = [];//处理target是数组的情况 
    }
    copyedObjs.push({target:target,copyTarget:obj}) 
    Object.keys(target).forEach(key=>{ 
      if(obj[key]){ return;} 
      obj[key] = this._deep_copy(target[key], copyedObjs);
    }); 
    return obj
  },
  // 将后台中的 options 数据格式转换成前端中下拉框中的数据格式
  selectDataChange (sourceData, value = 'value', label = 'label') {
    let selectDataList = []
    sourceData.forEach(option => {
      let element = {}
      element[value] = option[1]
      element[label] = option[0]
      selectDataList.push(element)
    })
    return selectDataList
  },
  /* 判断是否为空 */
  is_present (data) {
    if (data instanceof Array) {
      return data.length > 0
    } else if (data instanceof Object) {
      return Object.keys(data).length > 0
    } else {
      return data ? true : false
    }
  }
}

export default util