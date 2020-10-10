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
      let self = this
      // init data
      Object.keys(this.$data).forEach(function(key) {
          self.proxyKeys(key);
      })
      // init computed
      Object.keys(this.$computed).forEach(function(key){
          self.proxyComputed(key)
      })
      new Observe(this.$data)
      // 将文本+元素模板进行编译
      new Compile(this.$el, this)
      this.$mounted && this.$mounted.call(this);
    }
  }
  proxyKeys(key) {
      let self = this;
      Object.defineProperty(this, key, {
          enumerable: false,
          configurable: true,
          get: function getter () {
              return self.$data[key];
          },
          set: function setter (newVal) {
              self.$data[key] = newVal;
          }
      });
  }
  proxyComputed(key){
    let self = this;
      Object.defineProperty(this, key, {
          enumerable: false,
          configurable: true,
          get: function getter () {
              return self.$computed[key].call(self);
          },
      });
  }
}