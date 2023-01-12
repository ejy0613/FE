const handleUserRouter = (req, res) => {
  const method = req.method

  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '这是登录的接口'
    }
  }
}

module.exports = handleUserRouter