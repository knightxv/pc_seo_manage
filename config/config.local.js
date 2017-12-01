'use strict';

const path = require('path');

module.exports = appInfo => {
  const hulema_static = path.join(appInfo.root, 'upload');
  return {
    // 请求地址配置
    httpConfig: {
      webServerPath: 'http://120.55.57.25:8080',
      gameServerPath: 'http://120.77.43.214:81',
    },
    // 日志地址 eg: /home/admin/logs/hulema
    logger: {
      dir: `${appInfo.root}/logs/${appInfo.name}`,
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
    // post安全显示
    security: {
      csrf: {
        // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        ignore: ctx => true,
      },
    },
  };
};
