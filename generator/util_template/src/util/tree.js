/**
 * 树结构
 * 用于 初始化多层级节点
 * @author  hugo
 */
/* eslint-disable */

import Atom from './atom.js'

class Tree {
  constructor () {
    this.root = 0
    this.atoms = []
    this.init_status = false
    this.max_depth = null
  }

  // 传入数组，初始化树
  // 数组结构,example:
  // [{
  //   value: 1,
  //   name: 'xxx',
  //   obj_parent_id: 'xx',
  //   params_key: 'xx',
  //   items: [{}],
  //   children_ids: [{}]
  // }]
  initTree (data, maxDepth = null) {
    if (!data || !(data instanceof Array)) {
      return false
    }
    // 根据数据初始化树
    let _this = this
    // 初始化根节点
    let root = new Atom({
      id: 0,
      type: 'root_key',
      depth: 1,
      name: 'root',
      label: 'root',
      parent_atom_id: 0,
      obj_parent_id: 0,
      r_id: 0,
      options: {},
      expand: true,
      status: 0,
      display: 1,
      siblings: [],
      children_ids: [],
      ancestors_ids: [],
      root: 0,
      status_children: {0: 0, 1: 0}
    })
    _this.root = root
    _this.atoms = [root]
    _this.max_depth = maxDepth
    _this.appendChildrenAtoms(0, 0, 1, data)
    _this.setAncestorsStatus()
    _this.init_status = true
    return _this
  }

  // 递归添加children atoms
  appendChildrenAtoms (parentAtomId, parentId, depth, data) {
    let _this = this
    let _groups = []
    if (_this.atoms[parentAtomId] && data && (!_this.max_depth || _this.max_depth > depth)) {
      for (let v of data) {
        const type = v.key ? v.key : v.name
        const name = v.label ? v.label : v.name
        let _atom = _this.__appendAtom(type, name, depth + 1, parentAtomId, parentId, v.value || v.id, v)
        _groups.push(_atom.id)
        // 给双亲添加子节点
        _this.atoms[parentAtomId].children_ids.push(_atom.id)
        _this.atoms[parentAtomId].children.push(_atom)
        _this.atoms[parentAtomId].status_children[0]++
        // 递归
        // if (v.items) {
        //   v.children = v.items
        // }
        if (v.children && v.children.length > 0) {
          _this.appendChildrenAtoms(_atom.id, _atom.r_id, _atom.depth, v.children)
        }
        // 设置祖先节点
        _this.initAtomAncestors(_atom.id)
      }
      // 处理兄弟节点
      let _groupsA = _groups.slice(0)
      for (let i in _groups) {
        _groupsA.splice(i, 1)
        _this.atoms[_groups[i]].siblings = _groupsA
      }
    }
  }

  // 添加节点方法
  __appendAtom (type, name, depth, parentAtomId, parentId, rId, options = {}, status = 0, expand = true, display = 1) {
    let _this = this
    let atom = new Atom({
      id: _this.atoms.length,
      type: type,
      depth: depth,
      name: name,
      label: options.title ? options.title : name,
      parent_atom_id: parentAtomId,
      obj_parent_id: parentId,
      r_id: rId,
      options: options,
      siblings: [],
      children_ids: [],
      ancestors_ids: [parentAtomId],
      root: 0,
      display: display,
      expand: expand,
      status: status,
      status_children: {0: 0, 1: 0}
    })
    this.atoms.push(atom)
    return atom
  }

  // 取所有状态为 x 的节点
  getAtomsByStatus (status) {
    let _this = this
    let result = []
    for (let a of _this.atoms) {
      if (a.status === status) {
        result.push(a)
      }
    }
    return result
  }

  // 取所有 type 为 x 的节点
  getAtomsByType (type) {
    let _this = this
    let result = []
    for (let a of _this.atoms) {
      if (a.type === type) {
        result.push(a)
      }
    }
    return result
  }

  // 根据id批量设置节点状态
  setAtomsStatusById (ids, status) {
    let _this = this
    if (!ids || !(ids instanceof Array)) {
      return false
    }
    for (let id of ids) {
      // _this.atoms[id].status = status
      _this.setAtomStatus(id, status, false)
    }
  }

  // 根据atom批量设置节点状态
  setAtomsStatusByAtom (atoms, status) {
    if (!atoms || !(atoms instanceof Array)) {
      return false
    }
    for (let atom of atoms) {
      this.setAtomStatusByAtom(atom, status, false)
      // atom.status = status
    }
  }

