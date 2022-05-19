// 创建响应式
function reactive(target = {}) {
  if (typeof target !== 'object' || target === null) {
    // 不是对象或数组，则返回
    return target;
  }

  // 代理配置
  const proxyConf = {
    get(target, key, receiver) {
      // 只处理自身（非原型的）属性
      const ownKeys = Reflect.ownKeys(target);
      if (ownKeys.includes(key)) {
        console.log('get', key)
      }
      const result = Reflect.get(target, key, receiver)
      
      // 深度监听
      return reactive(result); // 返回结果
    },
    set(target, key, value, receiver) {
      // 重复的数据，不处理
      if (value === target[key]) {
        return true;
      }

      const ownKeys = Reflect.ownKeys(target);
      if (ownKeys.includes(key)) {
        console.log('已拥有key: ', key);
      } else {
        console.log('新增key: ', key);
      }

      const result = Reflect.set(target, key, value, receiver)
      console.log('set', key, value)
      // console.log('set.result', result);
      return result // 是否设置成功
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
      console.log('delete property', key)
      // console.log('delete.result', result);
      return result // 是否删除成功
    }
  }

  // 生成代理对象
  const observed = new Proxy(target, proxyConf)
  return observed
}

// 测试数据
const data = {
  name: 'zhangsan',
  age: 20,
  address: {
    city: 'shenzhen'
  }
}

const proxyData = reactive(data)