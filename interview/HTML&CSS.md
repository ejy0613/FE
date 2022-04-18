# HTML&CSS

## CSS

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