  // 批量设置节点状态, 数组类型, 传入修改节点的type
  setAtomsStatus (data, status, type = null) {
    let _this = this
    if (!data || !(data instanceof Array)) {
      return false
    }
    // 遍历设置节点状态
    for (let i of data) {
      for (let j in _this.atoms) {
        if (i.value === _this.atoms[j].r_id && _this.atoms[j].type === (type || i.key)) {
          // _this.atoms[j].status = status
          _this.setAtomStatus(j, status, false)
          break
        }
      }
    }
  }

  // 设置节点的 display 属性
  setAtomDisplay (value, _atom) {
    // 如果被设置为显示，那么父类也要被设置为显示
    if (value === 1) {
      _atom.ancestors_ids.forEach((item, index) => {
        this.atoms[item].display = value
        this.atoms[item].expand = true
      })
    } else {
      _atom.display = 0
      _atom.expand = false
    }
  }

  // 批量设置节点状态, 数组类型, 传入修改节点的type
  setAtomsStatusByRids (ids, status, type) {
    let _this = this
    if (!ids || !(ids instanceof Array)) {
      return false
    }
    // 遍历设置节点状态
    for (let i of ids) {
      for (let j in _this.atoms) {
        if (i === _this.atoms[j].r_id && _this.atoms[j].type === type) {
          // _this.atoms[j].status = status
          _this.setAtomStatus(j, status, false)
          break
        }
      }
    }
  }

  // 设置节点状态,所有对节点的状态都需要通过这个方法
  // withChildren为true时，孩子节点都设为同一状态
  setAtomStatus (id, status, withChildren = false) {
    if (this.atoms[id].status === status) {
      return false
    }
    let _this = this
    _this.atoms[id].status = status
    let decStatus = status === 1 ? 0 : 1
    let parentAtomId = this.atoms[id].parent_atom_id
    _this.atoms[parentAtomId].status_children[status] = _this.atoms[parentAtomId].status_children[status] + 1
    _this.atoms[parentAtomId].status_children[decStatus] = _this.atoms[parentAtomId].status_children[decStatus] - 1
    if (withChildren) {
      _this.setChildrenStatus(id, status)
    }
  }

  // 传入atom对象设置节点状态
  setAtomStatusByAtom (atom, status, withChildren = false) {
    let _this = this
    atom.status = status
    let parentAtomId = atom.parent_atom_id
    _this.atoms[parentAtomId].status_children[status]++
    _this.atoms[parentAtomId].status_children[status === 1 ? 0 : 1]--
    if (withChildren) {
      _this.setChildrenStatus(atom.id, status)
    }
  }

  // 设置子节点，孙子节点...的状态
  setChildrenStatusRecursive (id, status) {
    let _this = this
    if (_this.atoms[id] && _this.atoms[id].children_ids && _this.atoms[id].children_ids.length > 0) {
      for (let i of _this.atoms[id].children_ids) {
        // _this.atoms[i].status = status
        // 递归设置
        _this.setChildrenStatusRecursive(i, status)
      }
    }
  }

  // 设置子节点状态（不递归）
  setChildrenStatus (id, status) {
    let _this = this
    if (_this.atoms[id] && _this.atoms[id].children_ids && _this.atoms[id].children_ids.length > 0) {
      for (let i of _this.atoms[id].children_ids) {
        // _this.atoms[i].status = status
        _this.setAtomStatus(i, status, false)
      }
    }
  }

  // 设置某个节点状态(某个节点的子节点状态相同时，该节点的状态变为与子状态相同)
  // 设置节点状态时，考虑父节点（向上递归） --> 暂时不做递归
  setStatusWithParent (id, status) {
    let _this = this
    // _this.atoms[id].status = status
    _this.setAtomStatus(id, status, false)
    let paretnAtomId = _this.atoms[id].parent_atom_id
    let statusCount = 0
    if (_this.atoms[paretnAtomId] && _this.atoms[paretnAtomId].children_ids) {
      for (let i of _this.atoms[paretnAtomId].children_ids) {
        if (_this.atoms[i].status === status) {
          statusCount++
        }
      }
    }
    if (statusCount !== 0 && statusCount === _this.atoms[paretnAtomId].children_ids.length) {
      // _this.atoms[paretnAtomId].status = status
      _this.setAtomStatus(paretnAtomId, status, false)
    }
  }

  // // 初始化每个节点的祖先
  // __initAtomsAncestors () {
  //   let _atoms = _this.atoms
  // }

  // 初始化某个节点的祖先
  initAtomAncestors (id) {
    let _atom = this.atoms[id]
    let i = _atom.parent_atom_id
    let _this = this
    // 防止脏数据导致无限循环
    let max = 10
    while (_this.atoms[i].depth !== 1 && max > 0) {
      _atom.ancestors_ids.push(i)
      i = _this.atoms[i].parent_atom_id
      max--
    }
  }

