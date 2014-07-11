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
var ROOT_PATH = '';
var PORT = formattedArgs['--port'] || 3000;

if (formattedArgs['--root']) {
  ROOT_PATH += formattedArgs['--root'] + '/';
}

var server = require('../server');
server.start(PORT, ROOT_PATH);
