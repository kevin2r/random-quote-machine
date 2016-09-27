'use strict';

var express = require('express'),
  http = require('http'),
  path = require('path'),
  reload = require('reload'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  favicon = require('serve-favicon');

var app = express();

var publicDir = path.join(__dirname, '/public');

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
//parses json, multi-part (file), url-encoded
app.use(bodyParser.json());
//Serve static files
app.use('/public', express.static(publicDir));
//Serve favicon
app.use(favicon(publicDir + '/favicon.ico'));

app.get('/', function(req, res) {
  res.sendFile(path.join(publicDir, 'index.html'));
});

var server = http.createServer(app);
/*
  reload code here
  optional reload delay and wait argument can be given to reload,
  refer to [API](https://github.com/jprichardson/reload#api) below
*/

reload(server, app);

server.listen(app.get('port'), function() {
  console.log('Web server listening on port ' + app.get('port'));
});
