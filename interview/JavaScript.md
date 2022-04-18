# JavaScript

## 数据类型

+ js数据类型？基本和引用的区别？symbol和bigint讲一讲应用场景

  ```javascript
    1.基本类型：
      Undefined  typeof instance === 'undefined'
      Null       typeof instance === 'object'
      Boolean    typeof instance === 'boolean'
      String     typeof instance === 'string'
      Number     typeof instance === 'number'
      Symbol(ES6) typeof instance === 'symbol'
      BigInt(ES2020) typeof instance === 'bigint'
    2.引用类型：
      Object 对象子类型(Array, Function) typeof instance === 'object'
      注：typeof 操作符的唯一目的就是检查数据类型，检查object种类的合适的方式是使用 instanceof 关键字
    
    3.基本和引用的区别
      3.0 访问方式不同
        基本类型的值可以直接访问
        引用类型是按引用访问（访问对象 -> 堆内存的引用地址 -> 按照地址去获取这个对象的值）
      3.1 存储的方式不同
        基本类型是直接存在栈内存中（值直接存储在变量访问的位置）
        引用类型是保存在堆内存中的对象，栈内存中保存的实际是对象在堆内存中的引用地址（存储在堆中的对象，存储在变量处的值是一个指针，指向存储对象的内存地址）
      3.2 数据类型判定不同（可忽略）
        基本类型使用 typeof 做出准确判断
        引用类型除了 `function` 之外使用 typeof 判断返回的都是object，想知道某个对象的具体类型，就要使用instanceof
      3.3 复制变量时不同
        基本类型将原始值的变量复制给另一个变量时，会将原始值的副本赋值给新变量，此后这两个变量是完全独立的
        引用类型将原始值的变量复制给另一个变量时，会把这个内存地址赋值给新变量，也就是说两个变量都指向了内存中的同一对象
      3.4 参数传递不同
        明确：ECMAScript中所有函数的参数都是按值来传递的。
        基本类型传递的是变量里的值，之后参数和这个变量互不影响
        引用类型传递的是这个对象在堆内存中的地址，因此函数内部对这个参数的修改会体现在外部
    4.BigInt 可以用任意精度表示整数。使用BigInt，可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。BigInt是通过在整数末尾附加 `n` 或调用构造函数来创建的  
      `MAX_SAFE_INTGER` = 2^53 - 1 = (Math.pow(2, 53) - 1)   
      `MINX_SAFE_INTEGER` = -2^53 - 1 = -(Math.pow(2, 53 - 1))  
    5.Symbol `Symbol()` 函数会返回symbol类型的值，该类型具有静态属性和静态方法。每个从 `Symbol()` 返回的symobl值都是唯一的。一个symbol值能作为对象属性的标识符。

+ 判断数据类型的方法？instanceof 原理？判断空对象？typeof null -> 'object' ? typeof NaN -> 'number'?

  ```javascript
    1.判断方法：typeof instanceof constructor Object.prototype.toString.call()
      1.1 `typeof` 返回一个表示数据类型的字符串，可以对基本类型做出准确的判断（null -> object，引用类型除function外 -> object）
      1.2 `instanceof` 判断某个对象的具体类型  
        instanceof 操作符判断左操作数对象的原型链上是否有右边这个构造函数的prototype属性，也就是说指定对象是否是某个构造函数的实例，最后返回布尔值（对象、构造函数和原型对象见下方）  
        注：instanceof运算符只能用于对象，不适用原始类型的值。
      1.3 `constructor` 可以得知某个实例对象，到底是哪一个构造函数产生的
        但是 constructor 属性易变，不可信赖，这个主要体现在自定义对象上，当开发者重写prototype后，原有的constructor会丢失。因此，为了规范，在重写对象原型时一般都需要重新给constructor赋值，以保证实例对象的类型不被改写。
      1.4 `Object.prototype.toString.call()` toString是Object原型对象上的方法，该方法默认返回其调用者的具体类型，严格的讲，toString运行时this指向的对象类型，返回的类型格式为 `[object.xxx]`，xxx是具体类型。基本所有对象的类型都可以通过这个方法获取到
      1.5 总结
        typeof可以准确地判断出基本类型，但是对于引用类型除function之外返回的都是object；
        已知是引用类型的情况可以选用instanceof或constructor方法进行具体类型的判断：
          instanceof是基于原型链的；
          constructor 属性易变，不可信赖，为了规范，在重写对象原型时一般都需要重新给constructor赋值，以保证实例对象的类型不被改写；
        Object.prototype.toString.call() 通用但很繁琐。
  ```

+ 0.1 + 0.2 === 0.3 吗？为什么？
  结果是 `false`。这是浮点运算的特点，浮点数运算的精度问题导致等式左右结果并不是严格相等。
  在两数相加时，会先转换成二进制，  0.1和0.2转换成二进制的时候尾数会发生无限循环，然后进行对阶运算，JS引擎对二进制进行截断，所以造成精度丢失。总结：精度丢失可能出现在进制转换和对阶运算中

  错的不是结论，而是比较方法，正确的比较方法应该是使用JavaScript提供的最小精度值：

  ```javascript
    Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
  ```

  或使用 `toPrecision(16)` 去有效位之后，两者相等：

  ```javascript
    (0.1 + 0.2).toPrecision(16) === 0.3.toPrecision(16)
  ```

## 原型与原型链

### 对象、构造器函数和原型对象之间的关系

+ 对象：属性和方法的集合，即变量和函数的封装。**每个对象都有一个`__proto__`属性，指向这个对象的`构造函数的原型对象`**
+ 构造函数：用于创建对象的函数，通过 `new` 关键字生成对象。函数名一般首字母大写
+ 原型对象：每个函数都有一个`prototype`属性，它是一个`指向原型对象的指针`（原型对象在定义函数时同时被创建）

```javascript
  // ES5写法，通过构造函数，定义并生成对象
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  // 设置构造函数prototype指定的对象，即重置原型对象
  Person.prototype = { 
    constructor: Person,
    sayName: () => console.log(this.name)
  }
  // 实例化对象p1：{ name: Joy, age: 25, __proto__: object}  object即原型对象：Person.prototype指向的对象
  var p1 = new Person('Joy', 25);
