# Vue

> vue相关知识复习，仅进行记录总结，形式（笔记 + 代码 + xmind）  
> **其他参考：<https://vue3js.cn/interview/>**

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

### vue使用相关

1. v-show和v-if的区别
2. 为何v-for要使用key
3. 描述Vue组件生命周期（有父子组件的情况）
4. Vue组件如何通信

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
+ Demo：`observe-demo`

### 3.Virtual DOM

+ 用js模拟DOM结构

  + tag/sel：标签或选择器(css)
  + props/data：事件/样式属性等
  + children：子元素（数组/字符串，也可以只代表数组，额外定义 text 表示字符串）

+ 新旧vnode对比，计算出最小的更新范围，更新DOM（diff算法）
+ Demo：`vdom-demo`

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

#### patchVnode函数

+ patchVnode函数逻辑：比较vnode
+ patchVnode函数参数：
+ patchVnode函数代码片段

```typescript
  function patchVnode(
    oldVnode: VNode,
    vnode: VNode,
    insertedVnodeQueue: VNodeQueue
  ) {
    const hook = vnode.data?.hook;
    // 执行prepatch hook
    hook?.prepatch?.(oldVnode, vnode);
    // 设置 vnode.elm
    const elm = (vnode.elm = oldVnode.elm)!;
    // 旧 children
    const oldCh = oldVnode.children as VNode[];
    // 新 children
    const ch = vnode.children as VNode[];
    if (oldVnode === vnode) return;
    // hook相关
    if (
      vnode.data !== undefined ||
      (isDef(vnode.text) && vnode.text !== oldVnode.text)
    ) {
      vnode.data ??= {};
      oldVnode.data ??= {};
      for (let i = 0; i < cbs.update.length; ++i)
        cbs.update[i](oldVnode, vnode);
      vnode.data?.hook?.update?.(oldVnode, vnode);
    }
    // vnode.text === undefined (vnode.children !== undefined vnode.children 一般有值)
    if (isUndef(vnode.text)) {
      // 新旧都有 children
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
        // 新children有  旧children无（旧text有）
      } else if (isDef(ch)) {
        // 清空text
        if (isDef(oldVnode.text)) api.setTextContent(elm, "");
        // 添加children
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        // 旧children有，新children无
      } else if (isDef(oldCh)) {
        // 移除children
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        // 旧text有
      } else if (isDef(oldVnode.text)) {
        // 清空text
        api.setTextContent(elm, "");
      }
      // else vnode.text !== undefined (vnode.children 无值)
    } else if (oldVnode.text !== vnode.text) {
      // 移除旧 children
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      // 设置新的 text
      api.setTextContent(elm, vnode.text!);
    }
    hook?.postpatch?.(oldVnode, vnode);
  }

```

+ 参考源码：<https://github.com/snabbdom/snabbdom/blob/master/src/init.ts>

#### updateChildren函数

+ updateChildren函数逻辑：更新children
  从四个索引位置（oldStartIdx, newStartIdx, oldEndIdx, newEndIdx）开始进行对比，看是否命中
+ updateChildren函数参数：
+ updateChildren函数代码片段：

```typescript
  function updateChildren(
    parentElm: Node,
    oldCh: VNode[],
    newCh: VNode[],
    insertedVnodeQueue: VNodeQueue
  ) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx: KeyToIndexMap | undefined;
    let idxInOld: number;
    let elmToMove: VNode;
    let before: any;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];
        // 开始和开始对比
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];

        // 结束和结束对比
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];

        // 开始和结束对比
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(
          parentElm,
          oldStartVnode.elm!,
          api.nextSibling(oldEndVnode.elm!)
        );
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];

        // 结束和开始对比
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];

        // 都未命中
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        // 拿新节点的key， 能否对应上 oldch 中的某个节点的key
        idxInOld = oldKeyToIdx[newStartVnode.key as string];

        // (key) 没对应上其他节点
        if (isUndef(idxInOld)) {
          // New element
          api.insertBefore(
            parentElm,
            createElm(newStartVnode, insertedVnodeQueue),
            oldStartVnode.elm!
          );

        // (key) 对应上了其他节点 
        } else {
          elmToMove = oldCh[idxInOld];
          // sel是否相等（sameVnode的条件）
          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(
              parentElm,
              createElm(newStartVnode, insertedVnodeQueue),
              oldStartVnode.elm!
            );

          // sel相等，key相等
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined as any;
            api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!);
          }
        }
        // 指针累加
        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (newStartIdx <= newEndIdx) {
      before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
      addVnodes(
        parentElm,
        before,
        newCh,
        newStartIdx,
        newEndIdx,
        insertedVnodeQueue
      );
    }
    if (oldStartIdx <= oldEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

```

