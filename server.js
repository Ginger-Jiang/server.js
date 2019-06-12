var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var path = request.url
  var query = ''
  if (path.indexOf('?') >= 0) { query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/



  /**
   * 用户请求 / 时，返回 html 内容
     该 html 内容里面由一个 css link 和一个 script
     css link 会请求 /style.css，返回 css 内容
     script 会请求 /main.js，返回 js 内容
     请求 / /style.css /main.js 以外的路径，则一律返回 404 状态码
   */









  if (path === '/') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write('<!DOCTYPE html>' +
      '<html>' +
        '<head>' +
          '<link rel="stylesheet" href="/style.css">' +
          '<script src="/main.js"></script>' +
          '<title>初探response</title>' +
        '</head>' +
        '<body>' +
          '<h1>初探response</h1>' +
        '</body>' +
      '</html>')
  } else if (path === '/style.css') {
    response.setHeader('Content-Type', 'text/css')
    response.write('body{background:red}')
  } else if (path === '/main.js') {
    response.setHeader('Content-Type', 'text/javascript')
    response.write('console.log("这是一个main.js")')
  } else {
    response.statusCode = 404
  }
  response.end()










  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


