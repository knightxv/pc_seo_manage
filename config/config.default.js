'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1508326922904_4283';

  // add your config here
  config.middleware = [ 'auth' ];
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
    dir: `${appInfo.baseDir}/logs/${appInfo.name}`,
  };

  // 默认打开的端口
  config.cluster = {
    listen: {
      port: 7001,
    },
  };

  config.bodyParser = {
    jsonLimit: '5mb',
    formLimit: '5mb',
  };

  // post安全显示
  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => true,
    },
  };
  // config.nunjucks = {
  //   autoescape: true,
  //   throwOnUndefined: false,
  //   trimBlocks: false,
  //   lstripBlocks: false,
  //   cache: true,process.env.NODE_ENV !== 'production'
  // };

  // session
  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };
  config.notfound = {
    pageUrl: '/404',
  };


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