### 5.模版编译

#### 前置知识：JS的`with`语法

+ 改变 {} 内自由变量的查找规则，当作 obj 的属性来查找；
+ 如果找不到匹配的 obj 属性，就会报错
+ with 要慎用，因为打破了作用域规则，易读性变差

```javascript
  const obj = { a: 100, b: 200 };
  console.log(obj.a) // 100
  console.log(obj.b) // 200
  console.log(obj.c) // undefined

  // with语法
  with(obj) {
    console.log(a) // 100
    console.log(b) // 200
    console.log(c) // 报错 error
  }
```

#### vue template complier

+ 将模版转换为`render`函数，执行`render`函数生成vnode
+ 使用 `webpack vue-loader` 会在开发环境下编译模版
+ 可以使用 `h`函数 替代 `createElement`
+ Demo：`vue-template-compiler-demo`

```javascript
  // use render createElement
  Vue.component('heading', {
    // tempalte: `...`
    render: function(createElement) {
      return createElement(
        'h' + this.level,
        [
          createElement('a', {
            attrs: {
              name: 'headerId',
              href: '#' + 'headerId'
            }
          },
          'this is a tag'
          )
        ]
      )
    }
  })

  // use render h func
  Vue.component('heading', {
    render() {
      return h(
        'h' + this.level,
        [
          createElement('a', {
            attrs: {
              name: 'headerId',
              href: '#' + 'headerId'
            }
          },
          'this is a tag'
          )
        ]
      )
    }
  })
```

### 6.组件渲染/更新过程

#### 初次渲染过程

#### 更新过程

#### 异步渲染

### 7.前端路由

#### url组成部分

```javascript
  // url: http://127.0.0.1:8881/hash.html?a=100#/aaa/bbb
  location.protocol // 'http:'
  location.hostname // '127.0.0.1'
  location.host     // '127.0.0.1:8881'
  location.pathname // 'hash.html'
  location.search   // '?a=100'
  location.hash     // '#/aaa/bbb'
```

#### hash

JS实现 Hash 路由：`code/router-demo/hash.html`

#### H5 history

JS实现 H5 history 路由： `code/router-demo/history.htm`

## Vue面试题

+ **1.v-show 和 v-if 的区别**
  + v-show 通过 css display 控制显示和隐藏（有更高的初始渲染消耗）
  + v-if 是组件真正的渲染和销毁，而并不是显示和隐藏（有更高的切换消耗）
  + 频繁切换显示使用 v-show，否则使用 v-if
  
+ **2.为何在v-for中使用key**
  > vue默认采用就地复用原则。
  + 建议用key，且不要用index 或 random
  + diff算法中通过tag和key来判断，是否是sameNode(同一节点)（path -> sameNode() && updateChildren()）
  + 可以减少渲染次数，提高渲染性能

+ **3.描述vue组件生命周期（父子组件）**
  + 单组件生命周期图（beforeCreate, created, beforeMount, mounted, beforeUpdate, updated, beforeDestory, destoryed）
  + 父子组件生命周期关系（创建：父组件 -> 子组件；渲染：子组件 -> 父组件）

+ **4.vue组件通信**
  + 父子组件 props 和 this.$emit
  + 自定义事件 event.$on event.$off event.$emit
  + vuex
  + provide/inject
  + ...

+ **5.描述组件渲染和更新的过程**
  > 图示链接：<https://cn.vuejs.org/v2/guide/reactivity.html>
  + 解析模版为render函数
  + 触发响应式，监听 data 属性 getter setter
  + 执行render函数，生成vnode

+ **6.双向数据绑定v-model的原理**
  + input元素的value = this.name
  + 绑定input事件 this.name = $event.target.value
  + data 更新触发 re-render

+ **7.对MVVM的理解**

+ **8.computed有何特点**
  + 惰性的，具有缓存，data不变不会重新计算
  + 提高性能

+ **9.为什么组件data是一个函数**
  + .vue文件编译后是一个类，每个地方使用这个组件的时候相当于是这个类的实例化，data是一个函数保证处于当前的闭包当中，不会出现污染
  + 其他参考：<https://vue3js.cn/interview/vue/data.html#%E4%B8%89%E3%80%81%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90>

+ **10.ajax请求应该放在哪个生命周期**
  + mounted
  + JS是单线程的，ajax异步获取数据
  + 放在mounted之前没有什么用，只会让逻辑混乱

+ **11.如何将组件所有的props传递给自组件**

  ```javascript
    // 使用 $props
    <User v-bind="$props" />
  ```

