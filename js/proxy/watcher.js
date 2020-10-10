// watcher.js
import {Dep} from './observe'
// 订阅中心（观察者）： 给需要变化的那个元素 增加一个观察者， 当数据变化后，执行对应的方法
export default class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    // 先获取一下老值
    this.value = this.get()
  }
  get() { // 获取文本编译后的对应的数据
    // 获取当前订阅者
    Dep.target = this
    // 触发getter，当前订阅者添加订阅器中 在 劫持数据时，将订阅者放到订阅者数组
    let value = this.vm.$data[this.expr] || this.vm.$computed[this.expr].call(this.vm)
    // 重置订阅者
    Dep.target = null
    return value
  }
  // 对外暴露的方法
  update() {
    let newValue = this.vm.$data[this.expr] || this.vm.$computed[this.expr].call(this.vm)
    let oldValue = this.value
    // 更新的值 与 以前的值 进行比对， 如果发生变化就更新方法
    if(newValue !== oldValue) {
      this.cb(newValue)
    }
  }
}
