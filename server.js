var ROOT_PATH = 'app/'
var PORT = 3000
var http = require('http');
var fs = require('fs');
var server = http.createServer();

function getType (url) {
  var type = url.split('/').pop().split('.')[1];
  var contentType = 'text/html';
  if (type === 'js') {
    contentType = 'application/json';
  }
  return contentType;
}

function getFile (url) {
  if (url === '/') {
    return ROOT_PATH + 'index.html';
  } else {
    return ROOT_PATH + Array.prototype.splice.call(url, 1, url.length).join('');
  }
}

function notFound(url, res) {
  console.log('Could find ', url);
  res.writeHead(404, {"Content-Type": 'text/html'});
}

server.on('request', function(req, res) {
  var url = req.url, type, file;
  console.log('Serving request for ', url)
  type = getType(url);
  file = getFile(url);

  fs.readFile(file, function (err, data) {
    if (err) {
      notFound(url, res);
    } else {
      res.writeHead(200, {"Content-Type": type});
      res.write(data);
    }
    res.end();
  });
})

server.listen(PORT, function () {
  console.log('Server started at port 3000')
});