+ **12.如何实现v-model**

  ```javascript
    <CustomizeModel v-model="name">
    
    // CustomizeModel.vue
    <template>
      <input type="text" value="text" @input="$emit('change', $event.target.value)" />
    </template>

    <script>
      export default {
        model: {
          props: 'text',
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

+ **13.多个组件有相同的逻辑，如何抽离**
  + mixin
  + mixin的缺点
    + 变量来源不明确，不利于阅读
    + 多mixin可能会造成命名冲突
    + mixin和组件可能存在多对多的关系，复杂度较高

+ **14.何时要使用异步组件**
  + 加载大组件
  + 路由异步加载
  + 可以优化性能

+ **15.何时使用keep-alive**
  + 缓存组件，不需要重复渲染
  + 多个静态tab页的切换
  + 可以优化性能

+ **16.何时需要使用beforeDestory**
  + 解除自定义事件 event.$off
  + 清除定时器
  + 解绑自定义的DOM事件，如window, scroll等

+ **17.vuex中action 和 mutation有何区别**
  + action中处理异步，mutation处理同步
  + mutation做原子操作
  + action可以整合多个mutation

+ **18.用vnode描述一个DOM结构**

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
    tag: 'div', // or sel
    props: { // or data
      className: 'container', // or staticClass
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

+ **19.Vue如何监听数组变化**
  + `Object.defineProperty` 不能监听数组变化
  + 重新定义原型，重写push pop等方法，实现监听
  + Proxy 可以原生支持监听数组变化

+ **20.描述响应式原理**
  + 监听data变化
  + 组件渲染和更新的流程

+ **21.diff算法时间复杂度**
  + O(n)
  + 在O(n^3) 基础上做了调整
    + 只比较同一层级（组件），不做跨级比较
    + tag/sel不相同，则直接删掉重建，不再做深度比较
    + tag/sel和key，两者都相同，则认为是相同节点，不再深度比较

+ **22.简述diff算法过程**
  + 从vdom的使用开始，首先要明白vnode的结构，patch(elem, vnode) 和 patch(vnode, newVnode)
  + patchVnode 和 addVnodes 和 removeVnodes
  + updateChildren(key的重要性)

+ **23.vue为何是异步渲染，$nextTick有何用**
  + 异步渲染（以及合并data修改），以提高渲染性能
  + $nextTick在DOM更新完之后，触发回调

+ **24.vue常见性能优化**
  + 合理使用v-show 和 v-if
  + 合理使用compupted
  + v-for时加key，以及避免和v-if同时使用
  + 自定义事件，DOM事件要及时销毁
  + 合理使用异步组件
  + 合理使用keep-alive
  + data层级不要太深
  + 使用vue-loader 在开发环境做模版编译（预编译）
  + webpack层面优化
  + 前端通用的性能优化，如图片懒加载
  + 使用SSR

## Vue3

### 1.Vue3 比 Vue2有什么优势？

+ **性能更好**
+ 体积更小
+ **更好的TS支持**
+ **更好的代码组织**
+ **更好的逻辑抽离**
+ 更多新功能

### 2.描述Vue3生命周期

#### Options API生命周期

+ beforeDestory -> beforeUnmount
+ destoryed -> unmounted

#### Composition API生命周期

+ 使用方式不同，需要引入生命周期钩子函数
+ 函数名称前 + `on`

```javascript
  setup() {
    import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
  }
```

### 3.如何看待Composition API 和 Options API

+ Compsition API带来了什么？
  + 更好的代码组织
  + 更好的逻辑复用
  + 更好的类型推导

+ Compostion API 和 Options API如何选择？
  + 不建议共用，会引起混乱
  + 小型项目、业务逻辑简单，用Options API
  + 中大型项目、业务逻辑复杂，用Composition API

### 4.如何理解 ref toRef toRefs？

#### ref

+ 用来生成值类型的响应式数据
+ 可用于模版和reactive
+ 通过 `.value` 修改值
+ 可以获取DOM节点，节点使用ref绑定， `const elmentRef = ref(null)`

#### toRef

+ 针对一个响应式对象（reactive封装）的prop
+ 创建一个ref，具有响应式
+ 两者保持引用关系
+ 如果用于普通对象，产出的结果不具备响应式

#### roRefs

+ 将响应式对象转换为普通对象
+ 对象的每个prop都是对应的ref
+ 两者保持引用关系
+ 合成函数返回响应式对象

### 5.Vue3升级了哪些重要功能？

### 6.Composition API 如何实现代码复用

#### 7.Vue3如何实现响应式？

### 8.watch 和 watchEffect 的区别？

### 9.setup中如何获取组件实例（实际考this）？

### 10.Vue3 为何比 Vue2快？

### 11.Vite是什么

### 12.Composition API 和 React Hooks对比？
