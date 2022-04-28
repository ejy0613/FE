# Vue

> vue相关知识复习，仅进行记录总结，形式（笔记 + 代码 + xmind）

## Vue使用

### 1.vue基本使用

#### computed 和 watch

+ computed有缓存，data不变则不会重新计算，提高运算性能
+ watch如何深度监听？watch默认浅监听，只会监听表层，如说想要设置深度监听，可以设置handler(){}, deep: true
+ watch监听引用类型，拿不到oldVal，因为指针相同，此时已经指向了新的val

#### 条件渲染

+ v-if 和 v-else的用法  
  可以使用变量，也可以使用 === 表达式
+ **v-if 和 v-show 的区别？**  
  v-if 不会渲染dom节点，v-show会正常渲染，但是设置为display: none。v-show 有更高的初始渲染消耗，v-if 有更高的切换消耗
+ **v-if 和 v-show 的使用场景？**  
  频繁切换显示和隐藏的使用 v-show， 其他使用v-if

#### 循环渲染

+ 如何遍历对象？也可以使用 v-for
+ key的重要性。  
  是每一个vnode的唯一id，也是diff的一种优化策略，可以根据key，更准确，更快的找到对应的vnode节点
+ v-for 和 v-if 不能一起使用

#### 事件

+ event参数，自定义参数
+ 事件修饰符，按键修饰符
+ 【观察】事件被绑定到了哪里？
  `event.__proto__.constructor`构造函数打印出来MousEvent,是原生的event对象;  
  事件是被注册到当前元素的，和react不一样

#### 表单

+ v-model
+ 常见表单项 textarea/checkbox/radio/select
+ 修饰符 lazy/number/trim

### 2.vue组件使用

+ props 和 $emit：父子组件通信
+ 组件间通信 - 自定义事件（EventBus 事件总程）：兄弟组件通信

  ```javascript
    // 绑定自定义事件
    event.$on('onBindEvent',  eventFunctionName)

    // 触发自定义事件
    event.$emit('onBindEvent', functionParam)

    // 销毁自定义事件: 防止造成内存泄漏
    beforeDestory() {
      event.$off('onBindEvent', eventFunctionName)
    }
    // event可以直接用一个vue实例
  ```

+ **组件生命周期**
  + 单个组件
    + 挂载阶段：created 和 mounted 区别？
    + 更新阶段
    + 销毁阶段：beforeDestory里面做哪些事情？

  + 父子组件及调用顺序(组件：index > input + list)
    + 挂载阶段：哪个组件先被mounted
    + 更新阶段：修改之后，updated执行的先后顺序
    + 销毁阶段：父组件先销毁还是子组件先销毁

### 3.vue高级特性

+ 自定义v-model

  ```javascript
    // index.vue
    <CustomizeVModel v-model="name">

    // customizeVModel.vue
    <input type="text" :value="text" @input="$emit('change', $event.target.value)">

    <script>
      export default {
        model: {
          prop: 'text',
          event: 'change'
        },
        props: {
          text: {
            type: String,
            default: ''
          }
        }
      }
    </script>

  ```

## Vue面试题

### vue使用相关

1. v-show和v-if的区别
2. 为何v-for要使用key
3. 描述Vue组件生命周期（有父子组件的情况）
4. Vue组件如何通信

### vue原理相关

1. 描述组件渲染和更新的过程（原理）
2. 双向数据绑定 v-model 的实现原理（原理）

## Vue3

## webpack

0. 为什么要使用webpack
1. webpack如何实现懒加载
2. webpack常见性能优化
3. babel-runtime 和 babel-polyfill的区别

## Vue原理

### 1.如何理解MVVM?

注：画一张图

### 2.vue响应式原理

+ `Object.defineProperty`
+ `Vue.observable`
+ `发布订阅模式`

### 3.Virtual DOM

+ 用js模拟DOM结构

  + tag/sel：标签或选择器(css)
  + props/data：事件/样式属性等
  + children：子元素（数组/字符串，也可以只代表数组，额外定义 text 表示字符串）

+ 新旧vnode对比，计算出最小的更新范围，更新DOM（diff算法）

```html
  <div id="div1" class="container">
    <p>vdom</p>
    <ul style="font-size: 20px;">
      <li>a</li>
    </ul>
  </div>
  ```

```javascript
  // vnode结构
  {
    tag: 'div',
    props: {
      className: 'container',
      id: 'div1'
    },
    children: [
      {
        tag: 'p',
        children: 'vdom'
      },
      {
        tag: 'ul',
        props: {
          style: 'font-size: 20px;'
        },
        children: [
          {
            tag: 'li',
            children: 'a'
          }
        ]
      }
    ]
  }
```

### 4.Diff算法
