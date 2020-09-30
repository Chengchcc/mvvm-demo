// observe.js
export default class Observe {
  constructor(data) {
    this.observe(data)
  }
  // 把data数据原有的属性改成 get 和 set方法的形式
  observe(data) {
    if(!data || typeof data!== 'object') {
      return
    }
    console.log(data)
    // 将数据一一劫持
    // 先获取到data的key和value
    Object.keys(data).forEach((key) => {
      // 数据劫持
      this.defineReactive(data, key, data[key])
      this.observe(data[key]) // 深度递归劫持，保证子属性的值也会被劫持
    })
  }
  // 定义响应式
  defineReactive(obj, key, value) {
    let _this = this
    let dep = new Dep()
    console.log('handler:', key)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() { // 当取值时调用
        if (Dep.target) {
          // 在这里添加一个订阅者
          console.log(Dep.target)
          dep.addSub(Dep.target);
        }
        return value
      },
      set(newValue) { //当data属性中设置新值得时候 更改获取的新值
        if(newValue !== value) {
          console.log('监听到值变化了,旧值：', value, ' --> 新值：', newValue);
          _this.observe(newValue) // 如果是对象继续劫持
          value = newValue
          dep.notify()
        }
      }
    })
  }
}



// 消息订阅器Dep，订阅器Dep主要负责收集订阅者，然后再属性变化的时候执行对应订阅者的更新函数
export function Dep () {
    this.subs = [];
}
Dep.prototype = {
  /**
   * [订阅器添加订阅者]
   * @param  {[Watcher]} sub [订阅者]
   */
    addSub: function(sub) {
        this.subs.push(sub);
    },
  // 通知订阅者数据变更
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
Dep.target = null;