'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1508326922904_4283';

  // add your config here
  config.middleware = [ 'cors' ];
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/views'),
    ].join(','),
    mapping: {
      '.nj': 'nunjucks',
    },
  };

  // static
  config.static = {
    prefix: '/',
    dir: [
      path.join(appInfo.baseDir, 'app/public'),
    ],
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


  // 数据库
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '192.168.2.2',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'hulema',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return config;

};
