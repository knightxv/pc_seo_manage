'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1508326922904_4283';

  // add your config here
  config.middleware = [];
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/views'),
    ].join(','),
    mapping: {
      '.nj': 'nunjucks',
    },
  };

  config.static = {
    prefix: '/',
  };

  config.logger = {
    dir: `${appInfo.root}/logs/${appInfo.name}`,
  };

  // 默认打开的端口
  config.cluster = {
    listen: {
      port: 7001,
    },
  };

  // config.nunjucks = {
  //   autoescape: true,
  //   throwOnUndefined: false,
  //   trimBlocks: false,
  //   lstripBlocks: false,
  //   cache: true,process.env.NODE_ENV !== 'production'
  // };

  return config;

};
