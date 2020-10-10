// observe.js
export default class Observe {
  constructor(data) {
    this.dep = new Dep()
    for(let key in data){
      data[key] = this.observe(data[key])
    }
    return this.proxy(data)
  }
  // 把data数据原有的属性改成 get 和 set方法的形式
  observe(data) {
    if(!data || typeof data!== 'object') {
      return data
    }
    return new Observe(data)
  }
  proxy(data){
    let dep = this.dep
    return new Proxy(data, {
      get: (target, prop, receiver) =>{
        if(Dep.target){
          dep.addSub(Dep.target)
        }
        return Reflect.get(target,prop,receiver)
      },
      set: (target, prop, value)=>{
        const result = Reflect.set(target, prop, this.observe(value))
        dep.notify()
        return result
      }
    })
  }
}



// 消息订阅器Dep，订阅器Dep主要负责收集订阅者，然后再属性变化的时候执行对应订阅者的更新函数
export class Dep {
  subs = []
  /**
   * [订阅器添加订阅者]
   * @param  {[Watcher]} sub [订阅者]
   */
  addSub(sub){
    this.subs.push(sub)
  }
  // 通知订阅者数据变更
  notify(){
    this.subs.forEach(sub=>{
      sub.update()
    })
  }
}
Dep.target = null;