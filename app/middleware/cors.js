'use strict';

module.exports = options => {
  return async function cors(ctx, next) {
    // 设置支持客户端跨域请求
    const res = ctx.response;
    const req = ctx.request;
    res.set('Access-Control-Allow-Origin', '*');
    res.set('access-control-allow-credentials', 'true');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      res.send(200); // 让options请求快速返回
    }
    else {
      await next();
    }
  
  };
};