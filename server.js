// Node simpe http server
// Get optional args
var args = process.argv.splice(2);
var formattedArgs = {};

// Required modules
var http = require('http');
var fs = require('fs');
var url = require('url');

// Simple args parse
for (var i = 0, l = args.length; i < l; i ++) {
  if (args[i].match(/^-+/)) {
    formattedArgs[args[i]] = args[i + 1];
  }
};

// Setup constants
var ROOT_PATH = process.cwd() + '/';
var PORT = formattedArgs['--port'] || 3000;

if (formattedArgs['--root']) {
  ROOT_PATH += formattedArgs['--root'] + '/';
}

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
  res.end();
}

var server = http.createServer();

server.on('request', function(req, res) {
  var path = url.parse(req.url).pathname,
      type,
      file;

  console.log('Serving request for ', path);
  type = getType(path);
  file = getFile(path);

  fs.createReadStream(file).on('error', function () {
      notFound(path, res);
  }).pipe(res)
});

server.listen(PORT, function () {
  console.log('Server started at port ' + PORT);
});
