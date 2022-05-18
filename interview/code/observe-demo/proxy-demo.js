// const data = {
//   name: 'zhangsan',
//   age: 20
// }
const data = ['a', 'b', 'c']

const proxyData = new Proxy(data, {
  get(target, key, receiver) {
    // 只处理自身（非原型的）属性
    const ownKeys = Reflect.ownKeys(target);
    if (ownKeys.includes(key)) {
      console.log('get', key)
    }
    const result = Reflect.get(target, key, receiver)
    
    return result; // 返回结果
  },
  set(target, key, value, receiver) {
    // 重复的数据，不处理
    if (value === target[key]) {
      return true;
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
})