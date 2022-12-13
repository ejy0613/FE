const http = require('http')

const PROT = 8000
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(PROT)