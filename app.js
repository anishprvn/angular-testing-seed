'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const serverConfig = require('./config').getConfig('server');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// development error handler
// will print stacktrace
if (app.get('env') === 'qa') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(serverConfig.port, serverConfig.host, () => {
  console.info(`Express server(${app.get('env')}) listen at http://${serverConfig.host}:${serverConfig.port}`);
});
