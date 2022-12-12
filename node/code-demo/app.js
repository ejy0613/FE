const http = require('http');
const queryString = require('querystring')

/**
 * nodejs处理get请求
 */
/*
const server = http.createServer((req, res) => {
  console.log('method: ', req.method);
  const url = req.url;
  console.log('url: ', url);
  req.query = queryString.parse(url.split('?')[1]); // 解析queryString
  console.log('query', req.query);
  res.end(JSON.stringify(req.query))
})
*/
/**
 * nodejs处理post请求
 */
/*
const server = http.createServer((req, resp) => {
  if (req.method === 'POST') {
    // request数据格式
    console.log('req content-type', req.headers['content-type']);
    // 接收数据
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log('postData: ', postData);
      resp.end('respones.end')
    })
  }
})
*/

const server = http.createServer((req, resp) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = queryString.parse(url.split('?')[1]);
  // 设置返回格式
  resp.setHeader('Content-type', 'application/json')

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }

  // 返回
  if (req.method === 'GET') {
    resp.end(JSON.stringify(resData))
  }
  if (req.method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      resp.end(JSON.stringify(resData))
    })
  }
})

server.listen(8000)
console.log('OK');