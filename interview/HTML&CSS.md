# HTML&CSS

## HTML面试题

+ 如何理解html的语义化
+ 哪些html是块级元素，哪些是内联元素？

## CSS面试题

+ 布局
  + 盒子模型的宽度如何计算？
  + margin纵向重叠的问题？
  + margin负值的问题？
  + BFC理解和应用
  + float布局的问题，以及 clearfix
  + flex画骰子
+ 定位
  + absolute和realative分别依据什么定位
  + 居中对齐有哪些方式
+ 图文样式
  + line-height的继承问题
+ 响应式
  + rem是什么？
  + 如何实现响应式
+ css3
  + 关于css3动画
  
### 1. 标准盒模型&怪异盒模型

+ 标准盒模型
  + 内容区域由`width`属性设置，`padding`和`margin`另外计算
  + width/height + padding + margin + border = 总长
  + 主要用于PC端，内部决定外部的大小
+ 怪异盒模型（IE标准盒模型）
  + 内容区域为 content + padding + border，而不是浏览器的width属性
  + width/height + margin = 总长
  + 主要用于移动端，由外而内
  + 属性：`box-sizing: border-box`

### 2.如何理解html的语义化？

+ 让人更容易读懂（增加代码可读性）
+ 让搜索引擎更容易读懂（SEO）

### 3.哪些html是块级元素，哪些是内联元素

+ 块级元素
  + 独占一行
  + display: block/table
  + 有div h1 h2 table ul ol p 等
+ 内联元素
  + display: inline/inline-block/inline-table
  + 有span img input button等

### 4.盒子模型的宽度如何计算？

> offsetWidth = (内容宽度 + 内边距 + 边框)， 无外边距
内容宽度：

+ 设置 box-sizing: border-box，内容宽度 = content + padding + border
+ 设置 box-sizing: content-box，内容宽度 = content

### 5.margin纵向重叠的问题？

+ 相邻元素的margin-top和margin-bottom值相同，则会导致重叠
+ 空白内容的`<p></p>`也会重叠

### 6.margin负值的问题？

+ margin-top/margin-bottom负值，元素向上移动/向左移动
+ margin-right负值，右侧元素左移，自身不受影响
+ margin-bottom负值，下侧元素上移，自身不受影响

### 7.BFC理解和应用

#### 什么是BFC？  

+ Block format content, 块级格式化上下文
+ 一块独立的渲染区域，内部元素的渲染不会影响边界以外的元素

#### 形成BFC的常见条件

+ float不是none
+ position是absolute/fixed
+ overflow不是visible
+ display: flex/inline-block等

#### 如何使用？

+ 清除浮动

### 8.float布局的问题，以及 clearfix

#### 如何实现圣杯布局和双飞翼布局？

+ 圣杯布局和双飞翼布局的目的
  + 三栏布局，中间一栏最先加载和渲染（内容最重要）
  + 两侧固定布局，中间内容随着宽度自适应
  + 一般用于pc网页

+ 圣杯布局和双飞翼布局的技术总结
  + 使用float布局
  + 两侧使用margin负值，以便和中间内容横向重叠
  + 防止中间内容被两侧内容覆盖，圣杯用padding实现，双飞翼用margin实现

#### 手写一个clearfix

```css
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
```

### 9.flex布局的问题

#### 常用语法

+ flex-direction: row/column
+ justifity-content: flex-start/flex-end/center/space-between/space-around
+ align-items: flex-start/flex-end/center/baseline/stretch
+ flex-wrap: nowrap/wrap/wrap-reverse
+ align-self: auto/flex-start/flex-end/center/baseline/stretch

#### flex实现一个三点的骰子

> `code/flex-demo/index.html`

### 10.absolute和realative分别依据什么定位

+ relative 依据自身定位
+ absolute 依据最近一层的定位元素定位

### 11.居中对齐有哪些方式

+ 水平居中
  + inline元素：text-align: center
  + block元素：margin: auto
  + absolute元素：left: 50%; margin-left: 负值
+ 垂直居中
  + inline元素：line-height值等于height值
  + absolute元素：top: 50%; margin-top: 负值
  + absolute元素：transform: translate(-50%, -50%);
  + absolute元素：top, left, bottom, right = 0; margin: auto

### 12.ine-height的继承问题

+ 写具体数值，如30px，则直接继承该值
+ 写比例，如2 / 1.5，则继承该比例
+ 写百分比，如20px,200%，则继承计算出来的值（40px）

### 13.rem是什么？

### 14.如何实现响应式

### 15.关于css3动画