  // 判断孩子节点的状态是否都为某一个值
  childrenStatusIsSame (id, status) {
    let count = 0
    let _this = this
    let _atom = this.atoms[id]
    for (let i of _atom.children_ids) {
      if (_this.atoms[i].status === status) {
        count++
      }
    }
    return count === _atom.children_ids.length
  }

  // 设置祖先节点状态
  setAncestorsStatus (id, status) {
    let _this = this
    if (_this.atoms[id] && _this.atoms[id].ancestors_ids && _this.atoms[id].ancestors_ids.length > 0) {
      for (let i of _this.atoms[id].ancestors_ids) {
        _this.setAtomStatus(i, status, false)
      }
    }
  }

  // 返回双亲节点
  getParentAtom (parentAtomId) {
    return this.atoms[parentAtomId]
  }

  // 根据节点的r_id，depth返回节点
  getAtomByRid (rId, depth) {
    let atom
    for (let i of this.atoms) {
      if (i.r_id === rId && i.depth === depth) {
        atom = i
        break
      }
    }
    return atom
  }

  // 根据双亲节点的r_id返回双亲节点atomid
  getParentAtomByRid (rId, depth) {
    let atom
    for (let i of this.atoms) {
      if (i.r_id === rId && i.depth === depth - 1) {
        atom = i
        break
      }
    }
    return atom
  }

  // 根据双亲节点的r_id返回双亲节点atomid
  getParentAtomByRidType (rId, type) {
    let atom
    for (let i of this.atoms) {
      if (i.r_id === rId && i.type === type) {
        atom = i
        break
      }
    }
    return atom
  }

  // 根据label 关键字（多个空格区分）搜索对应节点
  // 对应节点&对应节点的祖先display设为1, expand 为 true (即展开)，其他设为0 设置为 0 的 expand 为 false （即不展开）
  // 允许只搜索某一层级
  searchAtomByLabelExpand (label, depth) {
    if (!label || label === '') {
      for(let item of this.atoms) {
        item.show_label = item.label
        item.display = 1
        item.expand = true
      }
      return 0
    }
    let querieArray = label.trim().replace(/\s+/g, ' ').split(' ')
    let searchResultCount = 0
    // 搜索某一层级
    for(let item of this.atoms) {
      // 循环设置是否显示当前节点，首先默认显示，如果当前节点不是要搜索的节点，这设置集体属性
      // 使用 setAtomDisplay 方法设置的属性，如果显示的话，会将其父节点也显示出来
      // 显示就展开 不显示不展开
      item.display = 1
      item.show_label = item.label
      let matchLabelArray = this.labelMatchArray(item.label, querieArray)
      if ((depth && depth !== item.depth) || matchLabelArray.length !== querieArray.length) {
        this.setAtomDisplay(0, item)
      } else {
        searchResultCount++
        for(let i = 0 ; i < matchLabelArray.length; i++) {
          let matched = "<span class='search-active'>" + matchLabelArray[i][0] + '</span>'
          if (i === 0) {
            item.show_label = item.label.replace(matchLabelArray[i][1], matched)
          } else {
            item.show_label = item.show_label.replace(matchLabelArray[i][1], matched)
          }
        }
        this.setAtomDisplay(1, item)
      }
    }
    return searchResultCount
  }

  labelMatchArray (data, labelArray) {
    let matchLabel = []
    if (labelArray.constructor !== Array) {
      return ''
    }
    for (let label of labelArray) {
      let searchReg = new RegExp(label, 'g')
      if (data.match(searchReg)) {
        matchLabel.push([label, searchReg])
      }
    }
    return matchLabel
  }

  // 根据label搜索对应节点
  // 对应节点&对应节点的祖先display设为1，其他设为0
  // 允许只搜索某一层级
  searchAtomByLabel (label, depth) {
    if (!label || label === '') {
      for(let item of this.atoms) {
        item.show_label = item.label
        item.display = 1
      }
      return 0
    }
    let searchResultCount = 0
    // 搜索某一层级
    let searchReg = new RegExp(label, 'g')
    let matched = "<span class='search-active'>" + label + '</span>'
    for(let item of this.atoms) {
      // 循环设置是否显示当前节点，首先默认显示，如果当前节点不是要搜索的节点，这设置集体属性
      // 使用 setAtomDisplay 方法设置的属性，如果显示的话，会将其父节点也显示出来
      item.display = 1
      item.show_label = item.label
      if ((depth && depth !== item.depth) || !item.label.match(label)) {
        this.setAtomDisplay(0, item)
      } else {
        searchResultCount++
        item.show_label = item.label.replace(searchReg, matched)
        this.setAtomDisplay(1, item)
      }
    }
    return searchResultCount
  }
}

export default Tree
