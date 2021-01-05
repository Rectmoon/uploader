const http = require('http')
const Controller = require('./controller')

const server = http.createServer()
const controller = new Controller()

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.status = 200
    res.end()
    return
  }

  switch (req.url) {
    case '/verify':
      return await controller.handleVerifyUpload(req, res)
    case '/merge':
      return await controller.handleMerge(req, res)
    case '/':
      return await controller.handleFormData(req, res)
    default:
      res.end('404')
  }
})

server.listen(3001, () => console.log('http://localhost:3001'))
