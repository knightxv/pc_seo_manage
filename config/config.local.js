'use strict';

const path = require('path');

module.exports = appInfo => {
  const hulema_static = path.join(appInfo.baseDir, 'upload');
  return {
    // 请求地址配置
    httpConfig: {
      webServerPath: 'http://120.55.57.25:8080',
      gameServerPath: 'http://120.77.43.214:81',
    },
    // 日志地址 eg: /home/admin/logs/hulema
    logger: {
      dir: `${appInfo.baseDir}/logs/${appInfo.name}`,
    },
    static: {
      prefix: '/',
      dir: [
        path.join(appInfo.baseDir, 'app/public'),
        path.join(hulema_static),
      ],
    },
    // 开启的端口
    cluster: {
      listen: {
        port: 7001,
      },
    },
    
    middleware: [ 'cors', 'auth' ],
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '120.55.57.25',
        // 端口号
        port: '3306',
        // 用户名
        user: 'DDCat_user',
        // 密码
        password: 'qU6DOf0lcjrV9djD5IEp',
        // 数据库名
        database: 'hulema',
      },
    },
  };
};
