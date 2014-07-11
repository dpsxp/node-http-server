'use strict';
var types = require('./types');

module.exports = {
    getType: function (url) {
      var type = url.split('.').pop();
      // Default extension
      if (type === '/') {
        type = 'html';
      }
      return types[type];
    },

    notFound : function(url, res) {
      console.log('Could find ', url);
      res.writeHead(404, {"Content-Type": 'text/html'});
      res.end();
    }
};
