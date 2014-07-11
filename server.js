'use strict';
// Node simpe http server
// Required modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var helpers = require('./lib/helpers');
var ROOT_PATH = process.cwd() + '/';

var server = http.createServer();

function getFile (url) {
  if (url === '/') {
    // Index path
    return ROOT_PATH + 'index.html';
  } else {
    return ROOT_PATH + url;
  }
}

server.on('request', function(req, res) {
  var path = url.parse(req.url).pathname,
      type,
      file;

  console.log('Serving request for ', path);
  type = helpers.getType(path);
  file = getFile(path);

  fs.createReadStream(file).on('error', function () {
      helpers.notFound(path, res);
  }).pipe(res);
});

module.exports = {
    start : function (port, root) {
        var p = port || 3000;
        if (root) {
            ROOT_PATH += root + '/';
        }

        server.listen(p, function () {
          console.log('Server started at port ' + p);
        });
    }
};

