'use strict';

module.exports = appInfo => {
  return {
    // 请求地址配置
    httpConfig: {
      webServerPath: 'http://120.55.57.25:8080',
      gameServerPath: 'http://120.77.43.214:81',
    },
    // 日志输出地址 eg: '/home/admin/logs/hulema'
    // 默认选择根目录的logs目录
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
