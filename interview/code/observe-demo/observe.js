// 更新视图
function updateView() {
  console.log('视图更新');
}

// 重新定义数组原型
const oldArrPrototype = Array.prototype;
const arrProto = Object.create(oldArrPrototype);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
  arrProto[methodName] = function () {
    updateView(); // 触发更新视图
    oldArrPrototype[methodName].call(this, ...arguments)
  }
})


// 重新定义属性，监听起来
function defineReactive(target, key, value) {
  // 深度监听
  observer(value);

  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        observer(newValue)
        // 注：value一直在闭包中，在此处设置完之后，再get时也是最新的值
        value = newValue
      }
      // 触发更新视图
      updateView()
    }
  })
  
}

// 监听对象属性
function observer(target) {
  if (typeof target !== 'object' || target === null) {
    // 不是对象或数组
    return target;
  }

  // 监听数组
  // 不能直接用 Array.prototype.push = function () { updateView(); Array.prototype.push(target) }
  // 会污染全局 Array
  if (Array.isArray(target)) {
    target.__proto__ = arrProto;
  }

  // 重新定义各个属性(for in 可以遍历数组)
  for (const key in target) {
    defineReactive(target, key, target[key])
  }
}

const data = {
  name: 'zhangsan',
  age: 20,
  address: {
    city: 'shenzhen'
  },
  nums: [10, 20, 30]
}

observer(data)

// 测试
// data.name = 'lisi';
// data.address.city = 'hangzhou';
// data.age = { num: 22 }
// data.age.num = 23
// console.log('data', data)
data.nums.push(4)