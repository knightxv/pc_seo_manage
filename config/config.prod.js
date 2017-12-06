'use strict';
const path = require('path');

module.exports = appInfo => {
  const hulema_static = '/home/admin/upload/hulema'; // 后台图片上传放置的地方
  return {
    static: {
      prefix: '/',
      dir: [
        path.join(appInfo.baseDir, 'app/public'),
        path.join(hulema_static),
      ],
    },
    // 请求地址配置
    httpConfig: {
      webServerPath: 'http://120.55.57.25:8080',
      gameServerPath: 'http://120.77.43.214:81',
    },
    // 日志输出地址 eg: '/home/admin/logs/hulema'
    // 默认选择根目录的logs目录
    logger: {
      dir: appInfo.root + '/logs/' + appInfo.name,
    },
    // 开启的端口
    cluster: {
      listen: {
        port: 7001,
      },
    },
    // 数据库
    mysql: {
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
    },
  };
};
