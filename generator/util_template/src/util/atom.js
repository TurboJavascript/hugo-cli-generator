/**
 * 树结构
 * 用于 初始化多层级节点
 * @author  hugo
 * @author  sherlock.ma
 */
class Atom {

  constructor (args) {
    this.id = args.id // 节点的id
    this.type = args.type
    this.depth = args.depth || 1 // 层级，depth
    this.name = args.name
    this.label = args.label || args.name
    this.show_label = args.label || args.name
    this.parent_atom_id = args.parent_atom_id || 0 // parent在树中的位置
    this.obj_parent_id = args.obj_parent_id // 层级结构中的parent_id
    this.r_id = args.r_id // 数据真正的id
    this.options = args.options // 存放传入其他参数
    this.siblings = args.siblings || [] // 兄弟atom数组
    this.siblings_ids = args.siblings_ids || [] // 兄弟
    this.children = args.children || [] // 孩子atom数组
    this.children_ids = args.children_ids || [] // 孩子id数组
    this.extend_tree = args.extend_tree || {} // 拓展树
    this.ancestors = args.ancestors || [] // 祖先atom数组
    this.ancestors_ids = args.ancestors_ids || [] // 祖先
    this.root = args.root
    this.display = 1 // 用于判断节点是否被显示(TODO: 将来要合并到 status 中)
    this.expand = args.expand // 用于判断节点是否展开其子节点(TODO: 将来要合并到下方的 status 中)
    this.status = 0 // 用于判断节点状态（如选中状态或取消选中)
    this.status_children = args.status_children || {} // 用于存放子节点中每个状态下的子节点个数
  }
}

export default Atom
