const serverHandle = (req, res) => {
  // 设置数据返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  const resData = {
    name: 'Joy',
    site: 'mooc',
    env: process.env.NODE_ENV
  }

  res.end(JSON.stringify(resData))
}

module.exports = serverHandle