# Vue

> vue相关知识复习，仅进行记录总结，形式（笔记 + 代码 + xmind）  
> 其他参考：<https://vue3js.cn/interview/>

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

### 4.Diff算法（以snabbdom为例）

+ diff算法概述
  + diff即对比，比如linux diff, github diff
  + 两个对象可以做diff，如：<https://github.com/cujojs/jiff>
  + 两棵树可以做diff，如：vdom diff

+ 树diff的时间复杂度是 o(n^3) => 3个循环组合，因此是 o(n^3)  => 不可用
  + 1. 遍历tree1
  + 2. 遍历tree2
  + 3. 排序
+ 时间复杂度优化到 o(n)
  + 只比较同一层级，不做跨级比较
  + tag/sel不相同，则直接删掉重建，不再做深度比较
  + tag/sel和key，两者都相同，则认为是相同节点，不再深度比较

#### 生成vnode

+ h函数主逻辑：生成vnode，返回vnode对象

+ h函数参数

+ h函数代码片段

```typescript
  export function h(sel: string): VNode;
  export function h(sel: string, data: VNodeData | null): VNode;
  export function h(sel: string, children: VNodeChildren): VNode;
  export function h(
    sel: string,
    data: VNodeData | null,
    children: VNodeChildren
  ): VNode;
  export function h(sel: any, b?: any, c?: any): VNode {
    let data: VNodeData = {};
    let children: any;
    let text: any;
    let i: number;
    if (c !== undefined) {
      if (b !== null) {
        data = b;
      }
      if (is.array(c)) {
        children = c;
      } else if (is.primitive(c)) {
        text = c.toString();
      } else if (c && c.sel) {
        children = [c];
      }
    } else if (b !== undefined && b !== null) {
      if (is.array(b)) {
        children = b;
      } else if (is.primitive(b)) {
        text = b.toString();
      } else if (b && b.sel) {
        children = [b];
      } else {
        data = b;
      }
    }
    if (children !== undefined) {
      for (i = 0; i < children.length; ++i) {
        if (is.primitive(children[i]))
          children[i] = vnode(
            undefined,
            undefined,
            undefined,
            children[i],
            undefined
          );
      }
    }
    if (
      sel[0] === "s" &&
      sel[1] === "v" &&
      sel[2] === "g" &&
      (sel.length === 3 || sel[3] === "." || sel[3] === "#")
    ) {
      addNS(data, children, sel);
    }
    return vnode(sel, data, children, text, undefined);
  }
```
  
+ 参考源码：<https://github.com/snabbdom/snabbdom/blob/master/src/h.ts>

#### patch函数

+ patch函数主逻辑：判断vnode的tag/sel 以及 key是否相等

+ patch函数参数
  + patch(container, vnode)
  + patch(vnode, newVnode)
  + patch(vnode, null)

+ patch函数代码片段

```typescript
  return function patch(
    oldVnode: VNode | Element | DocumentFragment,
    vnode: VNode
  ): VNode {
    let i: number, elm: Node, parent: Node;
    const insertedVnodeQueue: VNodeQueue = [];
    // 执行pre hooks
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

    if (isElement(api, oldVnode)) {
      // 如果vnode是元素节点（ps: Node.nodeType === 1, 元素节点）
      oldVnode = emptyNodeAt(oldVnode);
    } else if (isDocumentFragment(api, oldVnode)) {
      // 如果vnode是文档片段（ps: DocumentFragment，文档接口片段，一个没有父对象的最小文档对象）
      oldVnode = emptyDocumentFragmentAt(oldVnode);
    }

    // 相同的vnode（key 和 sel/tag 都相等）
    if (sameVnode(oldVnode, vnode)) {
      // vnode 对比
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      // 不同的vnode, 直接删除重建（ps: ! 非空断言操作符，用于排除 null/undefined ，即告诉编译器：xx变量肯定不是null或undefined）
      elm = oldVnode.elm!;
      parent = api.parentNode(elm) as Node;

      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
```

+ 参考源码：<https://github.com/snabbdom/snabbdom/blob/master/src/init.ts>
