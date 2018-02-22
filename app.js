'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    app.locals = {
      httpConfig: app.config.httpConfig,
      static: '/static', // 胡了吗静态放置的位置
    };
  });
};