```

  > 说明：实例化对象的__proto__属性指向的是构造函数的原型对象  
  > ES5的构造函数，对应的就是ES6对应类的构造方法

### 原型和原型链

+ 原型
  当使用构造函数新建一个对象后，在这个对象的内部将包含一个指针`__proto__`，这个指针指向构造函数`prototype`属性对应的值，在ES5中这个指针被称为原型。
  注：最好不要使用`__proto__` 这个属性，因为不是规范中规定的。ES5中新增了`Object.getPrototypeOf()`方法，可以通过这个方法来获取对象的原型。
  
+ 原型继承
  一个对象可以使用另外一个对象的属性或方法，称之为继承。具体是通过将这个对象的原型设置为另外一个对象，这样根据原型链的规则，如果查找一个对象属性且在自身不存在时，就会查找另外一个对象，相当于一个对象可以使用另外一个对象的属性和方法。
  
+ 原型链
  当访问一个对象的属性的时候，如果这个对象本身不存在这个属性，那么它就会去它的原型对象里面去找这个属性，这个原型对象又会有自己的原型，于是就一直找下去，知道找到`Object.prototype`的原型，此时原型为`null`，查找停止。这种通过原型链接的逐级向上的查找链被称为原型链。  
  注：原型链的尽头是`Object.prototype`，也是新建对象能够使用toString()等方法的原因

+ 原型修改、重写

  ```javascript
    function Person(name) {
      this.name = name
    }
    // 修改原型
    Person.prototype.getName = function() {}
    var p = new Person('joy')
    console.log(p.__proto__ === Person.prototype) // true
    console.log(p.__proto__ === p.constructor.prototype) // true
    // 重写原型
    Person.prototype = {
      getName = function() {}
    }
    var p = new Person('joy')
    console.log(p.__proto__ === Person.prototype) // true
    console.log(p.__proto__ === p.constructor.prototype) // false 因直接给Person的原型对象直接用对象赋值，它的构造函数指向了根构造函数Object, 所以这时候 p.constructor === Object, 如果想要成立，需要用constructor指回来
    p.constructor = Person
  ```

+ 原型链指向

  ```javascript
    p.__proto__ // Person.prototype
    Person.prototype.__proto__ // Object.prototype
    p.__proto__.__proto__ // Object.prototype
    p.__proto__.constructor.prototype.__proto__ // Object.prototype
    Person.prototype.constructor.prototype.__proto__ // Object.prototype
    p.__proto__.constructor // Person
    Person.prototype.constructor // Person
  ```

+ 如何获得对象非原型链上的属性
  使用`getOwnProperty()`方法来判断属性是否属于原型链的属性：

  ```javascript
    function iterate(obj) {
      var res = []
      for (var key in  obj) {
        if (obj.getOwnProperty(key)) {
          res.push(key + ': ' + obj[key]);
        }
      }
      return res
    }
  ```

## 作用域与作用域链、执行上下文、闭包

### 作用域与作用域链

+ 作用域：规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。换句话说，作用域决定了代码区块中变量和其他资源的可见性。（全局作用域、函数作用域、块级作用域）
  + 全局作用域
    + 最外层函数和最外层函数外面定义的变量拥有全局作用域
    + 所有未定义直接赋值的属性拥有全局作用域
    + 所有`windows`对象的属性拥有全局作用域
    + 全局作用域有很大的弊端，过多的全局作用域变量会污染全局命名空间，容易引起命名冲突
  + 函数作用域
    + 函数作用域声明在函数内部的变量，一般只有固定的代码片段能够访问
    + 作用域是分层的，内层作用域可以访问到外层作用域
  + 块级作用域
    + ES6中新增的`let`和`const`指令可以声明块级作用域，块级作用域可以在函数中创建也可以在一个代码块(由 `{}` 包裹的代码片段)中创建
    + let和const声明的变量不会有变量提升，也不可以重复声明
    + 在循环中比较适合绑定块级作用域，这样就可以把声明的计数器变量限制在循环内部

+ 作用域链：从当前作用域开始一层层往上找某个变量，如果找到全局作用域还没有找到，就放弃寻找。这种层级关系就是作用域链。（由多个执行上下文的`变量对象`构成的链表就叫做作用域链）
  + 作用域链的作用是**保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，可以访问到外层环境的变量和函数**
  + 作用域链的本质是一个指向变量对象的指针列表。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前端始终都是当前执行上下文。全局执行上下文的变量对象始终是作用域链的最后一个对象。

+ 注：**js采用的是静态作用域，所以函数的作用域在函数定义时就确定了。**

### 执行上下文

### 闭包

## ES6

### ES Module 与 CommonJS模块的区别？各自的优势
