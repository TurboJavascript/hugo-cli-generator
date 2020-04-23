// bus.js
// 负责组件间通信（爷孙、兄弟等。）
// 事件格式为： {name: 'name', priority: '优先级', args: {}} 
import Vue from 'vue'
export default new Vue({
  data () {
    return {
      currentPriority: 1,
      eventHash: {}, // 存放每一等级的事件
      readyEvent: [] // 存放已准备好监听的事件
    }
  },
  methods: {
    /* 清空事件 */
    init_event () {
      this.eventHash = {}
      this.currentPriority = 1
    },
    /* 清空事件&初始化 */
    init_all () {
      this.readyEvent = []
      this.eventHash = {}
      this.currentPriority = 1
    },
    /* 处理事件 */
    deal_event (event) {
      // 所有事件都要写入对应优先级中，通过监听事件执行结果进行控制
      if (this.eventHash[event.priority]) {
        this.eventHash[event.priority].push(event)
      } else {
        this.eventHash[event.priority] = [event]
      }
      // console.log('bus接收event：', event)
      if (event.priority > this.currentPriority) {
        // 优先级较低
      } else {
        this.push_event(event)
        this.push_priority_event(this.currentPriority)
      }
    },
    /* 发布事件 */
    push_event (event, next = true) {
      if (!this.readyEvent.includes(event.name)) {
        // 没有对应事件监听的注册行为时，不发布事件
        return false
      }
      // console.log('bus发布event: ', event.name)
      this.$emit(event.name, event.args || {})
      // 将已发布事件从事件列表中剔除
      let priorityEvents = this.eventHash[event.priority]
      let index = priorityEvents.findIndex((eve) => {
        return eve.name === event.name
      })
      if (index >= 0) {
        priorityEvents.splice(index, 1)
      }
      if (next && event.priority === this.currentPriority) {
        // 当前优先级与传入优先级相同，则优先级递增，处理下一优先级事件
        this.currentPriority += 1
        this.push_priority_event(this.currentPriority)
      }
      // console.log(this.eventHash)
    },
    /* 页面事件监听注册完毕（准备完毕，可以接收事件 */
    event_listen_ready (event) {
      this.readyEvent.push(event.name)
      // console.log(event.name + '事件监听注册完毕，开始推送事件')
      // 发布之前所有高优先级事件
      for (let i = 1; i < this.currentPriority;i++) {
        this.push_priority_event(i)
      }
    },
    /* 批量发布事件（不递归） */
    push_events (events) {
      if (events && events.length > 0) {
        for (let event of events) {
          this.push_event(event)
          // if (this.readyEvent.includes(event.name)) {
          //   // 没有对应事件监听的注册行为时，不发布事件
          //   this.$emit(event.name, event.args || {})
          // }
        }
      }
    },
    /* 发布某个优先级下所有事件 */
    push_priority_event (priority) {
      // const priorities = Object.keys(this.eventHash)
      // for (let i of priorities) {
      //   if (Number(i) === priority) {
          
      //   }
      // }
      let events = this.eventHash[priority]
      this.push_events(events)
      // 该优先级为当前优先级且有事件，则优先级递增
      if (Number(priority) === this.currentPriority && events && events.length > 0) {
        this.currentPriority += 1
        this.push_priority_event(this.currentPriority)
      }
      // this.eventHash[priority] = []
    }
  },
  created () {
    this.init_all()
  },
  destroyed () {
    this.init_all()
  }
})
