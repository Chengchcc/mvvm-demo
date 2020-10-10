# MVVM简单实现

## 一. 什么是MVVM
MVVM是Model-View-ViewModel的简写。它本质上就是MVC 的改进版。MVVM 就是将其中的View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。
![mvvm模式](https://camo.githubusercontent.com/4f0e34047a9061118084dfe5bfe098fe3be83e39/687474703a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f333138353730392d623931333863313539613938363532322e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

### 双向绑定原理
![mvvm原理](https://segmentfault.com/img/bVbpmyP?w=640&h=342)

vue数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的。 我们已经知道实现数据的双向绑定，首先要对数据进行劫持监听，所以我们需要设置一个监听器Observer，用来监听所有属性。如果属性发上变化了，就需要告诉订阅者Watcher看是否需要更新。因为订阅者是有很多个，所以我们需要有一个消息订阅器Dep来专门收集这些订阅者，然后在监听器Observer和订阅者Watcher之间进行统一管理的。接着，我们还需要有一个指令解析器Compile，对每个节点元素进行扫描和解析，将相关指令（如v-model，v-on）对应初始化成一个订阅者Watcher，并替换模板数据或者绑定相应的函数，此时当订阅者Watcher接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。因此接下去我们执行以下3个步骤，实现数据的双向绑定：
1.  实现compile,进行模板的编译，包括编译元素（指令）、编译文本等，达到初始化视图的目的，并且还需要绑定好更新函数；
2. 实现Observe,监听所有的数据，并对变化数据发布通知；
3. 实现watcher,作为一个中枢，接收到observe发来的通知，并执行compile中相应的更新方法。
4. 结合上述方法，向外暴露mvvm方法。

#### 两种双向绑定的比较
||基于Object.defineProperty|基于Proxy|
|-|-|-|
|特点|通过Object.definePorperty劫持对象属性的getter和setter<br>|直接监听对象而非属性返回的是个新的对象|
|缺陷|无法监听数组的变化，需要hack数组的原生方法实现|兼容性问题|



## DEMO
```bash
# 基于Object.defineProperty
> npm run start
# 基于 proxy
> npm run start:proxy
```