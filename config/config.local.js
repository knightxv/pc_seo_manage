'use strict';

module.exports = appInfo => {
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
    // 开启的端口
    cluster: {
      listen: {
        port: 7001,
      },
    },
  };
};
