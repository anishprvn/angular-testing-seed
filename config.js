'use strict';

const cfgManager = require('node-config-manager');
const options = {
  configDir: './config',
  env: process.env.NODE_ENV || 'development',
  camelCase: true
};

cfgManager
  .init(options)
  .addConfig('server');

module.exports = cfgManager;