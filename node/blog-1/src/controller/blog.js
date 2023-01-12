const getBlogList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容A',
      createTime: 1673439482182,
      author: '张三'
    },
    {
      id: 2,
      title: '标题1',
      content: '内容A',
      createTime: 1673439499106,
      author: '张三'
    }
  ]
}

module.exports = { getBlogList }