const { getBlogList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getBlogList(author, keyword);
    if (author) {
      return new SuccessModel(listData)
    } else {
      return new ErrorModel('参数错误')
    }
  }
}

module.exports = handleBlogRouter