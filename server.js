// Node simpe http server

// Get optional args
var args = process.argv.splice(2);
var formattedArgs = {};

// Simple args parse
for (var i = 0, l = args.length; i < l; i ++) {
  if (args[i].match(/^-+/)) {
    formattedArgs[args[i]] = args[i + 1];
  }
};

// Setup constants
var ROOT_PATH = process.cwd() + '/';
ROOT_PATH += formattedArgs['-r'] || formattedArgs['--root'] || '';
ROOT_PATH += '/';
var PORT = formattedArgs['-p'] || formattedArgs['--port'] || 3000;

// Required modules
var http = require('http');
var fs = require('fs');
var url = require('url');

var types = {
  'js' : 'application/javascript',
  'json': 'application/json',
  'html' : 'text/html',
  'png': 'image/png',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif'
};

function getType (url) {
  var type = url.split('.').pop();
  // Default extension
  if (type === '/') {
    type = 'html';
  }
  return types[type];
}

function getFile (url) {
  if (url === '/') {
    // Index path
    return ROOT_PATH + 'index.html';
  } else {
    return ROOT_PATH + url;
  }
}

function notFound(url, res) {
  console.log('Could find ', url);
  res.writeHead(404, {"Content-Type": 'text/html'});
}

var server = http.createServer();

server.on('request', function(req, res) {
  var path = url.parse(req.url).pathname,
      type,
      file;

  console.log('Serving request for ', path);
  type = getType(path);
  file = getFile(path);
  console.log(file);

  fs.readFile(file, function (err, data) {
    if (err) {
      notFound(path, res);
    } else {
      res.writeHead(200, {"Content-Type": type});
      res.write(data);
    }
    res.end();
  });
});

server.listen(PORT, function () {
  console.log('Server started at port ' + PORT);
});
