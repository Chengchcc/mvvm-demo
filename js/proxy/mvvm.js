// mvvm.js
import Compile from './compile'
import Observe from './observe'
export default class MVVM {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    this.$methods = options.methods
    this.$computed = options.computed
    this.$mounted = options.mounted
    // 如果有要编译的模板 =>编译
    if(this.$el) {
        const proxy = new Proxy(this, {
            get: (target, key, receiver)=> {
                return this[key] || this.$data[key] || this.$computed[key]
            },
            set: (target, key, value)=>{
                return Reflect.set(this.$data, key, value)
            }
        })
      this.$data =  new Observe(this.$data)
      // 将文本+元素模板进行编译
      new Compile(this.$el, proxy)
      proxy.$mounted && proxy.$mounted.call(proxy);
    }
  }
}